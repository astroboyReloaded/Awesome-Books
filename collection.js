function showToast(msg, callback) {
  const toast = document.createElement('div');
  const message = document.createElement('p');
  const action = document.createElement('button');
  const slider = document.createElement('div');
  toast.className = 'toast';
  message.className = 'message';
  action.className = 'action';
  slider.className = 'slider';
  message.textContent = msg;
  action.textContent = 'View';
  toast.append(message, action, slider);
  document.body.prepend(toast);
  const id = setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
  action.onclick = () => {
    callback();
    clearTimeout(id);
    document.body.removeChild(toast);
  };
}
class Library {
  LOCAL_STORAGE_KEY = 'books';

  collection = [];

  constructor() {
    this.collection = this.getFromLocalStorage();
    this.list = document.getElementById('books');
    this.addButton = document.getElementById('add');
    this.addButton.addEventListener('click', () => {
      this.addNewBook();
      this.saveToLocalStorage();
      this.render();
    });
  }

  getFromLocalStorage() {
    const cachedBooks = window.localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return cachedBooks ? JSON.parse(cachedBooks) : [];
  }

  saveToLocalStorage() {
    window.localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(this.collection),
    );
  }

  deleteBook(i) {
    this.collection = this.collection.filter((book, ind) => i !== ind);
  }

  addNewBook() {
    const title = document.getElementById('newTitle');
    const author = document.getElementById('newAuthor');
    this.collection.push({ title: title.value, author: author.value });
    title.value = '';
    author.value = '';
    title.focus();
    // eslint-disable-next-line no-undef
    showToast('Book was added successfully', () => toggleVisibility('collection'));
  }

  render() {
    this.list.innerHTML = this.collection
      .map(
        (book) => `<li class="bookRow">
      <article>
          <p id="title">"${book.title}" by ${book.author}</p>
          <button class="remove">Remove</button>
      </article>
      </li>`,
      )
      .join('');

    const remove = Array.from(document.getElementsByClassName('remove'));
    remove.forEach((btn, i) => btn.addEventListener('click', () => {
      this.deleteBook(i);
      this.saveToLocalStorage();
      this.render();
    }));
  }
}

window.onload = () => {
  const lib = new Library();
  lib.render();
};
