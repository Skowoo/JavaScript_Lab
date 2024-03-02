const resultField = document.getElementById("result")
const sumButton = document.getElementById("calc")

function calculate(){
    var container = document.getElementById("inputFields")
    var inputFields = container.querySelectorAll(".inputField")
    var values = []

    inputFields.forEach(function(field){
        var parsedNumber = parseInt(field.value)

        // if parsedNumber is not equal to itself (parsedNumber !== parsedNumber) it means that it's NaN XD
        if (parsedNumber === undefined || parsedNumber === null || parsedNumber !== parsedNumber)
            return

        values.push(parsedNumber)
    })

    var sum = 0

    values.forEach(function(number){
        sum += number
    })

    // ...variableName = collection input
    resultField.textContent = " Suma: " + sum + ", Średnia: " + (sum / values.length) + ", Max: " + Math.max(...values) + ", Min: " + Math.min(...values)
}

function addField(){
    var container = document.getElementById("inputFields")
    var newField = document.createElement("input")
    newField.type = "number"
    newField.classList = "inputField"
    newField.onchange = calculate
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