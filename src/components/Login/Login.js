import React from 'react';
import styles from './Login.css';
import {Link} from 'dva/router';
import {connect} from 'dva';
import {Form, Icon, Input, Button, Checkbox, Layout} from 'antd';
const {Content} = Layout;
import blogLogo from '../../assets/haipa.gif';

function Login({
    loading,
    dispatch,
    form:{
        getFieldDecorator,
        validateFields
    }
}) {
    function commit(data) {
        const {username, password} = data;
        dispatch({type: 'app/auth', payload: {username, password}});
    }


    function handleSubmit(e) {
        e.preventDefault();
        validateFields((error, values) => {
            if (!error) {
                commit(values);
            }
        });
    }

    return (
        <Layout className={styles.normal}>
            <Content className={styles.content}>
	            <div className={styles.container}>
	                <div className={styles.logo}>
	                    <img className={styles.logoImg} src={blogLogo} alt="my blog"/>
	                    <span>按揭管理系统</span>
	                </div>
	                <Form onSubmit={handleSubmit}>
	                    <Form.Item>
	                        {
	                            getFieldDecorator('username', {
	                                rules: [
	                                    {
	                                        required: true,
	                                        message: 'Please input your username!'
	                                    }
	                                ]
	                            })(<Input addonBefore={<Icon type="user"/>} placeholder="Username"/>)
	                        }
	                    </Form.Item>
	                    <Form.Item>
	                        {
	                            getFieldDecorator('password', {
	                                rules: [
	                                    {
	                                        required: true,
	                                        message: 'Please input your Password!'
	                                    }
	                                ]
	                            })(<Input addonBefore={<Icon type="lock"/>} type="password" placeholder="Password"/>)
	                        }
	                    </Form.Item>
	                    <Form.Item>
	                        <Button
	                            type="primary"
	                            htmlType="submit"
	                            className={styles.button}
	                            loading={loading}
	                        >
	                            Log in
	                        </Button>
	                    </Form.Item>
	                </Form>
	            </div>
	        </Content>
        </Layout>
    );
}

export default connect((state, ownProps) => {
    return {
        loading: state.loading.models.app,
    };
})(Form.create({})(Login));
