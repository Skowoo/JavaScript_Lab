const boxPlace = document.querySelector('.box_place')
const leftButton = document.querySelector('.left')
const rightButton = document.querySelector('.right')
const slideButtonsPlace = document.querySelector('.slide_buttons_place')
const lightBox = document.querySelector('.lightbox')
let position = 0
let targetPosition = 0
let currentIndex = 0
let speed = 5
let interval = 1
let working = true

for (let i = 0; i < 6; i++){
    var newSlide = document.createElement('div')
    newSlide.classList = "box"
    var newSlideContent = document.createElement('img')
    newSlideContent.src = "https://picsum.photos/1000/300"
    newSlideContent.style.width = '100%'
    newSlideContent.style.height = '100%'
    newSlide.appendChild(newSlideContent)
    boxPlace.appendChild(newSlide)
}

const singleSlide = document.querySelector('.box')
let fullSize = (0.1 * singleSlide.clientWidth) + singleSlide.clientWidth // Full size (with spacer between slides)
const boxes = document.querySelectorAll('.box')

boxes.forEach((slide, index) => { // set initial position
    slide.style.transform = 'translateX(' + (position + (index * fullSize)) + 'px)';
    var newSlideButton = document.createElement('button')
    newSlideButton.classList = "slide_button"
    newSlideButton.id = index
    //newSlideButton.innerHTML = index
    newSlideButton.addEventListener('click', (obj) =>{
        working = false
        if (currentIndex === obj.target.id)
        {
            return
        }
        else if(currentIndex < obj.target.id)
        {
            targetPosition = -1 * fullSize * obj.target.id                     
            currentIndex = obj.target.id
            speed = 30
            goLeft()
        }
        else
        {
            targetPosition = -1 * fullSize * obj.target.id
            currentIndex = obj.target.id
            speed = 30
            goRight()
        }
    })
    slideButtonsPlace.appendChild(newSlideButton)
})

boxPlace.addEventListener('click', () =>{
    working = false
    var clickedSlide = boxes[currentIndex]
    var lightboxContent = document.createElement('img')
    lightboxContent.src = clickedSlide.firstChild.src
    lightboxContent.style.width = '99%'
    lightboxContent.style.height = '99%'
    lightBox.appendChild(lightboxContent)
    lightBox.showModal()
})

lightBox.addEventListener('click', () => {
    while (lightBox.firstChild) { 
        lightBox.removeChild(lightBox.firstChild); 
    }
    lightBox.close()
})

rightButton.addEventListener('click', () => {
    working = false
    commandRight()
})

leftButton.addEventListener('click', () => {
    working = false
    commandLeft()
})

const commandRight = () =>{
    if (currentIndex >= boxes.length - 1)
    {
        speed = 100
        targetPosition = 0
        currentIndex = 0
        goRight()
    }        
    else
    {
        speed = 30
        targetPosition -= fullSize
        currentIndex++
        goLeft()
    }
}

const commandLeft = () =>{
    if (currentIndex <= 0)
    {
        speed = 100
        targetPosition = -1 * (boxes.length - 1) * fullSize
        currentIndex = boxes.length - 1        
        goLeft()
    }
    else
    {
        speed = 30
        targetPosition += fullSize
        currentIndex--
        goRight()
    }
}

const goRight = () => {
    boxes.forEach((slide, index) => {
        slide.style.transform = 'translateX(' + (position + (index * fullSize)) + 'px)';
    })

    if(targetPosition - position < 250)
        speed = 10
    if(targetPosition - position < 100)
        speed = 1
    if(targetPosition - position < 10)
        speed = 0.2

    position += speed

    if (position < targetPosition)
        setTimeout(goRight, interval)
}

const goLeft = () => {    
    boxes.forEach((slide, index) => {
        slide.style.transform = 'translateX(' + (position + (index * fullSize)) + 'px)';
    })

    if(position - targetPosition < 250)
        speed = 10
    if(position - targetPosition < 100)
        speed = 1
    if(position - targetPosition < 10)
        speed = 0.2

    position -= speed

    if (position > targetPosition)
        setTimeout(goLeft, interval)
}

const autoMove = () => {
    setTimeout(() => 
    {
        if (working) {
            commandRight();
        }
        autoMove(); 
    }, 3000);
}

autoMove()