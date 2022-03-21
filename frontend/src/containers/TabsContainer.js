import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SongsIndex from '../pages/SongsIndex';
import { connect } from 'react-redux';
import SongsShow from '../pages/SongShow';
import LeafletTabsContainer from './LeafletTabsContainer'
//import SongEditContainer from './SongEditContainer'
// import SongEditForm from '../components/SongEdit'
import { addTab, closeTab, changeTab } from '../actions/tabs';
import TabLabel from '../components/TabLabel'
import SongEditContainer from './SongEditContainer';
import { withRouter } from '../utils/router'


const mapStateToProps = (state) => {
  return {
    openTabs: state.tabs.songTabs.tabs,
    openTab: state.tabs.openTab
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTab: (id) => {
      dispatch(addTab(id))
    },
    closeTab: (id) => {
      dispatch(closeTab(id))
    },
    changeTab: (id) => {
      dispatch(changeTab(id))
    },
    changeTabWithEvent: (event, id) => {
      dispatch(changeTab(id))
    }
  }
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class TabsContainer extends React.Component {
  componentDidMount() {
    // If coming directly to song, add tab to it and display tab
    console.dir(this);
    console.dir(this.props);
    console.dir(this.router);
    if (this.props.router.location.pathname !== this.props.openTab) {
      this.props.router.params.id && this.props.addTab(this.props.router.params.id)
      this.props.changeTab(this.props.router.location.pathname)
    }
  }

  render() {
    console.dir(this);
    console.dir(this.props);
    console.dir(this.router);
    const { classes } = this.props;
    const value = this.props.openTab || this.props.router.location.pathname
    let currentTab = value
    if (value.startsWith("/leaflet")) {
      currentTab = "/leaflet"
    }
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={currentTab} onChange={this.props.changeTabWithEvent}>
            <Tab label="Song list" value="/"/>
            <Tab label="Add new song" value="/addSong" />
            <Tab label="Leaflet" value='/leaflet' />
            {this.props.openTabs.map((singleTab) =>
                <Tab key={singleTab.id} label={<TabLabel name={singleTab.name} id={singleTab.id} closeFunction={() => this.props.closeTab(singleTab.id)}/>} value={"/song/"+singleTab.id} />)
            };
          </Tabs>
        </AppBar>
        {value === '/' && <TabContainer><SongsIndex /></TabContainer>}
        {value === '/addSong' && <TabContainer><SongEditContainer /></TabContainer>}
        {value.startsWith('/leaflet') && <TabContainer><LeafletTabsContainer leaftletTabPath={value}/></TabContainer>}


        {this.props.openTabs.map((singleTab) =>
            value === "/song/"+singleTab.id && <TabContainer key={singleTab.id}><SongsShow id={singleTab.id}/></TabContainer>
        )}
      </div>
    );
  }
}

TabsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
  changeTab: PropTypes.func,
  changeTabWithEvent: PropTypes.func,
  openTabs: PropTypes.array,
  openTab: PropTypes.string,
  addTab: PropTypes.func,
  closeTab: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(TabsContainer)));
