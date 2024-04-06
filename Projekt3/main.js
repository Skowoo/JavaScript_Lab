const sounds = {
    'a': document.querySelector('#clap'),
    's': document.querySelector('#kick'),
    'd': document.querySelector('#hihat'),
    'f': document.querySelector('#boom'),
    'g': document.querySelector('#openhat'),
    'h': document.querySelector('#ride'),
    'j': document.querySelector('#snare'),
    'k': document.querySelector('#tink'),
    'l': document.querySelector('#tom'),
}

const metroOnButton = document.querySelector('#metro_on_button')
const metroOffButton = document.querySelector('#metro_off_button')
const metroInput = document.querySelector('#metro_input')
let metronomeInterval

metroOnButton.addEventListener('click', () => {
    if(metronomeInterval === undefined){
        metronomeInterval = setInterval(() =>{
            const sound = sounds['k']
            sound.currentTime = 0
            sound.play()} , 60000 / metroInput.value)
    }
})

metroOffButton.addEventListener('click', () => {
    clearInterval(metronomeInterval)
    metronomeInterval = undefined
})

// Multi channel:

let channelCounter = 0
const channelsBox = document.querySelector('.chanels_box')
const addChannelButton = document.querySelector('#add_chanel_button')
const existingChannels = []
const playingChannels = []

addEventListener('keypress',(ev)=>{
    if (ev.key in sounds){
        const sound = sounds[ev.key]
        sound.currentTime = 0
        sound.play()
        checkAndRecord(ev.key)
    }
})

addChannelButton.addEventListener('click', () => {
    addChannel()
})

const checkAndRecord = (key) => {
    if (existingChannels.some(x => x[1]))
    {
        let activeChannels = existingChannels.filter(x => x[1])
        activeChannels.forEach(element => {
            element[4].push([(Date.now() - element[2]), key])
        });
    }
}

const addChannel = () => {
    var newChannel = document.createElement('div')

    var startRecButton = document.createElement('button')
    startRecButton.id = channelCounter
    startRecButton.classList = 'btn start'
    startRecButton.innerHTML = 'Nagrywaj'
    newChannel.appendChild(startRecButton)
    startRecButton.addEventListener('click', (ev) => {
        existingChannels[ev.target.id][1] = true
        existingChannels[ev.target.id][2] = Date.now()
    })

    var stopRecButton = document.createElement('button')
    stopRecButton.id = channelCounter
    stopRecButton.classList = 'btn stop'
    stopRecButton.innerHTML = 'Zakończ nagrywanie'
    newChannel.appendChild(stopRecButton)
    stopRecButton.addEventListener('click', (ev) => {
        existingChannels[ev.target.id][1] = false
        existingChannels[ev.target.id][3] = Date.now() - existingChannels[ev.target.id][2] // Length of record
    })

    var playButton = document.createElement('button')
    playButton.id = channelCounter
    playButton.classList = 'btn play'
    playButton.innerHTML = 'Odtwarzaj'
    newChannel.appendChild(playButton)
    playButton.addEventListener('click', (ev) => {
        console.log(existingChannels[ev.target.id][3] + 100)
        playingChannels.push([ev.target.id, setInterval(
            existingChannels[ev.target.id][4].forEach(element => {            
                setTimeout(() => { 
                    const sound = sounds[element[1]]
                    sound.currentTime = 0
                    sound.play()
                }, element[0])
            }), (existingChannels[ev.target.id][3] + 100)
        )])
    })

    var stopPlayButton = document.createElement('button')
    stopPlayButton.id = channelCounter
    stopPlayButton.classList = 'btn stop_play'
    stopPlayButton.innerHTML = 'Zatrzymaj odtwarzanie'
    newChannel.appendChild(stopPlayButton)
    stopPlayButton.addEventListener('click', (ev) => {
        
    })

    existingChannels.push([channelCounter, false, 0, 0, []])    

    channelsBox.appendChild(newChannel)
    channelsBox.appendChild(document.createElement('br'))

    channelCounter++
}