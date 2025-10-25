const table = document.getElementById("table");
const errorMessagePara = document.getElementById("error-message");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

let booksArray = [];

function getBooks(query = "") {
  const urlApi = query
    ? `http://localhost:3000/books?title=${query}`
    : "http://localhost:3000/books";
  axios
    .get(urlApi)
    .then((res) => {
      if (res.status === 200) {
        booksArray = res.data;
        displayBooks(booksArray);
      }
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
    tdActions.append(btnEdit, btnDelete);

    tr.append(th, tdTitle, tdAuthor, tdRating, tdActions);
    table.append(tr);
  });
}

function searchBook() {
  const searchedBook = searchInput.value.toLowerCase().trim();
  console.log(searchedBook);
  getBooks(searchedBook);
}

searchBtn.addEventListener("click", searchBook);

getBooks();
