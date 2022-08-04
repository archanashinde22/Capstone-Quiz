const addFlashCardBtn = document.querySelector("#add-flashcard");
const inputCardContainer = document.querySelector("#input-card");
const form = document.querySelector("form");
const baseURL = "http://localhost:4000/api/flash";
const cardListContainer = document.querySelector("#card-list-container");
const getAllFlashcard = () =>
  axios
    .get(baseURL)
    .then((res) => {
      let { data: flashcardsArr } = res;
      displayFlashCard(flashcardsArr);
    })
    .catch((err) => console.log(err));

const deleteFlashcard = (id) =>
  axios
    .delete(`${baseURL}/${id}`)
    .then((res) => {
      let { data: flashcardsArr } = res;
      displayFlashCard(flashcardsArr);
    })
    .catch((err) => console.log(err));

const createdisplayflashCard = (flashcard) => {
  const card = document.createElement("div");
  card.classList.add("flash-card");

  card.innerHTML = `<p class="flash-topic">${flashcard.topic}</p>
          <p class="flash-answer">${flashcard.answer}</p>
          <button   class="delete" onclick="deleteFlashcard(${flashcard.id})">X</button>
          `;
  cardListContainer.appendChild(card);
};

const displayFlashCard = (cardArr) => {
  cardListContainer.textContent = "";
  for (let i = 0; i < cardArr.length; i++) {
    createdisplayflashCard(cardArr[i]);
  }
};
// when add flashcard button clicked Input container will be visible
const showInputCardContainer = () => {
  inputCardContainer.classList.remove("hide");
};
// Save flashcard button event  will take input value and call createNewFlashCard Function and InputCard container will be hidden
const submitEventHadler = (evt) => {
  evt.preventDefault();

  let topic = document.querySelector("#topic");
  let answer = document.querySelector("#answer");
  if (topic.value === "" || answer.value === "") {
    alert("Topic and answer cannot be Empty ");
  } else {
    let flashcardObj = {
      topic: topic.value,
      answer: answer.value,
    };
    inputCardContainer.classList.add("hide");
    postFlashcard(flashcardObj);

    topic.value = "";
    answer.value = "";
  }
};
// will create new flash card ... Post request is used for this
const postFlashcard = (body) => {
  axios
    .post(baseURL, body)
    .then((res) => {
      let { data: flashcardsArr } = res;
      displayFlashCard(flashcardsArr);
    })
    .catch((err) => console.log(err));
};

addFlashCardBtn.addEventListener("click", showInputCardContainer);
form.addEventListener("submit", submitEventHadler);
getAllFlashcard();
