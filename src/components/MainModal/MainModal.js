import React, {PropTypes} from 'react';
import styles from './MainModal.css';
import {Modal} from 'antd';

const MainModal = ({
    children,
    title,
    visible,
    dispatch,
    confirmLoading
}) => {
    function handleOk(argument) {
        // body...
    };
    function handleCancel(argument) {
        // body...
    }
    return (
        <Modal title={title}
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
            {children}
        </Modal>
    );
};

MainModal.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired
};

export default connect ((state, ownProps) => {
    return {
        visible:state.mainModal.visible,
        confirmLoading:state.mainModal.confirmLoading,
    };
})(MainModal);