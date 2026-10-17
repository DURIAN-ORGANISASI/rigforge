import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './Icon'
import { AppSwitcher } from './AppSwitcher'

export function Header() {
  const { theme, toggle } = useTheme()
  const action = theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'
  // Lapisan gerak saja: putaran ikon saat ganti tema.
  const [swapping, setSwapping] = useState(false)
  const swapTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(swapTimer.current), [])

  const onToggle = () => {
    toggle()
    setSwapping(true)
    window.clearTimeout(swapTimer.current)
    swapTimer.current = window.setTimeout(() => setSwapping(false), 350)
  }

  return (
    <header className="site-header">
      <div className="container site-header__in">
        <div className="site-header__brand-group">
          <a className="brand" href="#konten" aria-label="RigForge — kembali ke awal">
            <span className="brand__mark">
              <Icon name="brackets" size={24} />
            </span>
            <div className="brand__text">
              <h1 className="brand__name">RigForge</h1>
              <span className="brand__descriptor">Avatar data <span aria-hidden="true">→</span> Lua</span>
            </div>
          </a>
          <AppSwitcher target="relay" />
        </div>

        <div className="site-header__actions">
          <button
            type="button"
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label={action}
            title={action}
            className={swapping ? 'icon-btn is-swapping' : 'icon-btn'}
            onClick={onToggle}
          >
            <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}
