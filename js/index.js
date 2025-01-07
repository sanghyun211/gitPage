document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById('floorPlan');
    const canvas = document.getElementById('circleCanvas');
    const ctx = canvas.getContext('2d');

    let scale = 1;
    const circle = { x: 0.5, y: 0.5, radius: 20 }; // 원의 초기 위치 (비율로 설정)
    let isDragging = false;
    let startX, startY;
    let imgX = 0, imgY = 0;

    function resizeCanvas() {
        canvas.width = img.clientWidth;
        canvas.height = img.clientHeight;
        drawCircle();
    }

    function drawCircle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(circle.x * canvas.width, circle.y * canvas.height, circle.radius, 0, 2 * Math.PI);
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
        img.style.transform = `translate(${imgX}px, ${imgY}px) scale(${scale})`;
        canvas.style.transform = `translate(${imgX}px, ${imgY}px) scale(${scale})`;
    }

    function startDrag(event) {
        if (event.button !== 0) return; // 좌클릭이 아닌 경우 무시
        isDragging = true;
        startX = event.clientX - imgX;
        startY = event.clientY - imgY;
        img.style.cursor = 'grabbing';
    }

    function drag(event) {
        if (isDragging) {
            imgX = event.clientX - startX;
            imgY = event.clientY - startY;
            img.style.transform = `translate(${imgX}px, ${imgY}px) scale(${scale})`;
            canvas.style.transform = `translate(${imgX}px, ${imgY}px) scale(${scale})`;
        }
    }

    function endDrag() {
        isDragging = false;
        img.style.cursor = 'grab';
    }

    function fitImageToContainer() {
        const container = img.parentElement;
        const containerAspectRatio = container.clientWidth / container.clientHeight;
        const imageAspectRatio = img.naturalWidth / img.naturalHeight;

        if (containerAspectRatio > imageAspectRatio) {
            img.style.width = 'auto';
            img.style.height = '100%';
        } else {
            img.style.width = '100%';
            img.style.height = 'auto';
        }

        imgX = 0;
        imgY = 0;
        img.style.transform = `translate(${imgX}px, ${imgY}px) scale(${scale})`;
        canvas.style.transform = `translate(${imgX}px, ${imgY}px) scale(${scale})`;
    }

    function moveCircle(direction) {
        switch (direction) {
            case 'left':
                circle.x = Math.max(0, circle.x - 0.1);
                break;
            case 'right':
                circle.x = Math.min(1, circle.x + 0.1);
                break;
            case 'center':
                circle.x = 0.5;
                break;
        }
        drawCircle();
    }

    document.getElementById('moveLeft').addEventListener('click', () => moveCircle('left'));
    document.getElementById('moveRight').addEventListener('click', () => moveCircle('right'));
    document.getElementById('moveCenter').addEventListener('click', () => moveCircle('center'));

    img.addEventListener('load', () => {
        fitImageToContainer();
        resizeCanvas();
    });
    window.addEventListener('resize', () => {
        fitImageToContainer();
        resizeCanvas();
    });
    img.addEventListener('wheel', zoom);
    img.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', endDrag);
    img.addEventListener('dragstart', (event) => event.preventDefault()); // 이미지 드래그 복사 방지

    resizeCanvas();
});