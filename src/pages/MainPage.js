import React, {Component} from 'react';

import {YearList} from 'components/YearList/YearList';
import CurrentYear from 'components/CurrentYear/CurrentYear';
import {DriverList} from 'components/DriverList/DriverList';

import styles from './MainPage.module.css';

import {ergastAPI} from '../api';
import {genRangeYearArray} from '../utils';

export default class MainPage extends Component {
  constructor() {
    super();
    this.ergastapi = ergastAPI('2003');
    this.state = {
      loading: false,
      years: genRangeYearArray(2005, 2015),
      drivers: [],
    };
  }

  componentDidMount() {
    this.ergastapi.getData().then(drivers => {
      this.setState((state, props) => {
        return {drivers};
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <CurrentYear year="2015" />
        <div className={styles.section}>
          <YearList range={this.state.years} />
          <div className={styles.contentSection}>
            <DriverList drivers={this.state.drivers} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
