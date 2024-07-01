import React from 'react';
// import './styles.css';
import Lottie from "lottie-react";
import animationData from '../img/lottie-loading.json';

const Loading = () => {
    
    return (
        // <div className='Page' style={{ fontSize: '24px', margin: '1em 1em' }}>
        <div style={{width:'50%', height:'50%', margin:'0 auto'}}>
            <Lottie animationData={animationData}/>
        </div>
    );
}

export default Loading