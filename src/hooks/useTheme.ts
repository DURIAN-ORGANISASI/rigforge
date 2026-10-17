import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'
const STORAGE_KEY = 'rl-theme'

function readInitial(): Theme {
  if (typeof document === 'undefined') return 'light'
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'dark' ? 'dark' : 'light'
}

/** Sinkronkan warna chrome browser (bilah atas perangkat) dengan token --bg,
 *  supaya warnanya ikut berganti tema tanpa nilai hardcode. */
function syncThemeColor() {
  const meta = document.querySelector('meta[name="theme-color"]')
  if (!meta) return
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
  if (bg) meta.setAttribute('content', bg)
}

function readStored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function useTheme() {
  // Use the same first render on server and client; hydrate the pre-paint theme
  // set by themeInitScript immediately after mounting.
  const [theme, setTheme] = useState<Theme>('light')
  const [ready, setReady] = useState(false)

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setTheme(readInitial())
    setReady(true)
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready) return
    document.documentElement.setAttribute('data-theme', theme)
    syncThemeColor()
  }, [theme, ready])

  // Hormati preferensi sistem selama pengguna belum memilih tema sendiri.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      const stored = readStored()
      if (stored !== 'light' && stored !== 'dark') {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    // Transisi warna 300ms khusus momen ganti tema (visual saja);
    // dilepas lagi agar tidak berkedip saat load / tema sistem berubah.
    const root = document.documentElement
    root.classList.add('theme-fade')
    window.setTimeout(() => root.classList.remove('theme-fade'), 300)
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* penyimpanan tidak tersedia: abaikan */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
