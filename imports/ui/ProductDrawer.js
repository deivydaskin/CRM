import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withTracker } from 'meteor/react-meteor-data';
import { Products } from '../api/products.js';
import Product from './Product.js';
import ReactDOM from 'react-dom';
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
});

class ProductDrawer extends Component {
  constructor(props){
    super(props);
    this.state = {
      hideCompleted: false,
    };
  }

  handleClick(event) {
    event.preventDefault();

    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const price = ReactDOM.findDOMNode(this.refs.price).value.trim();

    Meteor.call('products.insert', name, price);

    ReactDOM.findDOMNode(this.refs.name).value = '';
    ReactDOM.findDOMNode(this.refs.price).value = '';
  }

  toggleHideCompleted(){
    this.setState({
      hideCompleted: !this.state.hideCompleted
    });
  }

  renderProducts(){
    return this.props.products.map((product) => (
        <Product key={product._id} product={product} /> 
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
                Products
              </Typography>
            </Toolbar>
          </AppBar>
          { this.props.currentUser ?
          <main className={classes.content}>
          
            <div className={classes.toolbar} />
            
            <form className="new-customer">
            <input
              type="text"
              ref="name"
              placeholder="Product name"
            />
            <input
              type="text"
              ref="price"
              placeholder="Price"
            />
            <button onClick={this.handleClick.bind(this)}>Add</button>
          </form>
            <Toolbar>
            <ul>
              {this.renderProducts()}
            </ul>
            </Toolbar>
          </main>
          : " "
        }
        </div>
      </div>
    );
  }
}

ProductDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker(() => {
  Meteor.subscribe('product');
  return {
      products: Products.find({}, { sort: { createdAt: -1 } }).fetch(),
      currentUser: Meteor.user(),
  };
})(withStyles(styles)(ProductDrawer));