import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

function CurrentYear(props) {
  return (
    <div className={styles.wrapper}>
    <h1 className={styles.appTitle}>
      <span>F1 world champions</span>
      <span>{props.selectedYear}</span>
    </h1>
  </div>
  );
}

CurrentYear.propTypes = {
  selectedYear: PropTypes.number,
};

export default CurrentYear;
