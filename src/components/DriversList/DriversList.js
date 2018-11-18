import React, {Component} from 'react';
import styles from './DriversList.module.css';

export default function Racer(props) {
  return (
    <tr className={ `${styles.tabelRow} ${props.champ ? styles.champion : ''}` }>
    <td className=''>{props.index + 1}</td>
    <td>{props.givenName}</td>
    <td>{props.familyName}</td>
    <td>{props.nationality}</td>
    </tr>
  );
}

export class DriversList extends Component {
  render() {
    return (
      <table className={styles.driverTabe}>
        <tbody className={styles.tableBody}>
          {this.props.drivers.map((item, index) => {
            return <Racer key={index + item.driverId} {...item} index={index} />;
          })}
        </tbody>
      </table>
    );
  }
}
