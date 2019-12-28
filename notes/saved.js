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

/* =======================
    get and display notes
======================== */
const body = document.querySelector('body');
const main = document.querySelector('main');
const list = document.createElement('ul');
const deleteAllButton = document.createElement('button');
const editModal = document.querySelector('.modal');
const textarea = document.querySelector('textarea');
const editNote = document.querySelector('.edit-button');
const deleteNote = document.querySelector('.delete-button');

deleteAllButton.className = 'delete-all-notes';
deleteAllButton.textContent = 'Delete all notes';
list.className = 'notes-list';
body.appendChild(list);

let notesList = JSON.parse(localStorage['notes']);

function getNote() {
    if (localStorage.length > 1) {
        body.removeChild(main);
        body.appendChild(deleteAllButton);

        //displays notes
        for (let i = 0; i <= notesList.length; i++) {
            let note = document.createElement('li');
            note.textContent = notesList[i].text;
            note.className = 'new-note';
            list.appendChild(note);

            //displays area for editing note
            note.addEventListener('click', function() {
                editModal.style.display = 'block';
                textarea.value = note.textContent;
                textarea.id = notesList[i].id;
            })
        }
    }
}

window.onload = getNote;

//to delete all notes

deleteAllButton.addEventListener('click', function() {
    let confirmation = window.confirm(`Are you sure you want to delete all notes?
    Click "Ok" to continue or "Cancel" to abort this operation`);
    if (confirmation === true) {
        localStorage.removeItem('notes');
        location.reload();
    }
})

//to delete a specific note

deleteNote.addEventListener('click', function() {
    let confirmation = window.confirm(`Are you sure you want to delete this note?
    Click "Ok" to continue or "Cancel" to abort this operation`);
    if (confirmation === true) {
        notesList = notesList.filter(currentnote => {
            return !(currentnote.id == textarea.id);
        });
        localStorage['notes'] = JSON.stringify(notesList);
        if (notesList == false) {
            localStorage.removeItem('notes');
        }
        location.reload();
    }
});

//to edit and save changes to a note

editNote.addEventListener('click', function() {
    notesList = notesList.map(currentnote => {
        if (currentnote.id == textarea.id) {
            return {
                id: currentnote.id,
                text: textarea.value
            };
        } else {
            return currentnote;
        }
    })
    localStorage['notes'] = JSON.stringify(notesList);
    location.reload();
})