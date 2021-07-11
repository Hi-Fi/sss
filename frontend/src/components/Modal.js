import React from 'react';
import { createPortal } from 'react-dom';
import { CUSTOM_MODAL } from '../actions/modal'
import User from '../pages/User';

const modalContent = (modal, closeModal) => (
  <div className="modal">
    <div className={`title ${modal.type}`} >{modal.title}</div>
    {modal && (modal.type == CUSTOM_MODAL && modal.custom || <div className="description">{modal.text}</div>)}
    <button className="button" onClick={() => closeModal(modal.id)}>Close</button>
  </div>
)

const Modal = ({ modal, closeModal }) => {
  const modalRoot = document.getElementById('modal');
  const modalOK = modal && modal.custom && modal.custom.$$typeof || modal && !modal.custom
  if (!modalOK) {
    closeModal()
  }
  modal && console.log(modal.type, CUSTOM_MODAL)
  return modalOK && createPortal(modalContent(modal, closeModal), modalRoot);
};

export default Modal;
