import React from 'react';

export const renderIndicator = (onClickHandler, isSelected, index) => {
    const indicatorStyle = {
        display: 'inline-block',
        width: '9px',
        height: '9px',
        margin: '0 5px',
        backgroundColor: isSelected ? '#4894cf' : '#c7c7c7',
        borderRadius: '50%',
        cursor: 'pointer',
    };

    return (
        <li
            style={indicatorStyle}
            onClick={onClickHandler}
            key={index}
            role="button"
            tabIndex={0}
        />
    );
};



