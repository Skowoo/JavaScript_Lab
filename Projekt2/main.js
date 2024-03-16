const box = document.querySelectorAll('.box')
const singleSlide = document.querySelector('.box')
const leftButton = document.querySelector('.left')
const rightButton = document.querySelector('.right')
let position = 0
let targetPosition = 0
let currentIndex = 0
let fullSize = (0.1 * singleSlide.clientWidth) + singleSlide.clientWidth // Full size (with spacer between slides)
let speed = 20
let interval = 10
let direction = true

box.forEach((slide, index) => { // set initial position
    slide.style.transform = 'translateX(' + (position + (index * fullSize)) + 'px)';
})

rightButton.addEventListener('click', () => {
    if (currentIndex === box.length - 1)
    {
        targetPosition = 0
        currentIndex = 0
        console.log('komenda w prawo')
        goRight()
    }        
    else
    {
        targetPosition -= fullSize
        currentIndex++
        console.log('komenda w lewo')
        goLeft()
    }
    console.log(targetPosition)
    console.log(currentIndex)
});

leftButton.addEventListener('click', () => {
    if (currentIndex === 0)
    {
        targetPosition = -1 * (box.length - 1) * fullSize
        currentIndex = box.length - 1
        console.log('komenda w lewo')
        goLeft()
    }        
    else
    {
        targetPosition += fullSize
        currentIndex--
        console.log('komenda w prawo')
        goRight()
    }
    console.log(targetPosition)
    console.log(currentIndex)
});

const goRight = () => {    
    box.forEach((slide, index) => {
        slide.style.transform = 'translateX(' + (position + (index * fullSize)) + 'px)';
    })

    console.log('w prawo')

    position += speed

    if (position < targetPosition)
        setTimeout(goRight, interval)
}

const goLeft = () => {    
    box.forEach((slide, index) => {
        slide.style.transform = 'translateX(' + (position + (index * fullSize)) + 'px)';
    })

    console.log('w lewo')

    position -= speed

    if (position > targetPosition)
        setTimeout(goLeft, interval)
}