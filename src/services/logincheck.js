import request from '../utils/request';

function Check() {
	return request('/logincheck.json');
}

export default Check;