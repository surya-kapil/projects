const addBtn = document.getElementById('add-button')
const newNotesDiv = document.getElementById('new-notes')
let turn = 0;
const color = ["#d1e1ff", "#fefffe"];


const addStickyNote = () => {
    const newDiv = document.createElement('div');
    const button = document.createElement('button');
    const buttonDiv = document.createElement('div');

    buttonDiv.append(button);
    buttonDiv.style.width = "auto";
    buttonDiv.style.display = "flex";
    buttonDiv.style.alignItems = "flex-start";
    
    const getNote = document.getElementById('sticky-note').value;

    if(!getNote) return;
    const newNote = document.createElement('div');
    newNote.textContent = getNote;
    button.innerText = 'X';

    newDiv.append(newNote);
    newDiv.append(buttonDiv);

    newDiv.style.display = "flex";
    newDiv.style.width = "auto";
    newDiv.style.justifyContent = "flex-start"
    newDiv.style.backgroundColor = color[turn];
    newDiv.style.maxWidth = "30vw";


    turn = (turn + 1) % 2;

    newNote.style.padding = "10px"
    newNote.style.backgroundColor = "transparent";
    button.style.backgroundColor = "transparent";
    button.style.color = "red";
    button.style.border = "none";
    newNote.style.border = "none";

    newDiv.style.border = "2px solid black"

    newNotesDiv.append(newDiv);

    button.addEventListener('click', () => newDiv.remove());

}
addBtn.addEventListener('click', addStickyNote);