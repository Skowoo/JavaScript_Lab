const addButton = document.querySelector('#create_button')
const deleteButton = document.querySelector('#delete_button')
const notesContainer = document.querySelector('#notes_container')
const findButton = document.querySelector('#find_button')

const notesList = []

function DisplayNote(createdAt, title, content, isPinned, deadline, color, tags) 
{
    let newNote = document.createElement('div')
    newNote.classList = 'note'
    newNote.style.backgroundColor = color

    let titleBlock = document.createElement('div')
    titleBlock.classList = 'title_block'
    titleBlock.innerHTML = title
    newNote.appendChild(titleBlock)

    let newCheckBox = document.createElement('input')
    newCheckBox.classList = 'note_checkbox'
    newCheckBox.type = 'checkbox'
    newCheckBox.checked = isPinned
    newCheckBox.id = createdAt
    titleBlock.appendChild(newCheckBox)

    newCheckBox.addEventListener('click', (ev) => {
        if (ev.target.checked){
            notesContainer.removeChild(newNote)
            notesContainer.insertBefore(newNote, notesContainer.firstChild);
        }
        else{
            notesContainer.removeChild(newNote)
            notesContainer.appendChild(newNote);
        }
        let noteToUpdate = notesList.find((e) => e[0] == ev.target.id)        
        noteToUpdate[3] = ev.target.checked
    })

    let textBlock = document.createElement('div')
    textBlock.classList = 'text_block'
    textBlock.innerHTML = content
    newNote.appendChild(textBlock)

    let dateBlock = document.createElement('div')
    dateBlock.classList = 'date_block'
    dateBlock.innerHTML = 'Dodano: ' + new Date(createdAt).toLocaleString()
    newNote.appendChild(dateBlock)

    let DeadlineBlock = document.createElement('div')
    DeadlineBlock.classList = 'deadline_block'
    DeadlineBlock.innerHTML = 'Termin: ' + new Date(deadline).toLocaleString()
    newNote.appendChild(DeadlineBlock)

    notesContainer.appendChild(newNote)
    notesList.push([createdAt, title, content, isPinned, deadline, color, tags])
}

deleteButton.addEventListener('click', () => {
    localStorage.clear();
    notesList.clear();
    while(notesContainer.childElementCount > 0)
        notesContainer.removeChild(notesContainer.firstChild)
})

addButton.addEventListener('click', () => {
    const titleField = document.querySelector('#title_field')
    const textField = document.querySelector('#text_field')
    const tagsField = document.querySelector('#tags_field')
    const checkBox = document.querySelector('#pinned_field')
    const colorList = document.querySelector('#color_select')

    DisplayNote(Date.now(), titleField.value, textField.value, checkBox.checked, Date.now(), colorList.value, tagsField.value.split(' '))
})

findButton.addEventListener('click', () => {
    let searchBox = document.querySelector('#find_field')
    let searchString = searchBox.value
    let findNotes = notesList.filter((e) => e[1].includes(searchString) || e[2].includes(searchString) || e[6].some((e) => e.includes(searchString)))
    
    while(notesContainer.childElementCount > 0)
        notesContainer.removeChild(notesContainer.firstChild)

    findNotes.forEach((e) => DisplayNote(e[0], e[1], e[2], e[3], e[4], e[5], e[6]));
})