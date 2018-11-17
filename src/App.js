import React, { Component } from 'react';

import { YearList } from 'components/YearList/YearList';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      years: [ '2005', '2006', '2007',
      '2008', '2009', '2010' ]
    };
  }

  render() {
    return (
      <div className="App">
        <YearList range={this.state.years} />
      </div>
    );
  }
}

export default App;
