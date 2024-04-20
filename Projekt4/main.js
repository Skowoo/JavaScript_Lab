const addButton = document.querySelector('#create_button')
const deleteButton = document.querySelector('#delete_button')
const notesContainer = document.querySelector('#notes_container')

deleteButton.addEventListener('click', () => {
    localStorage.clear();
})

addButton.addEventListener('click', () => {
    const titleField = document.querySelector('#title_field')
    const textField = document.querySelector('#text_field')
    const checkBox = document.querySelector('#pinned_field')

    let newNote = document.createElement('div')
    newNote.classList = 'note'

    let titleBlock = document.createElement('div')
    titleBlock.classList = 'title_block'
    titleBlock.innerHTML = titleField.value
    newNote.appendChild(titleBlock)

    let textBlock = document.createElement('div')
    textBlock.classList = 'text_block'
    textBlock.innerHTML = textField.value
    newNote.appendChild(textBlock)

    let newCheckBox = document.createElement('checkbox')
    newCheckBox.checked = checkBox.checked
    newNote.appendChild(newCheckBox)

    notesContainer.appendChild(newNote)
})