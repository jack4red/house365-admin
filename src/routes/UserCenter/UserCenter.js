import React from 'react';
import { connect } from 'dva';
import styles from './UserCenter.css';

function UserCenter() {
  return (
    <div className={styles.normal}>
      Route Component: UserCenter
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserCenter);
