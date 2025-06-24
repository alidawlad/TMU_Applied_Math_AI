'use client';

import React, { useRef, useEffect, useState } from 'react';

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasDimensions = () => {
        const dpr = window.devicePixelRatio || 1;
        // The canvas is fixed and covers the whole viewport
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        
        const ctx = canvas.getContext('2d');
        if(!ctx) return;
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)'; // Red color for annotations
        ctx.lineWidth = 4;
        contextRef.current = ctx;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    const handleClear = () => {
        const context = contextRef.current;
        if (canvas && context) {
          // Resetting the canvas dimensions is a reliable way to clear it
          setCanvasDimensions();
        }
    };
    
    document.addEventListener('clearCanvas', handleClear);

    return () => {
        window.removeEventListener('resize', setCanvasDimensions);
        document.removeEventListener('clearCanvas', handleClear);
    }
  }, []);

  const getEventCoordinates = (event: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if(!canvas) return { x: 0, y: 0 };
    // The canvas is fixed to the viewport, so clientX/Y are the correct coordinates
    if (event instanceof TouchEvent) {
      return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    return { x: event.clientX, y: event.clientY };
  };

  const startDrawing = (event: MouseEvent | TouchEvent) => {
    // Check for primary button on mouse events
    if (event instanceof MouseEvent && event.button !== 0) return;
    event.preventDefault();
    const { x, y } = getEventCoordinates(event);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(x, y);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = (event: MouseEvent | TouchEvent) => {
    if (!isDrawing) return;
    event.preventDefault();
    const { x, y } = getEventCoordinates(event);
    contextRef.current?.lineTo(x, y);
    contextRef.current?.stroke();
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onMouseLeave={finishDrawing}
      onTouchStart={startDrawing}
      onTouchEnd={finishDrawing}
      onTouchMove={draw}
      className="fixed inset-0 z-40"
      style={{ touchAction: 'none' }} // Prevent scrolling on touch devices while drawing
    />
  );
}
