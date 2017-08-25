export default {
	namespace: 'mainModal',
	state: {
		visible: false,
		confirmLoading: false,
	},
	reducers: {
		show:function(state) {
			return {
				...state,
				visible: true,
                confirmLoading: false,
			};
		},
		hide:function(state) {
			return {
				...state,
				visible: false,
                confirmLoading: false,
			};
		},
		loading:function(state) {
			return {
				...state,
                confirmLoading: true,
			};
		}
	},
	effects: {},
	subscriptions: {},
};