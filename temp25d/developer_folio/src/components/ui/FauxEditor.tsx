import type { CodeSnippetData } from '../../types';

interface FauxEditorProps {
  snippet: CodeSnippetData;
}

export function FauxEditor({ snippet }: FauxEditorProps) {
  return (
    <div className="bg-[#0D1117] w-full h-full p-4 font-mono text-[10px] leading-relaxed text-text/50 flex flex-col whitespace-pre">
      <div className="flex gap-1.5 mb-3 flex-shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      </div>
      <div className="flex-grow overflow-auto">
        {snippet.lines.map((line, lineIdx) => (
          <div key={lineIdx} className="min-h-[1.25em]">
            {line.map((token, tokenIdx) => (
              <span
                key={tokenIdx}
                style={token.color ? { color: token.color } : undefined}
              >
                {token.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
