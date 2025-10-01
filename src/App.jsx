import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import UploadArea from './components/UploadArea'
import Preview from './components/Preview'
import AdsSidebar from './components/AdsSidebar'
import Footer from './components/Footer'
import { removeBackground } from './api'

export default function App() {
  const [dark, setDark] = useState(() => {
    // Check localStorage and system preference for initial theme
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Update theme class and persist preference
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  const [originalFile, setOriginalFile] = useState(null)
  const [originalUrl, setOriginalUrl] = useState(null)
  const [resultBlobUrl, setResultBlobUrl] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl)
      if (resultBlobUrl) URL.revokeObjectURL(resultBlobUrl)
    }
  }, [originalUrl, resultBlobUrl])

  async function handleFileSelected(file) {
    setError(null)
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.')
      return
    }

    setOriginalFile(file)
    const url = URL.createObjectURL(file)
    setOriginalUrl(url)

    // start processing automatically
    setProcessing(true)
    setProgress(0)
    setResultBlobUrl(null)

    try {
      const blob = await removeBackground(file, (evt) => {
        if (evt.total) {
          setProgress(Math.round((evt.loaded / evt.total) * 100))
        }
      })

      setResultBlobUrl("data:image/png;base64,"+blob)
    } catch (err) {
      console.error(err)
      setError('Failed to process image. Check your backend or try a different image.')
    } finally {
      setProcessing(false)
    }
  }

  function downloadResult() {
    if (!resultBlobUrl) return
    setDownloading(true)
    const a = document.createElement('a')
    a.href = resultBlobUrl
    a.download = 'removed-bg.png'
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => setDownloading(false), 400)
  }

  return (
    <div className="min-h-screen flex flex-col text-[14px]">
      <div className="max-w-6xl mx-auto w-full px-4 py-6">
        <Header dark={dark} setDark={setDark} />

        <main className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
          <section className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <UploadArea onFileSelected={handleFileSelected} disabled={processing} />

              <div className="flex flex-col gap-3">
                <div className="p-4 rounded-2xl bg-[var(--card)] border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Actions</div>
                      <div className="text-xs text-[var(--muted)]">Upload, preview, download</div>
                    </div>
                    <div className="text-xs text-[var(--muted)]">{processing ? `Processing ${progress}%` : 'Idle'}</div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <input id="file" type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])} className="hidden" />
                    <label htmlFor="file" className="px-3 py-2 rounded-md border cursor-pointer">Select file</label>
                    <button onClick={() => { setOriginalFile(null); setOriginalUrl(null); setResultBlobUrl(null); setError(null) }} className="px-3 py-2 rounded-md border">Clear</button>
                  </div>

                  {error && <div className="mt-3 text-sm text-red-500">{error}</div>}
                </div>

                <Preview originalUrl={originalUrl} resultUrl={resultBlobUrl} downloading={downloading} onDownload={downloadResult} />
              </div>
            </div>
          </section>

          <aside className="hidden lg:block">
            <AdsSidebar />
          </aside>
        </main>

        <div className="mt-6">
          <Footer />
        </div>
      </div>

      {/* Simple bottom loader */}
      {processing && (
        <div className="fixed left-0 right-0 bottom-4 flex justify-center pointer-events-none">
          <div className="px-4 py-2 rounded-full bg-black/70 text-white text-sm">Processing {progress}%</div>
        </div>
      )}
    </div>
  )
}