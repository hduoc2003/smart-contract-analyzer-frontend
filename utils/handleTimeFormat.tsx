const moment = require('moment');

export default function handleTimeFormat(time: number): string {
    return moment(time).format('HH:mm:ss YYYY-MM-DD');
}

