import React, {Component} from 'react';

import {getNestedValue, catchErrors} from '../utils';
import {genRangeYearArray} from '../utils';

const API = `https://ergast.com/api/f1`;
const STANDING_PATH = 'driverStandings.json';
const RESULTS_PATH = 'results.json?limit';

const roundPath = [
  'MRData',
  'RaceTable',
  'Races',
  'Results'
];

const pathToStandings = [
  'MRData',
  'StandingsTable',
  'StandingsLists',
  0,
  'DriverStandings',
];

export default class FetchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedYear: 2005,
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

  fetchData(query) {
    this.getSeasonResult(query).then(drivers => {
      console.log(drivers);
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
    this.setState({ isLoading: true });
    this.fetchData(query);
  }

  filterWinner(data) {
    return data.filter(item => item.position === '1')
  }

  getRoundData(data) {
    return data.flatMap(items => this.filterWinner(items.Results));
  }

  getOnlyDrivers(data) {
    return this.getRoundData(data).map(item => item.Driver);
  }

  getTotals(year) {
    return fetch(`${API}/${year}/${RESULTS_PATH}=0`)
    .then(this.checkJsonType)
    .then(getNestedValue(['MRData']));
  }

  getSeasonResult(year) {
    return this.getTotals(year)
      .then(response => {
        console.log(response, `${API}/${year}/${RESULTS_PATH}=${response.total}`)
        return fetch(`${API}/${year}/${RESULTS_PATH}=${response.total}`)
          .then(this.checkJsonType);
      })
      .then(getNestedValue(roundPath))
      .then(d => {
        console.log(d);
      })
      .then(response => {
        return this.getOnlyDrivers(response);
      })
      .catch(catchErrors());
  }


  // getStandings(year) {
  //   return fetch(`${API}/${year}/${STANDING_PATH}`)
  //     .then(this.checkJsonType)
  //     .then(getNestedValue(pathToStandings))
  //     .catch(catchErrors());
  // }

  componentDidMount() {
    // this.getSeasonResult('2008')
    this.fetchData(this.state.selectedYear);
  }

  render() {
    const propsToPass = Object.assign({}, this.state, {
      handleClick: this.handleClick,
    });
    return <React.Fragment>{this.props.children(propsToPass)}</React.Fragment>;
  }
}
