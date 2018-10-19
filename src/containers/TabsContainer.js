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
import SongDetails from '../components/SongDetails';
import SongsShow from '../pages/SongShow';
import LeafletTabsContainer from './LeafletTabsContainer'



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
  state = {
    value: (this.props.params && this.props.params.id) || this.props.location.pathname
  };

  handleChange = (event, value) => {
    this.setState({ value });
    history.push(value);
  };


  render() {
    const tabList  = [{id: "a6fb3e02-b4b8-46bf-92a0-afc9cb5c9ef8"},
                {id: "cb48ca55-0687-41fe-b858-1fa2a596aabd"}, 
                {id: "fdeeff05-bc5b-4f67-aea5-0b970184a438"}]
    const { classes } = this.props;
    const { value } = this.state;
    console.dir(this.props)
    let calledUrl = this.props.match.url
    let calledId = this.props.match.params.id
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Song list" value="/"/>
            <Tab label="Add new song" disabled />
            <Tab label="Leaflet" value='/leaflet' disabled/>
            {tabList.map((singleTab) =>
                <Tab label={singleTab.id} value={"/song/"+singleTab.id} />)}
            });
          </Tabs>
        </AppBar>
        {value === '/' && <TabContainer><SongsIndex /></TabContainer>}
        {value === '/leaflet' && <TabContainer><LeafletTabsContainer /></TabContainer>}
        {tabList.map((singleTab) =>
            value === "/song/"+singleTab.id && <TabContainer><SongsShow id={singleTab.id}/></TabContainer>
        )}
      </div>
    );
  }
}

TabsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(TabsContainer));