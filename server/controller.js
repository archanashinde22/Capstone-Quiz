const Quotes = [
  `Mistakes are proof that you are trying.`,
  `Success is stumbling from failure to failure with no loss of enthusiasm.`,
  `The best way to predict your future is to create it.`,
  `No one is perfect, that’s why pencils have erasers.`,
  `Winning doesn’t always mean being first. Winning means you’re doing better than you’ve done before.`,
  `Be silly. Be honest. Be kind.`,
  `We grow great by dreams.`,
  `Fall seven times, stand up eight.`,
  `You always pass failure on the way to success.`,
  `Reach high, for stars lie hidden in your soul. Dream deep, for every dream precedes the goal.`,
  `Anything is possible. Anything can be.`,
  `Knowledge will bring you the opportunity to make a difference.`,
  `Formal education will make you a living; self-education will make you a fortune.`,
  `Intelligence plus character is the goal of true education.`,
  `Failure is a success if we learn from it`,
  `It does not matter how slowly you go as long as you do not stop.`,
  `Reformation, like education, is a journey, not a destination.`,
  `What we learn becomes a part of who we are.`,
  `Education is a gift that none can take away.`,
];

let flashcardsArr = [
  {
    id: 1,
    topic: "Css",
    answer: "Cascading Style Sheet . Used for styling Web Page",
  },
  {
    id: 2,
    topic: "html",
    answer: "Hyper Text Markup lanuguage",
  },
];
let globalID = 3;

const quizArr = require("./db.json");
//console.log(quizArr);
let newQuizArr = [];
module.exports = {
  getInspireQuotes: (req, res) => {
    let randomIndex = Math.floor(Math.random() * Quotes.length);
    let randomQuote = Quotes[randomIndex];
    res.status(200).send(randomQuote);
  },
  getquizQue: (req, res) => {
    const { subject } = req.params;

    newQuizArr = quizArr.filter((quizobj) => quizobj.subject === subject);

    res.status(200).send(newQuizArr);
  },
  createFlashcard: (req, res) => {
    const { topic, answer } = req.body;
    let newFlashCard = {
      id: globalID,
      topic,
      answer,
    };
    flashcardsArr.push(newFlashCard);
    // console.log(flashcardsArr);rs

    res.status(200).send(flashcardsArr);
    globalID++;
  },
  getAllFlashcard: (req, res) => {
    res.status(200).send(flashcardsArr);
  },
  deleteFlashcard: (req, res) => {
    let index = flashcardsArr.findIndex((flash) => flash.id === +req.params.id);
    flashcardsArr.splice(index, 1);
    res.status(200).send(flashcardsArr);
  },
};
