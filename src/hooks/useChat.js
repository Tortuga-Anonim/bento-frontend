import { useState, useCallback, useRef } from "react";
import { sendMessage, resetSession } from "../api";

/**
 * Hook que encapsula toda la lógica del chat con Bento.
 */
export function useChat() {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [interactionLevel, setInteractionLevel] = useState(0);
  const [maxInteractions] = useState(10);
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const send = useCallback(
    async (text) => {
      if (!text.trim() || isLoading || !isActive) return;

      setError(null);
      setIsLoading(true);

      const userMsg = { role: "user", content: text, timestamp: Date.now() };
      setMessages((prev) => [...prev, userMsg]);

      try {
        const data = await sendMessage(text, sessionId);

        if (!sessionId) setSessionId(data.session_id);

        setInteractionLevel(data.interaction_level);
        setIsActive(data.is_active);

        const bentoMsg = {
          role: "assistant",
          content: data.response,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, bentoMsg]);
      } catch (err) {
        setError(err.message);
        const errorMsg = {
          role: "assistant",
          content: "⚠️ No pude conectarme con el servidor. Verifica que el backend esté corriendo.",
          timestamp: Date.now(),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, isLoading, isActive]
  );

  const reset = useCallback(async () => {
    if (sessionId) {
      try {
        await resetSession(sessionId);
      } catch {
        // Si falla el reset remoto, igual limpiamos local
      }
    }
    setMessages([]);
    setSessionId(null);
    setInteractionLevel(0);
    setIsActive(true);
    setError(null);
  }, [sessionId]);

  return {
    messages,
    sessionId,
    interactionLevel,
    maxInteractions,
    isActive,
    isLoading,
    error,
    send,
    reset,
  };
}
