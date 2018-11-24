import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './SeasonSelector.module.css';

class SeasonSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: '',
    };
  }

  componentDidMount() {
    this.setState({
      selectedYear: this.props.selectedYear,
    });
  }

  handleClick(e, data) {
    e.preventDefault();
    this.props.onYearChange(e, data);
    this.setState({
      selectedYear: data,
    });
  }

  render() {
    const {range} = this.props;
    return (
      <div className={styles.wrapper}>
        {range.map((item, index) => {
          return (
            <button
              onClick={e => {
                this.handleClick(e, item);
              }}
              className={styles.button}
              style={{
                borderBottom:
                  this.state.selectedYear.toString() === item.toString()
                    ? '1px solid red'
                    : 'none',
              }}
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

SeasonSelector.propTypes = {
  selectedYear: PropTypes.number,
  onYearChange: PropTypes.func,
  range: PropTypes.arrayOf(PropTypes.number),
};

export default SeasonSelector;
