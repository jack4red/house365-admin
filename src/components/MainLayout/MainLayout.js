import React, {PropTypes} from 'react';
import {Layout, Menu, Breadcrumb, Icon, BackTop, Affix} from 'antd';
import {Link} from 'dva/router';
import styles from './MainLayout.css';
import UserInfo from './UserInfo/UserInfo';
import {MenuData} from '../../utils/sidermenu';
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
    const menu = MenuData.map(function(item, index) {
        var childMenu = item.children.map(function(cItem, index) {
            return (
                <Menu.Item key={cItem.key}>
                    <Link to = {cItem.link}>{cItem.title}</Link>
                </Menu.Item>
            )
        })
        return (
            <SubMenu key={item.key} title={item.title}>
                {childMenu}
            </SubMenu>
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
                        {menu}
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
