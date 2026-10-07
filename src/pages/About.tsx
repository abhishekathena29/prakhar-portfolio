import { useState } from 'react'
import { Icon } from '../components/Icons'
import { Button, Eyebrow, Option, Panel, Stat } from '../components/ui'
import { RESUME_URL, profile } from '../data'
import { go, type PageId } from '../router'

export function About() {
  const [picked, setPicked] = useState<string | null>(null)

  return (
    <>
      <Panel className="hero">
        <div className="hero-mark pixel" aria-hidden="true">∑</div>
        <p className="hero-sub">{profile.tagline}</p>
        <h1 className="pixel hero-title">{profile.name}</h1>
        <p className="hero-text">
          {profile.intro}
        </p>
        <span className="hero-loc"><Icon.Pin /> {profile.location}</span>
      </Panel>

      <div className="stat-row">
        <Stat value="150" unit="/ 150" label="AMC 12A and 12B" icon={<Icon.Star />} />
        <Stat value="15" unit="/ 15" label="AIME 2026" icon={<Icon.CheckSquare />} />
        <Stat value="34" label="competitions won" icon={<Icon.Gem />} />
        <Stat value="2,500" label="students elected me captain" icon={<Icon.Users />} />
      </div>

      <div className="action-row">
        <Button onClick={() => go('research')} icon={<Icon.Flask />}>View research</Button>
        <Button href={RESUME_URL} download icon={<Icon.Download />}>Download resume</Button>
        <Button variant="light" onClick={() => go('olympiads')} trailing={<Icon.ChevronRight />}>Olympiad results</Button>
      </div>

      <section className="split">
        <Panel className="block">
          <Eyebrow>Where it started</Eyebrow>
          <h2 className="pixel h2">No coach. Just books.</h2>
          {profile.story.map((p) => <p key={p}>{p}</p>)}
          <p className="muted">{profile.roles}</p>
        </Panel>

        <Panel className="block">
          <Eyebrow>My work sits in four places</Eyebrow>
          <div className="options">
            {profile.pillars.map((p) => (
              <Option
                key={p.key}
                letter={p.key}
                selected={picked === p.key}
                onClick={() => {
                  setPicked(p.key)
                  setTimeout(() => go(p.page as PageId), 260)
                }}
              >
                <strong>{p.title}</strong>
                <span>{p.text}</span>
              </Option>
            ))}
          </div>
        </Panel>
      </section>

      <Panel className="block quote">
        <h2 className="pixel quote-title">Questions that start small and refuse to stay small.</h2>
        <p>{profile.curiosity}</p>
        <div className="chips">
          <span className="chips-label">Interests</span>
          {profile.interests.map((i) => <span key={i} className="chip">{i}</span>)}
        </div>
      </Panel>
    </>
  )
}
