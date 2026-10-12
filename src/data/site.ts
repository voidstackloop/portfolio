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

// A flow is one path through the system. `steps` renders as a numbered path; `chips`
// renders as a left-to-right pipeline, for stages that are short labels.
export type Flow = { title: string; kind?: 'steps' | 'chips'; steps: string[]; note?: string }
export type Decision = { title: string; body: string }

export type Project = {
  slug: string
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
  flows: Flow[]
  decisions: Decision[]
}

export const projects: Project[] = [
  {
    slug: 'escld',
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
    flows: [
      {
        title: 'Posting a video',
        steps: [
          'The browser uploads straight to S3 with a presigned URL.',
          'The backend saves the post as PROCESSING and queues a transcode job.',
          'An ffmpeg worker turns it into HLS and uploads it.',
          'The post flips to READY; after 3 failed attempts the job goes to a dead-letter queue.',
        ],
      },
      {
        title: 'Going live',
        steps: [
          'The backend mints a stream key and announces the stream with a title.',
          'OBS publishes over RTMP to the Rust server.',
          'The server checks the key against Postgres and pipes the stream into ffmpeg as HLS.',
          'Segments are synced to S3 and served by CloudFront.',
        ],
      },
      {
        title: 'Analytics without lost events',
        steps: [
          'The business write and an outbox row commit in one Postgres transaction.',
          'A leased relay publishes outbox rows to Kafka and retries with the same event ID.',
          'A sink loads the events into BigQuery.',
        ],
      },
    ],
    decisions: [
      {
        title: 'Split by state, not by feature',
        body: 'The API, workers and analytics are stateless and scale by adding replicas. The SFU keeps each call room in one process, and clients reach it on a fixed UDP port range, so it runs on one EC2 instance with an Elastic IP. It scales up first, with metrics to show when that stops being enough.',
      },
      {
        title: 'Slow work never blocks a request',
        body: 'Transcoding, embeddings, search indexing and feed fan-out run off queues and pub/sub. A failure in any of them never fails the user’s post.',
      },
      {
        title: 'Authenticate with what the protocol has',
        body: 'RTMP has no login step, so the stream key is the credential: a rotating UUID checked against Postgres. A valid key is still refused unless the user has announced a stream, so nothing goes live without a title.',
      },
      {
        title: 'Know the limits and write them down',
        body: 'True low-latency HLS needs partial segments that ffmpeg’s HLS muxer does not offer, and a CDN that can hold playlist requests open, which S3 and CloudFront cannot. So latency is squeezed with 1 s segments, 100 ms upload polling and a 1 s CDN cache, and the docs say what is not built.',
      },
    ],
  },
  {
    slug: 'formwatch',
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
    flows: [
      {
        title: 'One run',
        kind: 'chips',
        steps: [
          'forms.yml or a URL',
          'Sharded across Chrome sessions, rate-limited per host',
          '13 checks per form',
          'Diff against the last run',
          'HTML, JUnit, SARIF, metrics, webhook',
        ],
        note: 'Each check returns Pass, Warn or Fail, and every non-pass keeps a screenshot as evidence.',
      },
    ],
    decisions: [
      {
        title: 'Chrome DevTools Protocol, not WebDriver',
        body: 'WebDriver needs a separate driver binary on the PATH. Driving Chrome directly through an async Rust client keeps it one binary to install and lets many forms run at once. The options are compared in a written ADR.',
      },
      {
        title: 'Reuse axe-core, do not rewrite WCAG',
        body: 'Accessibility rules are a large, easy-to-get-subtly-wrong surface. Injecting axe-core means the rules stay current by updating one file, and formwatch’s own code stays orchestration.',
      },
      {
        title: 'Only new problems fail the build',
        body: 'Accepted findings are stored as a baseline, so a CI run fails on new or worse findings instead of on every known issue. History also separates real regressions from flaky checks.',
      },
      {
        title: 'Safe against real sites by default',
        body: 'It never submits a real form unless you pass an explicit flag and accept the terms, paces requests per host, and writes an audit log.',
      },
    ],
  },
  {
    slug: 'buffdata',
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
    flows: [
      {
        title: 'Seven stages, in order',
        kind: 'chips',
        steps: ['validate', 'PII scrub', 'profile', 'dedup', 'score and refine', 'filter', 'classify'],
        note: 'Every dropped row lands in a rejected file with a reason. Each stage checkpoints, so an interrupted run resumes at the next stage instead of row zero.',
      },
    ],
    decisions: [
      {
        title: 'Prove the gain before publishing',
        body: 'A PyTorch proxy classifier checks that a candidate dataset actually improves accuracy before it is published, so the claim is measured and not assumed.',
      },
      {
        title: 'A strict accuracy contract',
        body: 'In strict mode every valid labeled row survives with byte-identical text and labels, and the benchmark numbers are measured under that contract.',
      },
      {
        title: 'One LLM contract, a network kill switch',
        body: 'Every stage calls the same small set of methods whether the provider is Gemini, OpenAI, Anthropic, Azure, Bedrock or a local server. A strict network policy swaps in a client that raises on every call, so a stage that needs the network fails loudly instead of quietly reaching out.',
      },
      {
        title: 'Rust only where it earns its place',
        body: 'A small Rust binary replaces the worker process for managed runs: it claims runs, applies per-project secrets, and supervises the executor with heartbeat, deadline and process-group kill. The optimization logic stays in Python.',
      },
    ],
  },
  {
    slug: 'modelforge',
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
    flows: [
      {
        title: 'Process model',
        kind: 'chips',
        steps: [
          'React UI, no Node access',
          'Typed preload bridge',
          'Electron main process',
          'Models, files, shell, MCP servers, Rust addon',
        ],
        note: 'Every capability the UI has exists because a specific IPC channel was added on purpose. There is no generic escape hatch.',
      },
    ],
    decisions: [
      {
        title: 'The UI can only ask',
        body: 'Context isolation is on and Node integration is off. Every provider call goes through the main process, so API keys never reach the UI and the content security policy can block its network access outright.',
      },
      {
        title: 'Safety that does not depend on the model',
        body: 'A system prompt asks for hedged, structured answers, but a prompt is not a guarantee. So the emergency red-flag check scans the user’s own message in code before any model call.',
      },
      {
        title: 'Approve every action, and sandbox the shell',
        body: 'Agent tool calls are confined to a workspace folder and need per-call approval. Shell commands run in bubblewrap or sandbox-exec where available, and destructive patterns are rejected even if approved.',
      },
      {
        title: 'Rust where file I/O hurts',
        body: 'A napi-rs addon does atomic JSON writes and the SHA-256 hashing behind the audit chain, and appends a log entry without rewriting the whole file. It falls back to plain TypeScript when the addon is not built.',
      },
    ],
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
