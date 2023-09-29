import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { AiFillMessage, AiOutlineMessage, AiOutlineSetting } from 'react-icons/ai'
import { LuMessageCircle } from 'react-icons/lu'
import { RiHome2Line, RiHome2Fill } from 'react-icons/ri'
import { CiSaveUp2 } from 'react-icons/ci'
import { Link } from 'react-router-dom';
import useStyles from './Footer.style'
import CreateNewPost from '../../Posts/CreateNewPost';


const Footer = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('home');
    const [openpostmodel, setopenpostmodel] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const AddNewPost = () => {
        setopenpostmodel(true);
    }

    return (
        <>
            <BottomNavigation
                sx={{
                    backdropFilter: 'blur(100px)',
                    backgroundColor: '#FBFBFB',
                    display: 'flex',
                    // width:'100%',
                    justifyContent: 'space-between'

                }}
                value={value}
                onChange={handleChange}
                className={classes.root}
            >

                <BottomNavigationAction
                    label="Home"
                    value="home"
                    classes={{ selected: classes.selected }}
                    icon={
                        value === "home" ? <Link to='/home' ><RiHome2Fill className={classes.selected} size={25} /></Link> :
                            <Link to='/home' ><RiHome2Line size={25} /></Link>}
                />

                <BottomNavigationAction
                    label="Message"
                    value="message"
                    classes={{ selected: classes.selected }}
                    icon={value == "message" ? <Link to='/chats'> <AiFillMessage className={classes.selected} size={25} /> </Link> :
                        <Link to='/chats'><AiOutlineMessage size={25} /></Link>}
                />

                <BottomNavigationAction
                    label="Post"
                    value="post"
                    classes={{ selected: classes.selected }}
                    icon={value == "post" ? <CiSaveUp2 className={classes.selected} size={25} onClick={AddNewPost} /> : <CiSaveUp2 size={25} onClick={AddNewPost} />}
                />

                <BottomNavigationAction
                    label="Setting"
                    value="setting"
                    classes={{ selected: classes.selected }}
                    icon={value == "setting" ? <AiOutlineSetting className={classes.selected} size={25} /> : <AiOutlineSetting size={25} />}
                />
            </BottomNavigation >
            <CreateNewPost open={openpostmodel} setopen={setopenpostmodel} />
        </>
    );
}

export default Footer;
