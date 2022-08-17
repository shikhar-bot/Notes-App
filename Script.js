let ShowNoteBtn = document.querySelector('.add-note-btn');
let EditNoteContainer = document.querySelector('.edit-note');
let note_title_input = document.querySelector(".note-title-input");
let note_desc_input = document.querySelector(".note-body-input");
let noteBox = document.querySelector(".note-box");
let closeIcon = document.querySelector('.fa-arrow-left');

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Getting local Storage Notes
const allNotes = JSON.parse(localStorage.getItem("allNotes") || "[]");
let isUpdate = false, updateId;

note_title_input.addEventListener('keyup', function(e){
    this.style.height = '45px';
    let height = e.target.scrollHeight;
    note_title_input.style.height = '${height}px';
});

closeIcon.addEventListener('click', () =>{
    EditNoteContainer.style.left = '-100%';
});

ShowNoteBtn.addEventListener('click', () =>{
    EditNoteContainer.style.left = '50%';
    note_title_input.value = '';
    note_desc_input.value = '';
});

function showNotes(){
    let NoteAdd = '';
    document.querySelectorAll('.note').forEach(note => note.remove());
    allNotes.array.forEach((note, index)=>{
        let filtDesc = note.description.replaceAll("\n", '<br/>');
        NoteAdd += ` <div class ="note">
        <h3 class = "note-title">${note.title}</h3>
        <p class = "note-body">${note.description}</p>
        <hr>
        <p class = "date">${note.date}</p>
        <i onclick = "showMenu(this)" class = "fa-solid fa-ellispsis"></i>
        <div class = "settings">
            <div class = "menu">
                <span class = "edit-btn" onclick = "editNote(${index}, '${note.title}'. '${filtDesc}')"><i class = "fa-solid fa-pen"></i> Edit </span>
                <span class = "delete-btn" onclick = "deleteNote(${index})"> <i class = "fa-solid fa-trash"></i> Delete </span>
            </div>
        </div>
        </div>
        `;
    });
    noteBox.innerHTML = NoteAdd || `
    <span><i class = "fa-solid fa-note-sticky"></i></span>
    <span class = "no-notes-messages">No Notes here yet </span>`;
}

showNotes();

function deleteNote(Noteid){
    allNotes.splice(Noteid, 1); // Delete Note From Array
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
    showNotes();
};

function editNote(Noteid, title, filtDesc){
    let desc = filtDesc.replaceAll('<br/>', '\r\n');
    updateId = Noteid;
    isUpdate = true;
    ShowNoteBtn.click();
    note_title_input.value = title;
    note_desc_input.value = desc;
};

closeIcon.addEventListener('click', e =>{
    e.preventDefault();
    let noteTitle = note_title_input.value; // Note title value
    let noteDesc = note_desc_input.value; // Note description value

    if(noteTitle || noteDesc){
        let date = new Date(),
        month = months[date.getMonth()],
        day = date.getDate(),
        year = date.getFullYear();

        // All notes info
        let noteInfo = {
            title:noteTitle,
            description:noteDesc,
            date: `$(month) ${day} ${year}`
        }
        if(!isUpdate){
            allNotes.push(noteInfo); //Push note info in notes
        } else {
            isUpdate = false;
            allNotes[updateId] = noteInfo;
        }
        // Saving to local storage
        localStorage.setItem("allNotes", JSON.stringify(allNotes));
        showNotes();
    }
});