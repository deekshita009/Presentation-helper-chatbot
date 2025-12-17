Presentation Helper Chatbot

An AI-powered web application that helps users learn presentation strategies, generate structured slide content, and download ready-to-use PowerPoint (.pptx) files directly from the browser.

Features

Interactive website flow: Homepage → Learn Strategies → Create Presentation → Chat Interface

AI-powered content generation using Gemini 2.5 Flash

Dual response modes: conversational guidance and structured JSON for slides

One-click PowerPoint generation using PptxGenJS (client-side)

Persistent chat history using IndexedDB

Responsive, modern UI with Tailwind CSS and Lucide React icons

Fully client-side (no backend server)

Tech Stack

Core Framework & Language

React 19

TypeScript

Vite

Styling & UI

Tailwind CSS (CDN)

Lucide React

Inter Font

Artificial Intelligence

Google GenAI SDK

Gemini 2.5 Flash

Data & Storage

IndexedDB

idb

Utilities

PptxGenJS

UUID

ES Modules

Getting Started

Prerequisites

Node.js (v18+ recommended)

NPM

Installation

npm install

Run the App

npm run dev

Open the app in your browser at the URL shown in the terminal.

How It Works

User navigates the website and opens the chat interface.

Prompts are sent to Gemini via the Google GenAI SDK.

AI returns text (guidance) or structured JSON (presentation).

JSON is parsed in the frontend.

PptxGenJS generates a downloadable .pptx file.

Chat sessions are stored in IndexedDB.

Prompt Design

Task-specific prompts for presentation creation

Informational prompts for content clarity

Instructional prompts for slide structure

Generation prompts enforce structured JSON output

Limitations

Requires internet access for AI responses

No cloud storage or user authentication

Large presentations may use more browser memory

Future Enhancements

Voice-based interaction

Cloud storage integration

Advanced templates and themes

Context-aware personalization
