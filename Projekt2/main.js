// const img = new Image()
// const img = document.createElement('img')
// img.src = 'url do zdjecia'

// setInterval(() => {
//     box.style.transform = 'tanslateX(300px)'
// }, 20) // Set interval zapycha stack - ciągle wysyła żądanie

const box = document.querySelectorAll('.box')
let position = 0
let speed = 20
let interval = 10
let direction = true

const animuj = () => {
    box.forEach(slide => {
        slide.style.transform = 'translateX(' + position + 'px)'
    })    

    if (direction)
        position += speed
    else 
        position -= speed

    if (position < 0)
        direction = true
    else if (position > 1500)
        direction = false

    setTimeout(animuj, interval)
}

animuj()