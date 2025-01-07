document.addEventListener("DOMContentLoaded", function() {
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    const form = document.getElementById('mbti-form');
    const resultDiv = document.getElementById('result');
    const questions = document.querySelectorAll('.question');
    let currentQuestion = 0;
    let answers = {};

    startButton.addEventListener('click', () => {
        startScreen.style.opacity = 0;
        setTimeout(() => {
            startScreen.style.display = 'none';
            form.style.display = 'block';
            form.style.opacity = 1;
        }, 500);
    });

    questions.forEach((question, index) => {
        const buttons = question.querySelectorAll('.option');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');
                answers[`q${index + 1}`] = value;

                if (index < questions.length - 1) {
                    questions[index].style.opacity = 0;
                    setTimeout(() => {
                        questions[index].style.display = 'none';
                        questions[index + 1].style.display = 'block';
                        questions[index + 1].style.opacity = 1;
                    }, 500);
                } else {
                    form.querySelector('button[type="submit"]').style.display = 'block';
                }
            });
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const mbti = answers.q1 + answers.q2 + answers.q4 + answers.q3;

        form.style.opacity = 0;
        setTimeout(() => {
            form.style.display = 'none';
            resultDiv.textContent = `당신의 MBTI 유형은 ${mbti}입니다.`;
            resultDiv.style.display = 'block';
            resultDiv.style.opacity = 1;
        }, 500);
    });
});
