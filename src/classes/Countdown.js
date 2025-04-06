const { Time } = require("./index");

class Countdown extends Time {
    static MAX_SECONDS = 99 * 3600 + 59 * 60 + 59; // 359999
    static MIN_SECONDS = 0;

    constructor({ hours = 0, minutes = 0, seconds = 0 } = {}) {
        super({ hours, minutes, seconds });
        this._totalSeconds = hours * 3600 + minutes * 60 + seconds;
        this.savedTime = this._totalSeconds; // Save the original time
        this.intervalId = null;
        this.isStopped = false;

        this.validateLimitTime();
    }

    validateLimitTime() {
        if (this._totalSeconds === 0) {
            throw new Error('Invalid time. Must have at least one non-zero value');
        }
        if (this._totalSeconds < Countdown.MIN_SECONDS || this._totalSeconds > Countdown.MAX_SECONDS) {
            throw new Error('Invalid seconds. Must be between 0 and 99:59:59');
        }
    }

    start(cb) {
        this.validateLimitTime();

        if (this.isStopped) {
            this.reset();
            this.isStopped = false;
        }
        this.savedTime = this._totalSeconds;

        this.intervalId = setInterval(() => {
            this.removeSeconds(1);
            if (this._totalSeconds <= Countdown.MIN_SECONDS) {
                cb();
                this.pause();
            }
        }, 1000);
    }

    pause() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    stop() {
        this.pause();
        this._totalSeconds = this.savedTime;
    }

    reset() {
        this.pause();
        this._totalSeconds = this.savedTime;
    }
}

module.exports = { Countdown };