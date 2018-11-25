import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Loader.module.css';

const LoaderComponent = <div className={styles.wrapper}><span className={styles.text}>Loading...</span></div>;

function Loader(props) {
  console.log(props)
  const {isLoading, children} = props;
  return (
    <React.Fragment>
      {isLoading ? LoaderComponent : children}
    </React.Fragment>
  );
}

export default Loader;
