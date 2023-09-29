import React from 'react';
import { Chip } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';


const UserChipItem = ({ user, handleFunction }) => {
    return (
        <Chip
            label={user.username}
            style={{
                marginTop: 8,
                marginRight: 5,
                backgroundColor: '#8338ec',
                color: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: '"Poppins", sans-serif !important',
            }}
            onDelete={handleFunction}
            deleteIcon={<AiOutlineClose size={14} color={'white'} />}
        />
    );
}

export default UserChipItem;
