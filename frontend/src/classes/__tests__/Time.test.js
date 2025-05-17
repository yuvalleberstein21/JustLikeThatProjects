const { Time } = require('../index');

describe('Time Class Tests', () => {
    test('Constructor should initialize with current time when no params are given', () => {
        const time = new Time();
        expect(time.hours).toBeDefined();
        expect(time.minutes).toBeDefined();
        expect(time.seconds).toBeDefined();
    });

    test('Constructor should initialize with given params, setting missing ones to 0', () => {
        const time = new Time({ hours: 14 });
        expect(time.hours).toBe(14);
        expect(time.minutes).toBe(0);
        expect(time.seconds).toBe(0);
    });

    test('Getters should return correct values', () => {
        const time = new Time({ hours: 5, minutes: 30, seconds: 15 });
        expect(time.hours).toBe(5);
        expect(time.minutes).toBe(30);
        expect(time.seconds).toBe(15);
        expect(time.totalSeconds).toBe(5 * 3600 + 30 * 60 + 15);
    });

    test('Setters should update values correctly', () => {
        const time = new Time();
        time.hours = 10;
        time.minutes = 45;
        time.seconds = 50;
        expect(time.hours).toBe(10);
        expect(time.minutes).toBe(45);
        expect(time.seconds).toBe(50);
    });

    test('Adding and removing seconds should work correctly', () => {
        const time = new Time({ hours: 1, minutes: 59, seconds: 30 });
        time.addSeconds(40);
        expect(time.hours).toBe(2);
        expect(time.minutes).toBe(0);
        expect(time.seconds).toBe(10);

        time.removeSeconds(70);
        expect(time.hours).toBe(1);
        expect(time.minutes).toBe(59);
        expect(time.seconds).toBe(0);
    });

    test('Reset seconds should set seconds to 0', () => {
        const time = new Time({ hours: 1, minutes: 30, seconds: 45 });
        time.resetSeconds();
        expect(time.seconds).toBe(0);
    });

    test('Adding and removing minutes should work correctly', () => {
        const time = new Time({ hours: 2, minutes: 30, seconds: 0 });
        time.addMinutes(40);
        expect(time.hours).toBe(3);
        expect(time.minutes).toBe(10);

        time.removeMinutes(20);
        expect(time.hours).toBe(2);
        expect(time.minutes).toBe(50);
    });

    test('Adding and removing hours should work correctly', () => {
        const time = new Time({ hours: 3, minutes: 45, seconds: 0 });
        time.addHours(2);
        expect(time.hours).toBe(5);
        expect(time.minutes).toBe(45);

        time.removeHours(4);
        expect(time.hours).toBe(1);
        expect(time.minutes).toBe(45);
    });

    test('Reset method should set everything to 0', () => {
        const time = new Time({ hours: 5, minutes: 25, seconds: 50 });
        time.resetTime();
        expect(time.hours).toBe(0);
        expect(time.minutes).toBe(0);
        expect(time.seconds).toBe(0);
    });

    test('Adding and subtracting time objects should work correctly', () => {
        const time1 = new Time({ hours: 14, minutes: 0, seconds: 0 });
        const time2 = new Time({ hours: 13, minutes: 48, seconds: 25 });

        time1.addTime(time2);
        expect(time1.toString()).toBe('27:48:25');

        time1.subTime(time2);
        expect(time1.toString()).toBe('14:00:00');

        time2.subTime(time1);
        expect(time2.toString()).toBe('-00:11:35');
    });


    test('Time should not exceed max range 99:59:59', () => {
        const time = new Time({ hours: 99, minutes: 59, seconds: 59 });
        time.addSeconds(10);
        expect(time.toString()).toBe('99:59:59');
    });

    test('Time should not go below min range -99:59:59', () => {
        const time = new Time({ hours: -99, minutes: 59, seconds: 59 });
        time.removeSeconds(10);
        expect(time.toString()).toBe('-99:59:59');
    });

    test('toString should return formatted time string', () => {
        const time = new Time({ hours: 13, minutes: 48, seconds: 25 });
        expect(time.toString()).toBe('13:48:25');
        expect(time.toString('HHh MMm SSs')).toBe('13h 48m 25s');
    });

    test('toString should return negative formatted time', () => {
        const time = new Time({ hours: -1, minutes: 20, seconds: 10 });
        expect(time.toString()).toBe('-01:20:10');
    });

    test('shold return a boolean true or false by comparing operators on time ', () => {
        const time = new Time({ hours: 13, minutes: 48, seconds: 25 });
        const time2 = new Time({ hours: 12, minutes: 48, seconds: 25 });

        expect(time.greaterThenEqual(time2)).toBeTruthy();
        expect(time.greaterThen(time2)).toBeTruthy();
        expect(time.lowerThenEqual(time2)).toBeFalsy();
        expect(time.lowerThen(time2)).toBeFalsy();
    });
});

