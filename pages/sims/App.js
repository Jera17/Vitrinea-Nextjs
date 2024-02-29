const video = document.getElementsByClassName('input_video')[0];
const canvas = document.querySelector("#pose-canvas")
const ctx = canvas.getContext("2d")

canvas.width = 640
canvas.height = 480

function onResultsFaceMesh(results) {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
      results.image, 0, 0, canvas.width, canvas.height);
  if (results.multiFaceLandmarks) {
    for (let i = 0; i < results.multiFaceLandmarks[0].length; i++) {
      let x = results.multiFaceLandmarks[0][i].x * canvas.width
      let y = results.multiFaceLandmarks[0][i].y * canvas.height
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.stroke();

    }
  }
  ctx.restore();
}

const faceMesh = new FaceMesh({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`;
}});
faceMesh.onResults(onResultsFaceMesh);

const camera = new Camera(video, {
  onFrame: async () => {
    await faceMesh.send({image: video});
  },
  width: 480,
  height: 480
});
camera.start();
