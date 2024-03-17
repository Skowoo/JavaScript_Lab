const box = document.querySelectorAll('.box')
const singleSlide = document.querySelector('.box')
const boxPlace = document.querySelector('.box_place')
const leftButton = document.querySelector('.left')
const rightButton = document.querySelector('.right')
let position = 0
let targetPosition = 0
let currentIndex = 0
let fullSize = (0.1 * singleSlide.clientWidth) + singleSlide.clientWidth // Full size (with spacer between slides)
let speed = 5
let interval = 1
let working = true


box.forEach((slide, index) => { // set initial position
    slide.style.transform = 'translateX(' + (position + (index * fullSize)) + 'px)';
})

boxPlace.addEventListener('click', () =>{
    if (working)
    {
        working = false
    }        
    else
    {
        working = true
        autoMove()
    }
    console.log(working)
})

rightButton.addEventListener('click', () => {
    working = true
    commandRight()    
})

leftButton.addEventListener('click', () => {
    working = true
    commandLeft()
})

const commandRight = () =>{
    if (!working)
        return

    if (currentIndex === box.length - 1)
    {
        speed = 100
        targetPosition = 0
        currentIndex = 0
        console.log('komenda w prawo')
        goRight()
    }        
    else
    {
        speed = 20
        targetPosition -= fullSize
        currentIndex++
        console.log('komenda w lewo')
        goLeft()
    }
    console.log(targetPosition)
    console.log(currentIndex)
}

const commandLeft = () =>{
    if (!working)
        return

    if (currentIndex === 0)
    {
        speed = 100
        targetPosition = -1 * (box.length - 1) * fullSize
        currentIndex = box.length - 1        
        console.log('komenda w lewo')
        goLeft()
    }        
    else
    {
        speed = 20
        targetPosition += fullSize
        currentIndex--
        console.log('komenda w prawo')
        goRight()
    }
    console.log(targetPosition)
    console.log(currentIndex)
}

const goRight = () => {
    box.forEach((slide, index) => {
        slide.style.transform = 'translateX(' + (position + (index * fullSize)) + 'px)';
    })

    console.log('w prawo')

    if(targetPosition - position < 200)
        speed = 3
    if(targetPosition - position < 100)
        speed = 1
    if(targetPosition - position < 10)
        speed = 0.2

    position += speed

    if (position < targetPosition)
        setTimeout(goRight, interval)
}

const goLeft = () => {    
    box.forEach((slide, index) => {
        slide.style.transform = 'translateX(' + (position + (index * fullSize)) + 'px)';
    })

    console.log('w lewo')

    if(position - targetPosition < 200)
        speed = 3
    if(position - targetPosition < 100)
        speed = 1
    if(position - targetPosition < 10)
        speed = 0.2

    position -= speed

    if (position > targetPosition)
        setTimeout(goLeft, interval)
}

const autoMove = () =>{
    if (working){
        commandRight()
        setTimeout(autoMove, 5000)
    }
}

autoMove()