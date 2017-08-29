'use strict';
import {Icon} from 'antd';
export const MenuData = [
	{
		title:<span><Icon type='user' />subnav 1</span>,
		key:"sub1",
		children:[
			{
				title:"usercenter",
				link:"usercenter",
				key:"usercenter"
			},
			{
				title:"demo",
				link:"demo",
				key:"demo"
			}
		]
	}
]