import { ADD_TAB, CHANGE_TAB, CHANGE_LEAFLET_TAB, CLOSE_TAB, RENAME_TAB } from '../actions/tabs'
import { getIndex } from '../utils/helper';

const INITIAL_STATE = { songTabs: { tabs: [] } }


const tabReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_TAB: {
      let newTab = action.id || '/'
      if (action.id.includes("/song/") && state.songTabs.tabs.filter(function (tab) { return newTab.includes(tab.id) }).length === 0) {
        newTab = '/'
      }
      return { ...state, openTab: newTab }
    }
    case CHANGE_LEAFLET_TAB: {
      let newLeafletTab = action.id || '/'
      return { ...state, openLeafletTab: newLeafletTab }
    }
    case ADD_TAB:
      if (state.songTabs.tabs.filter(function (tab) { return tab.id === action.id }).length > 0) {
        return { ...state, openTab: "/song/"+action.id }
      } else {
        return { ...state, openTab: "/song/"+action.id, songTabs: { tabs: [...state.songTabs.tabs, { id: action.id, name: 'Loading...' }] } }
      }
    case CLOSE_TAB:
      return { ...state, openTab: '/', songTabs: { tabs: state.songTabs.tabs.filter(function (tab) { return tab.id !== action.id }) } }
    case RENAME_TAB: {
      let songIndex = getIndex(action.id, state.songTabs.tabs, 'id')
      if (state.songTabs.tabs[songIndex].name !== action.name) {
        let newSongTabs = state.songTabs.tabs.slice(0)
        newSongTabs[songIndex].name = action.name
        return { ...state, songTabs: { tabs: newSongTabs } }
      } else {
        return state
      }
    }
    default:
      return state;
  }
}
export default tabReducer;
