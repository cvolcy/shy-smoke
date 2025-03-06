# Shy Smoke - AI-Powered Application

This project is a Nuxt 3 application providing an AI-powered interface.  It features various AI-driven tools accessed through a dashboard.  The application utilizes OpenAI's API for its core functionality.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation and Setup](#installation-and-setup)
- [API Keys and Configuration](#api-keys-and-configuration)
- [Database](#database)
- [License](#license)


## Description

Shy Smoke is a user-friendly application providing access to various AI tools.  Users can interact with these tools through a clean and intuitive interface.  The backend manages user API limits and interactions with the chosen AI provider.


## Features

- **AI-Powered Conversation:** A conversational interface allowing users to interact with an AI model.  (See `/pages/(generation)/conversation.vue`)
- **Dashboard:** A central dashboard displaying available AI tools and features. (See `/pages/index.vue`)
- **User API Limits:**  The backend implements API usage limits to manage resource consumption. (See `server/repositories/userapilimit.repository.ts`)
- **Multilingual Support:** The application supports multiple languages.

## Technology Stack

- **Frontend:** Vue 3, Tailwind CSS, Iconify
- **Backend:** Nuxt 3, PocketBase
- **AI Provider:**  OpenAi, REPLICATE
- **Database:** PocketBase


## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone [repository URL]
    ```
2. **Clone the repository:**
   ```bash
   cd shy-smoke
    ```
3. **Install dependencies:**
   ```bash
   npm install
    ```

4. **Setup PocketBase:**

- Follow the PocketBase setup instructions to create your database.
- Ensure the `userApiLimit` collection exists with appropriate schema (at least `user` (text), and `count` (number) fields).

4. **Configure Environment Variables:** Create a .env file (or use a suitable environment variable management system) and add the necessary environment variables. This includes:

- `POCKETBASE_URL`: Your PocketBase instance URL.
- `OPENAI_API_KEY`: Your API key.
- `REPLICATE_API_TOKEN`: Your API key.
Start the development server:


6. **Start the development server:**
    ```bash
    npm run dev
    ```

## API Keys and Configuration
The application requires API keys for the chosen AI provider. These keys should be stored securely in environment variables (`.env`) and __never__ committed to the repository. Refer to the AI provider's documentation for details on obtaining API keys.

## Database
The application uses PocketBase as its database. The `userApiLimit` collection tracks API usage for each user. Make sure this collection exists with the correct schema.

## License

MIT License

Copyright (c) 2025 Clervens Volcy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.