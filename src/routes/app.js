import React, {PropTypes} from 'react';
import {connect} from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import {message} from 'antd';

const App = ({
    children,
    dispatch,
    routes,
    params,
    isLogin,
    role
}) => {
    const mainLayoutProps = {
        routes,
        params,
        role,
        handleClickLogOut: function (e) {
            e.preventDefault();
            message.success('Log out successfully :)');
            dispatch({type: 'app/logout'});
        },
        handleResetPassword:function (e) {
            dispatch({type:'mainModal/show'});
        }
    };
    if (isLogin) {
        return <MainLayout {...mainLayoutProps}>{children}</MainLayout>
    } else {
        return <div/>
    }
    // return isLogin ? <MainLayout {...mainLayoutProps}>{children}</MainLayout> : <div/>
};

App.propTypes = {
    // children: PropTypes.element.isRequired,
    isLogin: PropTypes.bool.isRequired,
    routes: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    role: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};


export default connect((state, ownProps) => {
    return {
        loading: state.loading.models.app,
        isLogin: state.app.isLogin,
        role: state.app.role
    };
})(App);