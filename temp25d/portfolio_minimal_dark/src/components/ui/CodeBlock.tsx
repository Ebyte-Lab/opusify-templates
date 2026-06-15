// src/components/ui/CodeBlock.tsx
import React from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const highlightCode = (text: string, lang: string) => {
    const lines = text.split('\n');

    return lines.map((line, idx) => {
      // Find comment position
      let comment = '';
      let codePart = line;

      const commentSymbol = lang === 'go' ? '//' : '#';
      const commentIndex = line.indexOf(commentSymbol);

      if (commentIndex !== -1) {
        codePart = line.substring(0, commentIndex);
        comment = line.substring(commentIndex);
      }

      let highlighted = codePart;

      if (lang === 'go') {
        // Keywords
        highlighted = highlighted.replace(
          /\b(func|return|package|import|struct|interface|type|const|var|if|else|for|range)\b/g,
          '<span class="text-[#c678dd]">$1</span>'
        );
        // Types
        highlighted = highlighted.replace(
          /\b(string|int|int64|float64|bool|error|Node|Ring)\b/g,
          '<span class="text-[#e5c07b]">$1</span>'
        );
        // Functions (word followed by paren)
        highlighted = highlighted.replace(
          /\b([a-zA-Z0-9_]+)(?=\()/g,
          '<span class="text-[#61afef]">$1</span>'
        );
      } else if (lang === 'python') {
        // Keywords
        highlighted = highlighted.replace(
          /\b(import|from|def|return|class|if|elif|else|for|in|while|try|except|as)\b/g,
          '<span class="text-[#c678dd]">$1</span>'
        );
        // Functions (word followed by paren)
        highlighted = highlighted.replace(
          /\b([a-zA-Z0-9_]+)(?=\()/g,
          '<span class="text-[#61afef]">$1</span>'
        );
        // Special methods/attributes called on objects
        highlighted = highlighted.replace(
          /\.([a-zA-Z0-9_]+)(?=\()/g,
          '.<span class="text-[#56b6c2]">$1</span>'
        );
      }

      let commentHtml = '';
      if (comment) {
        // Escape comment HTML characters to prevent XSS
        const escapedComment = comment
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        commentHtml = `<span class="text-[#5c6370] italic">${escapedComment}</span>`;
      }

      return (
        <div key={idx} className="min-h-[1.25rem] whitespace-pre">
          <span dangerouslySetInnerHTML={{ __html: highlighted + commentHtml }} />
        </div>
      );
    });
  };

  return (
    <div className="bg-bg border border-secondary p-4 rounded text-xs overflow-x-auto mt-auto shadow-inner w-full font-body select-text">
      <code className="text-text/90 block">
        {highlightCode(code, language)}
      </code>
    </div>
  );
};

export default CodeBlock;
