/* ==========================
    To toggle between themes
========================== */

localStorage.setItem('theme', '');

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

/* ==================
    To clear textarea
=================== */

const textarea = document.querySelector('textarea');
const clearButton = document.querySelector('.clear-button');

function clearTextArea() {
    if (textarea.value !== '') {
        textarea.value = '';
    }
};

clearButton.addEventListener('click', clearTextArea);

/* ==================
    To save notes
=================== */

const saveButton = document.querySelector('.save-button');
let notesList = new Array;

function saveToStorage() {
    let note = textarea.value;
    notesList.push({
        id: Date.now(),
        text: note
    });
    localStorage['notes'] = JSON.stringify(notesList);
}

function saveNote() {
    if (textarea.value !== '') {
        if (localStorage.length === 1) {
            saveToStorage();
        } else {
            notesList = JSON.parse(localStorage['notes']);
            saveToStorage();
        }
        textarea.value = '';
    } else {
        alert('Note cannot be empty');
    }
};

saveButton.addEventListener('click', saveNote);