import fs from "node:fs";
import path from "node:path";

const inputPath = process.argv[2] ?? "public/openapi.json";
const outputPath = process.argv[3] ?? inputPath;

const absoluteInputPath = path.resolve(inputPath);
const absoluteOutputPath = path.resolve(outputPath);

const raw = fs.readFileSync(absoluteInputPath, "utf8");
const spec = JSON.parse(raw);

const HTTP_METHODS = new Set([
  "get",
  "put",
  "post",
  "delete",
  "patch",
  "options",
  "head",
  "trace",
]);

const PROD_SERVER_URL = "https://api.turnkit.dev";
const PROD_SERVER_DESCRIPTION = "Production";
const DEFAULT_SECURITY_SCHEMES = {
  bearerAuth: {
    type: "http",
    name: "bearerAuth",
    scheme: "bearer",
    bearerFormat: "Client Key or Player JWT",
  },
};

const INTERNAL_PATH_PATTERNS = [
  /\/v\d+\/internal(?:\/|$)/i,
  /\/api\/v\d+\/admin(?:\/|$)/i,
  /\/webhooks(?:\/|$)/i,
];

const INTERNAL_TEXT_PATTERN = /\b(?:internal|admin|webhook)(?:\b|[-_])/i;

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function matchesInternalText(value) {
  return typeof value === "string" && INTERNAL_TEXT_PATTERN.test(value);
}

function shouldRemovePath(pathKey) {
  return INTERNAL_PATH_PATTERNS.some((pattern) => pattern.test(pathKey));
}

function shouldRemoveOperation(pathKey, operation) {
  if (shouldRemovePath(pathKey)) {
    return true;
  }

  if (!isPlainObject(operation)) {
    return false;
  }

  if ((operation.tags ?? []).some(matchesInternalText)) {
    return true;
  }

  if (matchesInternalText(operation.operationId)) {
    return true;
  }

  return false;
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

const sanitized = cloneJson(spec);
const sanitizedPaths = {};
const usedTags = new Set();

for (const [pathKey, pathItem] of Object.entries(sanitized.paths ?? {})) {
  if (!isPlainObject(pathItem)) {
    continue;
  }

  const nextPathItem = {};

  for (const [key, value] of Object.entries(pathItem)) {
    if (!HTTP_METHODS.has(key)) {
      nextPathItem[key] = value;
      continue;
    }

    if (shouldRemoveOperation(pathKey, value)) {
      continue;
    }

    nextPathItem[key] = value;

    for (const tag of value.tags ?? []) {
      usedTags.add(tag);
    }
  }

  const hasOperation = Object.keys(nextPathItem).some((key) => HTTP_METHODS.has(key));
  if (hasOperation) {
    sanitizedPaths[pathKey] = nextPathItem;
  }
}

sanitized.paths = sanitizedPaths;
sanitized.servers = [
  {
    url: PROD_SERVER_URL,
    description: PROD_SERVER_DESCRIPTION,
  },
];

if (Array.isArray(sanitized.tags)) {
  sanitized.tags = sanitized.tags.filter(
    (tag) => tag?.name && usedTags.has(tag.name) && !matchesInternalText(tag.name),
  );
}

const reachable = new Map();

function markReachable(ref) {
  const match = /^#\/components\/([^/]+)\/([^/]+)$/.exec(ref);
  if (!match) {
    return;
  }

  const [, section, name] = match;
  if (!reachable.has(section)) {
    reachable.set(section, new Set());
  }

  const names = reachable.get(section);
  if (!names.has(name)) {
    names.add(name);
    collectRefs(sanitized.components?.[section]?.[name]);
  }
}

function collectRefs(node) {
  if (Array.isArray(node)) {
    for (const value of node) {
      collectRefs(value);
    }
    return;
  }

  if (!isPlainObject(node)) {
    return;
  }

  if (typeof node.$ref === "string") {
    markReachable(node.$ref);
  }

  for (const value of Object.values(node)) {
    collectRefs(value);
  }
}

function collectSecuritySchemes(node) {
  if (!Array.isArray(node)) {
    return;
  }

  for (const requirement of node) {
    if (!isPlainObject(requirement)) {
      continue;
    }

    for (const schemeName of Object.keys(requirement)) {
      if (!reachable.has("securitySchemes")) {
        reachable.set("securitySchemes", new Set());
      }

      reachable.get("securitySchemes").add(schemeName);
    }
  }
}

collectRefs(sanitized.paths);
collectRefs(sanitized.security);
collectSecuritySchemes(sanitized.security);

for (const pathItem of Object.values(sanitized.paths ?? {})) {
  if (!isPlainObject(pathItem)) {
    continue;
  }

  for (const [method, operation] of Object.entries(pathItem)) {
    if (!HTTP_METHODS.has(method) || !isPlainObject(operation)) {
      continue;
    }

    collectSecuritySchemes(operation.security);
  }
}

const nextComponents = {};

for (const [section, entries] of Object.entries(sanitized.components ?? {})) {
  if (!isPlainObject(entries)) {
    continue;
  }

  const usedNames = reachable.get(section);
  if (!usedNames?.size) {
    continue;
  }

  const keptEntries = {};
  for (const name of usedNames) {
    if (entries[name] !== undefined) {
      keptEntries[name] = entries[name];
    }
  }

  if (Object.keys(keptEntries).length > 0) {
    nextComponents[section] = keptEntries;
  }
}

const requiredSecuritySchemes = reachable.get("securitySchemes");
if (requiredSecuritySchemes?.size) {
  const securitySchemes = { ...(nextComponents.securitySchemes ?? {}) };

  for (const name of requiredSecuritySchemes) {
    if (securitySchemes[name]) {
      continue;
    }

    if (sanitized.components?.securitySchemes?.[name]) {
      securitySchemes[name] = sanitized.components.securitySchemes[name];
      continue;
    }

    if (DEFAULT_SECURITY_SCHEMES[name]) {
      securitySchemes[name] = DEFAULT_SECURITY_SCHEMES[name];
    }
  }

  if (Object.keys(securitySchemes).length > 0) {
    nextComponents.securitySchemes = securitySchemes;
  }
}

if (Object.keys(nextComponents).length > 0) {
  sanitized.components = nextComponents;
} else {
  delete sanitized.components;
}

const output = `${JSON.stringify(sanitized, null, 2)}\n`;
fs.writeFileSync(absoluteOutputPath, output, "utf8");

console.log(`Sanitized OpenAPI written to ${absoluteOutputPath}`);
console.log(`Kept ${Object.keys(sanitized.paths ?? {}).length} public paths.`);
