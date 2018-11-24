import React from 'react';
import cuid from 'cuid';
import styles from './DriversList.module.css';

export function Racer(props) {
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

export default function DriversList(props) {
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
