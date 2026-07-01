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
      `First-draft checklist for ${selected.name}:`,
      ...selected.checklist.map((item) => `- Confirm ${item.toLowerCase()}.`),
      '- Capture any repeated review feedback as a candidate playbook update.',
      '- Ask a technical lead to validate the final guidance before reuse.',
    ].join('\n')
  }

  if (action === 'related-patterns') {
    const related = suggestRelatedPatterns(selected, allPatterns)

    return [
      `Suggested related patterns for ${selected.name}:`,
      ...related.map(
        (pattern) =>
          `- ${pattern.name}: shares ${pattern.category.toLowerCase()} context or tags such as ${pattern.tags
            .slice(0, 2)
            .join(', ')}.`,
      ),
      '- Use these as discovery prompts, not as automatic recommendations.',
    ].join('\n')
  }

  return [
    'Repeated review themes identified from generic demo content:',
    '- Accessibility evidence is most useful when added before late-stage review.',
    '- Consistent state handling reduces repeated comments on loading, empty, and error flows.',
    '- Shared component structure helps reviewers focus on product risk instead of formatting preference.',
    '- Technical leads should decide which themes become approved playbook guidance.',
  ].join('\n')
}
