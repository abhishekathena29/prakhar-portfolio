// All site content lives here so it can be edited without touching layout code.

// TODO: replace with the real arXiv URL once the paper is live.
export const ARXIV_URL = '#'
// Drop the PDF into /public with this name.
export const RESUME_URL = '/Prakhar_Singhvi_Resume.pdf'
// Drop a portrait into /public and set this, e.g. '/prakhar.jpg'. Empty shows a monogram card.
export const PHOTO_URL = ''

export const profile = {
  name: 'Prakhar Singhvi',
  tagline: 'Mathematics researcher, olympiad competitor and teacher.',
  location: 'Jaipur, India',
  intro:
    'I am a Grade 12 IBDP student at Jayshree Periwal International School. I work on problems in mathematics and theoretical computer science, and I teach what I learn.',
  story: [
    'I taught myself olympiad mathematics from books and PDFs, with no coach. That experience shaped everything else I do. I know how hard it is to find a clear path through this material. So I built one for others.',
  ],
  pillars: [
    { key: 'A', title: 'Research', text: 'Federated bandit algorithms, fair division and polynomial reconstruction.', page: 'research' },
    { key: 'B', title: 'Teaching', text: 'A free, proof-based olympiad program and a book for students who study alone.', page: 'projects' },
    { key: 'C', title: 'Competition', text: 'Perfect scores on AMC 12A, AMC 12B and AIME, plus many international and national top ranks.', page: 'olympiads' },
    { key: 'D', title: 'Community', text: 'Student leadership, education access and health-focused NGO work.', page: 'community' },
  ],
  curiosity:
    'I like questions that start small and refuse to stay small. A polynomial is recovered from one number. A fair split of rent turns out to need a topological lemma. I follow those questions until they give way.',
  roles:
    'I currently serve as School Captain, elected by about 2,500 students, and as President of the Alan Turing Club.',
  interests: ['Curriculum design', 'Mathematical writing', 'Mentoring', 'Competition problem-writing'],
  status: 'Grade 12 IBDP student',
} as const

// Shown in the scrolling card in the hero.
export const institutions = ['Velesium Labs AI', 'Euler Circle', 'UPenn PACT', 'Narayana Prodigy', 'Cuddles Foundation', 'Vimukti NGO', 'Astitva', 'Aanchal']

// Shown as wordmarks under the statement block.
export const arenas = ['AMC 12', 'AIME', 'BMO', 'IOQM', 'Purple Comet', 'MIT EWB']

export type ArtVariant = 'network' | 'triangle' | 'curve' | 'tree' | 'rising' | 'select' | 'pages' | 'bars'

export type Research = {
  title: string
  org: string
  role: string
  date: string
  art: ArtVariant
  body: string[]
  points?: { label: string; text: string }[]
  notes?: string[]
  link?: { label: string; href: string }
}

export const researchIntro = 'I like research that starts with a clean question and ends with something someone can check.'

