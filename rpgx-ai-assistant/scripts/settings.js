// scripts/settings.js
export const moduleName = "rpgx-ai-assistant";

const DEFAULT_SYSTEM_PROMPT = `You are RPGX-AI, a knowledgeable and experienced assistant to a game master for a group playing "{system}".
Give knowledgeable and creative responses to help run the game.
When answering questions about rules, be clean and precise with answers. When asked for help to create content be elaborate and descriptive.`;

/** Register all module settings */
export function registerSettings() {
  const M = moduleName;

  game.settings.register(M, "ollamaBaseUrl", {
    name: "Ollama Base URL",
    hint: "Example: http://192.168.0.134:11434 (no trailing slash)",
    scope: "world",
    config: true,
    type: String,
    default: "http://127.0.0.1:11434"
  });

  game.settings.register(M, "ollamaModel", {
    name: "Ollama Model",
    hint: "e.g., qwen2.5:14b, mistral:7b, llama3.1:8b",
    scope: "world",
    config: true,
    type: String,
    default: "qwen2.5:14b"
  });

  game.settings.register(M, "temperature", {
    name: "Temperature",
    hint: "0.0 = deterministic; higher = more creative",
    scope: "world",
    config: true,
    type: Number,
    range: { min: 0, max: 1.0, step: 0.1 },
    default: 0.5
  });

  game.settings.register(M, "maxTokens", {
    name: "Max Tokens (num_predict)",
    hint: "Upper bound for generated tokens",
    scope: "world",
    config: true,
    type: Number,
    default: 1100
  });

  game.settings.register(M, "timeoutMs", {
    name: "Request Timeout (ms)",
    scope: "world",
    config: true,
    type: Number,
    default: 60000
  });

  // RAG settings
  game.settings.register(M, "useRag", {
    name: "Use RAG server",
    hint: "If enabled, the assistant will ask the RAG server first.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(M, "ragBase", {
    name: "RAG Base URL",
    hint: "e.g., http://127.0.0.1:3033 (no trailing slash)",
    scope: "world",
    config: true,
    type: String,
    default: "http://127.0.0.1:3033"
  });

  game.settings.register(M, "ragTopK", {
    name: "RAG Top K",
    hint: "How many chunks to retrieve for context",
    scope: "world",
    config: true,
    type: Number,
    default: 7
  });

  // Persona / system prompt
  game.settings.register(M, "gameSystem", {
    name: "Game System",
    hint: "Used in the system prompt (e.g., “D&D 5e”, “PF2e”, “Alien RPG”, “Vampire”)",
    scope: "world",
    config: true,
    type: String,
    default: "D&D 5e"
  });

  game.settings.register(M, "systemPrompt", {
    name: "System Prompt",
    hint: 'Base prompt for the AI. Use {system} as a placeholder for the Game System setting.',
    scope: "world",
    config: true,
    type: String,
    // textarea in newer Foundry; ignored safely in older versions
    multiline: true,
    default: DEFAULT_SYSTEM_PROMPT
  });
}

/** Helper to read settings safely */
export function getSetting(key, fallback = null) {
  try {
    return game.settings.get(moduleName, key);
  } catch {
    return fallback;
  }
}

/** System prompt used by gpt-api.js when calling Ollama directly */
export function buildSystemPrompt() {
  const system = getSetting("gameSystem", "D&D 5e");
  const template = getSetting("systemPrompt", DEFAULT_SYSTEM_PROMPT) || DEFAULT_SYSTEM_PROMPT;

  // Replace all {system} placeholders with the current Game System
  return template.replace(/\{system\}/g, system);
}

// -------------------------------------------------------------
// RPGX Studios Attribution in Game Settings (RPGX AI Assistant)
// -------------------------------------------------------------
Hooks.on("renderSettingsConfig", (app, html, context, options) => {
  // Support both AppV1 (jQuery) and AppV2 (HTMLElement)
  const root = html instanceof HTMLElement ? html : html[0];
  if (!root) return;

  // Don't add it multiple times if the form rerenders
  if (root.querySelector(".rpgx-footer")) return;

  // Find any setting that belongs to this module
  const settingElement =
    root.querySelector('input[name="rpgx-ai-assistant.ollamaBaseUrl"]') ||
    root.querySelector('input[name="rpgx-ai-assistant.ollamaModel"]') ||
    root.querySelector('input[name="rpgx-ai-assistant.gameSystem"]') ||
    root.querySelector('[name^="rpgx-ai-assistant."]');

  // If our settings aren't visible, bail out
  if (!settingElement) return;

  // Find a reasonable container to append into
  let container =
    settingElement.closest(".tab") ||           // v11/v12 categories
    settingElement.closest(".settings-list") || // older layouts
    settingElement.closest("form") ||           // fallback
    root;

  // Build footer
  const footer = document.createElement("div");
  footer.classList.add("rpgx-footer");
  footer.style.marginTop = "1rem";
  footer.style.textAlign = "center";
  footer.style.fontSize = "0.9em";
  footer.style.lineHeight = "1.4em";
  footer.style.color = "var(--color-text-light-primary, #bbb)";

  footer.innerHTML = `
    <hr>
    <div>
      Thank you for using the <strong>RPGX AI Assistant</strong> created by
      <a href="https://x8xid82.wixsite.com/rpgxstudios" target="_blank" rel="noreferrer noopener">
        RPGX Studios
      </a>.<br>
      To find other tools and modules by RPGX Studios, please visit our 
      <a href="https://www.patreon.com/c/rpgxstudios" target="_blank" rel="noreferrer noopener">
        Patreon Page
      </a>.
    </div>
  `;

  container.appendChild(footer);

  // Make sure the window resizes so the footer isn't cut off
  if (typeof app.setPosition === "function") app.setPosition();
});
