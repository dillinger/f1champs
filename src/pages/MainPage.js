import React, {Component} from 'react';

import {YearList} from 'components/YearList/YearList';
import Header from 'components/Header/Header';
import {DriverList} from 'components/DriverList/DriverList';
import Loader from 'components/Loader/Loader';

import FetchData from 'containers/FetchData';

import styles from './MainPage.module.css';

export default class MainPage extends Component {
  render() {
    return (
      <React.Fragment>
        <FetchData>
          {({isLoading, selectedYear, years, drivers, handleClick}) => {
            return (<React.Fragment>
              <Header selectedYear={selectedYear} />
              <div className={styles.section}>
                <YearList
                  selectedYear={selectedYear}
                  onYearChange={handleClick}
                  range={years}
                />

                {isLoading ? (
                  <Loader />
                ) : (
                  <div className={styles.contentSection}>
                    <DriverList drivers={drivers} />
                  </div>
                )}
              </div>
            </React.Fragment>);
          }}
        </FetchData>
      </React.Fragment>
    );
  }
}
