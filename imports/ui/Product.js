import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Products } from '../api/products';

export default class Product extends Component {
    deleteProduct(){
        Meteor.call('products.remove', this.props.product._id);
    }
    toggleStock(){
        Meteor.call('products.update', this.props.product._id, !this.props.product.checked);
    }
    render(){
        const productClassName = this.props.product.checked ? 'checked' : '';
        let stock;
        if(this.props.product.checked) stock = 'In stock';
            else stock = 'Out of stock';
        return(
            <li className={productClassName}>
                
                <span className="productList">
                    {this.props.product.name}  {this.props.product.price}  {stock}  <input type="checkbox" readOnly checked={!!this.props.product.checked} onClick={this.toggleStock.bind(this)} />
                </span>
                <button onClick={this.deleteProduct.bind(this)}>
                    &times;
                </button>
            </li>
        );
    }
}