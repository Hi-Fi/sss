//Tab selection
export const CHANGE_TAB = 'CHANGE_TAB';
export const ADD_TAB = 'ADD_TAB';

export function changeTab(id) {
    console.log("Changing tab to: "+id)
  return {
    type: CHANGE_TAB,
    id
  };
}

export function addTab(id) {
    return {
        type: ADD_TAB,
        id
    }
}