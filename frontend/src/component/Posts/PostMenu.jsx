import React, { useState } from 'react';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/postActions'
import CreateNewPost from './CreateNewPost';
import useStyles from './postmenu.style';

const PostMenu = ({ post }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openEditModal, setopenEditModal] = useState(false);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditPost = () => {
        setopenEditModal(true);
        handleClose()
    }
    const handleDeletePost = async () => {
        await dispatch(deletePost(post._id));
        handleClose();
    }
    return (
        <>
            <IconButton
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableRipple
                className={classes.options}
            >
                <BiDotsVerticalRounded size={25} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    className: classes.paperprops,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    className={classes.menuitems}
                    onClick={handleEditPost}>
                    <ListItemIcon>
                        <IoCreateOutline color={'green'} size={22} />
                    </ListItemIcon>
                    Edit Post
                </MenuItem>
                <MenuItem
                    className={classes.menuitems}
                    onClick={handleDeletePost}>
                    <ListItemIcon>
                        <AiOutlineDelete color={'crimson'} size={22} />
                    </ListItemIcon>
                    Delete Post
                </MenuItem>
            </Menu>
            {openEditModal && (
                <CreateNewPost
                    post={post}
                    open={openEditModal}
                    setopen={setopenEditModal} />
            )}

        </>
    );
}

export default PostMenu;
