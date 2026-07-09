export const highlightCode = (code: string, language: string): string => {
  // 1. Escape HTML first
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const strings: string[] = [];
  const comments: string[] = [];

  // 2. Extract comments and strings to protect them from keyword replacement
  if (language === 'go' || language === 'rust' || language === 'javascript') {
    // Double quote and backtick strings
    escaped = escaped.replace(/(".*?"|`.*?`|'.*?')/g, (match) => {
      strings.push(`<span class="text-green-400">${match}</span>`);
      return `___STR_TOKEN_${strings.length - 1}___`;
    });
    // Single line comments
    escaped = escaped.replace(/(\/\/.*)/g, (match) => {
      comments.push(`<span class="text-gray-500">${match}</span>`);
      return `___COM_TOKEN_${comments.length - 1}___`;
    });
  } else if (language === 'sql') {
    // Single quote strings
    escaped = escaped.replace(/('.*?')/g, (match) => {
      strings.push(`<span class="text-green-400">${match}</span>`);
      return `___STR_TOKEN_${strings.length - 1}___`;
    });
  } else if (language === 'bash' || language === 'yaml') {
    // Double quote strings
    escaped = escaped.replace(/(".*?"|'.*?')/g, (match) => {
      strings.push(`<span class="text-green-400">${match}</span>`);
      return `___STR_TOKEN_${strings.length - 1}___`;
    });
    // Shell comments
    escaped = escaped.replace(/(#.*)/g, (match) => {
      comments.push(`<span class="text-gray-500">${match}</span>`);
      return `___COM_TOKEN_${comments.length - 1}___`;
    });
  } else if (language === 'nginx') {
    // Extract strings
    escaped = escaped.replace(/(".*?"|'.*?')/g, (match) => {
      strings.push(`<span class="text-green-400">${match}</span>`);
      return `___STR_TOKEN_${strings.length - 1}___`;
    });
    // Comments
    escaped = escaped.replace(/(#.*)/g, (match) => {
      comments.push(`<span class="text-gray-500">${match}</span>`);
      return `___COM_TOKEN_${comments.length - 1}___`;
    });
  }

  // 3. Highlight keywords and types
  if (language === 'go') {
    const keywords = ['package', 'import', 'func', 'struct', 'type', 'return', 'var', 'if', 'else', 'for', 'range', 'nil', 'true', 'false'];
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'g');
      escaped = escaped.replace(regex, '<span class="text-pink-400">$1</span>');
    });
    const builtins = ['string', 'int', 'time', 'error', 'bool', 'main', 'Println', 'Printf', 'Sleep', 'Millisecond'];
    builtins.forEach(bi => {
      const regex = new RegExp(`\\b(${bi})\\b`, 'g');
      escaped = escaped.replace(regex, '<span class="text-blue-400">$1</span>');
    });
  } else if (language === 'sql') {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'ON', 'INTERVAL', 'current_timestamp', 'LIMIT', 'pg_terminate_backend', 'pg_stat_activity'];
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
      escaped = escaped.replace(regex, '<span class="text-pink-400">$1</span>');
    });
  } else if (language === 'rust') {
    const keywords = ['pub', 'fn', 'let', 'mut', 'match', 'use', 'return', 'impl', 'struct', 'enum', 'if', 'else', 'String', 'str', 'Option', 'usize'];
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'g');
      escaped = escaped.replace(regex, '<span class="text-pink-400">$1</span>');
    });
    const builtins = ['find_token', 'windows', 'position', 'len'];
    builtins.forEach(bi => {
      const regex = new RegExp(`\\b(${bi})\\b`, 'g');
      escaped = escaped.replace(regex, '<span class="text-blue-400">$1</span>');
    });
  } else if (language === 'yaml') {
    escaped = escaped.replace(/^([\s-]*)([\w-]+:)/gm, '$1<span class="text-blue-400">$2</span>');
  } else if (language === 'nginx') {
    const keywords = ['server', 'location', 'proxy_cache_path', 'proxy_cache', 'proxy_cache_valid', 'proxy_pass', 'add_header'];
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'g');
      escaped = escaped.replace(regex, '<span class="text-pink-400">$1</span>');
    });
  }

  // 4. Restore protected strings and comments
  strings.forEach((str, i) => {
    escaped = escaped.replace(`___STR_TOKEN_${i}___`, str);
  });
  comments.forEach((com, i) => {
    escaped = escaped.replace(`___COM_TOKEN_${i}___`, com);
  });

  return escaped;
};