export const research: Research[] = [
  {
    title: 'Federated Bandit Algorithms (FedIV-Robust)',
    org: 'Velesium Labs AI',
    role: 'Research Assistant, Velesium Labs AI',
    date: 'Oct 2024 to present',
    art: 'network',
    body: [
      'Hospitals and banks often cannot share raw records. Pooling their summary statistics should help them find real patterns, such as fraud or treatment effects. But outliers and bad actors can corrupt those statistics.',
      'My work addresses this in three steps:',
    ],
    points: [
      { label: '01', text: 'I built the first distributed two-stage least-squares estimator for federated causal bandits.' },
      { label: '02', text: 'I added Byzantine resilience through geometric-median aggregation.' },
      { label: '03', text: 'I derived an Õ(√T + αT) regret bound.' },
    ],
    notes: [
      'The project is supported by a $2,500 research grant. I was mentored by the Head of R&D, a CMI and Max Planck alum. I surveyed about 30 existing methods before designing mine.',
    ],
    link: { label: 'Read the paper', href: ARXIV_URL },
  },
  {
    title: 'Fair Division and Rental Harmony',
    org: 'Euler Circle',
    role: 'Research Mentee, Euler Circle (IPRW)',
    date: '2026',
    art: 'triangle',
    body: [
      "How can a resource be split so that no one envies another's share? I studied classical fairness procedures and wrote a 17-page expository paper. It proves, using Sperner's Lemma, that an envy-free division exists for n agents. I also analyzed the Selfridge-Conway and Su Rental Harmony algorithms, which handle the room-and-rent version of the problem.",
    ],
    notes: [
      'I worked under Dr. Simon Rubinstein-Salzedo (Stanford PhD) and Hmayak Hussaini (CSU). The program awarded me a $2,200 merit scholarship.',
    ],
  },
  {
    title: 'The Polynomial Reconstruction Theorem',
    org: 'Independent',
    role: 'Sole author · Patent pending',
    date: 'Feb 2025 to present',
    art: 'curve',
    body: [
      "A classical method recovers a polynomial's coefficients from a single evaluation, but only when every coefficient is non-negative. I found this while preparing for the IOQM, working alone.",
      'I proved that any integer-coefficient polynomial can be recovered from one evaluation p(k), for a suitably large k. I also built a carry-correction algorithm that extends the result to negative coefficients. The recovered polynomial is unique at any degree.',
    ],
  },
  {
    title: 'Algorithms at the University of Pennsylvania (PACT)',
    org: 'UPenn · PACT',
    role: 'Scholar and Peer Mentor, Advanced Group',
    date: 'June 2026',
    art: 'tree',
    body: [
      'I joined the Advanced Group of the Program in Algorithmic and Combinatorial Thinking, a track built for undergraduates. I studied approximation, randomized and distributed algorithms, with a focus on proofs and performance analysis. I mentored six peers and graded their coursework.',
    ],
  },
  {
    title: 'Reinforcement Learning Mentorship',
    org: 'RL Mentorship',
    role: 'Machine Learning Intern, Cambridge-based research mentorship',
    date: '8 weeks',
    art: 'rising',
    body: [
      'I was one of about 175 shortlisted applicants. I implemented policy evaluation, policy iteration, value iteration, Monte Carlo, TD(0), SARSA, Q-learning, DQN and REINFORCE from scratch in Gymnasium. I ran a controlled study of epsilon-greedy and UCB exploration. I defended my written report in a live viva.',
    ],
  },
]

export type CommunityItem = {
  title: string
  role: string
  date?: string
  body: string[]
  list?: string[]
  listLabel?: string
  stat?: { value: string; unit?: string; label: string; progress?: { filled: number; total: number; overflow?: boolean } }
}

export const communityIntro = 'I teach, organize and build for people who do not have the guide I wished for.'

export const community: CommunityItem[] = [
  {
    title: 'Super 10',
    role: 'Founder, Lead Instructor and Curriculum Designer',
    date: 'Aug 2025 to Aug 2026',
    body: [
      'Super 10 is a free, proof-based olympiad program open to students across India. I selected 10 students from over 280 applicants. I taught three live classes a week. In each one, we derived every formula from first principles before using it.',
    ],
    listLabel: 'Results from the cohort:',
    list: [
      'One student ranked first internationally on AMC 8.',
      'A team of six ranked first internationally on the Purple Comet Math Meet.',
    ],
    stat: { value: '10', unit: '/ 280+', label: 'students selected' },
  },
  {
    title: 'UniQuest',
    role: 'Founder',
    date: 'Sept 2025 to present',
    body: [
      'UniQuest helps students from under-resourced schools in Jaipur find their strengths, such as debating or MUN, and take them further. We partner with 5+ NGOs and government schools, including Vimukti NGO.',
    ],
    stat: { value: '5+', label: 'NGO and school partners' },
  },
  {
    title: 'School Captain',
    role: 'Jayshree Periwal International School',
    date: 'Oct 2025 to present',
    body: ['I was elected by a student body of about 2,500. Initiatives I led:'],
    list: [
      'A weekly subject doubt-submission system. 30 volunteers have served 70+ peers.',
      'A mentor program. I recruited 20 peer mentors to guide IGCSE students through IBDP subject choice.',
    ],
    stat: { value: '2,500', label: 'students in the electorate' },
  },
  {
    title: 'Alan Turing Club and LogiLeague',
    role: 'President',
    body: [
      "I founded the school's first no-syllabus reasoning tournament. Teams are scored on the quality of their justification, not on whether the final answer is right. The judging rubric follows a debate format. In year one, 270 students competed in 54 teams. Participation passed 350 in the following year.",
    ],
    stat: { value: '350+', label: 'participants in year two', progress: { filled: 270, total: 350 } },
  },
  {
    title: 'Fueladream and Cuddles Foundation',
    role: 'Campaign Lead, Monthly Ration Baskets Drive',
    date: 'Jul to Aug 2025',
    body: [
      'Cuddles Foundation provides nutrition support for children with cancer. Malnutrition is a driver of treatment abandonment among low-income families. I led a crowdfunding campaign that raised ₹33,100 (about $370) from 29 funders. We reached 123% of the goal in 27 days.',
    ],
    stat: { value: '123%', label: 'of goal in 27 days', progress: { filled: 123, total: 100, overflow: true } },
  },
  {
    title: 'Astitva',
    role: 'India Ambassador',
    date: 'Jul 2025 to present',
    body: [
      'Astitva is a youth-led sexual and reproductive health NGO. I support outreach for reusable menstrual pads and contribute multilingual guides and workshops for marginalized communities.',
    ],
  },
  {
    title: 'Aanchal',
    role: 'India Head',
    date: 'Jul 2025 to present',
    body: [
      'Aanchal is a student-led NGO providing pre- and postnatal care to teenage women in Uganda. I contribute to its India-side work.',
    ],
  },
]

