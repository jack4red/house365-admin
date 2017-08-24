import React, {PropTypes} from 'react';
import styles from './UserInfo.css';
import {Tooltip, Button} from 'antd';

const UserInfo = ({
    role,
    handleClickLogOut
}) => {
    const {ability, username} = role;
    const tooltipProps = {
        placement: 'bottom',
        title: ability === 'super' ? 'Super Admin' : 'Normal Admin',
    };

    return (
        <div className={styles.user}>
            <Tooltip {...tooltipProps}>
                <span>Hello, <em className={styles.username}>{username} !</em>
            </span>
            </Tooltip>
            <Button icon="logout" type="primary" onClick={handleClickLogOut}>Logout!</Button>
        </div>
    );
};

UserInfo.propTypes = {
    role: PropTypes.object.isRequired,
    handleClickLogOut: PropTypes.func.isRequired
};

export default UserInfo;