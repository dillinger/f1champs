import React, {Component} from 'react';

import {YearList} from 'components/YearList/YearList';
import CurrentYear from 'components/CurrentYear/CurrentYear';
import {DriverList} from 'components/DriverList/DriverList';

import 'normalize.css';
import './App.css';

const drivers = {
  data: [
    {
      driverId: 'alonso',
      permanentNumber: '14',
      code: 'ALO',
      url: 'http://en.wikipedia.org/wiki/Fernando_Alonso',
      givenName: 'Fernando',
      familyName: 'Alonso',
      dateOfBirth: '1981-07-29',
      nationality: 'Spanish',
    },
    {
      driverId: 'hamilton',
      permanentNumber: '44',
      code: 'HAM',
      url: 'http://en.wikipedia.org/wiki/Lewis_Hamilton',
      givenName: 'Lewis',
      familyName: 'Hamilton',
      dateOfBirth: '1985-01-07',
      nationality: 'British',
    },
    {
      driverId: 'kovalainen',
      code: 'KOV',
      url: 'http://en.wikipedia.org/wiki/Heikki_Kovalainen',
      givenName: 'Heikki',
      familyName: 'Kovalainen',
      dateOfBirth: '1981-10-19',
      nationality: 'Finnish',
    },
    {
      driverId: 'kubica',
      code: 'KUB',
      url: 'http://en.wikipedia.org/wiki/Robert_Kubica',
      givenName: 'Robert',
      familyName: 'Kubica',
      dateOfBirth: '1984-12-07',
      nationality: 'Polish',
    },
    {
      driverId: 'massa',
      permanentNumber: '19',
      code: 'MAS',
      url: 'http://en.wikipedia.org/wiki/Felipe_Massa',
      givenName: 'Felipe',
      familyName: 'Massa',
      dateOfBirth: '1981-04-25',
      nationality: 'Brazilian',
    },
    {
      driverId: 'raikkonen',
      permanentNumber: '7',
      code: 'RAI',
      url: 'http://en.wikipedia.org/wiki/Kimi_R%C3%A4ikk%C3%B6nen',
      givenName: 'Kimi',
      familyName: 'Räikkönen',
      dateOfBirth: '1979-10-17',
      nationality: 'Finnish',
    },
    {
      driverId: 'vettel',
      permanentNumber: '5',
      code: 'VET',
      url: 'http://en.wikipedia.org/wiki/Sebastian_Vettel',
      givenName: 'Sebastian',
      familyName: 'Vettel',
      dateOfBirth: '1987-07-03',
      nationality: 'German',
    },
  ],
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      years: [
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
      ],
    };
  }

  render() {
    return (
      <div className="App">
        <CurrentYear year="2010" />
        <YearList range={this.state.years} />
        <DriverList drivers={drivers.data} />
      </div>
    );
  }
}

export default App;
