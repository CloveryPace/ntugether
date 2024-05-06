import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import loadingAnimation from '../loading.json';
import Box from '@mui/material/Box';



export default function Loading() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

    const animation = useRef(null);

    useEffect(() => {
        const instance = lottie.loadAnimation({
            container: animation.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: loadingAnimation,
        });
        return () => instance.destroy();
    }, []);

    return (
        <Box sx={{position: 'fixed', top: '0%', width: '100vw', height: '100vh', background: 'rgb(77 77 77 / 29%);'}}>
            <div style={style} ref={animation}></div>
        </Box>
    );
}
