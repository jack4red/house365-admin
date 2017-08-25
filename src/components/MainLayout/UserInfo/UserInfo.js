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
                <Button icon="reload" type="primary" ghost onClick={handleClickLogOut} title="修改密码" className={styles.mr}></Button>
            </Tooltip>
            <Tooltip placement="bottom" title="退出系统">
                <Button icon="logout" type="danger" onClick={handleClickLogOut} title="退出系统"></Button>
            </Tooltip>
        </div>
    );
};

UserInfo.propTypes = {
    role: PropTypes.object.isRequired,
    handleClickLogOut: PropTypes.func.isRequired
};

export default UserInfo;