// ./mock/users.js
'use strict';

const qs = require('qs');

// 引入 mock js
const mockjs = require('mockjs');

module.exports = {
    'POST /api/login' (req, res) {
        var formData = '';
        req.on('data', function(data) {
            formData += data;
        });
        req.on('end', function() {
            var obj = qs.parse(formData);
            if (obj.username == 'admin' && obj.password == 'admin') {
                var data = mockjs.mock({
                    "role": "admin",
                    "token": "asdfsfs123132132sdfds"
                });
                res.json({
                    success: true,
                    data: data
                });
            } else {
                var data = mockjs.mock({});
                res.json({
                    success: false,
                    data: data
                });
            }
        })
    },
    'GET /api/login' (req, res) {
        if(req.headers.token){
            res.json({
                success: false
            });
        } else {
            res.json({
                success: true
            });
        }
    }
};