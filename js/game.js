const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-content'));
const questionCounterText = document.getElementById('question-counter');
const scoreText = document.getElementById('score');

let quizOption1 = document.getElementById("option-1");
let quizOption2 = document.getElementById("option-2");
let quizOption3 = document.getElementById("option-3");
let quizOption4 = document.getElementById("option-4");


let currentQuestion = {};
let score = 0;
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];
let finalScoreVariable = 0;


let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<js>',
        choice2: '<script>',
        choice3: '<scripting>',
        choice4: 'javascript',
        answer: 2
    },

    {
        question: 'How would you refer to an external style sheet in HTML?',
        choice1: ' <link rel="stylesheet" type="text/css" href="mystyle.css">',
        choice2: ' <stylesheet>mystyle.css</stylesheet>',
        choice3: ' <style src="mystyle.css">',
        choice4: 'None of the above ',
        answer: 1
    },

    {
        question: 'Where is the correct place to insert a JavaScript?',
        choice1: 'The <head> section',
        choice2: 'The <body> section',
        choice3: 'Both <head> and <body>',
        choice4: 'None is correct',
        answer: 3
    },

    {
        question: 'How would you refer to an external script called "xxx.js"?',
        choice1: '<script src="xxx.js"> ',
        choice2: '<script name="xxx.js">',
        choice3: '<scrip href="xxx.js">',
        choice4: '<javascript tag="xxx.js">',
        answer: 1
    },

    {
        question: 'The external JavaScript file must contain the <script> tag',
        choice1: 'True',
        choice2: 'False',
        choice3: 'Neither True nor False',
        choice4: 'Either True or False',
        answer: 2
    },

    {
        question: 'What does HTML stand for?',
        choice1: 'Hyperlinks and Text Markup Language',
        choice2: 'HyperText Markup Language',
        choice3: 'Home Tool Markup Language',
        choice4: 'All of the above',
        answer: 2
    },

    {
        question: 'Who is making the Web standards?',
        choice1: 'Microsoft',
        choice2: 'Mozilla',
        choice3: 'The WWWC',
        choice4: 'It is a joint effort',
        answer: 3
    },

    {
        question: 'Choose the correct HTML element for the largest heading:',
        choice1: '<h1>',
        choice2: '<head>',
        choice3: '<h6>',
        choice4: '<heading>',
        answer: 1
    },

    {
        question: 'What is the correct HTML element for inserting a line break?',
        choice1: '<br>',
        choice2: '<break>',
        choice3: '<lb>',
        choice4: '<line-break>',
        answer: 1
    },

    {
        question: 'What is the correct HTML for adding a background color?',
        choice1: ' <body style="background-color:yellow;">',
        choice2: ' <body bg="yellow">',
        choice3: ' <background>yellow</background>',
        choice4: 'None',
        answer: 1
    },
    
];

const questionsLength = questions.length;

const correctScoreBonus = 10;
const maxQuestions = 6;

function startGame() {
    finalScoreVariable = 0;
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    localStorage.clear();
    getNewQuestion();
    
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        return window.location.assign('../gameover.html');
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter} of ${maxQuestions}`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(classToApply);
        

        if (classToApply === 'correct') {
            incrementScore(correctScoreBonus);
            document.querySelector('.button').style.display = 'flex';
        } else {
            incrementScore(-2);
            document.querySelector('.button').style.display = 'flex';
            
            if (currentQuestion.answer === 1) {
                quizOption1.classList.add("correct");
              } else if (currentQuestion.answer === 2) {
                quizOption2.classList.add("correct");
              } else if (currentQuestion.answer === 3) {
                quizOption3.classList.add("correct");
              } else if (currentQuestion.answer === 4) {
                quizOption4.classList.add("correct");
              }
        }
        

        setTimeout(() => {
            quizOption1.classList.remove("correct");
            quizOption2.classList.remove("correct");
            quizOption3.classList.remove("correct");
            quizOption4.classList.remove("correct");
            selectedChoice.parentElement.classList.remove(classToApply);           
            if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
                getNewQuestion();
            }
        }, 1000);
    });
});


incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;

    if (typeof(Storage) !== "undefined") {

        localStorage.setItem("finalScore", score);
        finalScoreVariable = localStorage.getItem("finalScore");

    }
}

startGame();

