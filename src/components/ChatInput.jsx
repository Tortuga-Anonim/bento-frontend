import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend, disabled, isLoading }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled || isLoading) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          disabled
            ? "Sesión completada — reinicia para continuar"
            : "Pregúntale a Bento sobre el océano..."
        }
        disabled={disabled || isLoading}
        className="flex-1 bg-ocean-800/50 border border-ocean-700/40 rounded-xl px-4 py-3 text-sm
                   text-ocean-50 placeholder-ocean-500 outline-none
                   focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500/30
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
      />

      <button
        type="submit"
        disabled={!text.trim() || disabled || isLoading}
        className="flex-shrink-0 w-11 h-11 rounded-xl bg-ocean-600 hover:bg-ocean-500
                   flex items-center justify-center transition-colors
                   disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-ocean-600"
      >
        <Send size={18} className="text-white" />
      </button>
    </form>
  );
}
