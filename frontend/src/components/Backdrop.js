import React from 'react';
import {createPortal} from 'react-dom';

const Backdrop = ({modal}) => {
    const backdropRoot = document.getElementById('backdrop');
    return modal && createPortal(<div className="backdrop" />, backdropRoot);
};

export default Backdrop;
