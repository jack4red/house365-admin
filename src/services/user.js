'use strict';
import request from '../utils/request';
import {userTokenKey} from '../utils/constant';

export function usercenter({page}) {
    return request('/api/user', {
        method: 'POST',
        body: JSON.stringify({
        	page
        })
    });
}
