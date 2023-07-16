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
    timerData.timeLeft = duration * 60;
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
    pauseTimer();  // Add this line
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

document.querySelector('.settings__modal__footer__apply').addEventListener('click', () => {
    const durationValue = document.querySelectorAll('.settings__modal__content__item input');
    
    const [pomodoroDuration, shortbreakDuration, longbreakDuration] = [...durationValue].map((item) => {
        return parseInt(item.value, 10);  // Convert string to integer
    });
    
    timers.pomodoro.duration = pomodoroDuration;
    timers.shortBreak.duration = shortbreakDuration;
    timers.longBreak.duration = longbreakDuration;

    // Reset the SVG circle
    const svgCircle = document.querySelector('.circle');
    svgCircle.style.strokeDasharray = '';  // Adjust as needed
    svgCircle.style.strokeDashoffset = '';  // Adjust as needed

    document.querySelector('.settings__modal').style.visibility = 'hidden';
    
    // Restart the current timer with its new duration
    restartTimer(timers[currentTimer].duration);
});

// Sélectionnez le parent contenant tous les cercles
const colorContainer = document.querySelector('.settings__modal__content__color__item');

// Sélectionnez le cercle dont la couleur du trait doit être modifiée
const svgCircle = document.querySelector('.circle');

// Select the path that draws the check
const checkPath = document.querySelector('.settings__modal__content__color__item svg path');

// Ajoutez un gestionnaire d'événement 'click' au parent
colorContainer.addEventListener('click', function(event) {

    // Vérifiez si un cercle a été cliqué
    if (event.target.tagName === 'circle' || event.target.tagName === 'CIRCLE') {
        // Obtenez la couleur de remplissage du cercle
        const color = event.target.getAttribute('fill');
        const cx = event.target.getAttribute('cx');

        // Move the check to the clicked circle
        if (cx == '20') {
            checkPath.setAttribute('d', 'M14 20.5L17.9526 24.4526L26.4053 16');
        } else if (cx == '76') {
            // Added 56 to each x-coordinate
            checkPath.setAttribute('d', 'M70 20.5L73.9526 24.4526L82.4053 16');
        } else if (cx == '132') {
            // Added 112 to each x-coordinate
            checkPath.setAttribute('d', 'M126 20.5L129.9526 24.4526L138.4053 16');
        }
            // Vérifiez si un cercle a été cliqué
            if (event.target.tagName === 'circle' || event.target.tagName === 'CIRCLE') {
                // Obtenez la couleur de remplissage du cercle
                const color = event.target.getAttribute('fill');

                // Utilisez la couleur de remplissage pour déterminer quelle couleur affecter à la variable --orange
                switch (color) {
                    case '#F87070':
                        document.documentElement.style.setProperty('--orange', '#F87070');  // Keep orange
                        svgCircle.setAttribute('stroke', '#F87070');  // Change SVG circle stroke color to orange
                        break;
                    case '#70F3F8':
                        document.documentElement.style.setProperty('--orange', '#70F3F8');  // Change to cyan
                        svgCircle.setAttribute('stroke', '#70F3F8');  // Change SVG circle stroke color to cyan
                        break;
                    case '#D881F8':
                        document.documentElement.style.setProperty('--orange', '#D881F8');  // Change to violet
                        svgCircle.setAttribute('stroke', '#D881F8');  // Change SVG circle stroke color to violet
                        break;
                    default:
                        console.log('Unrecognized color: ' + color);
                }
            }
        }
});


const fontContainer = document.querySelector('.settings__modal__content__font__item');

fontContainer.addEventListener('click', function(event) {
    // Vérifiez si un cercle a été cliqué
    if (event.target.tagName === 'circle' || event.target.tagName === 'CIRCLE') {
        // Si le cercle cliqué est déjà la couleur souhaitée, retournez tôt
        if (event.target.getAttribute('fill') === '#161932') {
            return;
        }
        // Obtenez l'index du SVG contenant le cercle cliqué
        let svgIndex = Array.from(fontContainer.children).findIndex(svg => svg.contains(event.target));

        // Remettez tous les cercles à leur couleur d'origine et faites tous les textes noirs
        let allCircles = fontContainer.querySelectorAll('circle');
        let allTexts = fontContainer.querySelectorAll('text');
        allCircles.forEach((circle) => {
            circle.setAttribute('fill', '#EFF1FA');
        });
        allTexts.forEach((text) => {
            text.setAttribute('fill', '#161932');
        });

        // Changez la couleur du cercle cliqué et faites le texte blanc
        event.target.setAttribute('fill', '#161932');
        allTexts[svgIndex].setAttribute('fill', '#FFFFFF');

        // Selon le cercle cliqué, modifiez la variable CSS pour la police
        if (svgIndex === 0) {
            document.documentElement.style.setProperty('--Kumbh', '"Kumbh Sans", sans-serif');
        } else if (svgIndex === 1) {
            document.documentElement.style.setProperty('--Kumbh', '"Roboto Slab", serif');
        } else if (svgIndex === 2) {
            document.documentElement.style.setProperty('--Kumbh', '"Space Mono", monospace');
        }
    }
});