import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { renderIndicator } from './PostCarosualIndicator'
import { renderArrowNext, renderArrowPrev } from './PostCarasoulButton';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    image: {
        objectFit: 'cover',
        maxHeight: '500px',
        width: '100%',
    }

}))

const PostCarasoual = ({ postimages }) => {
    const classes = useStyles();
    const shouldShowArrows = postimages?.length > 1;
    return (
        <>
            <Carousel
                renderArrowNext={shouldShowArrows ? renderArrowNext : undefined}
                renderArrowPrev={shouldShowArrows ? renderArrowPrev : undefined}
                renderIndicator={renderIndicator}
                showStatus={false}
                showThumbs={false}
                transitionTime={1000}

            >
                {postimages?.map((p) => (
                    <div key={p}>
                        <img
                            className={classes.image}
                            src={p.secure_url}
                            alt={'postimage'}

                        />
                    </div>
                ))}

            </Carousel>
        </>
    );
}

export default PostCarasoual;
