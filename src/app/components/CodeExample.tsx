import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeExampleProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeExample({ code, language = "tsx", title }: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[var(--chat-gray-900)] rounded-2xl overflow-hidden">
      {title && (
        <div className="px-6 py-3 border-b border-[var(--chat-gray-700)] flex items-center justify-between">
          <span className="text-sm text-[var(--chat-gray-400)]">{title}</span>
          <span className="text-xs text-[var(--chat-gray-500)] uppercase">
            {language}
          </span>
        </div>
      )}
      <div className="relative">
        <pre className="p-6 overflow-x-auto">
          <code className="text-sm text-[var(--chat-gray-100)] font-mono leading-relaxed">
            {code}
          </code>
        </pre>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-[var(--chat-gray-800)] hover:bg-[var(--chat-gray-700)] rounded-lg transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-[var(--chat-gray-400)]" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
