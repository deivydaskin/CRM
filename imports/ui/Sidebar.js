import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  appFrame: {
    height: 768,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class Sidebar extends Component {
    constructor(props){
      super(props);
      this.state = {
        hideCompleted: false,
      };
    }
  
    handleClick(){
        window.location.reload();
    }

    render() {
      const { classes } = this.props;
  
      const drawer = (
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
        <AccountsUIWrapper style={{margin: 20}}/>
          <div className={classes.toolbar} />
          <Divider />
          <Button href="/" onClick={this.handleClick.bind(this)}>Customers</Button>
          <Button href="/products" onClick={this.handleClick.bind(this)}>Products</Button>
        </Drawer>
      );
  
      return (
        <div className={classes.root}>
          <div className={classes.appFrame}>
            {drawer}
          </div>
        </div>
      );
    }
  }
  
  Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Sidebar);