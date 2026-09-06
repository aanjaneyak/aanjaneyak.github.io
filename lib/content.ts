import publications from '@/data/publications.json';
export { publications };
export const scholar =
  'https://scholar.google.com/citations?user=KZC2cBMAAAAJ&hl=en';
export const socials = [
  { name: 'Google Scholar', href: scholar },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/aanjaneyak/' },
  {
    name: 'ResearchGate',
    href: 'https://www.researchgate.net/profile/Aanjaneya-Kumar',
  },
];
export const topics = [
  {
    id: 'stochastic',
    title: 'Stochastic & biological dynamics',
    short:
      'Transient dynamics, diffusion, target binding, and stochastic growth in biological and interacting-particle systems.',
    question: 'How does randomness shape the dynamics of living systems?',
    text: 'Biological systems are constantly in motion. Their behavior emerges from many interacting components, and a steady-state average can miss much of the story. I use mathematical models to study transient dynamics and the full distributions of outcomes, with an emphasis on exact solutions and the mechanisms that determine when events occur.',
    detail:
      'My work in this direction includes diffusion and target binding, stochastic growth, chase-escape processes, and branching driven by first-passage events. These models connect microscopic rules to the behavior of populations and interacting particles.',
    keywords:
      'biology diffusion particles transient bimodality branching growth ecology disease',
  },
  {
    id: 'extremes',
    title: 'Extreme events & first passage',
    short:
      'The statistics and timing of rare events, first-passage processes, and records under stochastic resetting.',
    question: 'What determines the occurrence and timing of extreme events?',
    text: 'Rare events can have an outsized influence on a complex system. I am interested in how correlations and interactions shape their statistics, particularly in settings where independence cannot be assumed. First-passage theory provides a way to ask when a fluctuating process first reaches a consequential threshold.',
    detail:
      'I study extreme events in network transport, record ages under restart, and stochastic search. A central aim is to develop theoretical tools that work across systems, revealing which features of an outcome are general and which depend on the underlying dynamics.',
    keywords:
      'extremal statistics rare events records restart resetting search transport',
  },
  {
    id: 'observation',
    title: 'Inference from partial observations',
    short:
      'Inferring the properties of stochastic processes from gated detection times and incomplete observations.',
    question: 'What can we learn about a process we can only partly observe?',
    text: 'Our measurements rarely reveal every event in a stochastic process. A sensor may switch on and off, or detection may require several conditions to be satisfied at once. I study how these constraints change what we observe, and what the observations can still tell us about the underlying process.',
    detail:
      'This direction builds on my doctoral research on gated first-passage processes. By relating detection times to first-passage times, I explore both the consequences of imperfect observations and the possibilities for reconstructing hidden dynamical properties.',
    keywords:
      'inference gated sensing hidden detection incomplete information PhD thesis',
  },
  {
    id: 'social',
    title: 'Social dynamics & collective behavior',
    short:
      'Mathematical models of trust, honest communication, opinion dynamics, and electoral competition.',
    question: 'How do individual interactions give rise to social patterns?',
    text: 'Social systems bring together individual decisions, network structure, and collective outcomes. I use statistical physics, network science, and evolutionary game theory to investigate the patterns that emerge from these interactions, from trust and honest communication to opinion dynamics and electoral competition.',
    detail:
      'An emerging interest is the interplay between biological and social systems: how social structures influence ecological and disease dynamics, and what those processes reveal about the structures themselves. This motivates questions about the co-evolution of institutions and socio-ecological systems, and how institutions adapt to change.',
    keywords:
      'elections voter trust honesty cooperation polarization contagion culture institutions resilience game theory networks',
  },
];
export const basePath = process.env.BASE_PATH || '';
export const href = (path: string) => `${basePath}${path}`;

export const about = [
  'My research concerns nonequilibrium dynamics in biological and social systems. I study how stochasticity, nonlinearities, and interactions determine their behavior, using mathematical models and tools from statistical physics, network science, and evolutionary game theory.',
  'These systems consist of many interacting units, evolve in time, and often operate out of equilibrium. Averages and steady-state descriptions therefore provide only a partial account of their behavior. I am interested in transient dynamics and full distributions of observables, the occurrence and timing of extreme events, and what can be inferred about a stochastic process from partial observations.',
  'An emerging direction of my research is the interaction between biological and social systems: how social structures influence ecological and disease dynamics, and what these processes can reveal about the structures that shape them.',
];
