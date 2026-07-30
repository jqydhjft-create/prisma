import { useEffect, useState } from 'react'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Features } from '@/sections/Features'
import { Works } from '@/sections/Works'
import { Notes } from '@/sections/Notes'
import { NoteReader } from '@/sections/NoteReader'
import { Footer } from '@/sections/Footer'
import { POSTS } from '@/data/posts'

// 解析 #notes/<slug> 形式的 hash，命中则返回文章 slug
function parseNoteHash(): string | null {
  const match = window.location.hash.match(/^#notes\/(.+)$/)
  return match ? match[1] : null
}

function App() {
  const [activeSlug, setActiveSlug] = useState<string | null>(() =>
    parseNoteHash()
  )

  useEffect(() => {
    const onHashChange = () => setActiveSlug(parseNoteHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const activePost = POSTS.find((p) => p.slug === activeSlug) ?? null

  // 文章阅读视图（整页替换，本地渲染完整文章）
  if (activePost) {
    return (
      <NoteReader
        post={activePost}
        onBack={() => {
          window.location.hash = '#notes'
        }}
      />
    )
  }

  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <About />
      <Features />
      <Works />
      <Notes />
      <Footer />
    </main>
  )
}

export default App
