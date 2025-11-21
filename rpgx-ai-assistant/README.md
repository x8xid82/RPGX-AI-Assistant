# RPGX AI Assistant

## Overview
RPGX AI Assistant is a rules-agnostic FoundryVTT module that connects to a local Ollama server, enabling advanced AI features such as smart NPC responses, worldbuilding tools, and automated game assistance.

## Features
- Connects FoundryVTT to any local Ollama LLM
- Supports contextual NPC responses
- Optional integration with the RPGX Librarian (RAG server) for world-aware AI
- Configurable model selection and behavior tuning
- Whisper commands for private or GM-only queries

## Requirements
- **FoundryVTT**: Version 12 or later  
- **Ollama Server**: Running a compatible LLM (e.g., Claude, Qwen, Llama)

## Installation

### Manual Installation
1. **Download or clone** the `rpgx-ai-assistant` folder.
2. Copy it into your Foundry modules directory:  
   `C:\Users\<user>\AppData\Local\FoundryVTT\Data\modules`
3. Launch FoundryVTT and enable **RPGX AI Assistant** in the Module Manager.

### Module Browser Installation  
(Available once added to the Foundry Package Registry.)

## Configuration
After enabling the module:

1. Open **Game Settings → Module Settings → RPGX AI Assistant**.
2. Enter the URL of your Ollama server.
3. Select your preferred language model.

> **Note:** Steps 2–3 are only necessary if FoundryVTT and Ollama are running on separate machines.

### Network Requirements
- Ensure **CORS** is enabled for communication.
- Open any required network ports between FoundryVTT and Ollama.

## Usage

### Public Query 
- /rpgx [your question]

### Whisper / GM-Only Query 
- /w rpgx [your question]

## Changelog

### v1.3 (Latest)
- Added RAG integration via the RPGX Librarian module for custom knowledge bases.

### v1.2
- Added adjustable AI behavior settings.

### v1.0
- Initial release with basic Ollama integration.

## Contributors
- Ashton Rogers (x8xid82) — RPGX Studios / X8 Studios

## Support & Contributions
For issues, feature requests, or contributions, please open an issue or pull request on this repository.

## License
This project is licensed under the **CC BY-NC 4.0** license.  
See the LICENSE file for full details.

