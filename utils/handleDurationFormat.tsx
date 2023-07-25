const moment = require('moment');
// import moment from 'moment';

export default function handleDurationFormat(duration: number): string {
    return moment(duration).format('HH:mm:ss');
}