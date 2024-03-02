const resultField = document.getElementById("result")
const firstInput = document.getElementById("box1")
const secondInput = document.getElementById("box2")
const thirdInput = document.getElementById("box3")
const fourthInput = document.getElementById("box4")
const sumButton = document.getElementById("calc")

function calculate(){
    var container = document.getElementById("inputFields")
    var inputFields = container.querySelectorAll(".inputField")
    resultField.textContent = " Suma: " + (2) + ", Średnia: " + (2) + ", Max: " + Math.max(inputFields.value) + ", Min: " + Math.min(inputFields.value)
}

function addField(){
    var container = document.getElementById("inputFields")
    var newField = document.createElement("input")
    newField.type = "text"
    newField.classList = "inputField"
    newField.onchange = calculate()
    container.appendChild(newField)
}

function removeFields(){
    var container = document.getElementById("inputFields")
    var inputFields = container.querySelectorAll(".inputField")
    inputFields.forEach(function(currentItem){
        if (currentItem.value === "")
            container.removeChild(currentItem)
    })
}