import React from 'react';

const logo = ({ Icon }) => {
    return (
        <div className='w-[40px] mt-[2px] flex justify-center border-none items-center h-[40px] rounded-full bg-[#f8f9fa]'>
            <Icon size={18} />
        </div>
    );
}

export default logo;
