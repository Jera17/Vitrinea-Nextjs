import React, { useEffect, useRef } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

const FaceMeshComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (!canvas || !video) {
            return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        canvas.width = 640;
        canvas.height = 480;

        const onResultsFaceMesh = (results: any) => {
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

            if (results.multiFaceLandmarks) {
                for (let i = 0; i < results.multiFaceLandmarks[0].length; i++) {
                    const x = results.multiFaceLandmarks[0][i].x * canvas.width;
                    const y = results.multiFaceLandmarks[0][i].y * canvas.height;

                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, 2 * Math.PI);
                    ctx.fillStyle = 'blue';
                    ctx.fill();
                    ctx.stroke();
                }
            }

            ctx.restore();
        };

        const faceMesh = new FaceMesh({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`,
        });

        faceMesh.onResults(onResultsFaceMesh);

        const camera = new Camera(video, {
            onFrame: async () => {
                await faceMesh.send({ image: video });
            },
            width: 480,
            height: 480,
        });

        camera.start();

        return () => {
            // Cleanup logic, e.g., stopping the camera
            camera.stop();
        };
    }, []);

    return (
        <div>
            <video
                ref={videoRef}
                className="input_video"
                style={{ display: 'none' }}
                width={640}
                height={480}
            />
            <canvas ref={canvasRef} width={640} height={480} />
        </div>
    );
};

export default FaceMeshComponent;
