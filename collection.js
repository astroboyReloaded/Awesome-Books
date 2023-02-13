const LOCAL_STORAGE_KEY = 'books';
const list = document.getElementById('books');
const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add');

const getFromLocalStorage = () => {
  const cachedBooks = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  return cachedBooks ? JSON.parse(cachedBooks) : [];
};

let booksArr = getFromLocalStorage() || [];

const saveToLocalStorage = () => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(booksArr));
};

const removeBook = (target) => {
  booksArr = booksArr.filter((book) => book !== target);
  // eslint-disable-next-line no-use-before-define
  updateList();
};

function createBook(book) {
  const list = document.createElement('li');
  const article = document.createElement('article');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const button = document.createElement('button');

  button.onclick = () => {
    removeBook(book);
  };
  button.innerText = 'Remove';
  title.textContent = book.title;
  author.textContent = book.author;

  list.appendChild(article);
  article.append(title, author, button);
  return list;
}

const updateList = () => {
  saveToLocalStorage();
  const childs = booksArr.map((book) => createBook(book));
  list.innerHTML = '';
  list.append(...childs);
  title.value = '';
  author.value = '';
};

addBtn.addEventListener('click', () => {
  booksArr.push({ title: title.value, author: author.value });
  updateList();
});

if (booksArr.length > 0) updateList();
