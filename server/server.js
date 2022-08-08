require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  seed,
  getquizQue,
  getInspireQuotes,
  createFlashcard,
  deleteFlashcard,
  getAllFlashcard,
} = require("./controller");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
app.post("/seed", seed);
app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});
//endpoints
app.post(`/api/flash`, createFlashcard);
app.get(`/api/quiz/:subject`, getquizQue);
app.get(`/api/inspireQuote`, getInspireQuotes);
app.delete(`/api/flash/:id`, deleteFlashcard);
app.get(`/api/flash`, getAllFlashcard);

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => console.log(`server running on ${SERVER_PORT}`));
