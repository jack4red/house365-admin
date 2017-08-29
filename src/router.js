import React from 'react';
import { Router, Route, routerRedux, IndexRoute, IndexRedirect } from 'dva/router';
import Login from './components/Login/Login';
import App from './routes/app';

import UserCenter from "./routes/UserCenter/UserCenter";

function RouterConfig({ history,app }) {
	return (
        <Router history={history}>
            <Route path="/login" component={Login} />
            <Route path="/" component={App}>
                <IndexRedirect to="usercenter"/>
                <Route path="usercenter" component={UserCenter} breadcrumbName="usercenter" />
            </Route>
            <Route path="*" component={props => <h1>Oops! Not Found</h1>}/>
        </Router>
    );
}

export default RouterConfig;
