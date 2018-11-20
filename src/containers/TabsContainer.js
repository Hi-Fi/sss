import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SongsIndex from '../pages/SongsIndex';
import { connect } from 'react-redux';
import history from '../utils/history'
import SongsShow from '../pages/SongShow';
import LeafletTabsContainer from './LeafletTabsContainer'
//import SongEditContainer from './SongEditContainer'
import SongEditForm from '../components/SongEdit'
import { addTab, closeTab, changeTab } from '../actions/tabs';
import TabLabel from '../components/TabLabel'
import SongEditContainer from './SongEditContainer';


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
  componentWillMount() {
    //console.log(this.props.match.params.id)
    if (this.props.match.params.id && this.props.match.url !== this.props.openTab) {
      this.props.match.params.id && this.props.addTab(this.props.match.params.id)
      this.props.changeTab(this.props.match.url)
    } 
  }

  render() {
    const { classes } = this.props;
    let value = this.props.openTab || this.props.match.params.id || this.props.match.path
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={this.props.openTab} onChange={this.props.changeTabWithEvent}>
            <Tab label="Song list" value="/"/>
            <Tab label="Add new song" value="/addSong" />
            <Tab label="Leaflet" value='/leaflet' disabled/>
            {this.props.openTabs.map((singleTab) =>
                <Tab key={singleTab.id} label={<TabLabel name={singleTab.name} id={singleTab.id} closeFunction={() => this.props.closeTab(singleTab.id)}/>} value={"/song/"+singleTab.id} />)}
            });
          </Tabs>
        </AppBar>
        {value === '/' && <TabContainer><SongsIndex /></TabContainer>}
        {value === '/addSong' && <TabContainer><SongEditContainer /></TabContainer>}
        {value === '/leaflet' && <TabContainer><LeafletTabsContainer /></TabContainer>}
        {this.props.openTabs.map((singleTab) =>
            value === "/song/"+singleTab.id && <TabContainer key={singleTab.id}><SongsShow id={singleTab.id}/></TabContainer>
        )}
      </div>
    );
  }
}

TabsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TabsContainer));