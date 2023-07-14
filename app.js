const time = document.querySelector('.time');
const seconde = document.querySelector('.seconde');
const minute = document.querySelector('.minute');
const pause = document.querySelector('.pause');

let minuteTimer = 25;
let secondTimer = 2;

pause.addEventListener('click', () => {
    if(pause.innerHTML === 'PAUSE') {

        pause.innerHTML = 'PLAY';

    }else{

        pause.innerHTML = 'PAUSE';
        // minute.innerHTML = minuteTimer;
        timeInterval();
        
    }
});



function timeInterval(){

    setInterval(() => 
    {
        seconde.innerHTML = secondTimer--;

        console.log(secondTimer);

        if(secondTimer === -1){
            secondTimer = 2;
            minute.innerHTML = minuteTimer--;

        }
    
    },1000);
}
