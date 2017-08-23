'use strict';

import request from '../utils/request';
import {userTokenKey} from '../utils/constant';
import {stringify} from 'qs';

export function auth(payload) {
    return request('/api/token', {
        method: 'post',
        headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }),
        body: stringify({
            ...payload,
            grant_type: 'password'
        })
    });
}


export function fetchUser() {
    const token = window.localStorage.getItem(userTokenKey);
    return request('/logincheck.json', {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}