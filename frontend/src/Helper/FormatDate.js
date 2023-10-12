import moment from 'moment';
const formatDate = (postdate) => {
    const postDate = moment(postdate);
    const currentDate = moment();

    const hoursDiffrence = currentDate.diff(postDate, 'hours');
    if (hoursDiffrence < 20) {
        return postDate.fromNow();
    } else {
        return postDate.format('MMMM Do, YYYY');
    }
}
export const formatDateinChat = (postdate) => {

    const postDate = moment(postdate);
    const currentDate = moment();

    const hoursDifference = currentDate.diff(postDate, 'hours');

    if (hoursDifference < 24 && postDate.date() === currentDate.date()) {
        return postDate.format('hh:mm a');
    } else {
        return postDate.format('DD/MM/YYYY | hh:mm a');
    }

}

export const formatDateinNotification = (notificationDate) => {
    const currentDate = moment();
    const duration = moment.duration(currentDate.diff(moment(notificationDate)));
    if (duration.asSeconds() < 60) {
        return `${Math.round(duration.asSeconds())}s`;
    } else if (duration.asMinutes() < 60) {
        return `${Math.round(duration.asMinutes())}m`;
    } else if (duration.asHours() < 24) {
        return `${Math.round(duration.asHours())}h`;
    } else {
        return `${Math.round(duration.asDays())}d`;
    }
}


export default formatDate;