import React, { useState } from 'react';
import './App.css';

function App() {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [rect, setRect] = useState({ x: 50, y: 50, width: 100, height: 100, color: 'red' });
  const [text, setText] = useState({ text: "Hello", x: 200, y: 200, fontSize: 24, color: "blue" });
  const [previewUrl, setPreviewUrl] = useState('');
  const [canvasInitialized, setCanvasInitialized] = useState(false);

  const API_URL = 'http://localhost:5000/api';

  const initCanvas = async () => {
    await fetch(`${API_URL}/canvas/init`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ width, height })
    });
    setCanvasInitialized(true);
    setPreviewUrl('');
  };

  const addRectangle = async () => {
    await fetch(`${API_URL}/canvas/add/rectangle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rect)
    });
    updatePreview();
  };

  const addText = async () => {
    await fetch(`${API_URL}/canvas/add/text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(text)
    });
    updatePreview();
  };

  const updatePreview = () => {
    setPreviewUrl(`${API_URL}/canvas/preview?${Date.now()}`);
  };

  const exportPDF = () => {
    window.open(`${API_URL}/canvas/export/pdf`, '_blank');
  };

  return (
    <div className="App">
      <h1>Canvas Builder</h1>
      <div className="controls">
        <h2>Canvas</h2>
        <label>Width: <input type="number" value={width} onChange={e=>setWidth(Number(e.target.value))}/></label>
        <label>Height: <input type="number" value={height} onChange={e=>setHeight(Number(e.target.value))}/></label>
        <button onClick={initCanvas}>Initialize Canvas</button>
      </div>

      {canvasInitialized && (
        <>
          <div className="controls">
            <h2>Add Rectangle</h2>
            <label>X: <input type="number" value={rect.x} onChange={e=>setRect({...rect, x: Number(e.target.value)})}/></label>
            <label>Y: <input type="number" value={rect.y} onChange={e=>setRect({...rect, y: Number(e.target.value)})}/></label>
            <label>Width: <input type="number" value={rect.width} onChange={e=>setRect({...rect, width: Number(e.target.value)})}/></label>
            <label>Height: <input type="number" value={rect.height} onChange={e=>setRect({...rect, height: Number(e.target.value)})}/></label>
            <label>Color: <input type="text" value={rect.color} onChange={e=>setRect({...rect, color: e.target.value})}/></label>
            <button onClick={addRectangle}>Add Rectangle</button>
          </div>
          <div className="controls">
            <h2>Add Text</h2>
            <label>Text: <input type="text" value={text.text} onChange={e=>setText({...text, text: e.target.value})}/></label>
            <label>X: <input type="number" value={text.x} onChange={e=>setText({...text, x: Number(e.target.value)})}/></label>
            <label>Y: <input type="number" value={text.y} onChange={e=>setText({...text, y: Number(e.target.value)})}/></label>
            <label>Font Size: <input type="number" value={text.fontSize} onChange={e=>setText({...text, fontSize: Number(e.target.value)})}/></label>
            <label>Color: <input type="text" value={text.color} onChange={e=>setText({...text, color: e.target.value})}/></label>
            <button onClick={addText}>Add Text</button>
          </div>
          <div className="controls">
            <button onClick={updatePreview}>Update Preview</button>
            <button onClick={exportPDF}>Export as PDF</button>
          </div>
          <div>
            <h2>Canvas Preview</h2>
            {previewUrl && <img src={previewUrl} alt="Canvas Preview" width={width} height={height} style={{border: '1px solid #ccc'}}/>}
          </div>
        </>
      )}
    </div>
  );
}

export default App;