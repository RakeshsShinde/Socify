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


export default formatDate;