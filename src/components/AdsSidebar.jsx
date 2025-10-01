import React from 'react'

export default function AdsSidebar() {
  return (
    <aside className="w-72 p-4 rounded-2xl bg-[var(--card)] border">
      <h4 className="text-sm font-medium mb-3">Sponsored</h4>
      <div className="space-y-3 text-sm text-[var(--muted)]">
        <div className="p-3 rounded-md border">Ad slot 1 (Google AdSense ready)</div>
        <div className="p-3 rounded-md border">Ad slot 2</div>
        <div className="p-3 rounded-md border">Promote your product</div>
      </div>

      <div className="mt-6 text-xs text-[var(--muted)]">
        Note: Place Google AdSense snippet in index.html or use a dynamic loader for client-side ads.
      </div>
    </aside>
  )
}