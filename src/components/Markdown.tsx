import React from "react";

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  if (!content) return null;

  // Split content by code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-4 text-slate-700 dark:text-slate-200 leading-relaxed font-sans text-sm md:text-base">
      {parts.map((part, index) => {
        // Check if this part is a code block
        if (part.startsWith("```")) {
          const match = part.match(/```(\w*)\n([\s\S]*?)```/);
          const language = match ? match[1] : "code";
          const code = match ? match[2].trim() : part.slice(3, -3).trim();

          return (
            <div key={index} className="my-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-200 font-mono text-xs md:text-sm">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 text-xxs uppercase tracking-wider">
                <span>{language || "snippet"}</span>
                <button
                  id={`copy-btn-${index}`}
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    const btn = document.getElementById(`copy-btn-${index}`);
                    if (btn) {
                      btn.innerText = "Copiado!";
                      setTimeout(() => { btn.innerText = "Copiar"; }, 2000);
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Copiar
                </button>
              </div>
              <pre className="p-4 overflow-x-auto whitespace-pre">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Standard text block: parse headers, lists, bold text, etc.
        const lines = part.split("\n");
        let listItems: React.ReactNode[] = [];
        const renderedElements: React.ReactNode[] = [];

        const flushList = (key: string) => {
          if (listItems.length > 0) {
            renderedElements.push(
              <ul key={key} className="list-disc list-inside pl-5 my-2 space-y-1.5 text-slate-600 dark:text-slate-300">
                {listItems}
              </ul>
            );
            listItems = [];
          }
        };

        lines.forEach((line, lineIdx) => {
          const key = `line-${index}-${lineIdx}`;
          const trimmed = line.trim();

          // Check for headers
          if (trimmed.startsWith("### ")) {
            flushList(key);
            renderedElements.push(
              <h4 key={key} className="text-base md:text-lg font-semibold tracking-tight text-slate-900 dark:text-white mt-4 mb-2">
                {parseInline(trimmed.substring(4))}
              </h4>
            );
          } else if (trimmed.startsWith("## ")) {
            flushList(key);
            renderedElements.push(
              <h3 key={key} className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-5 mb-3">
                {parseInline(trimmed.substring(3))}
              </h3>
            );
          } else if (trimmed.startsWith("# ")) {
            flushList(key);
            renderedElements.push(
              <h2 key={key} className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-6 mb-4">
                {parseInline(trimmed.substring(2))}
              </h2>
            );
          }
          // Check for list items
          else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            listItems.push(
              <li key={key} className="text-slate-600 dark:text-slate-300">
                {parseInline(trimmed.substring(2))}
              </li>
            );
          } else if (/^\d+\.\s/.test(trimmed)) {
            flushList(key);
            const numContent = trimmed.replace(/^\d+\.\s/, "");
            renderedElements.push(
              <div key={key} className="flex items-start gap-2.5 my-2">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{trimmed.match(/^\d+/)![0]}.</span>
                <p className="text-slate-600 dark:text-slate-300 flex-1">{parseInline(numContent)}</p>
              </div>
            );
          }
          // Empty line
          else if (trimmed === "") {
            flushList(key);
          }
          // Standard paragraph
          else {
            flushList(key);
            renderedElements.push(
              <p key={key} className="text-slate-600 dark:text-slate-300 mt-2 mb-3">
                {parseInline(trimmed)}
              </p>
            );
          }
        });

        // Flush any remaining list items at the end of the block
        flushList(`final-list-${index}`);

        return <React.Fragment key={index}>{renderedElements}</React.Fragment>;
      })}
    </div>
  );
}

// Simple parser for inline elements: **bold** and `code`
function parseInline(text: string): React.ReactNode[] {
  if (!text) return [];

  // Regex to split by bold (**text**) and inline code (`code`)
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={idx} className="px-1.5 py-0.5 rounded-md font-mono text-xs bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-slate-200/50 dark:border-slate-700/50">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
