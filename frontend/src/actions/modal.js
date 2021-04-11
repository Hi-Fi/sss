/*eslint no-unused-vars: [2, { "args": "none" }]*/

import {closeTab} from './tabs'
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

// Types
export const ERROR_MODAL = 'error';
export const INFO_MODAL = 'info';

export const openModal = (type, title, text, id) => {
	return {
		type: OPEN_MODAL,
		data: {
      title: title,
      text: text,
      type: type,
      id: id
    }
	}
}


export function closeModal(id) {
  return async function closeModal(dispatch, getState) {
    id && dispatch(closeTab(id))
    dispatch({
      type: CLOSE_MODAL,
      id: id
    })
  }
}
