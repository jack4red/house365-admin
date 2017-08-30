import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import styles from './UserCenter.css';
import { Table, Icon, Pagination } from 'antd';

function UserCenter({data, dispatch, loading, current, total}) {
	const pageChangeHandler = (page) => {
		dispatch(routerRedux.push({
	      pathname: '/usercenter',
	      query: { page },
	    }));
	}
	const columns = [{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: 'Sex',
			dataIndex: 'sex',
			key: 'sex',
			render:(text) =>(text?'male':'female')
		}, {
			title: 'Tel',
			dataIndex: 'tel',
			key: 'tel',
		}, {
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span>
				<a href="#">Delete
				 <Icon type="down" />
				</a>
				</span>
			),
	}];
  return (
    <div className={styles.normal}>
      <Table
		columns={columns}
		dataSource={data}
		pagination={false}
		loading={loading}
		/>
      <Pagination
		total={total}
		current={current}
		pageSize={4}
		onChange={pageChangeHandler}
        />
    </div>
  );
}

function mapStateToProps(state, myProps) {
  return {
  	loading: state.loading.models.app,
  	data: state.demo.data.data,
  	current: state.demo.data.current,
  	total: state.demo.data.total,
  };
}

export default connect(mapStateToProps)(UserCenter);
