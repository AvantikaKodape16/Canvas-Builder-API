import express from 'express';
import cors from 'cors';
import CanvasManager from './canvasManager.js';
import PDFDocument from 'pdfkit';
import { readFileSync } from 'fs';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

let canvasInstance = null;

app.post('/api/canvas/init', (req, res) => {
  const { width, height } = req.body;
  canvasInstance = new CanvasManager(width, height);
  res.json({ message: 'Canvas initialized', width, height });
});

app.post('/api/canvas/add/rectangle', (req, res) => {
  if (!canvasInstance) return res.status(400).json({ error: 'Canvas not initialized' });
  canvasInstance.addRectangle(req.body);
  res.json({ message: 'Rectangle added' });
});

app.post('/api/canvas/add/text', (req, res) => {
  if (!canvasInstance) return res.status(400).json({ error: 'Canvas not initialized' });
  canvasInstance.addText(req.body);
  res.json({ message: 'Text added' });
});

app.get('/api/canvas/preview', (req, res) => {
  if (!canvasInstance) return res.status(400).send('Canvas not initialized');
  res.set('Content-Type', 'image/png');
  res.send(canvasInstance.toBuffer());
});

app.get('/api/canvas/export/pdf', (req, res) => {
  if (!canvasInstance) return res.status(400).send('Canvas not initialized');
  const pngBuffer = canvasInstance.toBuffer();
  const doc = new PDFDocument({ autoFirstPage: false });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="canvas.pdf"'
    });
    res.send(pdfData);
  });

  doc.addPage({ size: [canvasInstance.width, canvasInstance.height] });
  doc.image(pngBuffer, 0, 0, { width: canvasInstance.width, height: canvasInstance.height });
  doc.end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));