import { Fish } from "lucide-react";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`message-enter flex items-end gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ocean-700 flex items-center justify-center">
          <Fish size={16} className="text-ocean-300" />
        </div>
      )}

      <div className={isUser ? "chat-bubble-user" : "chat-bubble-bento"}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </div>
  );
}
