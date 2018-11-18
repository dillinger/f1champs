import React from 'react';
import styles from './DriversList.module.css';

export function Racer(props) {
  console.log(props);
  return (
    <tr className={`${styles.tabelRow} ${props.champ ? styles.champion : ''}`}>
      <td>{props.index + 1}</td>
      <td>{props.givenName}</td>
      <td>{props.familyName}</td>
      <td>{props.nationality}</td>
    </tr>
  );
}

export default function DriversList(props) {
  const drivers = props.drivers;
  return (
    <table className={styles.driverTabe}>
      <tbody className={styles.tableBody}>
        {drivers.length
          ? drivers.map((item, index) => {
              return (
                <Racer key={index + item.driverId} {...item} index={index} />
              );
            })
          : null}
      </tbody>
    </table>
  );
}
