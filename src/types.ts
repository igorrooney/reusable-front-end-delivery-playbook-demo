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

export type AiAction =
  | 'checklist'
  | 'related-patterns'
  | 'review-themes'
