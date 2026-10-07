import { useEffect } from 'react'
import { Nav } from './components/Nav'
import { About } from './pages/About'
import { Community } from './pages/Community'
import { News } from './pages/News'
import { Olympiads } from './pages/Olympiads'
import { Projects } from './pages/Projects'
import { Research } from './pages/Research'
import { Resume } from './pages/Resume'
import { LABELS, usePage, type PageId } from './router'

const VIEWS: Record<PageId, () => React.JSX.Element> = {
  about: About,
  research: Research,
  community: Community,
  projects: Projects,
  olympiads: Olympiads,
  news: News,
  resume: Resume,
}

export default function App() {
  const page = usePage()
  const View = VIEWS[page]

  useEffect(() => {
    document.title = page === 'about' ? 'Prakhar Singhvi' : `${LABELS[page]} · Prakhar Singhvi`
  }, [page])

  return (
    <div className="shell">
      <div className="backdrop" aria-hidden="true" />
      <Nav page={page} />
      <main key={page} className="view">
        <View />
      </main>
      <footer className="footer">
        <span className="pixel">© 2026 Prakhar Singhvi</span>
        <span>Jaipur, India</span>
      </footer>
    </div>
  )
}
