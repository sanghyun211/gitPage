document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById('floorPlan');
    const canvas = document.getElementById('circleCanvas');
    const ctx = canvas.getContext('2d');

    let scale = 1;
    const circle = { x: 200, y: 150, radius: 20 }; // 원의 초기 위치와 반지름

    function resizeCanvas() {
        canvas.width = img.clientWidth;
        canvas.height = img.clientHeight;
        drawCircle();
    }

    function drawCircle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(circle.x / scale, circle.y / scale, circle.radius * scale, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fill();
        ctx.stroke();
    }

    function zoom(event) {
        event.preventDefault();
        const delta = event.deltaY ? -event.deltaY : event.wheelDelta;
        const zoomFactor = 0.1;
        if (delta > 0) {
            scale += zoomFactor;
        } else {
            scale = Math.max(0.1, scale - zoomFactor);
        }
        img.style.transform = `scale(${scale})`;
        resizeCanvas();
    }

    img.addEventListener('load', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
    img.addEventListener('wheel', zoom);

    resizeCanvas();
});
