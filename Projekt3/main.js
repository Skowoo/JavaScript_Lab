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

addEventListener('keypress',(ev)=>{
    if (ev.key in sounds){
        const sound = sounds[ev.key]
        sound.currentTime = 0
        sound.play()
        if (isRecording){
            recordedSounds.push([(Date.now() - recordBeganAt), ev.key])
        }
    }
})

const recordButton = document.querySelector('#record_button')
const stopRecordButton = document.querySelector('#stop_record_button')
const playButton = document.querySelector('#play_button')

let recordBeganAt = Date.now()
let recordEndAt = Date.now()
let isRecording = false
let recordedSounds = []

recordButton.addEventListener('click', () =>{
    recordBeganAt = Date.now()
    isRecording = true;
} )

stopRecordButton.addEventListener('click', () =>{
    if (!isRecording)
        recordedSounds = []

    recordEndAt = Date.now()
    isRecording = false;
} )

playButton.addEventListener('click', () =>{
    recordedSounds.forEach(element => {
        setTimeout(() => { 
            const sound = sounds[element[1]]
            sound.currentTime = 0
            sound.play()
        }, element[0])
    });
} )