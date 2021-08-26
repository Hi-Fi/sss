import React from 'react';
import { createPortal } from 'react-dom';
import { CUSTOM_MODAL } from '../actions/modal'
import Button from '@material-ui/core/Button';

const modalContent = (modal, closeModal) => (
  <div className="modal">
    <div className={`title ${modal.type}`} >{modal.title} <Button onClick={() => closeModal(modal.id)}>X</Button></div>
    {modal && (modal.type == CUSTOM_MODAL && modal.custom || <div className="description">{modal.text}</div>)}
    {modal && (modal.type != CUSTOM_MODAL && <Button onClick={() => closeModal(modal.id)}>Close</Button>)}
  </div>
)

const Modal = ({ modal, closeModal }) => {
  const modalRoot = document.getElementById('modal');
  const modalOK = modal && modal.custom && modal.custom.$$typeof || modal && !modal.custom
  if (!modalOK) {
    closeModal()
  }
  return modalOK && createPortal(modalContent(modal, closeModal), modalRoot);
};

export default Modal;
