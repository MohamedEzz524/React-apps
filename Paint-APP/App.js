import React, { useEffect, useState, useRef } from "react";
import "./App.css";

export default function App() {
  const canvasRef = useRef(null); //{2: start make selector to canvas}
  const ctxRef = useRef(null); //{3: this will be copy fo canvas context}
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5); // initial states
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d"); //{4: Setting Configuration Of inputValues Canvas}
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);

  // Function for starting the drawing
  const startDrawing = (e) => {
    ctxRef.current.beginPath(); //beginPath(): will start drawing at canvas
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //it will
    setIsDrawing(true);
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath(); //closePath(): will stop drawing on canvas
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  return (
    //{1: make draw-area (tools)&(canvas drawing area)}
    <div className="App">
      <h1>Paint App</h1>
      <div className="draw-area">
        <div className="Menu">
          <label>Brush Color </label>
          <input
            type="color"
            onChange={(e) => {
              setLineColor(e.target.value);
            }}
          />
          <label>Brush Width </label>
          <input
            type="range"
            min="3"
            max="20"
            onChange={(e) => {
              setLineWidth(e.target.value);
            }}
          />
          <label>Brush Opacity</label>
          <input
            type="range"
            min="1"
            max="100"
            onChange={(e) => {
              setLineOpacity(e.target.value / 100);
            }}
          />
        </div>
        {/* onmousedown:click, onmouseup:releaseClick, onmousemove: move mouse normally without clicking*/}
        <canvas
          onMouseDown={(e) => startDrawing(e)}
          onMouseUp={endDrawing}
          onMouseMove={(e) => draw(e)}
          ref={canvasRef}
          width={`1280px`}
          height={`720px`}
        />
      </div>
    </div>
  );
}
