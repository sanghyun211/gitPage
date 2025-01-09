document.addEventListener("DOMContentLoaded", () => {
    // EmailJS 초기화 (user ID를 넣으세요)
    emailjs.init("아이디");

    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // 폼 기본 동작 방지

        // Form 데이터 가져오기
        const name = document.getElementById("name").value;
        const message = document.getElementById("message").value;

        // EmailJS로 데이터 보내기
        emailjs.send("서비스아이디", "템플릿아이디", {
            from_name: name,
            message: message,
        }).then(
            function(response) {
                console.log("SUCCESS!", response.status, response.text);
                alert("Email sent successfully!");
            },
            function(error) {
                console.log("FAILED...", error);
                alert("Failed to send email. Please try again later.");
            }
        );
    });
});
