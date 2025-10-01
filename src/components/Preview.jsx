
import React from 'react'

export default function Preview({ originalUrl, resultUrl, downloading, onDownload }) {
  return (
    <div className="w-full p-4 rounded-2xl bg-[var(--card)] shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Preview</h3>
        <div className="text-xs text-[var(--muted)]">Compare original and result</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2 items-center">
          <div className="w-full h-64 rounded-md overflow-hidden border">
            {originalUrl ? (
              <img src={originalUrl} alt="original" className="object-contain w-full h-full" />
            ) : (
              <div className="w-full h-full grid place-items-center text-[var(--muted)]">Original</div>
            )}
          </div>
          <div className="text-xs text-[var(--muted)]">Original</div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <div className="w-full h-64 rounded-md overflow-hidden border bg-white">
            {resultUrl ? (
              <img src={resultUrl} alt="result" className="object-contain w-full h-full bg-checker" />
            ) : (
              <div className="w-full h-full grid place-items-center text-[var(--muted)]">Result</div>
            )}
          </div>
          <div className="text-xs text-[var(--muted)]">Result (PNG)</div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onDownload}
          disabled={!resultUrl || downloading}
          className="px-4 py-2 rounded-md border disabled:opacity-50"
        >
          {downloading ? 'Preparing...' : 'Download PNG'}
        </button>
      </div>
    </div>
  )
}