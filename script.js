const questions = [
    {
        question: "Какой метод используется для выбора элемента по ID?",
        answers: ["querySelector", "getElementById", "getElementsByClassName", "findElement"],
        correct: 1
    },
    {
        question: "Какой тег подключает внешний CSS файл?",
        answers: ["<style>", "<script>", "<link>", "<css>"],
        correct: 2
    },
    {
        question: "Что означает аббревиатура HTML?",
        answers: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink Text Mode Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultEl = document.getElementById('result');
const restartBtn = document.getElementById('restart');

function loadQuestion() {
    resultEl.textContent = '';
    answersEl.innerHTML = '';
    restartBtn.style.display = 'none';

    if (currentIndex >= questions.length) {
        showScore();
        return;
    }

    const q = questions[currentIndex];
    questionEl.textContent = q.question;

    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.addEventListener('click', () => selectAnswer(index));
        answersEl.appendChild(btn);
    });
}

function selectAnswer(selected) {
    const q = questions[currentIndex];
    const buttons = answersEl.querySelectorAll('button');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.correct) {
            btn.style.background = '#d4edda';
            btn.style.borderColor = '#28a745';
        } else if (idx === selected) {
            btn.style.background = '#f8d7da';
            btn.style.borderColor = '#dc3545';
        }
    });

    if (selected === q.correct) {
        score++;
        resultEl.textContent = '✅ Верно!';
        resultEl.style.color = '#28a745';
    } else {
        resultEl.textContent = '❌ Неверно.';
        resultEl.style.color = '#dc3545';
    }

    setTimeout(() => {
        currentIndex++;
        loadQuestion();
    }, 1200);
}

function showScore() {
    questionEl.textContent = 'Викторина завершена! 🎉';
    resultEl.textContent = `Твой результат: ${score} из ${questions.length}`;
    resultEl.style.color = '#333';
    restartBtn.style.display = 'inline-block';
}

restartBtn.addEventListener('click', () => {
    currentIndex = 0;
    score = 0;
    loadQuestion();
});

loadQuestion();