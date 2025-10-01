
import React from 'react'
import clsx from 'clsx'

export default function Header({ dark, setDark }) {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">RB</div>
        <div>
          <h1 className="text-lg font-semibold">Remoback</h1>
          <p className="text-xs text-[var(--muted)]">Instant background removal</p>
        </div>
      </div>

      {/* <nav className="flex items-center gap-4">
        <a className="text-sm text-[var(--muted)] hover:underline" href="#">Home</a>
        <a className="text-sm text-[var(--muted)] hover:underline" href="#about">About</a>
        <a className="text-sm text-[var(--muted)] hover:underline" href="#contact">Contact</a>

        <button
          onClick={() => setDark(!dark)}
          className={clsx('px-3 py-1 rounded-md text-sm border', dark ? 'border-neutral-700' : 'border-neutral-200')}
        >
          {dark ? 'Light' : 'Dark'}
        </button>
      </nav> */}
    </header>
  )
}