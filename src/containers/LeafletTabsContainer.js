import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import history from '../utils/history'
import SongsIndex from '../pages/SongsIndex';
import SongEditContainer from './SongEditContainer';
import LeafletInfo from '../pages/LeafletInfo';



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
  state = {
    value: this.props.leaftletTabPath
  };

  handleChange = (event, value) => {
    this.setState({ value });
    history.push(value);
  };


  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Songs selected to leaflet" value='/leaflet'/>
            <Tab label="Basic information" value="/leaflet/info" />
            <Tab label="Leaflet layout" value="/leaflet/layout"/>
            <Tab label="Leaflet preview" value="/leaflet/preview"/>
          </Tabs>
          {value === '/leaflet/info' && <LeafletTabContainer><LeafletInfo /></LeafletTabContainer>}
          {value === '/leaflet/layout' && <LeafletTabContainer><SongEditContainer /></LeafletTabContainer>}
          {value === '/leaflet' && <LeafletTabContainer><SongsIndex /></LeafletTabContainer>}
      </div>
    );
  }
}

LeafletTabsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  leaftletTabPath: PropTypes.string.isRequired,
};

export default connect()(withStyles(styles)(LeafletTabsContainer));