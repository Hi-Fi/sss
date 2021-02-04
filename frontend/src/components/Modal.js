import React from 'react';
import {createPortal} from 'react-dom';

const Modal = ({modal, closeModal}) => {
    const modalRoot = document.getElementById('modal');
    return modal && createPortal(
      <div className="modal">
        <div className={`title ${modal.type}`} >{modal.title}</div>
        <div className="description">{modal.text}</div>
        <button className="button" onClick={() => closeModal(modal.id)}>Close</button>
      </div>, modalRoot);
};

export default Modal;
