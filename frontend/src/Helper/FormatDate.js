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

export default formatDate;