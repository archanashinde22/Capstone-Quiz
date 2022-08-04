require("dotenv").config();
const { DATABASE_URL } = process.env;
// const { CommandCompleteMessage } = require("pg-protocol/dist/messages");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

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

const quizArr = require("./db.json");
let newQuizArr = [];
module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `DROP table  if exists flashcard_details;
        create table flashcard_details (
                       id serial primary key,
                       topic varchar(255),
                       answer varchar(255)
                   );

       INSERT into flashcard_details (topic , answer) values
       ('Css','Cascading Style Sheet . Used for styling Web Page'),('html',
           'Hyper Text Markup lanuguage')`
      )
      .then(() => {
        console.log("Database seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DataBase", err));
  },
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
    sequelize
      .query(
        `INSERT into flashcard_details (topic , answer) values ('${topic}','${answer}');`
      )
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) =>
        console.log("error in  getting creating flashcard  ", err)
      );
  },
  getAllFlashcard: (req, res) => {
    sequelize
      .query(` select * from flashcard_details; `)
      .then((dbres) => {
        res.status(200).send(dbres[0]);
      })
      .catch((err) => console.log("error in  getting all flashcards ", err));
  },
  deleteFlashcard: (req, res) => {
    let { id } = req.params;
    console.log(id);
    sequelize
      .query(`DELETE from flashcard_details where id = ${id};`)
      .then((dbres) => {
        
        res.status(200).send(dbres[0]);
      })
      .catch((err) => console.log("error in  deleting all flashcards ", err));
  },
};
