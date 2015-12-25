"use strict";

class Timer {
    constructor(options) {
        this._el = options.element;
        this._el.innerHTML = '<span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>';
    }

    start() {
        setInterval(this._update.bind(this), 1000);
        this._update();
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

timer1.start();

let timer2 = new Timer({
    element: document.getElementById('clock2')
});

timer2.start();