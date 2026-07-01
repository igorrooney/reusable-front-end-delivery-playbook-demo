import type { AiAction, Pattern } from '../types'

export function suggestRelatedPatterns(selected: Pattern, allPatterns: Pattern[]) {
  return allPatterns
    .filter((pattern) => pattern.id !== selected.id)
    .map((pattern) => {
      const sharedTags = pattern.tags.filter((tag) => selected.tags.includes(tag))
      const categoryMatch = pattern.category === selected.category ? 1 : 0
      return { pattern, score: sharedTags.length + categoryMatch }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ pattern }) => pattern)
}

export function generateAiResponse(
  action: AiAction,
  selected: Pattern,
  allPatterns: Pattern[],
) {
  if (action === 'checklist') {
    return [
      `Project checklist drafted from the playbook pattern: ${selected.name}`,
      ...selected.checklist.map((item) => `- Align the change with playbook check: ${item.toLowerCase()}.`),
      '- Ask the AI helper to reference this pattern when drafting code, tests, or review notes.',
      '- Capture any repeated project feedback as a candidate playbook update.',
      '- Ask a technical lead to validate the final implementation and guidance before reuse.',
    ].join('\n')
  }

  if (action === 'related-patterns') {
    const related = suggestRelatedPatterns(selected, allPatterns)

    return [
      `Playbook guidance to reference for a project change related to ${selected.name}:`,
      ...related.map(
        (pattern) =>
          `- ${pattern.name}: ask the AI helper to keep suggestions consistent with this ${pattern.category.toLowerCase()} pattern and tags such as ${pattern.tags
            .slice(0, 2)
            .join(', ')}.`,
      ),
      '- Use these patterns as context for consistency, not as automatic approval.',
    ].join('\n')
  }

  return [
    'Review themes to feed back into the playbook:',
    '- If AI-assisted changes miss accessibility evidence, strengthen the accessibility pattern prompt.',
    '- If loading, empty, or error states vary by team, point AI at the API and loading states pattern.',
    '- If structure debates repeat in review, reference the component structure pattern before coding starts.',
    '- Technical leads decide which themes become approved playbook guidance.',
  ].join('\n')
}
