const { Stopper } = require('../Stopper');


describe('Stopper Class', () => {
    beforeEach(() => {
        jest.useFakeTimers(); // Freeze time
        jest.clearAllTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.clearAllTimers(); // <--- this is crucial
        jest.useRealTimers();  // Also important to reset environment
    });

    test('should initialize to 00:00:00 with default constructor', () => {
        const stopper = new Stopper();
        expect(stopper.toString()).toBe('00:00:00');
    });

    test('should not start automatically when autoStart is false', () => {
        const stopper = new Stopper(false);
        jest.advanceTimersByTime(3000); // Simulate 3 seconds
        expect(stopper.toString()).toBe('00:00:00'); // Still 0
    });

    test('should start automatically when autoStart is true', () => {
        const stopper = new Stopper(true);
        jest.advanceTimersByTime(3000);
        expect(stopper.toString()).toBe('00:00:03');
    });

    test('start should begin the timer and increase time every second', () => {
        const stopper = new Stopper();
        stopper.start();
        jest.advanceTimersByTime(5000);
        expect(stopper.toString()).toBe('00:00:05');
    });

    test('pause should stop the timer', () => {
        const stopper = new Stopper();
        stopper.start();
        jest.advanceTimersByTime(3000); // +3s
        stopper.pause();
        jest.advanceTimersByTime(3000); // Should not advance
        expect(stopper.toString()).toBe('00:00:03');
    });

    test('stop should reset time to 00:00:00 and pause the timer', () => {
        const stopper = new Stopper();
        stopper.start();
        jest.advanceTimersByTime(4000); // +4s
        stopper.stop();
        expect(stopper.toString()).toBe('00:00:00');
        jest.advanceTimersByTime(3000);
        expect(stopper.toString()).toBe('00:00:00'); // Still stopped
    });

    test('reset should reset time but not stop the timer', () => {
        const stopper = new Stopper();
        stopper.start();
        jest.advanceTimersByTime(4000); // +4s
        stopper.reset();
        expect(stopper.toString()).toBe('00:00:00');
        jest.advanceTimersByTime(2000); // +2s
        expect(stopper.toString()).toBe('00:00:02');
    });

    test('multiple start calls should not create multiple intervals', () => {
        const stopper = new Stopper();
        stopper.start();
        stopper.start();
        stopper.start();
        jest.advanceTimersByTime(5000);
        expect(stopper.toString()).toBe('00:00:05');
    });

    test('time should not exceed 99:59:00', () => {
        const stopper = new Stopper();
        stopper._totalSeconds = Stopper.MAX_VALID_SECONDS; // 359640
        stopper.start();
        jest.advanceTimersByTime(5000); // 5 seconds
        expect(stopper.toString()).toBe('99:59:00'); // no overflow
    });

    test('should return to 00:00:00 after stop() and reset()', () => {
        const stopper = new Stopper(true);
        jest.advanceTimersByTime(5000);
        stopper.stop();
        stopper.reset();
        expect(stopper.toString()).toBe('00:00:00');
    });
});