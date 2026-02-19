import { useRef, useEffect } from "react";
import { Fish, RotateCcw } from "lucide-react";
import { useChat } from "./hooks/useChat";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import TypingIndicator from "./components/TypingIndicator";
import InteractionBadge from "./components/InteractionBadge";

export default function App() {
  const {
    messages,
    interactionLevel,
    maxInteractions,
    isActive,
    isLoading,
    send,
    reset,
  } = useChat();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl flex flex-col h-[90vh] bg-ocean-900/40 rounded-2xl border border-ocean-700/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-ocean-700/30 bg-ocean-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-500 to-ocean-700 flex items-center justify-center shadow-lg">
              <Fish size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-ocean-50 leading-tight">
                Bento
              </h1>
              <p className="text-xs text-ocean-400">Biólogo Marino Experto</p>
            </div>
          </div>

          <button
            onClick={reset}
            title="Reiniciar sesión"
            className="p-2 rounded-lg hover:bg-ocean-800 transition-colors text-ocean-400 hover:text-ocean-200"
          >
            <RotateCcw size={18} />
          </button>
        </header>

        {/* Interaction badge */}
        {interactionLevel > 0 && (
          <div className="px-4 pt-3">
            <InteractionBadge
              level={interactionLevel}
              max={maxInteractions}
              isActive={isActive}
            />
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 opacity-70">
              <div className="w-20 h-20 rounded-full bg-ocean-800/60 flex items-center justify-center">
                <Fish size={40} className="text-ocean-400" />
              </div>
              <div>
                <p className="text-ocean-300 font-medium text-lg">
                  ¡Hola! Soy Bento 🐋
                </p>
                <p className="text-ocean-500 text-sm mt-1 max-w-sm">
                  Tu biólogo marino experto. Pregúntame sobre vida marina,
                  ecosistemas oceánicos o conservación.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {[
                  "¿Qué es un arrecife de coral?",
                  "Háblame del calamar gigante",
                  "¿Por qué el océano es salado?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => send(suggestion)}
                    className="text-xs px-3 py-1.5 rounded-full bg-ocean-800/60 border border-ocean-700/40
                               text-ocean-300 hover:bg-ocean-700/60 hover:text-ocean-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}

          {isLoading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-ocean-700/30 bg-ocean-900/60">
          <ChatInput
            onSend={send}
            disabled={!isActive}
            isLoading={isLoading}
          />
          <p className="text-center text-[10px] text-ocean-600 mt-2">
            Bento puede cometer errores — verifica información importante
          </p>
        </div>
      </div>
    </div>
  );
}
