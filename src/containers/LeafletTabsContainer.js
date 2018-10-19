import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import history from '../utils/history'



function LeafletTabsContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

LeafletTabsContainer.propTypes = {
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
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
    history.push(value);
  };


  render() {
    const { classes } = this.props;
    const { value } = this.state;
    console.log("Rendering second level")
    return (
      <div className={classes.root}>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Songs selected to leaflet" value='/leaflet' disabled/>
            <Tab label="Basic information" disabled />
            <Tab label="Leaflet layout" disabled />
            <Tab label="Leaflet preview" disabled />
          </Tabs>
        {<LeafletTabsContainer>Nothing yet...</LeafletTabsContainer>}
      </div>
    );
  }
}

TabsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(LeafletTabsContainer));