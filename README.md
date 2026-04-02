# Tone Converter Project

## Overview
A minimal, MVP web application built with Next.js and the Anthropic API to convert text into four different tones: Professional, Casual, Social, and Polite. It allows users to write source text and instantly view rewritten variations concurrently.

## Prerequisites
- Node.js
- npm
- A valid Anthropic API key

## Setup Instructions

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the `frontend` directory and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY="sk-ant-..."
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Architecture & Technical Details
- **Frontend**: Next.js App Router, React, Tailwind CSS
- **Backend API**: Next.js API Routes (`app/api/transform/route.ts`)
- **AI Integration**: Anthropic SDK (using Claude)
- **Styling**: Custom CSS variables defined in globals.css integrated with Tailwind CSS

## Design Highlights
- Simple, beautiful UI featuring responsive layouts and subtle micro-interactions
- Simultaneous concurrent API requests for "View All" functionality
- Strict server-side security for the API Key
