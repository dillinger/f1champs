import React, {Component} from 'react';

import {getNestedValue, catchErrors, checkJsonType} from '../utils';
import {genRangeYearArray} from '../utils';

const API = `https://ergast.com/api/f1`;
const RESULTS_PATH = 'results.json?limit';

const roundPath = [
  'MRData',
  'RaceTable',
  'Races',
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

  fetchData(query) {
    this.getSeasonResult(query).then(drivers => {
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

  fetchTotals(year) {
    return fetch(`${API}/${year}/${RESULTS_PATH}=0`)
    .then(checkJsonType)
    .then(getNestedValue(['MRData']));
  }

  fetchAllResults(year) {
    return ({total}) => {
      return fetch(`${API}/${year}/${RESULTS_PATH}=${total}`)
        .then(checkJsonType);
    }
  }

  getSeasonResult(year) {
    return this.fetchTotals(year)
      .then(this.fetchAllResults(year))
      .then(respone => {
        console.log(respone);
        return respone;
      })
      .then(getNestedValue(roundPath))
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
