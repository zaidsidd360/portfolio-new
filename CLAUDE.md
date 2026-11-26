# Project instructions for Claude

## Writing style — READ THIS EVERY TIME

- **Never use em dashes (—) or the `&mdash;` HTML entity. Ever.** Not in blog posts, not in UI copy, not in metadata, not anywhere.
- Don't substitute en dashes (–) as a sneaky replacement either. Use normal punctuation: commas, parentheses, colons, semicolons, or just split into two sentences.
- Keep prose clean and direct. Be concise. Cut words that don't earn their place.
- Match the existing voice in `content/blog/*.mdx`: first person, plain, opinionated, no filler.

## Stack
- Next.js (App Router) + TypeScript, Tailwind, GSAP, three.js. Blog is MDX via `next-mdx-remote` (v6+).
- Deployed on Vercel. Custom domain: zaidsiddiqui.dev.

## Verify
- Run `npx tsc --noEmit` after code changes.
