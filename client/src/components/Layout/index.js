import React from 'react';
import Overview from "../Overview";

import styles from './styles.module.scss';

const Layout = () => {
  return (
      <div className={styles.layout}>
        <Overview/>
      </div>
  )
}

export default Layout;
