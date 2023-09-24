let start = document.getElementById('startStop');
let stopTime = document.getElementById('stop');

let divTime = document.querySelector('.time');

let minutesContent = document.getElementById('minutes');
let secondsContent = document.getElementById('seconds');
let reset = document.getElementById('reset');

let breakDec = document.getElementById('break-decrement');
let breakInc = document.getElementById('break-increment');
let breakLength = document.getElementById('break-length');

let sessionDec = document.getElementById('session-decrement');
let sessionInc = document.getElementById('session-increment');
let sessionLength = document.getElementById('session-length');

class Timer {
    constructor() {
        this.minutes = parseInt(minutesContent.textContent);
        this.seconds = parseInt(secondsContent.textContent);
        this.timer = null;
        this.timerBreak = null;
        this.resetMin = 25;
        this.resetSec = 0;
        this.breakValue = parseInt(breakLength.textContent);
    }

    sessionIncValue() {
        sessionLength.textContent++;
        this.minutes = sessionLength.textContent;
        minutesContent.textContent = sessionLength.textContent;
    }

    sessionDecValue() {
        sessionLength.textContent--;
        this.minutes = sessionLength.textContent;
        minutesContent.textContent = sessionLength.textContent;
    }

    sessionHandler () {
            this.timer = setInterval(() => {
                if (this.minutes === 0 && this.seconds === 0) {
                    this.stopSessionHandler(this.timer)
                    this.breakHandler();
                    // this.resetValue();
                    return;
                }
    
                if (this.seconds === 0) {
                    this.minutes--;
                    this.seconds = 59;
                } else {
                    this.seconds--;
                }

                if (this.minutes === 0 && this.seconds <= 59) {
                    divTime.style.color = 'red'
                }
    
                minutesContent.textContent = this.minutes.toString().padStart(2, '0');
                secondsContent.textContent = this.seconds.toString().padStart(2, '0');
            }, 1500);
    }

    stopSessionHandler(timer) {
        clearInterval(timer);
    }

    breakHandler() {
        this.minutes = this.breakValue;
        divTime.style.color = 'lightseagreen';
        this.timerBreak = setInterval(() => {
            if (this.minutes === 0 && this.seconds === 0) {
                this.stopSessionHandler(this.timerBreak);
                this.resetValue();
                return;
            }

            if (this.seconds === 0) {
                this.minutes--;
                this.seconds = 59;
            } else {
                this.seconds--;
            }

            if (this.minutes === 0 && this.seconds <= 59) {
                divTime.style.color = 'red'
            }

            minutesContent.textContent = this.minutes.toString().padStart(2, '0');
            secondsContent.textContent = this.seconds.toString().padStart(2, '0');
        }, 1500);
    }


    resetValue() {
        this.minutes = this.resetMin;
        this.seconds = this.resetSec;

        divTime.style.color = 'rgb(12, 61, 77)';

        sessionLength.textContent = this.resetMin.toString().padStart(2, '0');
        minutesContent.textContent = this.resetMin.toString().padStart(2, '0');
        secondsContent.textContent = this.resetSec.toString().padStart(2, '0');
    }
}


let timer = new Timer();

start.addEventListener('click', () => timer.sessionHandler());

stopTime.addEventListener('click', () => timer.stopSessionHandler());

reset.addEventListener('click', () => timer.resetValue());

sessionInc.addEventListener('click', () => timer.sessionIncValue());
sessionDec.addEventListener('click', () => timer.sessionDecValue());