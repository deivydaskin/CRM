import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Customers } from '../api/customers';

export default class Customer extends Component {
    deleteCustomer(){
        Meteor.call('customers.remove', this.props.customer._id);
    }
    toggleDone(){
        Meteor.call('customers.update', this.props.customer._id);
    }
    render(){

        return(
            <li>
                
                <span className="customerList">
                    {this.props.customer.firstname}  {this.props.customer.lastname}  {this.props.customer.email}  {this.props.customer.age}  <button onClick={this.toggleDone.bind(this)}>{this.props.customer.orderStatus}</button>
                </span>
                <button onClick={this.deleteCustomer.bind(this)}>
                    &times;
                </button>
            </li>
        );
    }
}