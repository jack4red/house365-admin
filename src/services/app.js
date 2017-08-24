'use strict';

import request from '../utils/request';
import {userTokenKey} from '../utils/constant';
import {stringify} from 'qs';

export function auth(payload) {
    return request('/api/login', {
        method: 'post',
        headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }),
        body: stringify({
            ...payload,
        })
    });
}


export function checkToken() {
    return request('/api/login', {
        method: 'get'
    });
}