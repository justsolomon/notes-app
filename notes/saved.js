const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

//checks for last theme in browser storage
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

//enables toggle between dark and light themes 
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
    }
};

toggleSwitch.addEventListener('change', switchTheme);

/* =======================
    get and display notes
======================== */
const body = document.querySelector('body');
const main = document.querySelector('main');
const list = document.createElement('ul');
const deleteAllButton = document.createElement('button');

deleteAllButton.className = 'delete-all-notes';
deleteAllButton.textContent = 'Delete all notes';
list.className = 'notes-list';
body.appendChild(list);

function getNote() {
    if (localStorage.length > 1) {
        body.removeChild(main);
        body.appendChild(deleteAllButton);
        let notesList = JSON.parse(localStorage['notes']);
        for (let i = 0; i <= notesList.length; i++) {
            let note = document.createElement('li');
            note.textContent = notesList[i].text;
            note.className = 'new-note';
            list.appendChild(note);
        }
    }
}

window.onload = getNote;

//to delete all notes

function deleteAll() {
    let confirmation = window.confirm(`
            Are you sure you want to delete all notes?
Click "Ok" to continue or "Cancel" to abort this operation`);
    if (confirmation === true) {
        localStorage.removeItem('notes');
        location.reload();
    }
}

deleteAllButton.addEventListener('click', deleteAll);