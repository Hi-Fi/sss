//Tab selection
export const CHANGE_TAB = "CHANGE_TAB";
export const CHANGE_LEAFLET_TAB = "CHANGE_LEAFLET_TAB";
export const ADD_TAB = "ADD_TAB";
export const CLOSE_TAB = "CLOSE_TAB";
export const RENAME_TAB = "RENAME_TAB";

export function changeTab(id) {
	return {
		type: CHANGE_TAB,
		id,
	};
}

export function changeLeafletTab(id) {
	return {
		type: CHANGE_LEAFLET_TAB,
		id,
	};
}

export function addTab(id) {
	return {
		type: ADD_TAB,
		id,
	};
}

export function closeTab(id) {
	return {
		type: CLOSE_TAB,
		id,
	};
}

export function renameTab(id, name) {
	return {
		type: RENAME_TAB,
		id: id,
		name: name,
	};
}
