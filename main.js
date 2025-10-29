const table = document.getElementById("table");
const errorMessagePara = document.getElementById("error-message");
const searchInput = document.getElementById("search-input");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const ratingInput = document.getElementById("rating");
const bookInputForm = document.getElementById("book-input-form");
const searchBtn = document.getElementById("search-btn");
const addBookBtn = document.getElementById("add-book-btn");
const addToListBtn = document.getElementById("add-to-list-btn");

let booksArray = [];

function getBooks(query = "") {
  const urlApi = query
    ? `http://localhost:3000/books?title=${query}`
    : "http://localhost:3000/books";
  axios
    .get(urlApi)
    .then((res) => {
      booksArray = res.data;
      displayBooks(booksArray);
    })
    .catch((error) => {
      console.error(error.message);
      errorMessagePara.textContent = "Nothing to show";
    });
}

function displayBooks(array) {
  table.replaceChildren();
  array.forEach((book) => {
    console.log(book);
    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.textContent = book.id;

    const tdTitle = document.createElement("td");
    tdTitle.textContent = book.title;

    const tdAuthor = document.createElement("td");
    tdAuthor.textContent = book.author;

    const tdRating = document.createElement("td");
    const spanRating = document.createElement("span");
    tdRating.textContent = book.rating;
    spanRating.textContent = "⭐";
    tdRating.append(spanRating);

    const tdActions = document.createElement("td");
    tdActions.classList.add("action-btn");
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "🖊️";
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "🗑️";
    btnDelete.addEventListener("click", (e) => {
      e.preventDefault();
      deleteBook(book.id);
    });
    tdActions.append(btnEdit, btnDelete);

    tr.append(th, tdTitle, tdAuthor, tdRating, tdActions);
    table.append(tr);
  });
}

function searchBook(e) {
  e.preventDefault();
  const searchedBook = searchInput.value.toLowerCase().trim();
  console.log(searchedBook);
  getBooks(searchedBook);
}

function displayBookInput() {
  bookInputForm.style.display = "flex";
}

function deleteBook(id) {
  axios
    .delete(`http://localhost:3000/books/${id}`)
    .then(() => {
      console.log("book deleted");
      getBooks();
    })
    .catch((error) => console.error(error.message));
}

function addToList() {
  const bookTitle = titleInput.value.toLowerCase().trim();
  const bookAuthor = authorInput.value.toLowerCase().trim();
  const bookRating = ratingInput.valueAsNumber;

  const newBook = {
    title: bookTitle,
    author: bookAuthor,
    rating: bookRating,
  };

  axios
    .post("http://localhost:3000/books", newBook)
    .then(() => {
      console.log("new book added");
      getBooks();
      bookInputForm.reset();
      bookInputForm.style.display = "none";
    })
    .catch((error) => {
      console.error(error.message);
    });
}

searchBtn.addEventListener("click", searchBook);
addBookBtn.addEventListener("click", displayBookInput);
addToListBtn.addEventListener("click", addToList);

getBooks();
