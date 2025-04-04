const { Time } = require("./index");

class Stopper extends Time {
    static MAX_VALID_SECONDS = 359940;
    static MIN_VALID_SECONDS = 0;

    constructor(autoStart = false) {
        super({ hours: 0, minutes: 0, seconds: 0 });
        this._totalSeconds = 0;

        this.normalizeTime();

        this.intervalId = null;

        if (autoStart) {
            this.start();
        }
    }

    start() {
        this.normalizeTime();
        if (this.intervalId === null) {
            this.intervalId = setInterval(() => {
                if (this._totalSeconds < Stopper.MAX_VALID_SECONDS) {
                    this.addSeconds(1);
                    console.log(this.toString());
                }
            }, 1000);
        }
    }

    pause() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId); // Stop the interval
            this.intervalId = null; // Reset interval ID
        }
    }

    stop() {
        this.pause();
        this._totalSeconds = 0; // reset time to 0
    }

    reset() {
        this._totalSeconds = 0;
    }
}

module.exports = { Stopper };