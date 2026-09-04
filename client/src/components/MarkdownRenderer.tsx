import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const formatMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listBuffer: string[] = [];

    const flushList = (key: number) => {
      if (listBuffer.length > 0) {
        elements.push(
          <ul key={`ul-${key}`} className="list-disc list-inside space-y-2 my-4 text-slate-700">
            {listBuffer.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {renderInline(item)}
              </li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    const renderInline = (str: string): React.ReactNode => {
      const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
        }
        return part;
      });
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        listBuffer.push(trimmed.slice(2));
        return;
      }

      flushList(index);

      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-bold text-slate-900 mt-8 mb-4">
            {renderInline(trimmed.slice(4))}
          </h3>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-200 pb-2">
            {renderInline(trimmed.slice(3))}
          </h2>
        );
      } else if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl font-extrabold text-slate-900 mt-12 mb-6">
            {renderInline(trimmed.slice(2))}
          </h1>
        );
      } else if (trimmed === '---') {
        elements.push(<hr key={index} className="my-8 border-slate-200" />);
      } else if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-indigo-600 pl-4 py-2 my-6 text-slate-700 italic bg-indigo-50/50 rounded-r-lg">
            {renderInline(trimmed.slice(2))}
          </blockquote>
        );
      } else if (trimmed.length > 0) {
        elements.push(
          <p key={index} className="text-slate-700 leading-relaxed my-4 text-base sm:text-lg">
            {renderInline(trimmed)}
          </p>
        );
      }
    });

    flushList(lines.length);
    return elements;
  };

  return <div className="markdown-content">{formatMarkdown(content)}</div>;
};
