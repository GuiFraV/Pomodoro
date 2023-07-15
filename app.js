/*
* Globals Variables
*/ 
const time = document.querySelector('.time');
const start = document.querySelector('.start');
const shortbreak = document.querySelector('.shortbreak');

const circle = document.querySelector('.circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = 0;

let timer;

const nav = document.querySelectorAll('.nav-item');

nav.forEach((item) => 
{
    item.addEventListener('click', function() {
        nav.forEach((item) => item.classList.remove('active'));
        this.classList.add('active');
    });
});

const timers = {
    pomodoro: {
        duration: 25,
        timeLeft: undefined,
    },
    shortBreak: {
        duration: 5,
        timeLeft: undefined,
    },
    longBreak: {
        duration: 15,
        timeLeft: undefined,
    },
};

let currentTimer = 'pomodoro';

/*
* Fonctions / LOGIC
*/ 
function switchTimer(timerName) 
{
    pauseTimer();
    circle.style.strokeDashoffset = 0;
    currentTimer = timerName;
    const timerData = timers[currentTimer];  
    if (timerData.timeLeft === undefined) {
      startTimer(timerData.duration);
    } else {
      startTimer(timerData.timeLeft / 60);
    }
}

function startTimer(duration) 
{
    const timerData = timers[currentTimer];
    if(timerData.timeLeft === undefined){
        timerData.timeLeft = duration * 60;
    }
    start.innerHTML = 'PAUSE';

    timer = setInterval(function () {
        let minutes = Math.floor(timerData.timeLeft / 60);
        let secondes = timerData.timeLeft % 60;

        time.textContent = `${minutes < 10 ? '0' + minutes : minutes }:${secondes < 10 ? '0' + secondes : secondes}`;

        const percent = (timerData.timeLeft / (duration * 60)) * 100;
        setProgress(percent);

        timerData.timeLeft--;

        if(timerData.timeLeft < 0){
            clearInterval(timer);
            time.textContent = '00:00';
            start.innerHTML = 'RESTART';
        }

    }, 1000);

    start.innerHTML = 'PAUSE';

}

function pauseTimer() 
{
    clearInterval(timer);
    start.innerHTML = 'PLAY';
}

function setProgress(percent) 
{
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;
}

function restartTimer(duration) {
    const timerData = timers[currentTimer];
    timerData.timeLeft = undefined; 
    circle.style.strokeDashoffset = 0; 
    startTimer(duration);
}

/*
* Events Listeners
*/ 
start.addEventListener('click', function() 
{
    if (start.innerHTML === 'PLAY') {
      switchTimer(currentTimer);
    } else if (start.innerHTML === 'PAUSE') {
      pauseTimer();
    } else if (start.innerHTML === 'RESTART') {
      timers[currentTimer].timeLeft = undefined;
      switchTimer(currentTimer);
    }
});

shortbreak.addEventListener('click', function() 
{
    switchTimer('shortBreak'); 
});

const pomodoro = document.querySelector('.pomodoro');
pomodoro.addEventListener('click', function() 
{
  switchTimer('pomodoro');
});

const longbreak = document.querySelector('.longbreak');
longbreak.addEventListener('click', function() 
{
    switchTimer('longBreak'); 
});

document.querySelectorAll('.number-input').forEach(function(numberInput) {
    const input = numberInput.querySelector('input');
    const arrowUp = numberInput.querySelector('.arrow-up');
    const arrowDown = numberInput.querySelector('.arrow-down');

    arrowUp.addEventListener('click', function() {
        const currentValue = parseInt(input.value, 10);
        console.log(currentValue);
        if (currentValue < 60) {
            input.value = currentValue + 1;
        }
    });

    arrowDown.addEventListener('click', function() {
        const currentValue = parseInt(input.value, 10);
        if (currentValue > 0) {
            input.value = currentValue - 1;
        }
    });
});

document.querySelector('.settings__modal__header svg').addEventListener('click', () => {
    document.querySelector('.settings__modal').style.visibility = 'hidden';
});

document.querySelector('.settings').addEventListener('click', () => {
    document.querySelector('.settings__modal').style.visibility = 'visible';
});