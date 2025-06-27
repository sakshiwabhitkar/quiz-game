const questionsByLevel = [
    // Level 1 Questions (Easy Computer Science)
    [
        {
            question: "Who is the founder of Python?",
            answers: [
                { text: "Dennis Ritchie", correct: false },
                { text: "Bjarne Stroustrup", correct: false },
                { text: "Guido van Rossum", correct: true },
                { text: "James Gosling", correct: false },
            ],
        },
        {
            question: "Which of the following is the fastest memory in a computer?",
            answers: [
                { text: "Hard Disk", correct: false },
                { text: "RAM", correct: false },
                { text: "Cache", correct: true },
                { text: "ROM", correct: false },
            ],
        },
        {
            question: "Which of these is an input device?",
            answers: [
                { text: "Monitor", correct: false },
                { text: "Keyboard", correct: true },
                { text: "Speaker", correct: false },
                { text: "Printer", correct: false },
            ],
        },
        {
            question: "What does 'HTTP' stand for?",
            answers: [
                { text: "HyperText Transfer Protocol", correct: true },
                { text: "Hyper Terminal Transfer Protocol", correct: false },
                { text: "HyperText Transport Protocol", correct: false },
                { text: "Hyper Transport Transfer Protocol", correct: false },
            ],
        },
        {
            question: "Which of the following is the first computer ever made?",
            answers: [
                { text: "ENIAC", correct: false },
                { text: "Z3", correct: true },
                { text: "Mark I", correct: false },
                { text: "Altair 8800", correct: false },
            ],
        },
    ],
    // Level 2 Questions (Basic Python)
    [
        {
            question: "Who developed the Python programming language?",
            answers: [
                { text: "James Gosling", correct: false },
                { text: "Bjarne Stroustrup", correct: false },
                { text: "Guido van Rossum", correct: true },
                { text: "Dennis Ritchie", correct: false },
            ],
        },
        {
            question: "What is the correct file extension for Python files?",
            answers: [
                { text: ".py", correct: true },
                { text: ".java", correct: false },
                { text: ".cpp", correct: false },
                { text: ".txt", correct: false },
            ],
        },
        {
            question: "Which of the following is used to define a block of code in Python?",
            answers: [
                { text: "Curly braces {}", correct: false },
                { text: "Square brackets []", correct: false },
                { text: "Indentation", correct: true },
                { text: "Parentheses ()", correct: false },
            ],
        },
        {
            question: "Which Python keyword is used to define a function?",
            answers: [
                { text: "def", correct: true },
                { text: "function", correct: false },
                { text: "func", correct: false },
                { text: "lambda", correct: false },
            ],
        },
        {
            question: "Which of the following data types is immutable in Python?",
            answers: [
                { text: "List", correct: false },
                { text: "Set", correct: false },
                { text: "String", correct: true },
                { text: "Dictionary", correct: false },
            ],
        },
    ],
    // Level 3 Questions (Java)
    [
        {
            question: "Which of the following is the correct syntax to declare a variable in Java?",
            answers: [
                { text: "int x = 10;", correct: true },
                { text: "var x = 10;", correct: false },
                { text: "integer x = 10;", correct: false },
                { text: "x = 10;", correct: false },
            ],
        },
        {
            question: "What is the default value of a boolean variable in Java?",
            answers: [
                { text: "false", correct: true },
                { text: "true", correct: false },
                { text: "null", correct: false },
                { text: "0", correct: false },
            ],
        },
        {
            question: "Which of the following keywords is used to create an object in Java?",
            answers: [
                { text: "new", correct: true },
                { text: "create", correct: false },
                { text: "object", correct: false },
                { text: "class", correct: false },
            ],
        },
        {
            question: "Which of the following is used to inherit a class in Java?",
            answers: [
                { text: "extends", correct: true },
                { text: "implements", correct: false },
                { text: "inherits", correct: false },
                { text: "inheritsFrom", correct: false },
            ],
        },
        {
            question: "Which of the following is the entry point method in Java?",
            answers: [
                { text: "run()", correct: false },
                { text: "start()", correct: false },
                { text: "main()", correct: true },
                { text: "init()", correct: false },
            ],
        },
    ],
    // Add more levels and questions as needed
];

let currentLevel = 0;
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.querySelector('.question');
const answerButtons = document.querySelector('.answers');
const nextButton = document.getElementById('nextButton');
const quitButton = document.getElementById('quitButton');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
const startPage = document.getElementById('startPage');
const quizPage = document.getElementById('quiz');
const nextLevelPrompt = document.getElementById('nextLevelPrompt');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

startButton.addEventListener('click', () => {
    startPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
    setNextQuestion();
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsByLevel[currentLevel].length) {
        setNextQuestion();
    } else {
        if (currentLevel < questionsByLevel.length - 1) {
            showNextLevelPrompt();
        } else {
            showResult();
        }
    }
});

quitButton.addEventListener('click', () => {
    startPage.classList.remove('hidden');
    quizPage.classList.add('hidden');
    resetState();
});

restartButton.addEventListener('click', () => {
    currentLevel = 0;
    currentQuestionIndex = 0;
    score = 0;
    resultElement.classList.add('hidden');
    quizPage.classList.remove('hidden');
    setNextQuestion();
});

yesButton.addEventListener('click', () => {
    currentLevel++;
    currentQuestionIndex = 0;
    setNextQuestion();
    nextLevelPrompt.classList.add('hidden');
    quizPage.classList.remove('hidden');
});

noButton.addEventListener('click', () => {
    showResult();
    nextLevelPrompt.classList.add('hidden');
});

function setNextQuestion() {
    resetState();
    showQuestion(questionsByLevel[currentLevel][currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('li');
        button.innerText = answer.text;
        button.classList.add('answer');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    quitButton.classList.add('hidden');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer, button) {
    const correct = answer.correct;
    if (correct) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(btn => {
        btn.removeEventListener('click', () => selectAnswer(answer, btn));
    });

    nextButton.classList.remove('hidden');
    quitButton.classList.remove('hidden');
}

function showNextLevelPrompt() {
    quizPage.classList.add('hidden');
    nextLevelPrompt.classList.remove('hidden');
}

function showResult() {
    nextButton.classList.add('hidden');
    quitButton.classList.add('hidden');
    resultElement.classList.remove('hidden');
    scoreElement.innerText = score;
}
