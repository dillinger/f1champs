import React, {Component} from 'react';

import SeasonSelector from 'components/SeasonSelector/SeasonSelector';
import Header from 'components/Header/Header';
import DriversList from 'components/DriversList/DriversList';
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
                <SeasonSelector
                  selectedYear={selectedYear}
                  onYearChange={handleClick}
                  range={years}
                />

                {isLoading ? (
                  <Loader />
                ) : (
                  <div className={styles.contentSection}>
                    <DriversList drivers={drivers} />
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
