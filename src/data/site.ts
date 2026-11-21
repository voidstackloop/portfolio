// All page copy lives here. Every claim matches the public repos; keep it that way.
// Only list public repos: a private repo's "View repo" link is a 404 for visitors.

export const profile = {
  name: 'Salih',
  handle: 'voidstackloop',
  kicker: 'Self-taught software engineer',
  role: 'ML backend engineer',
  summary:
    'I build the systems that serve, train and test models, in Rust and Python, and I measure the results.',
  email: 'salihyilboga98@gmail.com',
  github: 'https://github.com/voidstackloop',
  githubLabel: 'github.com/voidstackloop',
  availability: 'Open to remote ML backend roles',
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
    slug: 'oxideon',
    name: 'Oxideon',
    kicker: 'Deep learning library · Rust + Python · v0.0.1',
    repo: 'https://github.com/voidstackloop/oxideon',
    summary:
      'A tensor and deep learning library with a Rust core and a PyTorch-style Python API: autograd, neural network layers, optimizers, and CPU, wgpu and CUDA backends, written from the ground up.',
    highlights: [
      'Multi-dtype tensors (f32 to fp8, complex, int, bool) with zero-copy strided views and higher-order autograd for Jacobians and Hessians.',
      'Hand-written AVX2 GEMM on CPU, plus GPU kernels through wgpu (Vulkan, DX12, Metal) and PTX loaded straight into the NVIDIA driver.',
      'An SSA graph compiler that fuses operators and emits WGSL or PTX.',
      'LLM building blocks: paged KV cache, FlashAttention-2, speculative decoding, GGUF and 4-bit or 1.58-bit quantization, LoRA and DoRA, DPO and ORPO.',
      'One abi3 wheel for Python 3.9 to 3.13, zero-copy with NumPy and PyTorch through DLPack.',
    ],
    stats: [
      { value: '2.9x', label: 'faster AdamW step than PyTorch' },
      { value: '1.69 TFLOP/s', label: 'CUDA matmul, laptop RTX 4060' },
    ],
    note: 'Early release (v0.0.1). The PyTorch comparison is published in full, including conv2d and MLP training, where Oxideon is still slower.',
    tags: ['Rust 2024', 'Python', 'PyO3', 'CUDA PTX', 'wgpu', 'AVX2', 'SafeTensors', 'ONNX'],
    chart: {
      title: 'Time vs PyTorch CPU · lower is faster',
      caption:
        'Oxideon run time as a multiple of PyTorch 2.15 on the same CPU, from benchmarks/bench_vs_pytorch.py. Below 1x is faster than PyTorch.',
      unit: 'x',
      lowerIsBetter: true,
      bars: [
        { label: 'AdamW 10M', value: 0.34, display: '0.34x' },
        { label: 'sigmoid', value: 0.55, display: '0.55x' },
        { label: 'softmax', value: 0.81, display: '0.81x' },
        { label: 'layer_norm', value: 0.86, display: '0.86x' },
        { label: 'matmul 2k', value: 1.03, display: '1.03x' },
        { label: 'MLP train', value: 1.56, display: '1.56x' },
        { label: 'conv2d', value: 2.73, display: '2.73x' },
      ],
    },
    flows: [
      {
        title: 'From Python call to kernel',
        kind: 'chips',
        steps: [
          'PyTorch-style Python API',
          'PyO3 bindings, GIL released',
          'Rust core: tensors and autograd',
          'Optional SSA compiler with fusion',
          'AVX2 CPU, wgpu or CUDA PTX',
        ],
        note: 'NumPy arrays and PyTorch tensors cross the boundary zero-copy through DLPack, and models move in and out as SafeTensors or ONNX.',
      },
    ],
    decisions: [
      {
        title: 'Views, not copies',
        body: 'Strides are signed, so transposes, flips and stepped slices are views over the same buffer. A caching buffer pool reuses allocations between steps.',
      },
      {
        title: 'Load the GPU driver at runtime',
        body: 'The CUDA backend opens the NVIDIA driver library when it is first used and loads PTX kernels into it, so the same build still runs on machines with no NVIDIA GPU.',
      },
      {
        title: 'Keep the PyTorch shape',
        body: 'nn.Module, AdamW, backward() and autograd.grad read the way they do in PyTorch, and the README has a side-by-side cheat sheet, so moving a training loop over is mostly renaming imports.',
      },
      {
        title: 'Publish the slow numbers too',
        body: 'The benchmark against PyTorch lists every result, not only the wins. conv2d and MLP training are slower today, and that is in the table next to the faster optimizer and elementwise ops.',
      },
    ],
  },
  {
    slug: 'extended-strata-moe',
    name: 'extended-strata-moe',
    kicker: 'LLM inference · C++ / CUDA on llama.cpp',
    repo: 'https://github.com/voidstackloop/extended-strata-moe',
    summary:
      'Runs 60 to 120 GB Mixture-of-Experts models on an 8 GB laptop GPU. It extends Strata from one model to every MoE architecture llama.cpp supports.',
    highlights: [
      'Keeps the experts a conversation actually uses cached in VRAM, while the CPU computes the misses from system RAM at the same time.',
      'GPU and CPU sync through a 3 µs CUDA mailbox in page-locked memory, so nothing is uploaded over PCIe during generation.',
      'The cache learns which experts are hot as you chat, with no offline profiling needed.',
      'Verified on 53 MoE architectures with KL divergence under 0.002 against CPU-only evaluation.',
      'Serves OpenAI- and Anthropic-compatible APIs, so Claude Code or Cursor can use a local model directly.',
    ],
    stats: [
      { value: '28.2 t/s', label: 'gpt-oss-120b on 8 GB VRAM' },
      { value: '2.1x', label: 'vs best llama.cpp layer split' },
    ],
    chart: {
      title: 'gpt-oss-120b · tokens per second',
      caption: 'gpt-oss-120b (63 GB) on an RTX 4060 Laptop with 8 GB VRAM, tokens per second',
      unit: 't/s',
      bars: [
        { label: 'CPU experts', value: 14.5, display: '14.5' },
        { label: 'Best split', value: 15.9, display: '15.9' },
        { label: 'Adaptive', value: 26.9, display: '26.9' },
        { label: 'Profiled', value: 28.2, display: '28.2' },
      ],
    },
    tags: ['C++', 'CUDA', 'llama.cpp', 'Python', 'MoE', 'LLM inference'],
    flows: [
      {
        title: 'One MoE layer',
        steps: [
          'The router picks experts for the token.',
          'Cached experts run on the GPU from VRAM.',
          'Uncached experts run on the CPU from system RAM, in parallel.',
          'Both halves meet through the 3 µs mailbox and are summed for the next layer.',
        ],
      },
    ],
    decisions: [
      {
        title: 'Compute the misses where they live',
        body: 'Uploading a missing expert over PCIe stalls every token. Computing it on the CPU from RAM, while the GPU works on the hits, keeps both busy and the bus quiet.',
      },
      {
        title: 'A mailbox instead of the scheduler',
        body: 'A round trip through the normal scheduler costs about 180 µs. Polling page-locked shared memory brings the GPU and CPU sync down to about 3 µs.',
      },
      {
        title: 'Prove it is the same model',
        body: 'Every architecture is checked against full CPU evaluation, and the KL divergence stays within llama.cpp’s own GPU versus CPU rounding tolerance.',
      },
      {
        title: 'Work upstream',
        body: 'The hybrid expert cache is proposed to llama.cpp itself as a pull request, rather than living only in a fork.',
      },
    ],
  },
  {
    slug: 'project-memory',
    name: 'project-memory',
    kicker: 'MCP server · Rust',
    repo: 'https://github.com/voidstackloop/project-memory',
    summary:
      'Long-term memory for AI coding agents. pmem stores a project’s conventions, decisions and patterns in SQLite and serves them to any MCP client, so an agent stops re-reading the codebase every session.',
    highlights: [
      '50 real questions averaged 168 tokens each against 38,921 tokens to read the source, and every one found its answer.',
      'Fuzzy and full-text search, snapshots, duplicate detection and AES-256-GCM encryption at rest.',
      'MCP over stdio and HTTP, a REST API and a web dashboard, all from one 9.9 MB binary.',
      'Works with Claude Code, Cursor and OpenCode.',
    ],
    stats: [
      { value: '~231x', label: 'fewer tokens than reading the source' },
      { value: '9.9 MB', label: 'release binary' },
    ],
    chart: {
      title: 'Tokens to answer · lower is better',
      caption: 'Tokens used: one memory search, all 50 facts at once, and reading the 16 source files',
      unit: 'tokens',
      lowerIsBetter: true,
      bars: [
        { label: '1 search', value: 168, display: '168' },
        { label: '50 facts', value: 2022, display: '2,022' },
        { label: 'Read source', value: 38921, display: '38,921' },
      ],
    },
    tags: ['Rust', 'MCP', 'SQLite', 'tokio', 'AI agents'],
    flows: [
      {
        title: 'Every way in',
        kind: 'chips',
        steps: ['pmem CLI', 'MCP stdio and HTTP', 'REST API', 'Web dashboard', 'One MemoryStore on SQLite'],
        note: 'Both MCP transports share one JSON-RPC handler, so Claude Code over stdio and a remote client over HTTP see the same tools.',
      },
    ],
    decisions: [
      {
        title: 'Memories live with the code',
        body: 'Entries are short, typed and tagged, and are exported on commit by a git hook, so the memory is versioned next to the code it describes.',
      },
      {
        title: 'Never block the async server',
        body: 'The benchmark caught blocking SQLite calls on the async executor. After the fix, a health check stayed at 0.3 ms while 100 slow searches were queued.',
      },
      {
        title: 'Say where it slows down',
        body: 'Search time grows with store size, and the docs name the two code paths that cause it instead of claiming flat performance.',
      },
    ],
  },
  {
    slug: 'human-like-ai-tester',
    name: 'human-like-ai-tester',
    kicker: 'Python CLI and library · on PyPI',
    repo: 'https://github.com/voidstackloop/human-like-ai-tester',
    summary:
      'Tests web apps, CLIs, APIs, chatbots, desktop and mobile apps and data pipelines the way real people use them, mistakes included.',
    highlights: [
      'Adjacent-key typos, (555) 234-5678 in digit-only fields, rage-clicks after 1.5 s of silence and dates read in the wrong locale.',
      '8 personas, from a rushed commuter to a screen-reader user, each with its own typo rate, patience and habits.',
      'A multi-persona sweep merges into one deduplicated Markdown and JSON audit.',
      'Ships LLM prompts and an agent skill, so an AI agent can run the same human-style session.',
    ],
    stats: [
      { value: '8', label: 'personas' },
      { value: '0', label: 'runtime dependencies' },
      { value: '71', label: 'network-free tests' },
    ],
    tags: ['Python', 'AI agents', 'QA automation', 'Accessibility'],
    flows: [
      {
        title: 'One test session',
        kind: 'chips',
        steps: ['Pick a persona', 'Typo and cognitive engines', 'Web, CLI, API, chat, file, desktop or mobile', 'Merged audit report'],
      },
    ],
    decisions: [
      {
        title: 'Model the person, not the input',
        body: 'Typos, hesitation and frustration come from separate engines driven by a persona, so the same persona behaves consistently across a web form and a CLI.',
      },
      {
        title: 'Zero dependencies',
        body: 'It installs anywhere Python 3.9 to 3.13 runs, and CI checks every one of those versions.',
      },
    ],
  },
  {
    slug: 'expert-mentor',
    name: 'expert-mentor',
    kicker: 'LLM tutoring CLI · Python · on PyPI',
    repo: 'https://github.com/voidstackloop/expert-mentor',
    summary:
      'Turns Claude, ChatGPT, Gemini or a local Ollama or llama.cpp model into a calibrated expert mentor for any field, and remembers what you have learned.',
    highlights: [
      'Provider-native prompts: cached XML system blocks for Claude, the developer role and reasoning effort for OpenAI reasoning models.',
      'A persistent learner profile (mastered, shaky, misconceptions) injected into every session.',
      'Flashcards from a session, reviewed with an SM-2-lite spaced repetition scheduler.',
      'Standard library only, and usable as a Claude Code or opencode agent skill.',
    ],
    note: 'Install with `pipx install expert-mentor`.',
    tags: ['Python', 'Prompt engineering', 'LLM APIs', 'Agent skill'],
    flows: [
      {
        title: 'A learning loop',
        steps: [
          'mentor run teaches one concept at a time and checks understanding.',
          'mentor review reads the transcript and updates the learner profile.',
          'mentor cards turns the session into flashcards.',
          'mentor quiz brings them back on a spaced schedule.',
        ],
      },
    ],
    decisions: [
      {
        title: 'A teaching contract, not a persona',
        body: 'The prompt is built on retrieval practice, spacing and scaffolding, and tells the mentor never to make up sources.',
      },
      {
        title: 'Plain files you can edit',
        body: 'Profiles, transcripts and cards are JSON and Markdown under ~/.config, so a learner can read and correct what the mentor remembers.',
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
  { group: 'Languages', items: ['Rust', 'Python', 'C++', 'CUDA', 'TypeScript', 'SQL'] },
  {
    group: 'ML & inference',
    items: ['llama.cpp', 'PyTorch', 'PyO3', 'wgpu', 'GGUF', 'SafeTensors', 'MCP', 'LLM APIs'],
  },
  { group: 'Backend & tooling', items: ['tokio', 'SQLite', 'Docker', 'GitHub Actions', 'Prometheus', 'Chrome DevTools'] },
]
