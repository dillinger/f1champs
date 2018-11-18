import React, {Component} from 'react';

import {getNestedValue, catchErrors} from '../utils';
import {genRangeYearArray} from '../utils';

const API = `https://ergast.com/api/f1`;
const RESULTS_PATH = 'results/1/drivers.json';
const STANDING_PATH = 'driverStandings/1.json';

const pathToDrivers = ['MRData', 'DriverTable', 'Drivers'];
const pathToStandings = [
  'MRData',
  'StandingsTable',
  'StandingsLists',
  0,
  'DriverStandings',
  0,
  'Driver',
];

export default class FetchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedYear: '2005',
      years: genRangeYearArray(2005, 2015),
      drivers: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  checkJsonType(response) {
    const contentType = response.headers.get('content-type');
    return contentType && contentType.includes('application/json')
      ? response.json()
      : Promise.reject(new Error("We haven't got JSON!"));
  }

  findChampion([drivers, champ]) {
    return drivers.map(driver => {
      return driver.driverId === champ.driverId
        ? {
            champ: true,
            ...driver,
          }
        : driver;
    });
  }

  fetchData(query) {
    this.getData(query).then(drivers => {
      this.setState((state, props) => {
        return {
          drivers,
          isLoading: false,
          selectedYear: query,
        };
      });
    });
  }

  handleClick(e, query) {
    e.preventDefault();
    this.fetchData(query);
    this.setState({
      isLoading: true,
    });
  }

  getResults(year) {
    return fetch(`${API}/${year}/${RESULTS_PATH}`)
      .then(this.checkJsonType)
      .then(getNestedValue(pathToDrivers));
  }

  getStandings(year) {
    return fetch(`${API}/${year}/${STANDING_PATH}`)
      .then(this.checkJsonType)
      .then(getNestedValue(pathToStandings));
  }

  getData(year) {
    return Promise.all([this.getResults(year), this.getStandings(year)])
      .then(this.findChampion)
      .catch(catchErrors());
  }

  componentDidMount() {
    this.fetchData(this.state.selectedYear);
  }

  render() {
    const propsToPass = Object.assign({}, this.state, {
      handleClick: this.handleClick,
    });
    return <React.Fragment>{this.props.children(propsToPass)}</React.Fragment>;
  }
}
