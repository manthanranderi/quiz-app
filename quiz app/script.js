
const questions = [
    {
        question: " Which function is used to serialize an object into a JSON string in Javascript?",
        answers: [
            { text: "Strigyfy", correct: true },
            { text: "parse", correct: false },
            { text: "convert", correct: false },
            { text: "none of the above", correct: false },
        ]
    },
    {
        question: "Which is the smallest Which object in Javascript doesnt have a prototype?",
        answers: [
            { text: "base object", correct: true },
            { text: "all object prototype", correct: false },
            { text: "None of the above", correct: false },
            { text: "none of the object prototype", correct: false },
        ]
    },
    {
        question: "Which of the following are closures in Javascript?",
        answers: [
            { text: "variable", correct: false },
            { text: "function", correct: false },
            { text: "objects", correct: false },
            { text: "all of the above", correct: true },
        ]
    },
    {
        question: "Which of the following is not a Javascript framework?",
        answers: [
            { text: "node", correct: false },
            { text: "vue", correct: false },
            { text: "react", correct: false },
            { text: "casandra", correct: true },
        ]
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        answers: [
            { text: "document.write", correct: false },
            { text: "console.log()", correct: false },
            { text: "window alert()", correct: false },
            { text: "all of the above", correct: true },
        ]
    },
];

console.log("Questions Loaded:", questions);

//dom target
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timer = document.getElementById("timer");

let m;
let s;
let timerId;

function startTimer() {
    console.log("start timer");

    clearInterval(timerId);
    m = 4;
    s = 59;

    timerId = setInterval(function () {
        s--;

        if (s < 0) {
            s = 59;
            m--;
        }

        console.log(`Timer: ${m}:${s}`);

        if (m == 0 && s == 0) {
            clearInterval(timerId);
            console.log("Time Over");
            alert("Time khatam ho gaya!");
            showScore();
        }

        timer.innerHTML = "0" + m + ":" + (s < 10 ? "0" + s : s);
    }, 1000);
}

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    console.log("Quiz Started");
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    startTimer();
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    console.log("Showing Question:", questionNo, currentQuestion.question);
    console.log("Answers:", currentQuestion.answers);

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        console.log("Answer Option:", answer.text, "Correct:", answer.correct);

        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    console.log("Answer Clicked:", selectedBtn.innerText);
    console.log("Is Correct:", isCorrect);

    if (isCorrect) {
        score++;
        console.log("Score Updated:", score);
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    clearInterval(timerId);

    console.log("Quiz Finished");
    console.log("Final Score:", score);

    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    console.log("Next Button Clicked, Index:", currentQuestionIndex);

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
