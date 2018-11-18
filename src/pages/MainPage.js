import React, {Component} from 'react';

import {YearList} from 'components/YearList/YearList';
import Header from 'components/Header/Header';
import {DriverList} from 'components/DriverList/DriverList';
import Loader from 'components/Loader/Loader';

import {ergastAPI} from '../services/ergastService';
import {genRangeYearArray} from '../utils';

import styles from './MainPage.module.css';

export default class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      selectedYear: '2005',
      years: genRangeYearArray(2005, 2015),
      drivers: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  fetchData(query) {
    ergastAPI(query)
      .getData()
      .then(drivers => {
        this.setState((state, props) => {
          return {
            drivers,
            loading: false,
          };
        });
      });
  }

  componentDidMount() {
    this.fetchData(this.state.selectedYear);
  }

  handleClick(e, query) {
    e.preventDefault();
    this.fetchData(query);
    this.setState({
      selectedYear: query,
      loading: true
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header selectedYear={this.state.selectedYear} />
        <div className={styles.section}>
          {this.state.loading ? (
            <Loader />
          ) : (
            <div>
              <YearList onChange={this.handleClick} range={this.state.years} />
              <div className={styles.contentSection}>
                <DriverList drivers={this.state.drivers} />
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
