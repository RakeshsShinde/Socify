import { IconButton } from '@mui/material';
import React from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
export const renderArrowPrev = (onClickHandler, hasPrev, label) => {
    const arrowStyle = {
        position: 'absolute',
        top: '50%',
        left: -10, // Customize the left offset
        transform: 'translateY(-50%)',
        zIndex: 1,
        cursor: 'pointer',
        fontSize: '24px',
        borderRadius: '50%',
        backgroundColor: 'white',
    };

    return (
        <div
            style={arrowStyle}
            onClick={onClickHandler}
            disabled={!hasPrev}
            aria-label={label}
            role="button"
        >
            <IconButton>
                <GrFormPrevious />
            </IconButton>
        </div>
    );
};

export const renderArrowNext = (onClickHandler, hasNext, label) => {
    const arrowStyle = {
        position: 'absolute',
        top: '50%',
        right: -10,
        transform: 'translateY(-50%)',
        zIndex: 1,
        cursor: 'pointer',
        fontSize: '15px',
        color: 'white',
        borderRadius: '50%',
        backgroundColor: 'white',
    };

    return (
        <div
            style={arrowStyle}
            onClick={onClickHandler}
            disabled={!hasNext}
            aria-label={label}
            role="button"
        >
            <IconButton color='white'>
                <GrFormNext />
            </IconButton>
        </div>
    );
};
