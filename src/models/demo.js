import {usercenter} from '../services/user';
export default {
  namespace: 'demo',
  state: {
  	data: {
  		data:[],
  		current:1,
		total:1,
  	},
  },
  reducers: {
  	init:function(state, {payload}) {
  		const {data} = payload;
  		return{
  			...state,
  			data: data
  		}
  	}
  },
  effects: {
  	usercenterInit: function *({payload: { page = 1 }}, {call, put}) {
  		const {data} = yield call(usercenter, {page});
  		yield put({
  			type:'init',
  			payload:data
  		})
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/usercenter') {
          dispatch({ type: 'usercenterInit', payload: query });
        }
      });
    },
  },
};
