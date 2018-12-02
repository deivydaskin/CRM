import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import './main.html';
import App from '../imports/ui/App.js';
import '../imports/api/customers.js';
import '../imports/startup/accounts-config.js';
import '../imports/api/products.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});