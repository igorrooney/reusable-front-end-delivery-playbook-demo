# Front-End Delivery Playbook

Use this file as reusable AI guidance for front-end delivery work in another project.

The playbook is generic and sanitised. It must not contain client names, client IP, confidential implementation detail, or assignment-specific code. AI may use this guidance to draft, review, or explain changes, but technical leads and accountable engineers remain responsible for final quality.

## How AI Should Use This Playbook

When working on front-end code, AI should:

- Read this playbook before suggesting implementation changes.
- Apply the relevant pattern guidance and checklist to the task.
- Keep suggestions consistent with the playbook unless a clear project constraint requires a different approach.
- Mark anything outside the playbook as a suggestion, not a standard.
- Avoid client-specific or confidential detail in reusable guidance.
- Treat all output as draft support for human technical review.

## Prompt Template

```text
Use docs/frontend-delivery-playbook.md as guidance for this front-end task.

Task:
[describe the task]

Relevant patterns:
[name the patterns, or ask AI to identify them]

Rules:
- Apply the playbook consistently.
- Do not invent new standards unless clearly marked as a suggestion.
- Do not include client names, client IP, or confidential implementation details.
- AI is a helper, not an authority.
- Final decisions require technical review.
```

## Patterns

### Component Structure

Problem: Different developers structure components differently, making review harder and increasing duplication.

Guidance:

- Keep component responsibility clear and visible from the file boundary.
- Separate types, tests, and styles when the component starts carrying more than one concern.
- Prefer composition over inheritance or large configuration objects.
- Shape reusable patterns around product behaviour, not one assignment-specific implementation.

Checklist:

- Clear responsibility
- Typed props
- Reusable pattern
- Testability

### Accessibility Checks

Problem: Accessibility issues are often found late.

Guidance:

- Verify keyboard navigation and visible focus before handover.
- Use labels, semantic HTML, and useful error announcements.
- Avoid relying on colour alone to communicate status or meaning.
- Treat accessibility checks as part of delivery quality, not a late test phase.

Checklist:

- Keyboard support
- Labels
- Errors
- Colour contrast
- Focus visibility

### Form Validation And Error Handling

Problem: Repeated debate around validation leads to inconsistent UX and slower delivery.

Guidance:

- Validate early enough to help the user recover without interrupting completion.
- Use a consistent error summary for multi-field forms.
- Separate field validation from service and API errors.
- Write accessible messages that explain what happened and what to do next.

Checklist:

- Validation rules clear
- Error summary understandable
- API errors separate
- Accessible messages

### API And Loading States

Problem: Loading, empty, and error states are implemented inconsistently.

Guidance:

- Define loading, empty, error, and success states before implementation starts.
- Make the retry path obvious when the user can recover.
- Avoid unclear dead ends when data is missing or a request fails.
- Keep state copy plain, useful, and consistent with the product tone.

Checklist:

- Loading state
- Empty state
- Error state
- Retry path
- User clarity

### Front-End Review Quality

Problem: Review feedback becomes repetitive without shared standards.

Guidance:

- Review for clarity, accessibility, consistency, and maintainability.
- Use shared criteria to separate preference from product risk.
- Capture repeated issues as candidates for future playbook guidance.
- Keep final judgement with technical leads and accountable engineers.

Checklist:

- Pattern consistency
- Accessibility
- Performance
- Maintainability
- Test quality

### Handover Readiness

Problem: Teams sometimes finish implementation before evidence, tests, and decisions are easy to review.

Guidance:

- Keep acceptance evidence close to the work item.
- Document reusable decisions in generic language before sharing.
- Make known trade-offs visible to reviewers and future teams.
- Confirm no client IP, client names, or confidential detail is reused.

Checklist:

- Evidence linked
- Reusable decisions captured
- Trade-offs visible
- Sanitised content

## Review Loop

When repeated feedback appears across projects:

- Summarise the repeated theme in generic language.
- Remove client-specific detail.
- Propose a playbook update.
- Review the update with technical leads.
- Pilot the guidance before marking it as approved.
