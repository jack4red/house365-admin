import dva from 'dva';
import createLoading from 'dva-loading';
import {userTokenKey} from './utils/constant';
import {message} from 'antd';
import { createHashHistory } from 'history';
import { useRouterHistory } from 'dva/router';
import "babel-polyfill";
import './index.css';

const app = dva({
	history: useRouterHistory(createHashHistory)({ queryKey: false }),
	onError(e, dispatch) {
        dispatch({type: 'app/logout'});
        console.warn(e);
        if (e.message === 'Unauthorized') {
            message.info('Please Login :)', 5);
        } else {
            message.error(e.message, 5);
        }
    }
});

// 2. Plugins
// app.use({});
app.use(createLoading({effects: true}));

// 3. Model
app.model(require('./models/app'));

app.model(require("./models/demo"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
