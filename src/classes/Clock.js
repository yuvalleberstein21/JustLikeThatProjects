const { Time } = require("./index");


class Clock extends Time {
    constructor({ hours = 0, minutes = 0, seconds = 0, autoStart = true } = {}) {
        super({ hours, minutes, seconds });
        this.normalizeTime();
        this.intervalId = null;

        if (autoStart) {
            this.start();
        }
    }

    start() {
        if (this.intervalId === null) {
            this.intervalId = setInterval(() => {
                return this.addSeconds(1);
                // console.log("Current time:", this.toString());
            }, 1000);
        }
    }

    reset() {
        this.resetTime();
        this.normalizeTime();
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
module.exports = { Clock };