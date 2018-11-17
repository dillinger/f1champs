import React, {Component} from 'react';

export function Racer(props) {
  return <tr>
    <td>{props.code}</td>
    <td>{props.dateOfBirth}</td>
    <td>{props.driverId}</td>
    <td>{props.familyName}</td>
    <td>{props.givenName}</td>
    <td>{props.nationality}</td>
    <td>{props.permanentNumber}</td>
    </tr>;
}

export class DriverList extends Component {
  constructor() {
    super();
  }
  render() {
    console.log(this.props);
    return (
      <table>
        {this.props.drivers.map((item, index) => {
          return <Racer key={index + item.code} {...item} />;
        })}
      </table>
    );
  }
}
