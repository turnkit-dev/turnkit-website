const bootstrapStore = new Map<string, { value: unknown; expiresAt: number }>();

const ttlMs = 60_000;

function purgeExpired() {
  const now = Date.now();
  for (const [key, entry] of bootstrapStore.entries()) {
    if (entry.expiresAt <= now) {
      bootstrapStore.delete(key);
    }
  }
}

export function createPostLoginBootstrapToken(value: unknown) {
  purgeExpired();
  const token = crypto.randomUUID();
  bootstrapStore.set(token, {
    value,
    expiresAt: Date.now() + ttlMs,
  });
  return token;
}

export function consumePostLoginBootstrapToken(token: string | null | undefined) {
  if (!token) {
    return null;
  }
  purgeExpired();
  const entry = bootstrapStore.get(token);
  if (!entry) {
    return null;
  }
  bootstrapStore.delete(token);
  return entry.value;
}
