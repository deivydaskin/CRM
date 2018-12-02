import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ProductDrawer from './ProductDrawer.js';
import Sidebar from './Sidebar.js';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CustomerDrawer from './CustomerDrawer.js';

export default class App extends Component{
    constructor(props){
        super(props);

    }


    render(){
        return(
            
            
            <Grid container>
            
                <Grid item >
                    <Sidebar />
                </Grid>  
                <Router>
                    <Switch>
                        <Route exact path="/" component={CustomerDrawer} />
                        <Route exact path="/products" component={ProductDrawer} />
                    </Switch>
                </Router>
            </Grid>
            
            
        );
    }
}