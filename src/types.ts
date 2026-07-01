export type PatternCategory = 'Architecture' | 'Quality' | 'Delivery' | 'Review'

export type Pattern = {
  id: string
  name: string
  category: PatternCategory
  problem: string
  guidance: string[]
  checklist: string[]
  tags: string[]
  maturity: 'Draft' | 'Pilot' | 'Approved'
  owner: string
  updated: string
  impact: string
}

export type AiGuidancePrompt = {
  id: string
  title: string
  purpose: string
  prompt: string
}

export type CodeExample = {
  id: string
  title: string
  pattern: string
  purpose: string
  fileName: string
  code: string
}
