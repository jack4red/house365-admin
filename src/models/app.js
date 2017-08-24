'use strict';

import {
    auth,
    checkToken
} from '../services/app';
import {createUser} from '../services/user';
import {routerRedux} from 'dva/router';
import {userTokenKey} from '../utils/constant';
import {message} from 'antd';
import {yanzhmaCode} from '../utils/constant.js';

export default {
    namespace: 'app',
    state: {
        isLogin: false,
        codeImgUrl:yanzhmaCode,
        role: {
            username: null,
            user_id: null
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname !== '/login') {
                    dispatch({
                        type: 'checkToken',
                    });
                }
            });
        }
    },
    effects: {
        auth: function *({payload}, {call, put}) {
            const {username, password, code} = payload;
            try {
                const {data} = yield call(auth, {username, password, code});

                // succeed to login
                if (data.success) {
                    const {role, token} = data.data;
                    // save the token to the local storage.
                    window.localStorage.setItem(userTokenKey, JSON.stringify(data.data));
                    yield put({
                        type: 'authSuccess',
                        payload: {role: role}
                    });
                    yield put(routerRedux.push('/'));
                }else{
                    message.error('Wrong Username or Password.. :(');
                }
            } catch (error) {
                console.warn(error);
                message.error(`${error.message}, Something wierd..`);
            }
        },
        checkToken: function*({payload}, {put, call, select}) {
            // get the token from local storage.
            var strStorage = window.localStorage.getItem(userTokenKey);
            if (strStorage) {
                const {data} = yield call(checkToken);
                if (data.success) {
                    yield put({type: 'hasToken',payload: {role:data.role}});
                } else {
                    yield put({type: 'logout'});
                }
            } else {
                yield put({type: 'logout'});
            }
        },
        logout: function *({payload}, {put}) {
            yield put({type: 'authFail'});
            window.localStorage.removeItem(userTokenKey);
            yield put(routerRedux.push('/login'));
        }
    },
    reducers: {
        authSuccess: function (state, {payload}) {
            const {role} = payload;
            return {
                ...state,
                role,
                isLogin: true
            };
        },
        hasToken: function (state, {payload}) {
            const {role} = payload;
            return {
                ...state,
                role,
                isLogin: true
            };
        },
        authFail: function (state) {
            return {
                ...state,
                isLogin: false,
                role: {
                    username: null,
                    user_id: null
                }
            };
        },
        changeCodeImgUrl: function(state) {
            const newCodeImgUrl = state.codeImgUrl + '?' + Math.random();
            return {
                ...state,
                codeImgUrl:newCodeImgUrl
            }
        }
    }

}
