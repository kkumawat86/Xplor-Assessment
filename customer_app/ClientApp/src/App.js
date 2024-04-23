import React, { Component } from 'react';

import './custom.css';
import Customer from './components/Customer';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Customer/>
    );
  }
}
