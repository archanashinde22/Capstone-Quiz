//get element to display Quotes
const displayQuotes = document.getElementById("displayQuotes");
const subjectbtn = document.getElementsByClassName("subject");
// const baseURL = "http://localhost:4000";
// Function will get Quotes from server and display it
const getInspireQuotes = () => {
  displayQuotes.innerHTML = null;
  axios.get(`/api/inspireQuote`).then((res) => {
    console.log(res.data);
    const quotepara = document.createElement("p");
    quotepara.innerHTML = ` <marquee >${res.data}</marquee>`;
    displayQuotes.appendChild(quotepara);
  });
};

// get the subject of quiz
const getSubject = (e) => {
  const selection = e.target.id;
  console.log("getsubject in home.js ", selection);
  //subject button id is stored in local Storage to use on different page
  localStorage.setItem("subject", selection);
};

[...subjectbtn].forEach((sub) => {
  sub.addEventListener("click", getSubject);
});
// event listener will load Quotes
document.addEventListener("DOMContentLoaded", getInspireQuotes);
