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
    subscriptions: {},
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
        enterAuth: function*({payload, onComplete}, {put, take}) {
            yield [put({type: 'checkToken'})];
            yield [take('app/hasToken'), take('app/queryUserSuccess')];
            onComplete();
        },
        checkToken: function*({payload}, {put, call, select}) {
            // get the token from local storage.
            var strStorage = window.localStorage.getItem(userTokenKey);
            if (strStorage) {
                const {data} = yield call(checkToken);
                if (data.success) {
                    yield put({type: 'hasToken',payload: {role:data.role}});
                } else {
                    yield put({type: 'authFail'});
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
        },
        // queryUser: function *({payload}, {put, call}) {
        //     const {data} = yield call(checkToken);
        //     if (data) {
        //         yield put({
        //             type: 'queryUserSuccess',
        //             payload: {role: data}
        //         });
        //     }
        // },
        // register: function *({payload}, {put, call}) {
        //     const {username, email, password} = payload;
        //     const {data} = yield call(createUser, {username, email, password});
        //     if (data) {
        //         yield put({
        //             type: 'auth',
        //             payload: {username, password}
        //         });
        //     }
        // }
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
        // queryUserSuccess: function (state, {payload}) {
        //     const {account} = payload;
        //     return {
        //         ...state,
        //         account
        //     };
        // },
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
