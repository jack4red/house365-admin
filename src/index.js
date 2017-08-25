import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import {userTokenKey} from './utils/constant';
import {message} from 'antd';
import "babel-polyfill";

const app = dva({
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

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
