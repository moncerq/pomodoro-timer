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
        this.lastTimer = null;
    }

    sessionIncValue() {
        this.minutes = this.minutes + 1;
        sessionLength.textContent = this.minutes;
        minutesContent.textContent = sessionLength.textContent;
    }

    sessionDecValue() {
        this.minutes--;
        if (this.minutes <= 0) this.minutes = 0;
        sessionLength.textContent = this.minutes;
        minutesContent.textContent = sessionLength.textContent;
    }

    sessionHandler () {
        if (this.lastTimer !== 'session') {
            console.log("session timer started")
            start.setAttribute("disabled", "");
            start.style.backgroundColor = 'grey';
            start.style.cursor = 'not-allowed';
            this.timer = setInterval(() => {
                if (this.minutes === 0 && this.seconds === 0) {
                    this.stopSessionHandler(this.timer);
                    console.log('session timer finish');
                    this.breakHandler();
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
            }, 1000);
            this.lastTimer = 'session';
        }
    }

    stopSessionHandler(timer) {
        clearInterval(timer);
    }

    stopButtonSessionTimer() {
        clearInterval(this.timer);
        start.removeAttribute("disabled", "");
        start.style.backgroundColor = '';
        start.style.cursor = 'pointer';
        console.log("session timer stopped")
    }

    stopButtonBreakTimer() {
        clearInterval(this.timerBreak);
        start.removeAttribute("disabled", "");
        start.style.backgroundColor = '';
        start.style.cursor = 'pointer';
        console.log("break timer stopped")
    }

    breakHandler() {
        if (this.lastTimer !== 'break') {
            console.log("break timer started")
            this.minutes = this.breakValue;
            divTime.style.color = 'lightseagreen';
            start.setAttribute("disabled", "");
            start.style.backgroundColor = 'grey';

            this.timerBreak = setInterval(() => {
                if (this.minutes === 0 && this.seconds === 0) {
                    console.log('break timer finish');
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
            }, 1000);
            this.lastTimer = 'break';
        }
    }

    breakIncLength() {
        this.breakValue = this.breakValue + 5;
        breakLength.textContent = this.breakValue.toString().padStart(1, '0');
    }
    breakDecLength() {
        this.breakValue = this.breakValue - 5;
        if (this.breakValue < 0) this.breakValue = 0;
        breakLength.textContent = this.breakValue.toString().padStart(1, '0');
    }

    resetValue() {
        this.stopButtonSessionTimer();
        this.stopButtonBreakTimer();

        this.minutes = this.resetMin;
        this.seconds = this.resetSec;
        this.breakValue = 5;

        divTime.style.color = 'rgb(12, 61, 77)';

        breakLength.textContent = this.breakValue.toString().padStart(1, '0');
        sessionLength.textContent = this.resetMin.toString().padStart(2, '0');
        minutesContent.textContent = this.resetMin.toString().padStart(2, '0');
        secondsContent.textContent = this.resetSec.toString().padStart(2, '0');

        console.log('timer reset')
    }
}

let timer = new Timer();

start.addEventListener('click', () => timer.sessionHandler());

stopTime.addEventListener('click', () => {
    timer.stopButtonSessionTimer();
    timer.stopButtonBreakTimer();
    timer.lastTimer = null;
});

reset.addEventListener('click', () => timer.resetValue());

sessionInc.addEventListener('click', () => timer.sessionIncValue());
sessionDec.addEventListener('click', () => timer.sessionDecValue());

breakInc.addEventListener('click', () => timer.breakIncLength());
breakDec.addEventListener('click', () => timer.breakDecLength());
