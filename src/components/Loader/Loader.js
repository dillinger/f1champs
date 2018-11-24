import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>Loading...</span>
    </div>
  );
}

export default Loader;
