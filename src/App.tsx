import {
  BookOpen,
  Bot,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  ExternalLink,
  FileText,
  Gauge,
  Layers3,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { aiGuidancePrompts } from './data/aiGuidance'
import { categories, patterns } from './data/playbook'
import { playbookDocumentContent, playbookDocumentPath } from './data/playbookDocument'
import { generateAiResponse, suggestRelatedPatterns } from './lib/aiAssist'
import type { AiAction, AiGuidancePrompt, Pattern, PatternCategory } from './types'

type Theme = 'light' | 'dark'

const navItems = [
  { id: 'playbook', label: 'Playbook', icon: BookOpen },
  { id: 'ai-assist', label: 'AI Assist', icon: Bot },
  { id: 'ai-guidance', label: 'AI Guidance', icon: FileText },
  { id: 'governance', label: 'Governance', icon: ShieldCheck },
  { id: 'impact', label: 'Impact', icon: TrendingUp },
]

const impactMetrics = [
  { label: 'Faster onboarding', value: '30%', note: 'example reduction in ramp-up friction' },
  { label: 'Fewer repeated review comments', value: '24%', note: 'example decrease in recurring themes' },
  { label: 'Reduced rework', value: '18%', note: 'example improvement from earlier standards' },
  { label: 'Consistent accessible delivery', value: 'A11y', note: 'shared checks embedded in review' },
]

const governanceSteps = ['Review', 'Pilot', 'Feedback', 'Refine', 'Share']

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [selectedId, setSelectedId] = useState(patterns[0].id)
  const [aiAction, setAiAction] = useState<AiAction>('checklist')
  const [theme, setTheme] = useState<Theme>('light')
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null)
  const [playbookCopied, setPlaybookCopied] = useState(false)

  const selectedPattern = patterns.find((pattern) => pattern.id === selectedId) ?? patterns[0]

  const filteredPatterns = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase()

    return patterns.filter((pattern) => {
      const categoryMatches = category === 'All' || pattern.category === category
      const searchableText = [
        pattern.name,
        pattern.category,
        pattern.problem,
        pattern.guidance.join(' '),
        pattern.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase()

      return categoryMatches && (!normalisedQuery || searchableText.includes(normalisedQuery))
    })
  }, [category, query])

  const aiResponse = useMemo(
    () => generateAiResponse(aiAction, selectedPattern, patterns),
    [aiAction, selectedPattern],
  )

  const relatedPatterns = suggestRelatedPatterns(selectedPattern, patterns)
  const dark = theme === 'dark'

  const copyPrompt = async (prompt: AiGuidancePrompt) => {
    await navigator.clipboard.writeText(prompt.prompt)
    setCopiedPromptId(prompt.id)
    window.setTimeout(() => setCopiedPromptId(null), 1800)
  }

  const copyPlaybookDocument = async () => {
    await navigator.clipboard.writeText(playbookDocumentContent)
    setPlaybookCopied(true)
    window.setTimeout(() => setPlaybookCopied(false), 1800)
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-[#f5f7fb] text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto flex min-h-screen w-full max-w-[1560px] flex-col lg:flex-row">
          <aside className="border-b border-slate-200 bg-white/90 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
            <div className="flex items-center justify-between gap-4 lg:block">
              <div>
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-950">
                    <Layers3 size={21} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-5 text-slate-950 dark:text-white">CGI capability</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Reusable asset demo</p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTheme(dark ? 'light' : 'dark')}
                className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-teal-300 hover:text-teal-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                aria-label="Toggle dark mode"
              >
                {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
              </button>
            </div>

            <nav className="mt-5 grid grid-cols-2 gap-2 lg:mt-10 lg:grid-cols-1" aria-label="Primary navigation">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                  >
                    <Icon size={18} aria-hidden="true" />
                    {item.label}
                  </a>
                )
              })}
            </nav>

            <div className="mt-6 hidden rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm text-teal-950 dark:border-teal-900/70 dark:bg-teal-950/50 dark:text-teal-100 lg:block">
              <p className="font-semibold">Technical review remains accountable.</p>
              <p className="mt-2 leading-6 text-teal-900/80 dark:text-teal-100/80">
                Teams can point AI at the playbook for consistent suggestions, but CGI technical leads approve final quality.
              </p>
            </div>
          </aside>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
              <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr] xl:items-end">
                <div>
                  <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-4xl">
                    Reusable Front-End Delivery Playbook
                  </h1>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
                    A sanitised internal demo showing how delivery learning becomes reusable CGI capability for
                    front-end consistency, onboarding, accessibility, review quality, and delivery confidence.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <SummaryStat label="Patterns" value={patterns.length.toString()} />
                  <SummaryStat label="Approved" value={patterns.filter((item) => item.maturity === 'Approved').length.toString()} />
                  <SummaryStat label="Sections" value="5" />
                </div>
              </div>
            </section>

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
              <div className="space-y-6">
                <section id="playbook" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Searchable playbook</h2>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Find generic, reusable front-end guidance by name, problem, category, or tag.
                      </p>
                    </div>
                    <div className="relative w-full lg:max-w-md">
                      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
                      <input
                        id="pattern-search"
                        name="pattern-search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search patterns, tags, or review themes"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        type="search"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {categories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setCategory(item)}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                          category === item
                            ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-950'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3">
                    {filteredPatterns.map((pattern) => (
                      <PatternCard
                        key={pattern.id}
                        pattern={pattern}
                        selected={pattern.id === selectedPattern.id}
                        onSelect={() => setSelectedId(pattern.id)}
                      />
                    ))}
                    {filteredPatterns.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        No patterns match this search. Try a category such as accessibility, review, forms, or states.
                      </div>
                    ) : null}
                  </div>
                </section>

                <section id="ai-assist" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-200">
                      <Sparkles size={19} aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950 dark:text-white">AI assist</h2>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        Use the playbook as approved context for AI-assisted project work. AI can help draft changes
                        that follow the same patterns, but CGI technical leads remain responsible for validation and
                        quality. AI is a helper, not an authority.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    <AiButton active={aiAction === 'checklist'} onClick={() => setAiAction('checklist')} label="Draft a project checklist from this pattern" />
                    <AiButton active={aiAction === 'related-patterns'} onClick={() => setAiAction('related-patterns')} label="Find playbook guidance for a change" />
                    <AiButton active={aiAction === 'review-themes'} onClick={() => setAiAction('review-themes')} label="Capture review themes for the playbook" />
                  </div>

                  <pre className="mt-5 min-h-52 whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-950 p-5 text-sm leading-6 text-slate-100 shadow-inner dark:border-slate-700">
                    {aiResponse}
                  </pre>

                  <div className="mt-5 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 md:grid-cols-[auto_1fr]">
                    <div className="grid size-10 place-items-center rounded-lg bg-white text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700">
                      <FileText size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-950 dark:text-white">Portable AI guidance pack</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        The repo includes <span className="font-semibold">docs/frontend-delivery-playbook.md</span> and
                        <span className="font-semibold"> docs/AGENTS.example.md</span>. Copy them into another project so
                        AI has the playbook context before it suggests front-end changes.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="ai-guidance" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Copy-ready AI guidance</h2>
                      <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                        These prompts make the playbook portable into another project. They tell AI what the delivery
                        playbook is, how to use it, and where human technical review remains accountable.
                      </p>
                    </div>
                    <div className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-950 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-100">
                      Ready to copy into project instructions
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4">
                    <article className="overflow-hidden rounded-lg border border-teal-200 bg-teal-50 dark:border-teal-900/70 dark:bg-teal-950/40">
                      <div className="flex flex-col gap-4 border-b border-teal-200 bg-white p-4 dark:border-teal-900/70 dark:bg-slate-900 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-3">
                          <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-700 ring-1 ring-teal-200 dark:bg-teal-950 dark:text-teal-200 dark:ring-teal-800">
                            <FileText size={18} aria-hidden="true" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-slate-950 dark:text-white">Playbook source file</h3>
                            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                              Create this file in the target project at{' '}
                              <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-100">
                                {playbookDocumentPath}
                              </span>
                              , then point AI instructions at it.
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => void copyPlaybookDocument()}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-teal-200 bg-white px-3 py-2 text-sm font-semibold text-teal-800 shadow-sm transition hover:border-teal-400 dark:border-teal-800 dark:bg-slate-950 dark:text-teal-100"
                          >
                            {playbookCopied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                            {playbookCopied ? 'Copied file' : 'Copy file'}
                          </button>
                          <a
                            href="https://github.com/igorrooney/reusable-front-end-delivery-playbook-demo/blob/main/docs/frontend-delivery-playbook.md"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:text-violet-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                          >
                            <ExternalLink size={16} aria-hidden="true" />
                            Open file
                          </a>
                        </div>
                      </div>
                      <pre className="max-h-96 overflow-auto whitespace-pre-wrap p-4 text-sm leading-6 text-slate-700 dark:text-slate-200">
                        {playbookDocumentContent}
                      </pre>
                    </article>

                    {aiGuidancePrompts.map((prompt) => (
                      <PromptCard
                        key={prompt.id}
                        prompt={prompt}
                        copied={copiedPromptId === prompt.id}
                        onCopy={() => void copyPrompt(prompt)}
                      />
                    ))}
                  </div>
                </section>

                <section id="governance" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-teal-600 dark:text-teal-300" size={24} aria-hidden="true" />
                    <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Governance and reuse controls</h2>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {[
                      'No client IP or confidential details are reused.',
                      'Patterns are sanitised and generic before sharing.',
                      'Content is reviewed before reuse by accountable technical leads.',
                      'Version control and review process keep the playbook current.',
                    ].map((item) => (
                      <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-300" size={18} aria-hidden="true" />
                        <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {governanceSteps.map((step, index) => (
                      <div key={step} className="flex items-center gap-2">
                        <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                          {step}
                        </span>
                        {index < governanceSteps.length - 1 ? <span className="text-slate-300 dark:text-slate-700">/</span> : null}
                      </div>
                    ))}
                  </div>
                </section>

                <section id="impact" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                  <div className="flex items-center gap-3">
                    <Gauge className="text-violet-600 dark:text-violet-300" size={24} aria-hidden="true" />
                    <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Impact signals</h2>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {impactMetrics.map((metric) => (
                      <div key={metric.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                        <p className="text-2xl font-semibold text-slate-950 dark:text-white">{metric.value}</p>
                        <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">{metric.label}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{metric.note}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <PatternDetail pattern={selectedPattern} relatedPatterns={relatedPatterns} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-950">
      <p className="text-2xl font-semibold text-slate-950 dark:text-white">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  )
}

function PatternCard({
  pattern,
  selected,
  onSelect,
}: {
  pattern: Pattern
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-lg border p-4 text-left transition ${
        selected
          ? 'border-teal-300 bg-teal-50 shadow-sm dark:border-teal-700 dark:bg-teal-950/40'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700'
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-slate-950 dark:text-white">{pattern.name}</span>
            <CategoryPill category={pattern.category} />
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">{pattern.problem}</p>
        </div>
        <span className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {pattern.maturity}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {pattern.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-md bg-white px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-700">
            {tag}
          </span>
        ))}
      </div>
    </button>
  )
}

function CategoryPill({ category }: { category: PatternCategory }) {
  const styles: Record<PatternCategory, string> = {
    Architecture: 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700',
    Quality: 'bg-teal-50 text-teal-700 ring-teal-200 dark:bg-teal-950 dark:text-teal-200 dark:ring-teal-800',
    Delivery: 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:ring-sky-800',
    Review: 'bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950 dark:text-violet-200 dark:ring-violet-800',
  }

  return (
    <span className={`rounded-md px-2 py-1 text-xs font-semibold ring-1 ${styles[category]}`}>
      {category}
    </span>
  )
}

function AiButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${
        active
          ? 'border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-700 dark:bg-violet-950 dark:text-violet-100'
          : 'border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:text-violet-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
      }`}
    >
      {label}
    </button>
  )
}

function PromptCard({
  prompt,
  copied,
  onCopy,
}: {
  prompt: AiGuidancePrompt
  copied: boolean
  onCopy: () => void
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-950 dark:text-white">{prompt.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{prompt.purpose}</p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:text-violet-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-violet-600"
        >
          {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
      </div>
      <pre className="max-h-72 overflow-auto whitespace-pre-wrap p-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
        {prompt.prompt}
      </pre>
    </article>
  )
}

function PatternDetail({
  pattern,
  relatedPatterns,
}: {
  pattern: Pattern
  relatedPatterns: Pattern[]
}) {
  return (
    <aside className="xl:sticky xl:top-8 xl:self-start" aria-label="Selected pattern detail">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CategoryPill category={pattern.category} />
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-950 dark:text-white">{pattern.name}</h2>
          </div>
          <ClipboardCheck className="shrink-0 text-teal-600 dark:text-teal-300" size={24} aria-hidden="true" />
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <DetailDatum label="Maturity" value={pattern.maturity} />
          <DetailDatum label="Updated" value={pattern.updated} />
          <DetailDatum label="Owner" value={pattern.owner} wide />
        </dl>

        <div className="mt-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">Problem</h3>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{pattern.problem}</p>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">Guidance</h3>
          <ul className="mt-3 space-y-2">
            {pattern.guidance.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="mt-1 shrink-0 text-teal-600 dark:text-teal-300" size={16} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">Review checklist</h3>
          <div className="mt-3 grid gap-2">
            {pattern.checklist.map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input className="size-4 accent-teal-600" type="checkbox" readOnly checked />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">Related patterns</h3>
          <div className="mt-3 space-y-2">
            {relatedPatterns.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.name}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-lg border border-teal-200 bg-teal-50 p-4 dark:border-teal-900/70 dark:bg-teal-950/40">
          <Users className="mt-0.5 shrink-0 text-teal-700 dark:text-teal-200" size={18} aria-hidden="true" />
          <p className="text-sm leading-6 text-teal-950 dark:text-teal-100">
            Technical leads approve final guidance. AI can use the playbook as context, but output remains draft project
            support and must be reviewed before reuse.
          </p>
        </div>
      </div>
    </aside>
  )
}

function DetailDatum({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950 ${wide ? 'col-span-2' : ''}`}>
      <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{value}</dd>
    </div>
  )
}

export default App
