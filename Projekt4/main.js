const addButton = document.querySelector('#create_button')
const deleteButton = document.querySelector('#delete_button')
const notesContainer = document.querySelector('#notes_container')

function DisplayNote(title, content, isPinned, createdAt, deadline, color, tags) 
{
    let newNote = document.createElement('div')
    newNote.classList = 'note'
    newNote.style.backgroundColor = color

    let newCheckBox = document.createElement('input')
    newCheckBox.classList = 'note_checkbox'
    newCheckBox.type = 'checkbox'
    newCheckBox.checked = isPinned
    newNote.appendChild(newCheckBox)

    let titleBlock = document.createElement('div')
    titleBlock.classList = 'title_block'
    titleBlock.innerHTML = title
    newNote.appendChild(titleBlock)

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
}

deleteButton.addEventListener('click', () => {
    localStorage.clear();
    while(notesContainer.childElementCount > 0)
        notesContainer.removeChild(notesContainer.firstChild)
})

addButton.addEventListener('click', () => {
    const titleField = document.querySelector('#title_field')
    const textField = document.querySelector('#text_field')
    const tagsField = document.querySelector('#tags_field')
    const checkBox = document.querySelector('#pinned_field')
    const colorList = document.querySelector('#color_select')

    DisplayNote(titleField.value, textField.value, checkBox.checked, Date.now(), Date.now(), colorList.value, tagsField.value.split(' '))
})