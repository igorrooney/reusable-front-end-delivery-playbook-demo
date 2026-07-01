import type { AiGuidancePrompt } from '../types'

export const aiGuidancePrompts: AiGuidancePrompt[] = [
  {
    id: 'project-setup',
    title: 'Project setup instruction',
    purpose: 'Add this to an AGENTS.md file or project AI instructions so the assistant knows the playbook exists.',
    prompt: `When working on front-end code in this repository, read and follow docs/frontend-delivery-playbook.md before suggesting implementation changes.

Use the playbook to keep component structure, accessibility checks, form validation, loading states, and review quality consistent across the project.

Do not treat the playbook as automatic approval. AI output is draft support only. Final decisions require technical review by the accountable engineer or technical lead.

Do not include client names, client IP, confidential implementation details, or assignment-specific code in reusable guidance.`,
  },
  {
    id: 'implementation-task',
    title: 'Implementation task prompt',
    purpose: 'Use this when asking AI to make or review a front-end change in another project.',
    prompt: `Use docs/frontend-delivery-playbook.md as guidance for this front-end task.

Task:
[describe the change]

Relevant playbook patterns:
[name patterns, or ask AI to identify the most relevant ones]

Expected output:
- Explain which playbook patterns apply.
- Implement or suggest the change consistently with those patterns.
- Include accessibility, loading/error state, and review-quality considerations where relevant.
- Mark anything outside the playbook as a suggestion, not a standard.
- Keep the response generic and free from confidential project detail.

AI is a helper, not an authority. Final implementation quality requires technical review.`,
  },
  {
    id: 'review-check',
    title: 'Review support prompt',
    purpose: 'Use this before pull request review to catch repeated issues earlier.',
    prompt: `Review this front-end change against docs/frontend-delivery-playbook.md.

Focus on:
- Component responsibility and typed props.
- Keyboard navigation, labels, focus visibility, and colour contrast.
- Form validation, error summaries, and API error separation.
- Loading, empty, error, success, and retry states.
- Maintainability, test quality, and repeated review themes.

Return:
- Potential issues grouped by playbook pattern.
- Suggested fixes that are generic and reusable.
- Any repeated theme that could become a future playbook update.

Do not approve the change. Technical leads and accountable engineers remain responsible for validation and quality.`,
  },
]
