import { Fish } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="message-enter flex items-end gap-2 justify-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ocean-700 flex items-center justify-center">
        <Fish size={16} className="text-ocean-300" />
      </div>
      <div className="chat-bubble-bento flex items-center gap-1.5 py-4 px-5">
        <span className="typing-dot" style={{ animationDelay: "0ms" }} />
        <span className="typing-dot" style={{ animationDelay: "150ms" }} />
        <span className="typing-dot" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
