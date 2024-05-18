//displays
const sessionDisplay = document.getElementById('session');
const timeDisplay = document.getElementById('time');
const settingsMenu = document.getElementById('settings-menu');
//buttons
const settingsBtn = document.getElementById('settings-btn');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const saveBtn = document.getElementById('save-btn');
//Inputs
const workDurationInput = document.getElementById('work');
const restDurationInput = document.getElementById('rest');
//media
let audio = new Audio('./audio/alarm-clock.mp3')

const preferredDuration = {
    work : 25,
    rest : 5
}

let currentDuration = preferredDuration.work * 60; //variable to convert the duration(min) to (sec)
let inWorkSession = true; //variable to store the state of the current session
let timer; //initialize.. will be used for storing the interval;
let isRunning = false; //store the state of the timer


//show the settings menu
function showSettings(){
    settingsMenu.classList.remove('hidden');
}

//get the input values then close the settings menu;
function adjustDuration(){

    preferredDuration.work = parseInt(workDurationInput.value);
    preferredDuration.rest = parseInt(restDurationInput.value);

    if (preferredDuration.work && preferredDuration.rest){
        currentDuration = preferredDuration.work * 60;
        inWorkSession = true;
        timeDisplay.textContent = formatTime(currentDuration);
        startBtn.textContent = 'Start'
    } else {
        alert('Invalid Input!');
        adjustDuration()
    }

    settingsMenu.classList.add('hidden')
}

settingsBtn.addEventListener('click', showSettings);
saveBtn.onclick = adjustDuration; //discovered other way to add event listener lol xD

//function to format the time.. need to pass the current duration as the argument
function formatTime(time){
    let minutes = Math.floor(time / 60);
    let remainingSeconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

function startTimer(){
    if (!isRunning){
        timer = setInterval(updateTime, 1000);
        isRunning = true;
        startBtn.innerText = 'Pause';
        settingsBtn.disabled = true;
    } else {
        clearInterval(timer);
        isRunning = false;
        startBtn.innerText = 'Resume';
        settingsBtn.disabled = false;
    }
}

function updateTime(){
    if (currentDuration > 0){
        currentDuration--;
    } else {
        inWorkSession = !inWorkSession;
        currentDuration = inWorkSession ? preferredDuration.work * 60 : preferredDuration.rest * 60;
        sessionDisplay.innerText = inWorkSession ? 'Work' : 'Rest'
    }

    timeDisplay.textContent = formatTime(currentDuration);
    if (currentDuration === 1){
        audio.play();
    }
}

function resetTimer(){
    location.reload() //reload the page and reset everything.
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
