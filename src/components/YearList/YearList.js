import React, {Component} from 'react';

export class YearList extends Component {
  constructor() {
    super();
    this.state = {
      selected: 0,
    };
  }

  render() {
    const {range} = this.props;
    return (
      <div>
        {range.map(item => {
          return <span>{item}</span>;
        })}
      </div>
    );
  }
}
