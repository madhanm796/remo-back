import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

import uploadIcon from '../assets/upload.png';

export default function UploadArea({ onFileSelected, disabled }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function openFileDialog() {
    if (disabled) return
    inputRef.current?.click()
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    const f = e.dataTransfer.files?.[0]
    if (f) onFileSelected(f)
  }

  function onFile(e) {
    const f = e.target.files?.[0]
    if (f) onFileSelected(f)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex-1 p-6 rounded-2xl border-2 border-dashed ${dragging ? 'border-indigo-400 bg-indigo-50/30' : 'border-neutral-200'} transition-all`}
      onDragOver={(e) => { e.preventDefault(); if (!dragging) setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={openFileDialog}
    >
      <input ref={inputRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
      <div className="flex flex-col items-center justify-center h-full gap-4">
            <img src={uploadIcon} className='w-2/6'/>
        <div className="text-center">
          <h3 className="font-semibold">Drop image here or click to upload</h3>
          <p className="text-sm text-[var(--muted)]">We support JPG, PNG. Output will be PNG with transparency.</p>
        </div>
        <div className="text-sm text-[var(--muted)]">Tip: High-resolution images give better results.</div>
      </div>
    </motion.div>
  )
}
