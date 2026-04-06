import hljs from 'highlight.js';

const languageAliases: Record<string, string> = {
  csharp: 'cs',
  cs: 'cs',
  javascript: 'javascript',
  js: 'javascript',
  json: 'json',
  ts: 'typescript',
  typescript: 'typescript',
  text: 'plaintext',
  plaintext: 'plaintext',
  shell: 'bash',
  bash: 'bash',
};

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

interface InlineCodeProps {
  code: string;
  language?: string;
  className?: string;
}

const turnkitApiPattern =
  /\b(?:Relay|Leaderboard|ExampleConfig|TurnKitConfig)(?:\.[A-Za-z_][A-Za-z0-9_]*)+\b/g;

function decorateTurnkitApi(html: string) {
  return html.replace(turnkitApiPattern, (match) => `<span class="docs-api-call">${match}</span>`);
}

function highlightCode(code: string, language?: string) {
  const normalizedLanguage = language ? languageAliases[language] ?? language : undefined;
  const highlighted = normalizedLanguage
    ? hljs.highlight(code, { language: normalizedLanguage, ignoreIllegals: true }).value
    : hljs.highlightAuto(code).value;
  const html = decorateTurnkitApi(highlighted);

  return {
    html,
    normalizedLanguage,
  };
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const { html, normalizedLanguage } = highlightCode(code, language);
  const classes = ['docs-code-block', 'overflow-x-auto', 'rounded-[6px]', 'border', 'border-border', 'bg-surface', className]
    .filter(Boolean)
    .join(' ');

  return (
    <pre className={classes}>
      <code
        className={`hljs ${normalizedLanguage ? `language-${normalizedLanguage}` : ''}`.trim()}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </pre>
  );
}

export function InlineCode({ code, language, className }: InlineCodeProps) {
  const { html, normalizedLanguage } = highlightCode(code, language);
  const classes = ['docs-inline-code', className].filter(Boolean).join(' ');

  return (
    <code
      className={`${classes} ${normalizedLanguage ? `language-${normalizedLanguage}` : ''}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
