import { useEffect, useState } from 'react'

export const PAGES = ['about', 'research', 'community', 'projects', 'olympiads', 'news', 'resume'] as const
export type PageId = (typeof PAGES)[number]

export const LABELS: Record<PageId, string> = {
  about: 'About',
  research: 'Research',
  community: 'Community',
  projects: 'Projects',
  olympiads: 'Olympiads',
  news: 'News',
  resume: 'Resume',
}

export const go = (page: PageId) => {
  window.location.hash = `/${page}`
}

function read(): PageId {
  const id = window.location.hash.replace(/^#\/?/, '') as PageId
  return PAGES.includes(id) ? id : 'about'
}

export function usePage() {
  const [page, setPage] = useState<PageId>(read)
  useEffect(() => {
    const onHash = () => {
      setPage(read())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return page
}
