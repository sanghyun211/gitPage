document.addEventListener("DOMContentLoaded", function () {
    const img = document.getElementById('floorPlan');
    const canvas = document.getElementById('circleCanvas');
    const ctx = canvas.getContext('2d');

    let scale = 1;
    const circle = { x: 0.5, y: 0.5, radius: 20 }; // 원의 초기 위치 (비율로 설정)
    let isDragging = false;
    let startX, startY;
    let imgX = 0, imgY = 0;

    // 캔버스 크기 조정 및 원 그리기
    function resizeCanvas() {
        canvas.width = img.clientWidth;
        canvas.height = img.clientHeight;
        drawCircle();
    }

    // 원 그리기 함수
    function drawCircle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(circle.x * canvas.width, circle.y * canvas.height, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fill();
        ctx.stroke();
    }

    // 이미지 확대/축소 함수
    function zoom(event) {
        event.preventDefault();
        const delta = event.deltaY ? -event.deltaY : event.wheelDelta;
        const zoomFactor = 0.1;
        if (delta > 0) {
            scale += zoomFactor;
        } else {
            scale = Math.max(0.1, scale - zoomFactor);
        }
        if (scale < 1) {
            scale = 1;
        }
        scale = Math.round(scale * 10) / 10;
        imageChange();
    }

    // 드래그 시작 함수
    function startDrag(event) {
        if (event.button !== 0) return; // 좌클릭이 아닌 경우 무시
        isDragging = true;
        startX = event.clientX - imgX;
        startY = event.clientY - imgY;
        img.style.cursor = 'grabbing';
    }

    // 드래그 중 함수
    function drag(event) {
        if (isDragging) {
            imgX = event.clientX - startX;
            imgY = event.clientY - startY;
            imageChange();
        }
    }

    // 이미지 조정
    function imageChange() {
        const containerRect = img.parentElement.getBoundingClientRect(); // 부모 컨테이너의 위치와 크기를 가져옴
        const imgRect = img.getBoundingClientRect(); // 이미지의 위치와 크기를 가져옴

        if (imgRect.left == containerRect.left) {
            console.log(`딱 붙음 scale ${scale} imgX${imgX}}`);
        } 

        if (imgRect.left > containerRect.left) {
            console.log(`imgRect.left = ${imgRect.left} containerRect.left = ${containerRect.left}`);
            if (imgX > (410 * scale - 410)){
                imgX = 410 * scale - 410;
            }
        }

        if (imgRect.left > containerRect.left) {
            // console.log(containerRect.left, imgRect.left);
            // console.log(`!!!!!!!!!!왼쪽 넘어감 imgX = ${imgX} scale = ${scale}`);
            // console.log(`containerRect.left = ${containerRect.left} imgRect.left = ${imgRect.left}`);
        }

        // 이미지와 캔버스의 변환 스타일을 업데이트하여 새로운 위치로 이동
        img.style.transform = `translate(${imgX}px, ${imgY}px) scale(${scale})`;
        canvas.style.transform = `translate(${imgX}px, ${imgY}px) scale(${scale})`;
    }

    // 드래그 종료 함수
    function endDrag() {
        isDragging = false;
        img.style.cursor = 'grab';
    }

    // 이미지 컨테이너에 맞게 조정하는 함수
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

    // 원의 위치를 이동시키는 함수
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

    // 버튼 클릭 이벤트 리스너 추가
    document.getElementById('moveLeft').addEventListener('click', () => moveCircle('left'));
    document.getElementById('moveRight').addEventListener('click', () => moveCircle('right'));
    document.getElementById('moveCenter').addEventListener('click', () => moveCircle('center'));

    // 이미지 로드 및 창 크기 변경 이벤트 리스너 추가
    img.addEventListener('load', () => {
        fitImageToContainer();
        resizeCanvas();
    });
    window.addEventListener('resize', () => {
        fitImageToContainer();
        resizeCanvas();
    });

    // 이미지 확대/축소 및 드래그 이벤트 리스너 추가
    img.addEventListener('wheel', zoom);
    img.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', endDrag);
    img.addEventListener('dragstart', (event) => event.preventDefault()); // 이미지 드래그 복사 방지

    // 초기 캔버스 크기 조정
    resizeCanvas();
});