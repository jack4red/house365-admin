'use strict';

const qs = require('qs');

const mockjs = require('mockjs');

module.exports = {
    'POST /api/user' (req, res) {
        var formData = '';
        req.on('data', function(data) {
            formData += data;
        });
        req.on('end', function() {
            var {page} = JSON.parse(formData);
            var data = mockjs.mock({
                'current':parseInt(page),
                'total|400':1,
                'data|4':[
                    {
                        'name':/[a-z]{3}/,
                        'sex|1':false,
                        'tel':/\d{8}/,
                        'key|+1':1,
                    }
                ]
            });
            res.json({
                "success": true,
                "data": data
            });
        })
    },
    'GET /api/user' (req, res) {
        if (req.headers.token) {
            res.json({
                "role": {
                    username: "admin",
                    user_id: 123
                },
                "success": true
            });
        } else {
            res.json({
                "success": false
            });
        }
    }
};