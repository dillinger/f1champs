import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getNestedValue, catchErrors} from '../utils';
import {genRangeYearArray} from '../utils';

const API = `https://ergast.com/api/f1`;
const STANDING_PATH = 'driverStandings.json';

const pathToStandings = [
  'MRData',
  'StandingsTable',
  'StandingsLists',
  0,
  'DriverStandings',
];

class FetchData extends Component {
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
    this.getStandings(query).then(drivers => {
      this.setState((state, props) => {
        return {
          drivers,
          isLoading: false,
          selectedYear: query,
        };
      });
    });
  }

  filterOnlyWinners(data) {
    return data.filter(item => Number(item.wins));
  }

  handleClick(e, query) {
    e.preventDefault();
    this.fetchData(query);
    this.setState({
      isLoading: true,
    });
  }

  getStandings(year) {
    return fetch(`${API}/${year}/${STANDING_PATH}`)
      .then(this.checkJsonType)
      .then(getNestedValue(pathToStandings))
      .then(this.filterOnlyWinners)
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

FetchData.propTypes = {
  children: PropTypes.func.isRequired,
};

export default FetchData;
