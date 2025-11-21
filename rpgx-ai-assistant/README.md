\# RPGX AI Assistant



\## Overview

Customizable Ollama integration for Foundry VTT, designed to enhance your gaming experience by integrating advanced AI capabilities directly into the game.



\## System Requirements

\- \*\*Foundry VTT\*\*: Version 12 or later.

\- \*\*Ollama Server\*\*: Running an LLM (Large Language Model) such as Anthropic's Claude or similar models.



\## Installation



\### Direct Installation



1\. \*\*Download Module Folder\*\*:

&nbsp;  - Download or clone the root folder "rpgx-ai-assistant" along with all its contents.

2\. \*\*Copy to Modules Directory\*\*:

&nbsp;  - Navigate to your local data directory: `C:\Users\<user>\AppData\Local\FoundryVTT\Data\modules`.

&nbsp;  - Copy the entire "rpgx-ai-assistant" folder into this directory.

3\. \*\*Enable Module in Foundry VTT\*\*:

&nbsp;  - Once installed, go to the Foundry VTT module manager and enable the RPGX AI Assistant module for your world.



\## Configuration



\### Pointing the Module at Your Ollama Server

1\. After enabling the module, access the game settings window within Foundry VTT.

2\. Configure the module by pointing it to your Ollama server URL and selecting your preferred LLM (Large Language Model).

#### THE LAST TWO STEPS AR EONLY NESSASARY IF YOUR FOUNDRY SERVER AND OLLAMA SERVER ARE SEPERATE ####

3\. \*\*Ensure CORS is Enabled\*\*: Make sure that Cross-Origin Resource Sharing (CORS) is enabled for communication between Foundry VTT and your Ollama server.

4\. \*\*Open Necessary Ports\*\*: Ensure the required ports are open and listening.



\## Usage



\### Querying the RPGX AI

Use the following commands in the Foundry chat to interact with the RPGX AI:



\- \*\*Public Query\*\*:

&nbsp; - `/rpgx \[query]`

&nbsp; 

\- \*\*Secret Query (Whisper)\*\*:

&nbsp; - `/w rpgx \[query]`



\## Contributors

\- Ashton Rogers (@x8xid82)

\- RPGX Studios

\- X8 Studios



\## Changelog



\### v1.3 (Latest Version)

\- \*\*Addition of RAG server integration\*\*: Integration with the RPGX-AI Librarian Module to add a custom knowledge database for AI.



\### v1.2

\- \*\*Variable settings for AI behavior\*\*: Added adjustable settings to customize AI behavior based on your preferences.



\### v1.0

\- \*\*Basic Ollama integration\*\*: Initial release with basic functionality for integrating an LLM with Foundry VTT.



\## Support and Contributing



For support, bug reports, or feature requests, please open an issue on this repository. Contributions are welcome! If you'd like to contribute, feel free to submit a pull request.



\## License

This project is licensed under the MIT License. See the LICENSE file for details.



---

Thank you for using RPGX AI Assistant!





\## License



Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License



This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 

International License. To view a copy of this license, visit 

http://creativecommons.org/licenses/by-nc/4.0/.



\### Summary of License Terms:



\- \*\*Attribution\*\*: You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

\- \*\*NonCommercial\*\*: You may not use the material for commercial purposes.

\- \*\*Warranty\*\*: The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.


For more information, please see the full text of the license at 

http://creativecommons.org/licenses/by-nc/4.0/legalcode









