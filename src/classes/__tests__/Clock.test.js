const { Time, Clock } = require('../index');

jest.useFakeTimers(); // Mock setInterval & clearInterval

describe('Clock Class', () => {
    test('Initial time should be set correctly', () => {
        const clock = new Clock({ hours: 14, minutes: 30, seconds: 45, autoStart: false });
        expect(clock.toString()).toBe("14:30:45");
    });

    test('Start method should increase time every second', () => {
        const clock = new Clock({ hours: 14, minutes: 30, seconds: 58, autoStart: false });

        clock.start();
        jest.advanceTimersByTime(2000);

        expect(clock.toString()).toBe("14:31:00");
    });

    test('Stop method should stop time progression', () => {
        const clock = new Clock({ hours: 14, minutes: 30, seconds: 0, autoStart: false });

        clock.start();
        jest.advanceTimersByTime(3000);
        clock.stop();
        const timeAfterStop = clock.toString();

        jest.advanceTimersByTime(5000);
        expect(clock.toString()).toBe(timeAfterStop);
    });

    test('Clock should not start if autoStart is false', () => {
        const clock = new Clock({ hours: 10, minutes: 0, seconds: 0, autoStart: false });
        jest.advanceTimersByTime(5000);

        expect(clock.toString()).toBe("10:00:00");
    });

    test('Clock should start automatically if autoStart is true', () => {
        const clock = new Clock({ hours: 10, minutes: 0, seconds: 0, autoStart: true });
        jest.advanceTimersByTime(5000);

        expect(clock.toString()).toBe("10:00:05");
    });

    test('Reset method should reset time to initial values', () => {
        const clock = new Clock({ hours: 14, minutes: 30, seconds: 45, autoStart: false });

        clock.start();
        jest.advanceTimersByTime(3000);
        clock.reset();

        expect(clock.toString()).toBe("00:00:00");
    });

    test("Clock should increment time", () => {
        const clock = new Clock({ hours: 14, autoStart: true });

        jest.advanceTimersByTime(3000);

        expect(clock.toString()).toBe("14:00:03");
    });

    test("Clock should be instance of Time", () => {
        const clock = new Clock({ hours: 14, autoStart: true });
        expect(clock instanceof Time).toBeTruthy();
    });
});