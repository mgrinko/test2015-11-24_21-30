"use strict";

class Timer {
    constructor(options) {
        this._el = options.element;

        this._startButton = this._el.querySelector('.start');
        this._startButton.addEventListener('click', this.start.bind(this));

        this._stopButton = this._el.querySelector('.stop');
        this._stopButton.addEventListener('click', this.stop.bind(this));
    }

    start() {
        this._timerId = setInterval(this._update.bind(this), 1000);
        this._update();
    }

    stop() {
        clearInterval(this._timerId);
    }

    _update() {
        var date = new Date();

        var hours = date.getHours();
        if (hours < 10) hours = '0' + hours;
        this._el.children[0].innerHTML = hours;

        var minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;
        this._el.children[1].innerHTML = minutes;

        var seconds = date.getSeconds();
        if (seconds < 10) seconds = '0' + seconds;
        this._el.children[2].innerHTML = seconds;
    }
}

let timer1 = new Timer({
    element: document.getElementById('clock1')
});
