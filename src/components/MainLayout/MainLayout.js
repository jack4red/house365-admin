import React, {PropTypes} from 'react';
import {Layout, Menu, Breadcrumb, Icon, BackTop, Affix} from 'antd';
import {Link} from 'dva/router';
import styles from './MainLayout.css';
import UserInfo from './UserInfo/UserInfo';
const {Header, Content, Footer, Sider} = Layout;
const { SubMenu } = Menu;

const MainLayout = ({
    routes,
    params,
    role,
    children
}) => {
    const breadcrumb = routes.map(function(item, index) {
        return (
            <Breadcrumb.Item key = {index}>
                <Link to = {item.path}>{item.breadcrumbName?item.breadcrumbName:'Home'}</Link>
            </Breadcrumb.Item>
        )
    })
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.logo}>按揭管理系统</div>
                <div className={styles.userinfo}>
                    <UserInfo role={role} />
                </div>
            </Header>
            <Layout className={styles.mainlayout}>
                <Sider width={200} className={styles.sider}>
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                            <Menu.Item key="1">
                                <Link to = "usercenter">usercenter</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to = "demo">demo</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className={styles.rightlayout}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        {breadcrumb}
                    </Breadcrumb>
                    <Content className={styles.page}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
};

MainLayout.propTypes = {};

export default MainLayout;
