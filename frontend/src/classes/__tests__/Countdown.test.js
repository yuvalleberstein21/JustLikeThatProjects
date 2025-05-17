const { Countdown } = require("../Countdown");

describe('Countdown', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    describe('Countdown constructor - invalid inputs', () => {
        test.each([
            [{ hours: 100 }, 'Invalid seconds. Must be between 0 and 99:59:59'],
            [{ hours: 0, minutes: 0, seconds: 0 }, 'Invalid time. Must have at least one non-zero value'],
            [{}, 'Invalid time. Must have at least one non-zero value'],
        ])('should throw error for input %o', (input, errorMessage) => {
            expect(() => new Countdown(input)).toThrow(errorMessage);
        });
    });

    test('should initialize with seconds only and format correctly', () => {
        const countdown = new Countdown({ seconds: 5 });
        expect(countdown.toString()).toBe('00:00:05');
    });

    test('should call cb after countdown reaches 0', () => {
        const cb = jest.fn();
        const countdown = new Countdown({ seconds: 3 });

        countdown.start(cb);

        jest.advanceTimersByTime(3000);
        jest.runOnlyPendingTimers();

        expect(cb).toHaveBeenCalledTimes(1);
        expect(countdown.toString()).toBe('00:00:00');
    });

    test('pause should stop the countdown temporarily', () => {
        const cb = jest.fn();
        const countdown = new Countdown({ seconds: 5 });

        countdown.start(cb);
        jest.advanceTimersByTime(2000);
        countdown.pause();

        const valueAfterPause = countdown.toString();

        jest.advanceTimersByTime(5000); // Should not advance
        expect(countdown.toString()).toBe(valueAfterPause);
        expect(cb).not.toHaveBeenCalled();
    });

    test('stop should reset countdown', () => {
        const cb = jest.fn();
        const countdown = new Countdown({ seconds: 5 });

        countdown.start(cb);
        jest.advanceTimersByTime(2000);
        countdown.stop();

        expect(countdown.toString()).toBe('00:00:05'); // Reset to the initial time
        expect(cb).not.toHaveBeenCalled();
    });

    test('should stop and reset only on the next start after stop', () => {
        const cb = jest.fn();
        const countdown = new Countdown({ hours: 1 });

        countdown.stop();

        // Modify the time and start again
        countdown.hours = 0;
        countdown.minutes = 0;
        countdown.seconds = 2;

        countdown.start(cb);
        jest.advanceTimersByTime(2000);

        expect(cb).toHaveBeenCalledTimes(1);
        expect(countdown.toString()).toBe('00:00:00');
    });
});