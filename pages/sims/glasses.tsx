import React, { useRef, useEffect, useState } from 'react';
import getCameraProperties from './glasses.js';
import Webcam from "react-webcam";
import Layout from "./Layout";
const container: React.CSSProperties = {
  position: "relative",
};
const stack: React.CSSProperties = {
  position: "absolute",
  top: "0",
  left: "0"
};
const Glasses: React.FC = () => {
  const [cameraProperties, setCameraProperties] = useState<any | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const properties = await getCameraProperties(cameraProperties);
      setCameraProperties(properties);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const setCanvasSize = async () => {
      if (!cameraProperties) {
        // If cameraProperties are not available, wait for them
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      // Set canvas size
      canvas.width = cameraProperties.width;
      canvas.height = cameraProperties.height;

      // Draw a circle
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 50;

      context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'blue';
      context.fill();
      context.stroke();
    };

    setCanvasSize();
  }, [cameraProperties]);
  return (
    <>
      <Layout title="Ts test">
        <div>
          <h1>Canvas Component</h1>
          <div style={container}>
            <div style={stack}>
              <Webcam mirrored={true} className="input_video" />
            </div>
            <div style={stack}>
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Glasses;