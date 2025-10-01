# Image Background Remover — React + Tailwind Frontend

This is a **modern, responsive frontend** for an image background removal app. It connects to your backend API (which handles the AI image processing) and provides users with a clean interface to upload, preview, and download processed images.

## ✨ Features

- ⚡ Built with **React + Vite** for fast performance
- 🎨 **Tailwind CSS** for styling, mobile-first responsive UI
- 🎬 **Framer Motion** animations
- 📤 Drag & drop or click to upload images
- 🖼️ Side-by-side preview (original & result)
- ⏳ Loading state with progress indicator
- ⬇️ One-click **download PNG with transparent background**
- 📢 Ad sidebar (Google AdSense-ready)
- 🛡️ Error handling for invalid files / API errors

## 🛠️ Getting Started

### 1. Clone and install dependencies
```bash
git clone <your-repo-url>
cd bg-remover-frontend
npm install
```

### 2. Start development server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Configure backend API
- Edit `src/api.js`
- Set your backend `baseURL`
- Ensure your backend exposes `POST /remove-bg`
  - Accepts `multipart/form-data` with field: **image**
  - Returns: **PNG blob with transparent background**

### 4. Build for production
```bash
npm run build
```

This outputs static files to `dist/`, ready to deploy on **Netlify, Vercel, Render, or any static hosting**.

## 📂 Project Structure
```
src/
 ├─ App.jsx          # Main layout
 ├─ api.js           # API connection
 ├─ components/      # UI components (UploadArea, Preview, Header, Ads, Footer)
 ├─ index.css        # Tailwind base styles
 └─ main.jsx         # Entry point
```

## 📦 Tech Stack
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Axios

## 📢 Ads Integration
To add Google AdSense:
1. Insert your AdSense script into `index.html` inside `<head>`
2. Replace placeholders inside `AdsSidebar.jsx`

## ⚠️ Notes
- This repo is **frontend only** — you must provide your own backend for background removal.
- Works best with **high-resolution images**.
- Tested on Chrome, Firefox, and Edge.

---

### 🚀 Next Steps
- Connect to your backend and test image uploads.
- Deploy on Netlify or Vercel.
- Add branding, SEO, and analytics as needed.

Enjoy building your **AI-powered background remover** ✨
