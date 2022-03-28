import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { default as MuiTabs } from '@material-ui/core/Tabs';
import { default as MuiTab } from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SongsIndex from '../pages/SongsIndex';
import { useDispatch, useSelector } from 'react-redux';
import SongsShow from '../pages/SongShow';
import {
  addTab as addTabAction,
  changeTab as changeTabAction,
  closeTab as closeTabAction,
} from '../actions/tabs';
import TabLabel from '../components/TabLabel'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SongEditContainer from '../containers/SongEditContainer';
import LeafletTabsContainer from '../containers/LeafletTabsContainer';

const AppTab = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

AppTab.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Tabs = () => {
  const { pathname } = useLocation();
  const routerParams = useParams();
  const openTab = useSelector((state) => state.tabs.openTab)
  const openTabs = useSelector((state) => state.tabs.songTabs.tabs)
  const navigate = useNavigate()


  const dispatch = useDispatch()
  const addTab = (id) => dispatch(addTabAction(id))
  const changeTabWithEvent = (_, id) => dispatch(changeTabAction(id));
  const closeTab = (id) => dispatch(closeTabAction(id));
  useEffect(() => {
    if (pathname !== openTab && routerParams.id) {
      routerParams.id && addTab(routerParams.id)
    }
  }, [pathname]);

  useEffect(() => {
    openTab && navigate(openTab);
  }, [openTab])

  const value = openTab || pathname
  const currentTab = value.startsWith("/leaflet") ? "/leaflet" : value;

  return (
    <div>
      <AppBar position="static">
        <MuiTabs value={currentTab} onChange={changeTabWithEvent}>
          <MuiTab label="Song list" value="/" />
          <MuiTab label="Add new song" value="/addSong" />
          <MuiTab label="Leaflet" value='/leaflet' />
          {openTabs.map((singleTab) =>
            <MuiTab key={singleTab.id} label={<TabLabel name={singleTab.name} id={singleTab.id} closeFunction={() => closeTab(singleTab.id)} />} value={"/song/" + singleTab.id} />)
          };
        </MuiTabs>
      </AppBar>
      {value === '/' && <AppTab><SongsIndex /></AppTab>}
      {value === '/addSong' && <AppTab><SongEditContainer /></AppTab>}
      {value.startsWith('/leaflet') && <AppTab><LeafletTabsContainer leaftletTabPath={value} /></AppTab>}


      {openTabs.map((singleTab) =>
        value === "/song/" + singleTab.id && <AppTab key={singleTab.id}><SongsShow id={singleTab.id} /></AppTab>
      )}
    </div>
  );
}
