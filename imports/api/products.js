import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import Product from '../ui/Product';
 
export const Products = new Mongo.Collection('products');

if(Meteor.isServer) {
    Meteor.publish('product', function customerPublication() {
        return Products.find();
    });
}

Meteor.methods({
    'products.insert'(name, price){
        check(name, String);
        check(price, String);

        if(! this.userId){
            throw new Meteor.Error('not-authorized');
        }

        Products.insert({
            name: name,
            price: price,
            createdAt: new Date(),        
        });
    },
    'products.remove'(productId) {
        check(productId, String);

        Products.remove(productId);
    },
    'products.update'(productId, setChecked){
        Products.update(productId, { $set: { checked: setChecked } });
    }
})