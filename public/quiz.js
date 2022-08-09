const subjectChoice = localStorage.getItem(`subject`);
const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice_text");
const scoreValue = document.querySelector("#scoreValue");
const questionNo = document.querySelector("#quiz-qustion-id");
const submitBtn = document.querySelector("#submit-btn");
let questionArr = [];
let currentQuestion = {};
let score = 0;
let displayScore = 0;
let questionCounter = 0;
let availableQuestions = [];
const MAX_QUESTION = 4;

console.log("Quiz.js :", subjectChoice);
const baseURL = "http://localhost:4000";

console.log(`${baseURL}/api/quiz/${subjectChoice}`);
const getQuizs = () => {
  axios
    .get(`${baseURL}/api/quiz/${subjectChoice}`)
    .then((res) => {
      questionArr = res.data;
      availableQuestions = questionArr;
      currentQuestion = availableQuestions[0];
      displayNextQuestion();
      availableQuestions.splice(0, 1);
    })
    .catch((err) => console.log(err));
};

const displayNextQuestion = () => {
  if (questionCounter < MAX_QUESTION) {
    questionCounter++;
    questionNo.textContent = `${questionCounter} of ${MAX_QUESTION}`;

    scoreValue.textContent = displayScore;

    question.textContent = currentQuestion.question;
    for (let i = 0; i < choices.length; i++) {
      choices[i].textContent = currentQuestion.answerArr[i];
    }
  } else {
    const quizCardContainer = document.querySelector("#quiz-card");
    quizCardContainer.innerHTML = null;
    quizCardContainer.innerHTML = `<h1> Quiz Completed !! </h1><br> <h3> Your score is ${displayScore}`;
  }
};
const checkAnswer = () => {
  let selected = document.querySelector(`input[name="choice"]:checked`);

  if (parseInt(selected.value) === currentQuestion.answer) {
    score++;
    displayScore = score * (100 / MAX_QUESTION);
    console.log(score);
  }

  const randQuizIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[randQuizIndex];
  displayNextQuestion();
  availableQuestions.splice(randQuizIndex, 1);
};

submitBtn.addEventListener("click", checkAnswer);
document.addEventListener("DOMContentLoaded", getQuizs);
