// const handle = setInterval(() => {}, 2000)
// clearInterval(handle) // Stopping intervals

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

const recordButton = document.querySelector('#record_button')
const stopRecordButton = document.querySelector('#stop_record_button')
const playButton = document.querySelector('#play_button')
const metroOnButton = document.querySelector('#metro_on_button')
const metroOffButton = document.querySelector('#metro_input')
const metroInput = document.querySelector('#play_button')

let recordBeganAt = Date.now()
let recordEndAt = Date.now()
let isRecording = false
let recordedSounds = []
let metronomeInterval


addEventListener('keypress',(ev)=>{
    const sound = sounds[ev.key]
    sound.currentTime = 0
    sound.play()
    if (isRecording){
        recordedSounds.push([(Date.now() - recordBeganAt), ev.key])
    }
})

metroOnButton.addEventListener('click', () => {
    metronomeInterval = setInterval(() =>{
        const sound = sounds['k']
        sound.currentTime = 0
        sound.play()
    } , metroInput.value)
})

metroOffButton.addEventListener('click', () => {
    clearInterval(metronomeInterval);
})

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
    console.log(recordedSounds)
    play()
} )




let play = () => {
    recordedSounds.forEach(element => {
        setTimeout(() => { 
            const sound = sounds[element[1]]
            sound.currentTime = 0
            sound.play()
        }, element[0])
    });
}