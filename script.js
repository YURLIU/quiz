document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "1. Яка гра є найпопулярнішою у світі серед будівельних ігор?",
            answers: ["Fortnite", "Minecraft", "Roblox", "Dota 2"],
            correct: 1
        },
        {
            question: "2. Яка головна ціль у режимі “розмінування бомби” у грі Counter-Strike?",
            answers: ["Зібрати більше вбивств", "Встановити прапор", "Встановити або знешкодити бомбу", "Вижити 5 хвилин"],
            correct: 2
        },
        {
            question: "3. Який із цих режимів у грі Brawl Stars є командним форматом 3 на 3?",
            answers: ["Бій з босом", "Захоплення кристалів", "Королівська битва", "Одиночне виживання"],
            correct: 1
        },
        {
            question: "4. Який блок найчастіше використовується для створення перших інструментів у грі Minecraft?",
            answers: ["Залізо", "Камінь", "Дерево", "Алмаз"],
            correct: 2
        },
        {
            question: "5. Хто є головним антагоністом у грі Among Us?",
            answers: ["Капітан", "Імпостер", "Інженер", "Пілот"],
            correct: 1
        },
        {
            question: "6. З чим найчастіше пов’язана серія ігор Resident Evil?",
            answers: ["Будівництво міст", "Зомбі та виживання", "Гонки", "Спорт"],
            correct: 1
        },
        {
            question: "7. Що є головною метою в грі 7 Days to Die?",
            answers: ["Будувати літаки", "Виживати під час хвиль зомбі", "Шукати скарби", "Проходити рівні"],
            correct: 1
        },
        {
            question: "8. Яка головна механіка гри Portal 2?",
            answers: ["Створення порталів для переміщення", "Будівництво бази", "Гонки", "Виживання проти зомбі"],
            correct: 0
        },
        {
            question: "9. Скільки гравців у кожній команді в Dota 2?",
            answers: ["3", "4", "5", "6"],
            correct: 2
        },
        {
            question: "10. Що є головною метою гри R.E.P.O. (кооперативний режим)?",
            answers: ["Будувати міста", "Виживати і виконувати завдання разом", "Грати футбол", "Проходити історію без бою"],
            correct: 1
        }
    ];

    const questionText = document.querySelector("#question-text");
    const answersContainer = document.querySelector("#answers-container");
    const startBtn = document.querySelector("#start-btn");
    const startScreen = document.querySelector("#start-screen");
    const quizScreen = document.querySelector("#quiz-screen");
    const resultScreen = document.querySelector("#result-screen");
    const restartBtn = document.querySelector("#restart-btn");
    const resultText = document.querySelector("#result-text");
    const scoreDisplay = document.querySelector("#score");
    const timerDisplay = document.querySelector("#timer");
    const progressDisplay = document.querySelector("#progress");

    let score = 0;
    let questionIndex = 0;
    let timer = 15;
    let interval;

    let userName = "";

    function showQuestion(question) {
        clearInterval(interval);
        timer = 15;
        timerDisplay.textContent = `Час: ${timer}`;

        progressDisplay.textContent = `Питання ${questionIndex + 1} / ${questions.length}`;

        answersContainer.innerHTML = "";
        questionText.textContent = question.question;

        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.classList.add("answer-btn");

            button.addEventListener("click", () => checkAnswer(index));
            answersContainer.appendChild(button);
        });

        startTimer();
    }

    function startTimer() {
        interval = setInterval(() => {
            timer--;
            timerDisplay.textContent = `Час: ${timer}`;

            if (timer <= 5) {
                timerDisplay.classList.add("red");
            } else {
                timerDisplay.classList.remove("red");
            }

            if (timer <= 0) {
                clearInterval(interval);

                document.querySelectorAll(".answer-btn").forEach(btn => btn.disabled = true);

                setTimeout(nextQuestion, 1000);
            }
        }, 1000);
    }

    function checkAnswer(selectedIndex) {
        clearInterval(interval);

        const correctIndex = questions[questionIndex].correct;
        const buttons = document.querySelectorAll(".answer-btn");

        buttons.forEach((btn, index) => {
            btn.disabled = true;

            if (index === correctIndex) btn.classList.add("correct");
            if (index === selectedIndex && index !== correctIndex) btn.classList.add("wrong");
        });

        if (selectedIndex === correctIndex) {
            score++;
            scoreDisplay.textContent = `Бали: ${score}`;
        }

        setTimeout(nextQuestion, 1500);
    }

    function nextQuestion() {
        questionIndex++;

        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    function showResult() {
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.textContent = `${userName}, твій результат: ${score}/${questions.length} (${accuracy}%)`;

        quizScreen.classList.add("hide");
        resultScreen.classList.remove("hide");
    }

    function startGame() {
        userName = prompt("Введи своє ім’я:");
        if (!userName) userName = "Гравець";

        score = 0;
        questionIndex = 0;
        scoreDisplay.textContent = "Бали: 0";

        startScreen.classList.add("hide");
        resultScreen.classList.add("hide");
        quizScreen.classList.remove("hide");

        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", startGame);
});
