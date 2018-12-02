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
//import { mailFolderListItems, otherMailFolderListItems } from './tileData';

import { withTracker } from 'meteor/react-meteor-data';
import { Customers } from '../api/customers.js';
import Customer from './Customer.js';
import ReactDOM from 'react-dom';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Meteor } from 'meteor/meteor';


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
    width: '100%',
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
  input: {
    wrap: 'nowrap',
  }
});

class CustormerDrawer extends Component {
  constructor(props){
    super(props);
    this.state = {
      hideCompleted: false,
    };
  }

  handleClick(event) {
    event.preventDefault();

    const fname = ReactDOM.findDOMNode(this.refs.fname).value.trim();
    const lname = ReactDOM.findDOMNode(this.refs.lname).value.trim();
    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const age = ReactDOM.findDOMNode(this.refs.age).value.trim();

    Meteor.call('customers.insert', fname, lname, email, age);

    ReactDOM.findDOMNode(this.refs.fname).value = '';
    ReactDOM.findDOMNode(this.refs.lname).value = '';
    ReactDOM.findDOMNode(this.refs.email).value = '';
    ReactDOM.findDOMNode(this.refs.age).value = '';

  }

  toggleHideCompleted(){
    this.setState({
      hideCompleted: !this.state.hideCompleted
    });
  }

  renderCustomers(){
    let filteredOrders = this.props.customers;
    if(this.state.hideCompleted){
      filteredOrders = filteredOrders.filter(customer => (customer.orderStatus !== "Completed"));
    }
    return filteredOrders.map((customer) => (
        <Customer key={customer._id} customer={customer} /> 
    ));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classes.appBar}
          >
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Customers
              </Typography>
            </Toolbar>
          </AppBar>
          { this.props.currentUser ?
          <main className={classes.content}>
          
            <div className={classes.toolbar} />
            <div className={classes.input}>
            <form className="new-customer">
            <input
              type="text"
              ref="fname"
              placeholder="First Name"
            />
            <input
              type="text"
              ref="lname"
              placeholder="Last Name"
            />
            <input
              type="text"
              ref="email"
              placeholder="Email"
            />
            <input
              type="text"
              ref="age"
              placeholder="Age"
            />
            <button onClick={this.handleClick.bind(this)}>Add</button>
          
          
          <label>
            <input 
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed orders
          </label>         
          <label>
            ({this.props.incompleteCount})
          </label>
          </form>
          </div>
        <Toolbar className={classes.toolbar}>
              <div className={classes.appBar}>
              <label>First_name    </label>
              <label>Last_name     </label>
              <label>Email         </label>
              <label>Age           </label>
              <label>Order_status</label>
              </div>
              </Toolbar>
              <div className={classes.content}>
          
            <ul>
              {this.renderCustomers()}
            </ul>
            </div>
  
          </main>
          : " "
        }
        </div>
      </div>
    );
  }
}

CustormerDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker(() => {
  Meteor.subscribe('customer');
  return {
      customers: Customers.find({}, { sort: { createdAt: -1 } }).fetch(),
      incompleteCount: Customers.find({ orderStatus: "Not done"}).count(),
      currentUser: Meteor.user(),
  };
})(withStyles(styles)(CustormerDrawer));