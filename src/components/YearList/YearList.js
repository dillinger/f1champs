import React, {Component} from 'react';
import styles from './Yearlist.module.css';

export class YearList extends Component {
  constructor() {
    super();
    this.state = {
      selected: 0,
    };
  }

  handleClick(e, data) {
    e.preventDefault();
    this.props.onChange(e, data);
  }

  render() {
    const {range} = this.props;
    return (
      <div className={styles.wrapper}>
        {range.map((item, index) => {
          return (
            <button
              onClick={(e) => {
                this.handleClick(e, item);
              }}
              className={styles.button}
              type="button"
              key={index + index}
            >
              {item}
            </button>
          );
        })}
      </div>
    );
  }
}
