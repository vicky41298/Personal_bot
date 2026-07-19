export interface NavItem {
  label: string
  href: string
  primary?: boolean
  route?: boolean
}

export interface Stat {
  value: string
  label: string
}

export interface PipelineStep {
  id: string
  label: string
  status?: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  points?: string[]
}

export interface Topic {
  id: string
  title: string
  description: string
  icon: string
}

export interface ContactLink {
  label: string
  href: string
  icon: string
}

export interface Profile {
  name: string
  fullName: string
  role: string
  specialty: string
  company: string
  meta: {
    siteTitle: string
    description: string
  }
  nav: NavItem[]
  hero: {
    eyebrow: string
    lines: string[]
    highlight: string
    subhead: string
    intro: string
    ctas: {
      explore: string
      askAi: string
    }
  }
  about: {
    heading: string
    summary: string
    stats: Stat[]
  }
  mission: {
    heading: string
    title: string
    description: string
    pipeline: PipelineStep[]
  }
  projects: {
    heading: string
    subheading: string
    items: Project[]
  }
  excites: {
    heading: string
    subheading: string
    topics: Topic[]
  }
  vision: {
    heading: string
    content: string
    emphasis: string
  }
  contact: {
    heading: string
    links: ContactLink[]
  }
  ai: {
    heading: string
    subtitle: string
    placeholder: string
    exploreLabel: string
    exploreCta: string
    suggestedQuestions: string[]
  }
}

export interface AiResponse {
  id: string
  triggers: string[]
  answer: string
}

export interface AiKnowledge {
  persona: {
    name: string
    tone: string
    greeting: string
  }
  fallback: string
  responses: AiResponse[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}
