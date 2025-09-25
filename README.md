Invoicing App

A simple invoicing application built as part of a Frontend Engineer technical assessment.
The app implements authentication, a mock backend, real-time updates, and unit/integration testing.

📋 Features

User Authentication – Signup & Login using Supabase

Invoices UI – Built from provided Figma design.

Mock Backend – REST API powered by Node/TypeScript.

Real-Time Data Flow – Socket.io integration for live updates.

Testing – Unit & integration tests with Jest + React Testing Library.

Error Handling – Graceful fallbacks for invalid URLs, network issues, etc.

🚀 Getting Started
Prerequisites

Node.js v18+

npm or yarn

Installation

# Clone the repository

git clone https://github.com/JelelAhmed/invoicing-app.git

# Move into project directory

cd invoicing-app

# Install dependencies

npm install

Running the App

1. Start the frontend:
   "npm run dev"

Starts the Vite development server.

2. Start the mock backend:
   "npm run dev:server"

Runs the mock backend with hot reload (via nodemon).
👉 Run this in a separate terminal window.

Frontend runs at http://localhost:5173

Backend runs at http://localhost:4000

🛠 Tech Stack

React + TypeScript + Vite – Frontend

Supabase – Authentication

Mock Backend – Express LowDB + TypeScript + tsx + nodemon

Socket.io – Real-time communication

Jest + React Testing Library – Unit & integration tests

ESLint – Linting
