import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import styles from './DriversList.module.css';

function Racer(props) {
  return (
    <tr
      className={`${styles.tabelRow} ${
        props.position === '1' ? styles.champion : ''
      }`}
    >
      <td>{props.position}</td>
      <td>{props.Driver.givenName}</td>
      <td>{props.Driver.familyName}</td>
      <td>{props.Driver.nationality}</td>
    </tr>
  );
}

function DriversList(props) {
  const drivers = props.drivers;
  return (
    <table className={styles.driverTabe}>
      <thead>
        <tr className={styles.tableHead}>
          <th>Pos.</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {drivers.length
          ? drivers.map((item, index) => {
              return <Racer key={cuid()} {...item} />;
            })
          : null}
      </tbody>
    </table>
  );
}

Racer.propTypes = {
  position: PropTypes.string,
  Driver: PropTypes.shape({
    givenName: PropTypes.string,
    familyName: PropTypes.string,
    nationality: PropTypes.string,
  }),
};

DriversList.propTypes = {
  drivers: PropTypes.arrayOf(PropTypes.object)
};

export default DriversList;
