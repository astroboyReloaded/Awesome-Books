const LOCAL_STORAGE_KEY = 'books';
const list = document.getElementById('books');

const getFromLocalStorage = () => {
  const cachedBooks = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  return cachedBooks ? JSON.parse(cachedBooks) : [];
};

let booksArr = getFromLocalStorage();

const saveToLocalStorage = () => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(booksArr));
};

function render() {
  list.innerHTML = booksArr.map((book) => (`<li>
            <article>
                <p id="title">${book.title}</p>
                <p id="author">${book.author}</p>
                <button class="remove">Remove</button>
            </article>`)).join('');

  const remove = Array.from(document.getElementsByClassName('remove'));
  remove.forEach((btn, i) => btn.addEventListener('click', () => {
    booksArr = booksArr.filter((book, ind) => i !== ind);
    saveToLocalStorage();
    render();
  }));
}

window.onload = render();

const title = document.getElementById('newTitle');
const author = document.getElementById('newAuthor');
const addBtn = document.getElementById('add');

addBtn.addEventListener('click', () => {
  booksArr.push({ title: title.value, author: author.value });
  saveToLocalStorage();
  render();
});
