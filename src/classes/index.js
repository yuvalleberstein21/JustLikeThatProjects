const { getDate, TimeConverter } = require("./utils/calculates");


class Time {
    constructor({ hours = 0, minutes = 0, seconds = 0 } = {}) {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            this._totalSeconds = getDate();
        } else {
            this._totalSeconds = (Math.abs(hours) * 3600 + minutes * 60 + seconds) * Math.sign(hours);
        }
        this.normalizeTime();
    }

    // מסדר את הזמן כך שהתוצאה תהיה בפורמט חוקי (ללא חריגות)
    normalizeTime() {
        const MAX_TIME = 99 * 3600 + 59 * 60 + 59;
        const MIN_TIME = -MAX_TIME;

        // מגביל את הזמן כך שהוא לא יצא מהטווח
        this._totalSeconds = Math.max(MIN_TIME, Math.min(this._totalSeconds, MAX_TIME));
    }

    toString() {
        const absSeconds = Math.abs(this._totalSeconds);
        const sign = this._totalSeconds < 0 ? "-" : "";

        const hours = Math.floor(absSeconds / 3600);
        const minutes = Math.floor((absSeconds % 3600) / 60);
        const seconds = absSeconds % 60;

        return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }


    // GETTERS
    get hours() {
        return TimeConverter.totalSecondsToHours(this.totalSeconds);
    }

    get minutes() {
        return TimeConverter.totalSecondsToMinutes(this.totalSeconds);
    }

    get seconds() {
        return TimeConverter.totalSecondsToSeconds(this.totalSeconds);

    }

    get totalSeconds() {
        return this._totalSeconds;
    }


    // SETTERS
    set hours(value) {
        this._totalSeconds = value * 3600 + this.minutes * 60 + this.seconds;
        this.normalizeTime();
    }

    set minutes(value) {
        this._totalSeconds = this.hours * 3600 + value * 60 + this.seconds;
        this.normalizeTime();
    }

    set seconds(value) {
        this._totalSeconds = this.hours * 3600 + this.minutes * 60 + value;
        this.normalizeTime();
    }

    // פעולות על הזמן

    addSeconds(seconds) {
        this._totalSeconds += seconds;
        this.normalizeTime();
    }

    addMinutes(minutes) {
        this._totalSeconds += TimeConverter.minutesToSeconds(minutes);
    }

    addHours(hours) {
        this._totalSeconds += TimeConverter.hoursToSeconds(hours);
    }

    removeSeconds(seconds) {
        this.addSeconds(-seconds);
    }

    removeMinutes(minutes) {
        this.addMinutes(-minutes);
    }

    removeHours(hours) {
        this.addHours(-hours);
    }

    resetSeconds() {
        this.seconds = 0;
    }

    resetMinutes() {
        this.minutes = 0;
    }

    resetHours() {
        this.hours = 0;
    }

    resetTime() {
        this._totalSeconds = 0;
    }

    addTime(time) {
        return this.addSeconds(time.totalSeconds);
    }

    subTime(time) {
        this.removeSeconds(time.totalSeconds);
    }

    toString(format = 'HH:MM:SS') {
        let totalSeconds = Math.abs(this._totalSeconds);
        let sign = this._totalSeconds < 0 ? '-' : '';

        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        return sign + format
            .replace('HH', String(hours).padStart(2, '0'))
            .replace('MM', String(minutes).padStart(2, '0'))
            .replace('SS', String(seconds).padStart(2, '0'));
    }

    // Instance methods
    greaterThenEqual(time) {
        return this._totalSeconds >= time.totalSeconds;
    }

    greaterThen(time) {
        return this._totalSeconds > time.totalSeconds;
    }

    lowerThenEqual(time) {
        return this._totalSeconds <= time.totalSeconds;
    }

    lowerThen(time) {
        return this._totalSeconds < time.totalSeconds;
    }
}


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

try {
    // const stopper1 = new Stopper();
    // console.log('Initial Time', stopper1.toString());
    // stopper1.start();
    // console.log('after start clock', stopper1.toString());

} catch (error) {
    console.error(error.message);
}

module.exports = { Time, Clock, Stopper };
