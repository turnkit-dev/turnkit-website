export function getUserInitials(name?: string | null, email?: string | null) {
  const words = (name ?? '')
    .trim()
    .split(/\s+/)
    .map((part) => part.replace(/[^A-Za-z0-9]/g, ''))
    .filter(Boolean);

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  if (words.length === 1 && words[0].length >= 2) {
    return words[0].slice(0, 2).toUpperCase();
  }

  const emailPrefix = (email ?? '').split('@')[0]?.replace(/[^A-Za-z0-9]/g, '') ?? '';
  if (emailPrefix.length >= 2) {
    return emailPrefix.slice(0, 2).toUpperCase();
  }

  if (words.length === 1 && words[0].length === 1) {
    return words[0][0].toUpperCase();
  }

  if (emailPrefix.length === 1) {
    return emailPrefix[0].toUpperCase();
  }

  return 'TK';
}
