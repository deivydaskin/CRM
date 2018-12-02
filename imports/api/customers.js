import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import Customer from '../ui/Customer';
 
export const Customers = new Mongo.Collection('customers');

if(Meteor.isServer) {
    Meteor.publish('customer', function customerPublication() {
        return Customers.find();
    });
}

Meteor.methods({
    'customers.insert'(fname, lname, email, age){
        check(fname, String);
        check(lname, String);
        check(email, String);
        check(age, String);

        if(! this.userId){
            throw new Meteor.Error('not-authorized');
        }

        Customers.insert({
            firstname: fname,
            lastname: lname,
            email: email,
            age: age,
            createdAt: new Date(),
            orderStatus: "Not done",
        });
    },
    'customers.remove'(customerId) {
        check(customerId, String);

        Customers.remove(customerId);
    },
    'customers.update'(customerId){
        check(customerId, String);

        Customers.update(customerId, {
            $set: {orderStatus: "Completed"}
        });
    }
})