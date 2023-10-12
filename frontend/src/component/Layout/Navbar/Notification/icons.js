import { SlLike } from 'react-icons/sl';
import { FaRegCommentDots } from 'react-icons/fa';
import { AiOutlineSave } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { TiArrowBack } from 'react-icons/ti';

const notificationIcons = {
    default: null,
    postlike: <SlLike size={20} color={'#ff0054'} />,
    postcomment: <FaRegCommentDots size={20} color='#8338ec' />,
    postsave: <AiOutlineSave size={20} color='#f15bb5' />,
    followuser: <BiSolidUser size={22} color={'#3a86ff'} />,
    replaytoComment: <TiArrowBack size={23} color='#2ec4b6' />,
    likeCommet: <SlLike size={20} color={'#ff006e'} />
};

export default notificationIcons;