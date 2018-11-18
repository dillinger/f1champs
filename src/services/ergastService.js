import {getNestedValue, catchErrors} from '../utils';

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

function checkJsonType(response) {
  const contentType = response.headers.get('content-type');
  return contentType && contentType.includes('application/json')
    ? response.json()
    : Promise.reject(new Error("We haven't got JSON!"));
}

function findChampion([drivers, champ]) {
  return drivers.map(driver => {
    return driver.driverId === champ.driverId
      ? {
          champ: true,
          ...driver,
        }
      : driver;
  });
}

export function ergastAPI(year) {
  function getResults() {
    return fetch(`${API}/${year}/${RESULTS_PATH}`)
      .then(checkJsonType)
      .then(getNestedValue(pathToDrivers));
  }

  function getStandings() {
    return fetch(`${API}/${year}/${STANDING_PATH}`)
      .then(checkJsonType)
      .then(getNestedValue(pathToStandings));
  }

  function getData() {
    return Promise.all([getResults(), getStandings()])
      .then(findChampion)
      .catch(catchErrors());
  }

  return {
    getResults,
    getStandings,
    getData,
  };
}
