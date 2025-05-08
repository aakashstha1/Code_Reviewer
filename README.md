# Code Review App

This is a web application that allows you to write or paste JavaScript code, then submit it for an AI-powered review. The application uses Google's generative AI to provide feedback on the code and suggests improvements.

## Features

- Write or paste JavaScript code in the editor.
- Get a detailed review of the code from an AI model.
- Display suggestions for improvement, including explanations and example code if necessary.
- Responsive layout, works well on both desktop and mobile devices.
- Lottie animation to indicate the review process.

## Tech Stack

- **Frontend**: React, TailwindCSS, `react-simple-code-editor`, `react-markdown`, `prismjs`, Lottie
- **Backend**: Google Generative AI (Gemini 2.0) for code review
- **Additional Libraries**:
  - `axios` for HTTP requests
  - `prismjs` for syntax highlighting
  - `rehype-highlight` for Markdown highlighting

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn** for package management
