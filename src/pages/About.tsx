import { Art } from '../components/Art'
import { Closing, ExperienceCard, ProjectCard, Statement } from '../components/blocks'
import { Icon } from '../components/Icons'
import { Button, Card, IconBubble, Section, Status, Tag } from '../components/ui'
import { PHOTO_URL, RESUME_URL, arenas, institutions, profile, projects, research } from '../data'
import { LABELS, type PageId } from '../router'

const PILLAR_ICONS = [<Icon.Flask />, <Icon.Book />, <Icon.Trophy />, <Icon.Users />]

const QUICK_LINKS: { page: PageId; icon: React.JSX.Element; tone: string }[] = [
  { page: 'research', icon: <Icon.Flask />, tone: 'violet' },
  { page: 'community', icon: <Icon.Users />, tone: 'blue' },
  { page: 'olympiads', icon: <Icon.Trophy />, tone: 'rose' },
  { page: 'projects', icon: <Icon.Book />, tone: 'green' },
  { page: 'news', icon: <Icon.Clock />, tone: 'teal' },
  { page: 'resume', icon: <Icon.Download />, tone: 'ink' },
]

export function About() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <Status>{profile.status}</Status>
          <h1 className="hero-title">
            Hi, I’m Prakhar Singhvi<sup className="hero-mark">∑</sup>
          </h1>
          <p className="hero-lead">
            {profile.tagline} {profile.intro.replace('I am a Grade 12 IBDP student at', 'I study at')}
          </p>
          <div className="btn-row">
            <Button href="#/research">View research</Button>
            <Button variant="ghost" href={RESUME_URL} download icon={<Icon.Download />}>Resume</Button>
          </div>
        </div>

        <div className="hero-board">
          <Card className="profile-card">
            <div>
              <h2 className="profile-name">{profile.name}</h2>
              <span className="profile-loc">{profile.location}</span>
            </div>
            <div className="profile-collage" aria-hidden="true">
              <Art variant="curve" className="collage-a" />
              <Art variant="triangle" className="collage-b" />
              <Art variant="network" className="collage-c" />
            </div>
            <div className="profile-chips">
              <Tag tone="white"><Icon.Trophy /> Olympiad mathematics</Tag>
              <Tag tone="blue">AMC 12 · 150/150</Tag>
            </div>
          </Card>

          <div className="portrait">
            {PHOTO_URL ? (
              <img src={PHOTO_URL} alt={`Portrait of ${profile.name}`} />
            ) : (
              <div className="portrait-fallback" role="img" aria-label={profile.name}>
                <span>PS</span>
              </div>
            )}
          </div>

          <div className="brands">
            <p>
              Places I have learned
              <br />
              and worked with &lt;3
            </p>
            <div className="marquee" aria-label={institutions.join(', ')}>
              <div className="marquee-track" aria-hidden="true">
                {[...institutions, ...institutions].map((n, i) => <span key={i}>{n}</span>)}
              </div>
            </div>
          </div>

          <nav className="quick" aria-label="Jump to section">
            {QUICK_LINKS.map((q) => (
              <a key={q.page} href={`#/${q.page}`} className={`quick-link tone-${q.tone}`} title={LABELS[q.page]} aria-label={LABELS[q.page]}>
                {q.icon}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <Statement marks={arenas} footnote={profile.curiosity.replace('I like questions that start small and refuse to stay small. ', '')}>
        I like questions that start small and refuse to stay small.
      </Statement>

      <Section title={<>Where my<br />work sits</>} aside={<p className="muted">{profile.roles}</p>}>
        <div className="grid-2">
          {profile.pillars.map((p, i) => (
            <a key={p.key} className="card service" href={`#/${p.page}`}>
              <div className="service-top">
                <IconBubble>{PILLAR_ICONS[i]}</IconBubble>
                <p>{p.text}</p>
              </div>
              <div className="service-bottom">
                <h3>{p.title}</h3>
                <span className="service-num">0{i + 1}</span>
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Section
        title={<>Selected<br />work</>}
        aside={<Button href="#/projects" trailing={<Icon.ArrowRight />}>See all</Button>}
      >
        <div className="grid-2">
          {projects.slice(0, 4).map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>
      </Section>

      <div className="grid-2 experience-grid">
        <Card className="experience experience-cta">
          <h2 className="h2">
            Wanna see
            <br />
            my research?
          </h2>
          <Button href="#/research" trailing={<Icon.ArrowRight />}>Read more</Button>
        </Card>
        {research.slice(0, 3).map((r) => <ExperienceCard key={r.title} item={r} />)}
      </div>

      <div className="grid-2">
        <Card className="note">
          <span className="eyebrow">Where it started</span>
          <h3 className="h3">No coach. Just books.</h3>
          {profile.story.map((p) => <p key={p} className="muted">{p}</p>)}
        </Card>
        <Card className="note">
          <span className="eyebrow">Interests</span>
          <div className="tags">
            {profile.interests.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </Card>
      </div>

      <Closing />
    </>
  )
}
