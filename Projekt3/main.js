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
    startRecButton.classList = 'btn'
    startRecButton.innerHTML = 'Nagrywaj'
    newChannel.appendChild(startRecButton)
    startRecButton.addEventListener('click', (ev) => {
        existingChannels[ev.target.id][1] = true
        existingChannels[ev.target.id][2] = Date.now()
    })

    var stopRecButton = document.createElement('button')
    stopRecButton.id = channelCounter
    stopRecButton.classList = 'btn'
    stopRecButton.innerHTML = 'Zakończ nagrywanie'
    newChannel.appendChild(stopRecButton)
    stopRecButton.addEventListener('click', (ev) => {
        existingChannels[ev.target.id][1] = false
        existingChannels[ev.target.id][3] = Date.now() - existingChannels[ev.target.id][2] // Length of record
    })

    var playButton = document.createElement('button')
    playButton.id = channelCounter
    playButton.classList = 'btn'
    playButton.innerHTML = 'Odtwarzaj'
    newChannel.appendChild(playButton)
    playButton.addEventListener('click', (ev) => {
        let playTrack = () => {
            existingChannels[ev.target.id][4].forEach(element => {            
                setTimeout(() => { 
                    const sound = sounds[element[1]]
                    sound.currentTime = 0
                    sound.play()
                }, element[0])
            })
        }
        playTrack()
        playingChannels.push([ev.target.id, setInterval(() => { playTrack() }, (existingChannels[ev.target.id][3]))])
    })

    var stopPlayButton = document.createElement('button')
    stopPlayButton.id = channelCounter
    stopPlayButton.classList = 'btn'
    stopPlayButton.innerHTML = 'Zatrzymaj odtwarzanie'
    newChannel.appendChild(stopPlayButton)
    stopPlayButton.addEventListener('click', (ev) => {
        let toBeStopped = playingChannels.find(x => x[0] === ev.target.id)
        if (toBeStopped !== undefined){
            clearInterval(toBeStopped[1])
            playingChannels.pop(toBeStopped)
        }
    })

    var clearPlayButton = document.createElement('button')
    clearPlayButton.id = channelCounter
    clearPlayButton.classList = 'btn'
    clearPlayButton.innerHTML = 'Wyczyść nagranie'
    newChannel.appendChild(clearPlayButton)
    clearPlayButton.addEventListener('click', (ev) => {
        let toBeStopped = playingChannels.find(x => x[0] === ev.target.id)
        if (toBeStopped !== undefined){
            clearInterval(toBeStopped[1])
            playingChannels.pop(toBeStopped)
        }
        existingChannels[ev.target.id][2] = 0
        existingChannels[ev.target.id][3] = 0
        existingChannels[ev.target.id][4] = []
    })

    var deleteChannelButton = document.createElement('button')
    deleteChannelButton.id = channelCounter
    deleteChannelButton.classList = 'btn'
    deleteChannelButton.innerHTML = 'Usuń kanał'
    newChannel.appendChild(deleteChannelButton)
    deleteChannelButton.addEventListener('click', (ev) => {
        let toBeStopped = playingChannels.find(x => x[0] === ev.target.id)
        if (toBeStopped !== undefined){
            clearInterval(toBeStopped[1])
            playingChannels.pop(toBeStopped)
        }
        let toBeDeleted = existingChannels.find(x => x[0] === ev.target.id)
        if (toBeDeleted !== undefined){
            existingChannels.pop(toBeDeleted)
        }        
        let buttonsToBeDeleted = channelsBox.querySelector('#channel_' + ev.target.id)
        if (buttonsToBeDeleted !== undefined)
        {
            channelsBox.removeChild(buttonsToBeDeleted)
        }        
    })

    existingChannels.push([channelCounter, false, 0, 0, []])    

    newChannel.id = 'channel_' + channelCounter
    channelsBox.appendChild(newChannel)

    channelCounter++
}