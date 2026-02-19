const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Envía un mensaje a Bento y retorna la respuesta.
 * @param {string} message
 * @param {string|null} sessionId
 * @returns {Promise<{session_id: string, response: string, interaction_level: number, max_interactions: number, is_active: boolean}>}
 */
export async function sendMessage(message, sessionId = null) {
  const body = { message };
  if (sessionId) body.session_id = sessionId;

  const res = await fetch(`${API_URL}/api/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Error de conexión" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

/**
 * Reinicia una sesión.
 * @param {string} sessionId
 */
export async function resetSession(sessionId) {
  const res = await fetch(`${API_URL}/api/chat/session/${sessionId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error reiniciando sesión");
  return res.json();
}