export type Highlight = { competition: string; score?: [number, number]; result: string }

export const olympiadIntro = 'I prepared on my own, from books, and I solve problems for the argument as much as for the answer.'

export const highlights: Highlight[] = [
  { competition: 'AMC 12A 2025', score: [150, 150], result: '150/150' },
  { competition: 'AMC 12B 2025', score: [150, 150], result: '150/150' },
  { competition: 'AIME 2026', score: [15, 15], result: '15/15' },
  { competition: 'AIME 2024 and 2025', score: [14, 15], result: '14/15' },
  {
    competition: 'Purple Comet Math Meet 2026',
    score: [30, 30],
    result: 'Team score 30/30; first in the High School Large-School division, among 4,804 teams from 86 countries',
  },
  {
    competition: 'British Mathematical Olympiad, Rounds 1 and 2',
    result: 'Distinction in both; qualified for the Cambridge/Oxford Mathematics Camp',
  },
  { competition: 'IOQM 2024 and 2025, RMO 2025', result: 'Qualified; INMO eligibility' },
  { competition: 'Iranian Combinatorics Olympiad', result: 'India Rank 1, 2024 and 2025' },
  { competition: 'Ramanujan National Mathematics Challenge', result: 'All India Rank 1' },
  { competition: 'MIT EWB Science and Engineering Competition', result: 'Asia-Pacific Rank 1 and All India Rank 1' },
]

export const moreResults: { label: string; items: string[] }[] = [
  {
    label: 'International Rank 1',
    items: ['Copernicus (Global and Preliminary)', 'Philippines IMO 2025', 'Fermat 2025', 'IMOCSEA Global Round 2025', 'Crest', 'Singapore Global Math Finals'],
  },
  { label: 'International Rank 2', items: ['Hong Kong IMO 2025'] },
  { label: 'AMC Distinguished Honor Roll', items: ['AMC 10A 2024', 'AMC 12A 2024', 'AMC 12A 2025', 'AMC 12B 2025'] },
  {
    label: 'Gold (preliminary rounds)',
    items: ['Singapore and Asian', 'Hong Kong', 'Thailand', 'IMOCSEA', 'Philippines', 'Copernicus'],
  },
]

export const training =
  'I work through texts by Evan Chen, Titu Andreescu and Sheldon Ross. I often spend five or six hours on one problem before I look at a solution. That habit matters more to me than any single score.'

export const pathfinder = {
  title: 'Pathfinder for Olympiads',
  role: 'Author',
  body: [
    'I wrote this book because no single resource covered the whole olympiad path. It is proof-first and covers number theory, combinatorics, algebra and geometry. It uses graded hint ladders instead of full solutions, so students keep the productive struggle. It prepares readers for AMC-AIME, IOQM-RMO and BMO.',
    "The book grew out of my live classes and was mentored by educator Ashish Arora. Narayana Prodigy, one of India's largest olympiad coaching networks, has adopted it.",
  ],
  topics: ['Number theory', 'Combinatorics', 'Algebra', 'Geometry'],
  prepares: ['AMC-AIME', 'IOQM-RMO', 'BMO'],
}

