import React from 'react';
import { createPortal } from 'react-dom';
import { CUSTOM_MODAL } from '../actions/modal'
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux'
import { closeModal as closeModalAction } from '../actions/modal'


const modalContent = (modal, closeModal) => (
  <div className="modal">
    <div className={`title ${modal.type}`} >{modal.title} <Button onClick={() => closeModal(modal.id)}>X</Button></div>
    {modal && (modal.type == CUSTOM_MODAL && modal.custom || <div className="description">{modal.text}</div>)}
    {modal && (modal.type != CUSTOM_MODAL && <Button onClick={() => closeModal(modal.id)}>Close</Button>)}
  </div>
)

export const Modal = () => {
  const modal = useSelector((state) => state.modal)
  const dispatch = useDispatch();
  const closeModal = (id) => dispatch({ type: 'CLOSE_MODAL', id: id})
  const modalRoot = document.getElementById('modal');
  const modalOK = modal && modal.custom && modal.custom.$$typeof || modal && !modal.custom
  if (!modalOK) {
    closeModal()
  }
  return modalOK && createPortal(modalContent(modal, closeModal), modalRoot);
};
