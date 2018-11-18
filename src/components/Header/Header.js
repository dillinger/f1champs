import React from 'react';
import styles from './Header.module.css';

export default function CurrentYear(props) {
  return (
    <div className={styles.wrapper}>
    <h1 className={styles.appTitle}>
      <span>F1 world champions {props.selectedYear}</span>
    </h1>
  </div>
  );
}
