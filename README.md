# Canvas Builder API

## Overview

A full-stack app to draw rectangles and text on a canvas, preview it, and export as a high-quality PDF.

## Getting Started

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Features

- Initialize canvas with custom dimensions
- Add rectangles and text via UI
- Preview canvas live
- Export canvas as a downloadable PDF

## Deployment

- Host **frontend** on [Vercel](https://vercel.com/)
- Host **backend** on [Render](https://render.com/) or [Railway](https://railway.app/)

## API Endpoints

- `POST /api/canvas/init` — `{ width, height }`
- `POST /api/canvas/add/rectangle` — `{ x, y, width, height, color }`
- `POST /api/canvas/add/text` — `{ text, x, y, fontSize, color }`
- `GET /api/canvas/preview` — returns PNG image
- `GET /api/canvas/export/pdf` — downloads PDF

---

MIT License