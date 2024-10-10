export const splitDateTime = (dateTimeString) => {
    const [date, time] = dateTimeString.split(' ');
    return { date, time };
};

export const getDayOfWeek = (today) => {
    const date = new Date(today);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
};


export const convertTemp = (temp) => {
    return (temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
};

export const convertTo12Hour = (time) => {
    let [hours, minutes, seconds] = time.split(':');
    let period = 'AM';

    hours = parseInt(hours);

    if (hours >= 12) {
        period = 'PM';
        if (hours > 12) {
            hours -= 12;
        }
    }

    if (hours === 0) {
        hours = 12; // Midnight case
    }

    return `${hours}:${minutes} ${period}`;
}