import type { CodeSnippetData } from '../types';

export const codeSnippet: CodeSnippetData = {
  filename: 'api.ts',
  language: 'typescript',
  lines: [
    [
      { text: 'export const ', color: '#C678DD' },
      { text: 'fetchData ', color: '#61AFEF' },
      { text: '= ', color: '#C678DD' },
      { text: 'async ', color: '#C678DD' },
      { text: '() ', color: '#ABB2BF' },
      { text: '=> ', color: '#C678DD' },
      { text: '{', color: '#ABB2BF' }
    ],
    [
      { text: '  try ', color: '#C678DD' },
      { text: '{', color: '#ABB2BF' }
    ],
    [
      { text: '    const ', color: '#C678DD' },
      { text: 'res ', color: '#ABB2BF' },
      { text: '= ', color: '#C678DD' },
      { text: 'await ', color: '#C678DD' },
      { text: 'fetch', color: '#E5C07B' },
      { text: '(', color: '#ABB2BF' },
      { text: "'/api/data'", color: '#98C379' },
      { text: ');', color: '#ABB2BF' }
    ],
    [
      { text: '    return await ', color: '#C678DD' },
      { text: 'res', color: '#ABB2BF' },
      { text: '.', color: '#ABB2BF' },
      { text: 'json', color: '#61AFEF' },
      { text: '();', color: '#ABB2BF' }
    ],
    [
      { text: '  } ', color: '#C678DD' },
      { text: 'catch ', color: '#C678DD' },
      { text: '(', color: '#ABB2BF' },
      { text: 'err', color: '#ABB2BF' },
      { text: ') ', color: '#ABB2BF' },
      { text: '{', color: '#ABB2BF' }
    ],
    [
      { text: '    console', color: '#ABB2BF' },
      { text: '.', color: '#ABB2BF' },
      { text: 'error', color: '#61AFEF' },
      { text: '(', color: '#ABB2BF' },
      { text: 'err', color: '#ABB2BF' },
      { text: ');', color: '#ABB2BF' }
    ],
    [
      { text: '  }', color: '#ABB2BF' }
    ],
    [
      { text: '};', color: '#ABB2BF' }
    ]
  ]
};
