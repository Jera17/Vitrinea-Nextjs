async function getCameraProperties() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const track = stream.getVideoTracks()[0];

        const cameraProperties = {
            width: track.getSettings().width,
            height: track.getSettings().height,
        };

        stream.getTracks().forEach(track => track.stop());
        return cameraProperties;
    } catch (error) {
        console.error('Error accessing webcam:', error);
        return null;
    }
}

module.exports = getCameraProperties;
