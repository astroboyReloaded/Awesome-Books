const listLink = document.getElementById('listLink');
const addLink = document.getElementById('addLink');
const contactLink = document.getElementById('contactLink');
const collection = document.getElementById('collection');
const addBook = document.getElementById('addBook');
const contact = document.getElementById('contact');

const toggleVisibility = (flag) => {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
        console.log(section.classList)
    })
    switch (flag) {
        case 'collection':
            collection.classList.add('active');
        break
        case 'addBook':
            addBook.classList.add('active');
        break
        case 'contact':
            contact.classList.add('active');
        break
    }

}

listLink.addEventListener('click', () => {
    toggleVisibility('collection')
});

addLink.addEventListener('click', () => {
    toggleVisibility('addBook')
});

contactLink.addEventListener('click', () => {
    toggleVisibility('contact')
});