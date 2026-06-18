import React from 'react';
import { Highlight, type PrismTheme } from 'prism-react-renderer';
import { FileCode } from 'lucide-react';

interface CodeSnippetViewerProps {
  filename: string;
  language: string;
  code: string;
}

const customPrismTheme: PrismTheme = {
  plain: {
    color: '#E4E4E7',
    backgroundColor: '#18181B',
  },
  styles: [
    {
      types: ['keyword', 'builtin', 'atrule', 'constant'],
      style: {
        color: '#FF7B72',
      },
    },
    {
      types: ['function'],
      style: {
        color: '#61AFEF',
      },
    },
    {
      types: ['string', 'attr-value', 'char', 'regex'],
      style: {
        color: '#98C379',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#5C6370',
        fontStyle: 'italic',
      },
    },
    {
      types: ['operator', 'punctuation', 'inserted'],
      style: {
        color: '#C678DD',
      },
    },
    {
      types: ['variable', 'attr-name', 'class-name', 'tag', 'selector'],
      style: {
        color: '#E5C07B',
      },
    },
  ],
};

export const CodeSnippetViewer: React.FC<CodeSnippetViewerProps> = ({
  filename,
  language,
  code,
}) => {
  return (
    <div
      className="bg-[#18181B] border border-secondary rounded-lg overflow-hidden shadow-2xl flex flex-col"
      aria-label={`Read-only code example: ${filename}`}
    >
      {/* Editor Header */}
      <div className="bg-[#27272A] px-4 py-2 flex items-center justify-between border-b border-white/5 select-none">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-1 text-xs text-text/60 bg-[#18181B] px-3 py-1 rounded-t-md border-x border-t border-white/5 transform translate-y-[9px]">
            <FileCode className="w-3.5 h-3.5 text-[#61AFEF]" />
            {filename}
          </div>
        </div>
        <span className="text-[10px] text-text/40 font-bold uppercase">Read-Only Example</span>
      </div>

      {/* Editor Body */}
      <div className="p-4 text-xs md:text-sm overflow-x-auto leading-relaxed flex gap-4 font-mono">
        <Highlight theme={customPrismTheme} code={code.trim()} language={language}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <>
              {/* Line numbers */}
              <div className="flex flex-col text-text/30 text-right select-none border-r border-white/5 pr-4">
                {tokens.map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              {/* Code */}
              <pre className="whitespace-pre flex-1 focus:outline-none overflow-x-auto">
                <code>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            </>
          )}
        </Highlight>
      </div>
    </div>
  );
};
