# Reusable Front-End Delivery Playbook Demo

A polished React + TypeScript demo showing how front-end delivery learning can become reusable capability.

The app demonstrates:

- A searchable playbook of reusable front-end patterns
- Pattern details with guidance and review checklists
- A mocked AI Assist experience that uses the playbook as context
- Governance messaging for sanitised reuse and technical lead approval
- Example impact metrics for onboarding, review quality, accessibility, and delivery confidence

## Using The Playbook As AI Guidance

This repo includes a portable guidance pack:

- `docs/frontend-delivery-playbook.md`
- `docs/AGENTS.example.md`

To use the playbook in another project:

1. Copy `docs/frontend-delivery-playbook.md` into the other project.
2. Copy `docs/AGENTS.example.md` into the other project as `AGENTS.md`, or merge its content into an existing `AGENTS.md`.
3. Ask AI to read `docs/frontend-delivery-playbook.md` before making front-end changes.

AI should use the playbook to keep suggestions consistent, but final implementation quality still requires technical review.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Deployment

The app deploys to GitHub Pages through `.github/workflows/deploy.yml`.
