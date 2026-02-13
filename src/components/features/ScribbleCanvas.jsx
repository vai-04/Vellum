import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import useVellumStore from '../../store/vellumStore';
import { Trash2, Type, Circle } from 'lucide-react';
import './ScribbleCanvas.css';

const ScribbleCanvas = () => {
  const { scribbles, addScribble, updateScribble, deleteScribble } = useVellumStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [tool, setTool] = useState('draw'); // 'draw', 'text', 'shape'
  const [textInput, setTextInput] = useState({ show: false, x: 0, y: 0, value: '' });
  const canvasRef = useRef(null);

  const handleMouseDown = (e) => {
    if (tool === 'text') {
      setTextInput({
        show: true,
        x: e.clientX,
        y: e.clientY,
        value: ''
      });
      return;
    }

    if (tool === 'draw') {
      setIsDrawing(true);
      const rect = canvasRef.current.getBoundingClientRect();
      setCurrentPath([{
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || tool !== 'draw') return;

    const rect = canvasRef.current.getBoundingClientRect();
    setCurrentPath([...currentPath, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }]);
  };

  const handleMouseUp = () => {
    if (isDrawing && currentPath.length > 1) {
      addScribble({
        type: 'draw',
        path: currentPath,
        color: 'var(--lavender-frost)'
      });
      setCurrentPath([]);
    }
    setIsDrawing(false);
  };

  const handleTextSubmit = () => {
    if (textInput.value.trim()) {
      addScribble({
        type: 'text',
        content: textInput.value,
        x: textInput.x,
        y: textInput.y,
        fontSize: 16,
        color: 'var(--text-primary)'
      });
    }
    setTextInput({ show: false, x: 0, y: 0, value: '' });
  };

  const handleAddShape = () => {
    const centerX = canvasRef.current.offsetWidth / 2;
    const centerY = canvasRef.current.offsetHeight / 2;
    
    addScribble({
      type: 'shape',
      shape: 'circle',
      x: centerX,
      y: centerY,
      radius: 50,
      color: 'var(--mint-cognition)'
    });
  };

  return (
    <div className="scribble-canvas">
      {/* Toolbar */}
      <motion.div 
        className="scribble-canvas__toolbar glass-surface"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          className={`scribble-canvas__tool ${tool === 'draw' ? 'active' : ''}`}
          onClick={() => setTool('draw')}
          title="Draw"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 17 L17 3" />
          </svg>
        </button>
        
        <button
          className={`scribble-canvas__tool ${tool === 'text' ? 'active' : ''}`}
          onClick={() => setTool('text')}
          title="Add Text"
        >
          <Type size={20} />
        </button>
        
        <button
          className="scribble-canvas__tool"
          onClick={handleAddShape}
          title="Add Shape"
        >
          <Circle size={20} />
        </button>

        <div className="scribble-canvas__divider"></div>

        <button
          className="scribble-canvas__tool scribble-canvas__tool--danger"
          onClick={() => scribbles.forEach(s => deleteScribble(s.id))}
          title="Clear All"
        >
          <Trash2 size={20} />
        </button>
      </motion.div>

      {/* Canvas */}
      <motion.div
        ref={canvasRef}
        className="scribble-canvas__board glass-surface"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <svg className="scribble-canvas__svg">
          {/* Existing scribbles */}
          {scribbles.map((scribble) => {
            if (scribble.type === 'draw' && scribble.path) {
              const pathString = scribble.path
                .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
                .join(' ');
              
              return (
                <path
                  key={scribble.id}
                  d={pathString}
                  stroke={scribble.color}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                />
              );
            }
            
            if (scribble.type === 'shape' && scribble.shape === 'circle') {
              return (
                <circle
                  key={scribble.id}
                  cx={scribble.x}
                  cy={scribble.y}
                  r={scribble.radius}
                  stroke={scribble.color}
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                />
              );
            }
            
            return null;
          })}

          {/* Current drawing path */}
          {isDrawing && currentPath.length > 1 && (
            <path
              d={currentPath.map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')}
              stroke="var(--lavender-frost)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          )}
        </svg>

        {/* Text scribbles */}
        {scribbles.map((scribble) => {
          if (scribble.type === 'text') {
            return (
              <div
                key={scribble.id}
                className="scribble-canvas__text"
                style={{
                  left: scribble.x,
                  top: scribble.y,
                  fontSize: scribble.fontSize,
                  color: scribble.color
                }}
              >
                {scribble.content}
              </div>
            );
          }
          return null;
        })}

        {/* Placeholder hint */}
        {scribbles.length === 0 && !isDrawing && (
          <div className="scribble-canvas__placeholder">
            <p className="cinematic-text">This is your thinking space</p>
            <p>Capture chaos before structure</p>
          </div>
        )}
      </motion.div>

      {/* Text Input Popup */}
      {textInput.show && (
        <div
          className="scribble-canvas__text-input glass-surface"
          style={{
            position: 'fixed',
            left: textInput.x,
            top: textInput.y
          }}
        >
          <input
            type="text"
            value={textInput.value}
            onChange={(e) => setTextInput({ ...textInput, value: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTextSubmit();
              if (e.key === 'Escape') setTextInput({ show: false, x: 0, y: 0, value: '' });
            }}
            placeholder="Type your thought..."
            autoFocus
          />
          <div className="scribble-canvas__text-input-actions">
            <button onClick={handleTextSubmit}>Add</button>
            <button onClick={() => setTextInput({ show: false, x: 0, y: 0, value: '' })}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScribbleCanvas;
