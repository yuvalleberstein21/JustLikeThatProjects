function getDate() {
    const now = new Date();
    return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
}

const TimeConverter = {
    totalSecondsToHours: (totalSeconds) => Math.floor(totalSeconds / 3600),
    totalSecondsToMinutes: (totalSeconds) => Math.floor((totalSeconds % 3600) / 60),
    totalSecondsToSeconds: (totalSeconds) => Math.floor(totalSeconds % 60),
    hoursToSeconds: (hours) => hours * 3600,
    minutesToSeconds: (minutes) => minutes * 60,
    secondsToHours: (seconds) => seconds / 3600,
    secondsToMinutes: (seconds) => seconds / 60,
};



module.exports = { getDate, TimeConverter };