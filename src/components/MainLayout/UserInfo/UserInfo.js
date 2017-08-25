import React, {PropTypes} from 'react';
import styles from './UserInfo.css';
import {Tooltip, Button} from 'antd';

const UserInfo = ({
    role,
    handleClickLogOut
}) => {
    const {username} = role;

    return (
        <div className={styles.user}>
            <span className={styles.mr}>{username}</span>
            <Tooltip placement="bottom" title="修改密码">
                <Button icon="reload" ghost onClick={handleClickLogOut} title="修改密码" className={styles.mr}></Button>
            </Tooltip>
            <Button icon="logout" type="primary" onClick={handleClickLogOut}>退出系统</Button>
        </div>
    );
};

UserInfo.propTypes = {
    role: PropTypes.object.isRequired,
    handleClickLogOut: PropTypes.func.isRequired
};

export default UserInfo;