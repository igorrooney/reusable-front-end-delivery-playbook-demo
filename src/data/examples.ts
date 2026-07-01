import type { CodeExample } from '../types'

export const codeExamples: CodeExample[] = [
  {
    id: 'component-structure',
    title: 'Typed component boundary',
    pattern: 'Component structure',
    purpose: 'Shows a small component with a clear responsibility, typed props, and reusable rendering logic.',
    fileName: 'StatusMessage.tsx',
    code: `type StatusMessageProps = {
  title: string
  message: string
  tone?: 'info' | 'success' | 'warning'
}

const toneClassName = {
  info: 'statusMessage--info',
  success: 'statusMessage--success',
  warning: 'statusMessage--warning',
}

export function StatusMessage({
  title,
  message,
  tone = 'info',
}: StatusMessageProps) {
  return (
    <section className={toneClassName[tone]} aria-labelledby="status-message-title">
      <h2 id="status-message-title">{title}</h2>
      <p>{message}</p>
    </section>
  )
}`,
  },
  {
    id: 'loading-states',
    title: 'Loading, empty, error, success',
    pattern: 'API and loading states',
    purpose: 'Keeps the four main data states explicit so teams avoid unclear dead ends.',
    fileName: 'ResultsPanel.tsx',
    code: `type ResultsState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty' }
  | { status: 'success'; items: T[] }

type ResultsPanelProps<T> = {
  state: ResultsState<T>
  onRetry: () => void
  renderItem: (item: T) => React.ReactNode
}

export function ResultsPanel<T>({
  state,
  onRetry,
  renderItem,
}: ResultsPanelProps<T>) {
  if (state.status === 'loading') {
    return <p role="status">Loading results...</p>
  }

  if (state.status === 'error') {
    return (
      <section role="alert">
        <p>{state.message}</p>
        <button type="button" onClick={onRetry}>Try again</button>
      </section>
    )
  }

  if (state.status === 'empty') {
    return <p>No results match the current filters.</p>
  }

  return <ul>{state.items.map((item) => renderItem(item))}</ul>
}`,
  },
  {
    id: 'accessible-field-error',
    title: 'Accessible field error',
    pattern: 'Accessibility checks',
    purpose: 'Shows how labels, descriptions, invalid state, and error copy stay connected.',
    fileName: 'TextField.tsx',
    code: `type TextFieldProps = {
  id: string
  label: string
  value: string
  error?: string
  onChange: (value: string) => void
}

export function TextField({
  id,
  label,
  value,
  error,
  onChange,
}: TextFieldProps) {
  const errorId = error ? \`\${id}-error\` : undefined

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={errorId} role="alert">{error}</p>
      ) : null}
    </div>
  )
}`,
  },
]
