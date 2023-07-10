const questions = [
    {
        question: "What is the difference between innerHTML and textContent?",
        answers: [
            {
                text: "innerHTML includes the HTML tags, while textContent does not.",
                correct: true,
            },
            {
                text: "innerHTML can be used to modify the DOM, while textContent cannot.",
                correct: false,
            },
            {
                text: "innerHTML is a global property, while textContent is a custom property.",
                correct: false,
            },
            {
                text: "All of the above",
                correct: false,
            },
        ],
    },
    {
        question: "What is the purpose of the prototype property in JavaScript?",
        answers: [
            {
                text: "To modify an object",
                correct: false,
            },
            {
                text: "To inherit properties from another object",
                correct: false,
            },
            {
                text: "To create a new object",
                correct: false,
            },
            {
                text: "To store the prototype of an object",
                correct: true,
            },
        ],
    },
    {
        question: "What is the difference between a constructor function and a regular function in JavaScript?",
        answers: [
            {
                text: "A constructor function cannot be called directly, while a regular function can.",
                correct: false,
            },
            {
                text: "A constructor function has a prototype property, while a regular function does not.",
                correct: false,
            },
            {
                text: " A constructor function is used to create new objects, while a regular function is used to perform an action.",
                correct: true,
            },
            {
                text: "All the above",
                correct: false,
            },
        ],
    },
    {
        question: "What is the purpose of the this keyword in JavaScript?",
        answers: [
            {
                text: "To refer to the global object.",
                correct: false,
            },
            {
                text: "To refer to the current object.",
                correct: true,
            },
            {
                text: "To refer to the window object.",
                correct: false,
            },
            {
                text: "All the above",
                correct: false,
            },
        ],
    },
    {
        question: "What is the difference between === and == in JavaScript?",
        answers: [
            {
                text: "=== checks for strict equality, while == checks for loose equality.",
                correct: true,
            },
            {
                text: "=== can be used with objects, while == cannot.",
                correct: false,
            },
            {
                text: "=== is a newer operator than ==.",
                correct: false,
            },
            {
                text: "All the above",
                correct: false,
            },
        ],
    },
    {
        question: "What is the purpose of the typeof operator in JavaScript?",
        answers: [
            {
                text: "To get the length of a variable.",
                correct: false,
            },
            {
                text: "To get the value of a variable.",
                correct: false,
            },
            {
                text: "To get the type of a variable.",
                correct: true,
            },
            {
                text: "To get the name of a variable.",
                correct: false,
            },
        ],
    },
    {
        question: "What is the difference between NaN and undefined in JavaScript?`;",
        answers: [
            {
                text: "NaN is a global constant, while undefined is a global variable.",
                correct: false,
            },
            {
                text: "NaN is a special value that represents a non-number, while undefined is a special value that represents a variable that has not been assigned a value.",
                correct: true,
            },
            {
                text: "NaN can be used in mathematical operations, while undefined cannot.",
                correct: false,
            },
            {
                text: "All the above",
                correct: false,
            },
        ],
    },
    {
        question: "What is the purpose of the isNaN() function in JavaScript?",
        answers: [
            {
                text: "To check if a value is a string.",
                correct: false,
            },
            {
                text: "To check if a value is an object.",
                correct: false,
            },
            {
                text: "To check if a value is undefined.",
                correct: false,
            },
            {
                text: "To check if a value is a number.",
                correct: true,
            },
        ],
    },
    {
        question: "What is the purpose of the setTimeout() function in JavaScript?",
        answers: [
            {
                text: "To delay the execution of a function.",
                correct: true,
            },
            {
                text: "To cancel the execution of a function.",
                correct: false,
            },
            {
                text: "To repeat the execution of a function.",
                correct: false,
            },
            {
                text: "To stop the execution of a function.",
                correct: false,
            },
        ],
    },
    {
        question: "What is the purpose of the addEventListener() method in JavaScript?",
        answers: [
            {
                text: "To add an event listener to an element.",
                correct: true,
            },
            {
                text: "To remove an event listener from an element.",
                correct: false,
            },
            {
                text: "To modify an event listener on an element.",
                correct: false,
            },
            {
                text: "To listen for events on an element.",
                correct: false,
            },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();