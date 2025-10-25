const table = document.getElementById("table");
let booksArray = [];

function getBooks() {
  const urlApi = "http://localhost:3000/books";
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
    });
}

function displayBooks(array) {
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

getBooks();
