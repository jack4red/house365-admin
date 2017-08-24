import React from 'react';
import { Router, Route, routerRedux, IndexRoute, IndexRedirect } from 'dva/router';
import Login from './components/Login/Login';
import App from './routes/app';

import UserCenter from "./routes/UserCenter/UserCenter";

function RouterConfig({ history,app }) {
	function requireAuth(nextState, replace, callback) {
        app._store.dispatch({
            type: 'app/enterAuth',
            payload: {},
            onComplete: callback
        });
    }

    function requirePostPrepared(nextState, replace, callback) {
        app._store.dispatch({
            type: 'post_detail/initializePostDetail',
            payload: {post_id: nextState.params.post_id},
            onComplete: callback
        });
    }


    function requireEditorPrepared(nextState, replace, callback) {
        const post_id = nextState.params.post_id;
        if (post_id) {
            app._store.dispatch({
                type: 'editor/initializeEditor',
                payload: {post_id},
                onComplete: callback
            });
        } else {
            app._store.dispatch({
                type: 'editor/initializeCreator',
                payload: {},
                onComplete: callback
            });
        }
    }

    function requireProfilePrepared(nextState, replace, callback) {
        const user_id = nextState.params.user_id;
        if (user_id) {
            app._store.dispatch({
                type: 'profile/initializeProfile',
                payload: {user_id},
                onComplete: callback
            });
        } else {
            replace('/posts');
            callback();
        }
    }
	return (
        <Router history={history}>
            <Route path="/login" component={Login} />
            <Route path="/" component={App} onEnter={requireAuth}>
                <IndexRedirect to="usercenter"/>
                <Route path="/usercenter" component={UserCenter} />
            </Route>
            <Route path="*" breadcrumbName="Not Found" component={props => <h1>Oops! Not Found</h1>}/>
        </Router>
    );
}

export default RouterConfig;
