import Webcam from "react-webcam";
import Layout from "./Layout";
import React, { useRef, useEffect } from 'react';
// import '../components/styles/uwu.css'; 
const container: React.CSSProperties = {
    position: "relative",
};
const stack: React.CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0"
};

const textScript: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Set canvas size
        canvas.width = 640;
        canvas.height = 480;

        // Draw a circle
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 50;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'blue';
        context.fill();
        context.stroke();
    }, []);

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

export default textScript;
