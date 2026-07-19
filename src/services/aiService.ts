import knowledge from '@/data/knowledge.json'
import profileData from '@/data/profile.json'
import type { AiKnowledge } from '@/types'

/**
 * AI service layer
 * -----------------
 * Today: local mock knowledge + simulated streaming.
 * Tomorrow: point `askAssistant` at FastAPI / Azure OpenAI / OpenAI.
 *
 * Set VITE_AI_API_URL to enable the remote path without changing UI code.
 */

export interface AskOptions {
  signal?: AbortSignal
  onToken?: (token: string) => void
}

const API_URL = import.meta.env.VITE_AI_API_URL as string | undefined

function matchResponse(query: string, kb: AiKnowledge): string {
  const normalized = query.toLowerCase().trim()
  let best: { score: number; answer: string } | null = null

  for (const entry of kb.responses) {
    let score = 0
    for (const trigger of entry.triggers) {
      const regex = new RegExp(`\\b${trigger.toLowerCase()}\\b`, 'i')
      if (regex.test(normalized)) {
        score += trigger.length
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: entry.answer }
    }
  }

  return best?.answer ?? kb.fallback
}

function tokenize(text: string): string[] {
  return text.split(/(\s+)/).filter(Boolean)
}

async function streamText(
  text: string,
  onToken?: (token: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const tokens = tokenize(text)
  let full = ''

  for (const token of tokens) {
    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError')
    }
    full += token
    onToken?.(token)
    const delay = token.trim().length === 0 ? 10 : 16 + Math.random() * 22
    await new Promise((r) => setTimeout(r, delay))
  }

  return full
}

/** Remote adapter — expects `{ answer: string }` or streaming SSE later. */
async function askRemote(
  question: string,
  options: AskOptions,
): Promise<string> {
  const res = await fetch(API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
    signal: options.signal,
  })

  if (!res.ok) {
    throw new Error(`AI API error: ${res.status}`)
  }

  const data = (await res.json()) as { answer?: string; content?: string }
  const answer = data.answer ?? data.content ?? ''
  return streamText(answer, options.onToken, options.signal)
}

async function askMock(
  question: string,
  options: AskOptions,
): Promise<string> {
  const profile = profileData as any
  const kb = JSON.parse(JSON.stringify(knowledge)) as AiKnowledge
  
  // Dynamically build answers from profile data, relying only on section data
  for (const entry of kb.responses) {
    if (entry.id === 'working-on') {
      const projectsText = profile.projects.items.map((p: any) => `- **${p.title}**: ${p.description}`).join('\n')
      entry.answer = `**${profile.projects.heading}**\n${profile.projects.subheading}\n\n${projectsText}`
    } else if (entry.id === 'career') {
      const roles = profile.experience.roles.map((r: any) => `- **${r.company}** — ${r.title}`).join('\n')
      const exp = profile.about.stats.find((s: any) => s.label.includes('Experience'))?.value || ''
      entry.answer = `**${profile.experience.heading}**\n\n${roles}\n\nOverall Experience: ${exp}`
    } else if (entry.id === 'technologies') {
      const techs = Array.from(new Set(profile.projects.items.flatMap((p: any) => p.technologies))).join(', ')
      entry.answer = `**Technologies & Tools**\n\n${techs}`
    } else if (entry.id === 'goals') {
      entry.answer = `**${profile.vision.heading}**\n\n${profile.vision.content}\n\n*${profile.vision.emphasis}*`
    } else if (entry.id === 'about') {
      entry.answer = `**${profile.fullName}**\n${profile.role} @ ${profile.company}\n\n${profile.about.summary}`
    } else if (entry.id === 'excites') {
      const topics = profile.excites.topics.map((t: any) => `- **${t.title}** — ${t.description}`).join('\n')
      entry.answer = `**${profile.excites.heading}**\n${profile.excites.subheading}\n\n${topics}`
    } else if (entry.id === 'agents' || entry.id === 'rag') {
      // General topics fallback to mapping the exact exciting topics
      const topic = profile.excites.topics.find((t: any) => t.id === entry.id || t.title.toLowerCase().includes(entry.id))
      if (topic) {
        entry.answer = `**${topic.title}**\n${topic.description}`
      } else {
        entry.answer = profile.about.summary
      }
    }
  }

  await new Promise((r) => setTimeout(r, 280 + Math.random() * 320))

  if (options.signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError')
  }

  return streamText(
    matchResponse(question, kb),
    options.onToken,
    options.signal,
  )
}

/** Public API used by the chat UI. */
export async function askAssistant(
  question: string,
  options: AskOptions = {},
): Promise<string> {
  if (API_URL) {
    return askRemote(question, options)
  }
  return askMock(question, options)
}

export function getGreeting(): string {
  return (knowledge as AiKnowledge).persona.greeting
}