export type Project = {
  title: string
  kind: string
  art: ArtVariant
  summary: string
  tags: string[]
  year?: string
  page: 'research' | 'community' | 'olympiads'
}

// Projects are drawn from the research, teaching and community sections.
export const projects: Project[] = [
  {
    title: 'The Polynomial Reconstruction Theorem',
    kind: 'Theorem · Patent pending',
    year: '2025',
    art: 'curve',
    summary: 'Recovers any integer-coefficient polynomial from one evaluation p(k), with a carry-correction algorithm for negative coefficients.',
    tags: ['Number theory', 'Algorithms'],
    page: 'research',
  },
  {
    title: 'FedIV-Robust',
    kind: 'Research · Velesium Labs AI',
    year: '2024',
    art: 'network',
    summary: 'The first distributed two-stage least-squares estimator for federated causal bandits, with Byzantine resilience and an Õ(√T + αT) regret bound.',
    tags: ['Federated learning', 'Bandits', 'Causal inference'],
    page: 'research',
  },
  {
    title: 'Super 10',
    kind: 'Free olympiad program',
    year: '2025',
    art: 'select',
    summary: '10 students chosen from 280+ applicants, three live proof-based classes a week. Produced an AMC 8 International Rank 1 and a Purple Comet International Rank 1 team.',
    tags: ['Teaching', 'Curriculum design'],
    page: 'community',
  },
  {
    title: 'LogiLeague',
    kind: 'Reasoning tournament',
    art: 'bars',
    summary: 'A no-syllabus tournament scored on the quality of justification, not the final answer. 270 students in year one, 350+ in year two.',
    tags: ['Event design', 'Debate-format judging'],
    page: 'community',
  },
  {
    title: 'RL algorithms from scratch',
    kind: 'ML mentorship',
    art: 'rising',
    summary: 'Policy iteration, value iteration, Monte Carlo, TD(0), SARSA, Q-learning, DQN and REINFORCE in Gymnasium, plus a controlled study of epsilon-greedy vs UCB.',
    tags: ['Reinforcement learning', 'Python'],
    page: 'research',
  },
  {
    title: 'Envy-free division for n agents',
    kind: 'Expository paper · 17 pages',
    year: '2026',
    art: 'triangle',
    summary: "A proof via Sperner's Lemma that an envy-free division exists for n agents, with analysis of the Selfridge-Conway and Su Rental Harmony algorithms.",
    tags: ['Fair division', 'Combinatorial topology'],
    page: 'research',
  },
]

export const forthcoming = 'A mathematics article for The Times of India, written for a general audience.'

export const news: { date: string; text: string; link?: string }[] = [
  { date: 'Sept 2026', text: 'Research on federated bandit algorithms posted to arXiv.', link: ARXIV_URL },
  { date: 'Aug 2026', text: 'Super 10 completes its first year. The cohort produced an AMC 8 International Rank 1 and a Purple Comet International Rank 1 team.' },
  { date: 'July 2026', text: "Completed my fair-division paper at Euler Circle, proving envy-free division for n agents with Sperner's Lemma." },
  { date: 'June 2026', text: 'Joined the Advanced Group of PACT at the University of Pennsylvania as a scholar and peer mentor.' },
  { date: '2026', text: 'Purple Comet Math Meet: our team scored 30/30 and placed first in its division, from 4,804 teams in 86 countries.' },
  { date: '2026', text: 'Perfect 15/15 on AIME. Qualified for the invitational round for the second year in a row.' },
  { date: '2026', text: 'MIT EWB Science and Engineering Competition: Asia-Pacific Rank 1 and All India Rank 1.' },
  { date: '2026', text: 'Offered the RIT High School Award, a $116,000 merit scholarship.' },
  { date: '2025', text: 'Perfect 150/150 on both AMC 12A and AMC 12B.' },
  { date: '2025', text: 'Distinction in both rounds of the British Mathematical Olympiad.' },
]
