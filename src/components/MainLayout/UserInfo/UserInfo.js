import React, {PropTypes} from 'react';
import styles from './UserInfo.css';
import {connect} from 'dva';
import {Tooltip, Button, Modal} from 'antd';

const UserInfo = ({
    role,
    resetModalVisible,
    dispatch
}) => {
    const {username} = role;
    const handleClickLogOut = function (e) {
        e.preventDefault();
        message.success('Log out successfully :)');
        dispatch({type: 'app/logout'});
    }
    const handleResetPassword = function (e) {
        dispatch({type:'app/showPasswordModal'});
    }
    const hidePasswordModal = function (e) {
        dispatch({type:'app/hidePasswordModal'});
    }
    return (
        <div className={styles.user}>
            <Modal title="reset" visible = {resetModalVisible} onOk = {hidePasswordModal} onCancel = {hidePasswordModal}>
                <p>123</p>
            </Modal>
            <span className={styles.mr}>{username}</span>
            <Tooltip placement="bottom" title="修改密码">
                <Button icon="reload" type="primary" ghost onClick={handleResetPassword} title="修改密码" className={styles.mr}></Button>
            </Tooltip>
            <Tooltip placement="bottom" title="退出系统">
                <Button icon="logout" type="danger" onClick={handleClickLogOut} title="退出系统"></Button>
            </Tooltip>
        </div>
    );
};

UserInfo.propTypes = {
    role: PropTypes.object.isRequired,
};

export default connect((state, ownProps) => {
    return {
        resetModalVisible: state.app.resetModalVisible
    };
})(UserInfo);