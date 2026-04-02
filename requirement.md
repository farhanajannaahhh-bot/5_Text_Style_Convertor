# Tone Converter Project

## Business Requirements

- An MVP of a web application that converts input text into four different tones: Professional, Casual, Social, and Polite
- The app should allow users to freely enter any block of text
- The interface must display the rewritten results for each tone, allowing users to select individual tones or view all tone variations simultaneously
- The app must connect to the Anthropic API to generate the distinct text tones
- Keep the feature set simple; no user accounts or text history saving is needed for this MVP
- The priority is a slick, professional, gorgeous UI/UX for seamless text entry and results viewing

## Technical Details

- Implemented as a modern Next.js web application
- The Anthropic API integration MUST be handled completely on the server-side (via Next.js API routes or server actions) to securely manage text transformation requests and protect API keys
- No database persistence needed

## Color Scheme

- Primary Action: `#4F46E5` (Indigo) - submit buttons, key actions
- Secondary Action: `#10B981` (Emerald) - success states, tone highlights
- Dark Background: `#111827` (Gray 900) - main dark mode surfaces
- Light Background: `#F9FAFB` (Gray 50) - main light mode surfaces
- Text Primary: `#1F2937` (Gray 800) - main headings and readable text

## Strategy

1. Write plan with success criteria for each phase to be checked off. Include project scaffolding, including .gitignore, and rigorous unit testing.
2. Execute the plan ensuring all critiera are met
3. Carry out extensive integration testing with Playwright or similar, fixing defects
4. Only complete when the MVP is finished and tested, with the server running and ready for the user

## Coding standards

1. Use latest versions of libraries and idiomatic approaches as of today
2. Keep it simple - NEVER over-engineer, ALWAYS simplify, NO unnecessary defensive programming. No extra features - focus on simplicity.
3. Be concise. Keep README minimal. IMPORTANT: no emojis ever
