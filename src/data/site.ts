// All page copy lives here. Every claim matches the public repos; keep it that way.
// escld was designed and tested locally and never deployed: never describe it as "in production".

export const profile = {
  name: 'Salih',
  handle: 'voidstackloop',
  kicker: 'Self-taught software engineer',
  role: 'Backend and systems engineer',
  summary:
    'I build complete, documented, tested software in Rust, Java and Python, and I measure the results.',
  email: 'salihyilboga98@gmail.com',
  github: 'https://github.com/voidstackloop',
  githubLabel: 'github.com/voidstackloop',
  availability: 'Open to remote backend roles',
}

export type Stat = { value: string; label: string }
export type Bar = { label: string; value: number; display: string }
export type Service = { name: string; detail: string; lang: 'rust' | 'java' | 'ts' }

export type Project = {
  slug: string
  layout: 'feature' | 'card'
  name: string
  kicker: string
  repo: string
  summary: string
  highlights: string[]
  stats?: Stat[]
  tags: string[]
  note?: string
  services?: Service[]
  chart?: { title: string; caption: string; unit: string; bars: Bar[]; lowerIsBetter?: boolean }
}

export const projects: Project[] = [
  {
    slug: 'escld',
    layout: 'feature',
    name: 'escld',
    kicker: 'Distributed system · 8 services',
    repo: 'https://github.com/voidstackloop/escld',
    summary:
      'A social media platform with posts, follows and moderation, plus real-time chat, WebRTC video calls and live streaming.',
    highlights: [
      'RTMP live-streaming server written from scratch in Rust: handshake, chunk streams, AMF0 and AMF3, then HLS through S3 and CloudFront at about 2 to 4 seconds of latency.',
      'WebRTC group calls on a Rust SFU with screen share, in-call chat and moderator-only recording.',
      'Spring Boot API with a ranked feed, Redis-backed rate limiting and a transactional outbox to Kafka.',
      'Queue-driven workers for video transcoding and feed fan-out, autoscaled on queue depth.',
    ],
    stats: [
      { value: '8', label: 'services' },
      { value: '20', label: 'AWS CDK stacks' },
      { value: '44.8k', label: 'lines of code' },
    ],
    note: 'Designed and tested locally: runs end to end with one `docker compose up`. The AWS infrastructure is written in CDK and checked with `cdk synth` and unit tests.',
    tags: ['Rust', 'Java 25', 'Spring Boot 4', 'React 19', 'TypeScript', 'AWS CDK'],
    services: [
      { name: 'frontend', detail: 'React SPA', lang: 'ts' },
      { name: 'backend', detail: 'Spring Boot REST API', lang: 'java' },
      { name: 'ws-sfu', detail: 'WebRTC SFU + chat', lang: 'rust' },
      { name: 'rtmp', detail: 'Stream ingest → HLS', lang: 'rust' },
      { name: 'worker', detail: 'ffmpeg transcoding', lang: 'ts' },
      { name: 'feed-worker', detail: 'Fan-out + search index', lang: 'ts' },
      { name: 'analytics', detail: 'Trending via Redis', lang: 'ts' },
      { name: 'infra', detail: 'AWS CDK, 20 stacks', lang: 'ts' },
    ],
  },
  {
    slug: 'formwatch',
    layout: 'card',
    name: 'formwatch',
    kicker: 'Rust CLI · v0.1.0',
    repo: 'https://github.com/voidstackloop/formwatch',
    summary:
      'Tests public-service forms (permits, benefits, licenses) for broken submissions, accessibility failures, bad mobile layouts and lost input.',
    highlights: [
      'Runs 13 checks per form in headless Chrome, including axe-core.',
      'Walks multi-step wizards; never submits unless you opt in.',
      'HTML reports, a GitHub Action, Docker image and Prometheus metrics.',
      'Released binaries for Linux, macOS and Windows.',
    ],
    chart: {
      title: '35 forms · median seconds',
      caption: 'Benchmark: 35 forms, median run time by worker count',
      unit: 's',
      lowerIsBetter: true,
      bars: [
        { label: '1 worker', value: 47.85, display: '47.85 s' },
        { label: '4 workers', value: 13.43, display: '13.43 s' },
        { label: '8 workers', value: 8.14, display: '8.14 s' },
      ],
    },
    tags: ['Rust 2024', 'Chrome DevTools', 'axe-core', 'GitHub Actions'],
  },
  {
    slug: 'buffdata',
    layout: 'card',
    name: 'buffdata',
    kicker: 'ML data pipeline · Python + Rust',
    repo: 'https://github.com/voidstackloop/buffdata',
    summary:
      'Cleans AI training data before you train on it. It validates and deduplicates text datasets, then proves the result with reproducible PyTorch benchmarks on real Hugging Face data.',
    highlights: [
      'Recovered an average of 8.14 accuracy points across 5 datasets at 10k, 25k and 50k rows.',
      'Stayed within 0.10 points on data that was already clean, so it does no harm.',
      'Cut training time by about 49% by removing invalid and duplicate rows.',
      'Managed runs with snapshots, history, resume, and a team dashboard with OIDC login.',
    ],
    stats: [
      { value: '+8.14', label: 'avg points recovered' },
      { value: '−49%', label: 'training time' },
    ],
    chart: {
      title: 'Accuracy recovered · points',
      caption: 'Accuracy recovered per dataset, average of 10k, 25k and 50k rows',
      unit: 'pts',
      bars: [
        { label: 'dbpedia', value: 10.29, display: '+10.29' },
        { label: 'yahoo', value: 9.01, display: '+9.01' },
        { label: 'ag_news', value: 8.54, display: '+8.54' },
        { label: 'yelp', value: 6.59, display: '+6.59' },
        { label: 'amazon', value: 6.26, display: '+6.26' },
      ],
    },
    tags: ['Python', 'Rust worker', 'PyTorch', 'PostgreSQL', 'Terraform', 'Helm'],
  },
  {
    slug: 'modelforge',
    layout: 'feature',
    name: 'ModelForge',
    kicker: 'Desktop app · Electron, TypeScript + Rust',
    repo: 'https://github.com/voidstackloop/modelforge',
    summary:
      'A cross-platform desktop app that puts local and cloud AI models in one interface, now scoped as a clinical decision-support and documentation workspace.',
    highlights: [
      'Runs local models through llama.cpp and vLLM beside OpenAI, Anthropic and Gemini, with streaming chat.',
      'Agent mode lets a model read and write files and run commands in a folder you choose; every action needs your approval, and commands run in an OS sandbox where one exists.',
      'MCP client rebuilt on the official SDK, with JSON Schema validation, OAuth 2.1 with PKCE and per-tool trust.',
      'Optional AES-256-GCM encryption at rest, a hash-chained audit log, and an emergency red-flag check that runs before any model call.',
    ],
    stats: [
      { value: '44k', label: 'lines of TypeScript' },
      { value: '4.4k', label: 'lines of Rust' },
      { value: '197', label: 'test files' },
    ],
    note: 'Not a certified medical product. The repo documents it as for research and clinician-supervised evaluation only, and lists what still needs licensed data and clinical validation.',
    tags: ['Electron', 'React', 'TypeScript', 'Rust (napi-rs)', 'llama.cpp', 'vLLM', 'MCP'],
    chart: {
      title: '5,000 audit-log writes · seconds',
      caption: 'Time for 5,000 audit-log writes, TypeScript only versus with the Rust addon',
      unit: 's',
      lowerIsBetter: true,
      bars: [
        { label: 'TypeScript', value: 20, display: '~20 s' },
        { label: 'Rust addon', value: 0.3, display: '~0.3 s' },
      ],
    },
  },
]

export const principles = [
  {
    title: 'Ship the whole thing',
    body: 'I aim for software a stranger can install and run: clear READMEs, install steps, tests and releases.',
  },
  {
    title: 'Measure, then claim',
    body: 'The benchmark numbers on this page come from scripts in the repos, so anyone can rerun them.',
  },
  {
    title: 'Write down the why',
    body: 'Design trade-offs and known limits are documented next to the code, not left to guesswork.',
  },
]

export const stack = [
  { group: 'Languages', items: ['Rust', 'Java', 'Python', 'TypeScript', 'SQL'] },
  {
    group: 'Backend & data',
    items: ['tokio', 'Spring Boot', 'WebRTC', 'Kafka', 'PostgreSQL', 'DynamoDB', 'Elasticsearch', 'Redis'],
  },
  { group: 'Cloud & tooling', items: ['AWS', 'CDK', 'Docker', 'GitHub Actions', 'Prometheus', 'Grafana'] },
]
