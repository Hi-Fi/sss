import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { changeTab } from '../actions/tabs';
import LeafletSongsIndex from '../pages/LeafletSongsIndex';
import LeafletLayout from '../pages/LeafletLayout';
import LeafletInfo from '../pages/LeafletInfo';


const mapStateToProps = (state) => {
  return { 
    openTab: state.tabs.openTab
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (id) => {
      dispatch(changeTab(id))
    },
    changeTabWithEvent: (event, id) => {
      dispatch(changeTab(id))
    }
  }
}

function LeafletTabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

LeafletTabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class LeafletTabsContainer extends React.Component {
  render() {
    const { classes } = this.props;
    const value = this.props.openTab || this.props.leaftletTabPath
    return (
      <div className={classes.root}>
          <Tabs value={value} onChange={this.props.changeTabWithEvent}>
            <Tab label="Songs selected to leaflet" value='/leaflet'/>
            <Tab label="Basic information" value="/leaflet/info" />
            <Tab label="Leaflet layout" value="/leaflet/layout"/>
            <Tab label="Leaflet preview" value="/leaflet/preview"/>
          </Tabs>
          {value === '/leaflet/info' && <LeafletTabContainer><LeafletInfo /></LeafletTabContainer>}
          {value === '/leaflet/layout' && <LeafletTabContainer><LeafletLayout /></LeafletTabContainer>}
          {value === '/leaflet' && <LeafletTabContainer><LeafletSongsIndex /></LeafletTabContainer>}
      </div>
    );
  }
}

LeafletTabsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  leaftletTabPath: PropTypes.string,
  openTab: PropTypes.string,
  changeTab: PropTypes.func,
  changeTabWithEvent: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LeafletTabsContainer));