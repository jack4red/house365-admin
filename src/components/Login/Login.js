import React from 'react';
import styles from './Login.css';
import {Link} from 'dva/router';
import {connect} from 'dva';
import {Form, Icon, Input, Button, Checkbox, Layout, Row, Col} from 'antd';
const {Content} = Layout;
import blogLogo from '../../assets/haipa.gif';
import yanzhmaCode from '../../utils/constant.js';

function Login({
    loading,
    codeImgUrl,
    dispatch,
    form:{
        getFieldDecorator,
        validateFields
    }
}) {
	// console.log(codeImgUrl);
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

    function handleClickCode(e) {
    	dispatch({type: 'app/changeCodeImgUrl', payload: {}});
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
	                        {
	                            getFieldDecorator('code', {
	                                rules: [
	                                    {
	                                        required: true,
	                                        message: 'Please input your code!'
	                                    }
	                                ]
	                            })(<Row>
	                            	<Col span={17}>
	                            		<Input addonBefore={<Icon type="code-o"/>} type="code" placeholder="Code" />
	                            	</Col>
									<Col span={6} push={1} >
										<img src={codeImgUrl} className={styles.code} onClick={handleClickCode}/>
									</Col>
	                            </Row>
	                            )
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
        codeImgUrl: state.app.codeImgUrl,
    };
})(Form.create({})(Login));
