// scripts/gpt-api.js
import { moduleName, getSetting, buildSystemPrompt } from "./settings.js";

// Escape HTML for Foundry chat display
function escapeHtml(s) {
  return (s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/**
 * Core entrypoint used by module.js
 *  - Prefer RAG whenever reachable.
 *  - Do NOT add any footer below the chat card.
 *  - Fall back to Ollama only on network/HTTP failure from the RAG server.
 */
export async function getGptReplyAsHtml(question) {
  const useRag  = game.settings.get(moduleName, "useRag");
  const ragBase = game.settings.get(moduleName, "ragBase");
  const topK    = Number(game.settings.get(moduleName, "ragTopK") || 6);

  // ---------- Try RAG first ----------
  if (useRag && ragBase) {
    try {
      const res = await fetch(`${ragBase}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: question, k: topK })
      });

      if (res.ok) {
        const j = await res.json().catch(() => ({}));
        const ans = (j?.answer ?? "").trim();
        // We intentionally ignore j.sources to avoid rendering a footer.
        if (ans) return escapeHtml(ans);
      }
      // If HTTP not ok or empty body, fall through to Ollama.
    } catch (err) {
      // Network error / CORS issue / server down -> fall through
      console.warn("[RPGX AI] RAG unreachable, falling back to Ollama:", err);
    }
  }

  // ---------- Fallback: plain Ollama ----------
  const baseUrl     = getSetting("ollamaBaseUrl");
  const model       = getSetting("ollamaModel");
  const temperature = getSetting("temperature", 0.5);
  const num_predict = getSetting("maxTokens", 600);
  const timeoutMs   = getSetting("timeoutMs", 60000);

  if (!baseUrl) throw new Error(`${moduleName}: Ollama Base URL is not set.`);
  if (!model)   throw new Error(`${moduleName}: Ollama Model is not set.`);

  const sys = buildSystemPrompt();
  const composed = `${sys}\nUSER: ${question}\nASSISTANT:`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort("timeout"), Math.max(1, timeoutMs));

  try {
    const res = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt: composed,
        stream: false,
        options: { temperature, num_predict }
      }),
      signal: controller.signal,
      credentials: "omit",
      mode: "cors"
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Ollama HTTP ${res.status}: ${txt}`);
    }

    const data = await res.json();
    const text = data?.response ?? "";
    return escapeHtml(text).replace(/\n/g, "<br>");
  } finally {
    clearTimeout(timer);
  }
}
