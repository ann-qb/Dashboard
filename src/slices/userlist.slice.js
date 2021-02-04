import { createSlice } from '@reduxjs/toolkit';
import { baseRedirectURL, baseURL } from '../config/constants';
import fetch from './../utils/axios';
import { login } from './login.slice';

const initialState = { userList: [], status: 'idle' };

const userListSlice = createSlice({
	name: 'userlist',
	initialState,
	reducers: {
		storeUserList(state, action) {
			state.userList = action.payload.userList;
			state.status = 'success';
		},
		resetStatus(state) {
			state.status = 'idle';
		},
		updateStatus(state, action) {
			state.status = action.payload.status;
		},
	},
});

export const { storeUserList, resetStatus, updateStatus } = userListSlice.actions;
export default userListSlice.reducer;

export const onGetUserList = () => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading user list' }));
	// try-catch // storeUserList
	try {
		const response = await fetch.get(`${baseURL}/user`);
		console.log(response);
		console.log(response.data);
		if (response.status === 200) {
			dispatch(storeUserList({ userList: response.data.data }));
		} else {
			console.log('Failed to fetch user list');
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
	}
	// end loading
	dispatch(updateStatus({ status: 'loading user list over' }));
	// reset
	dispatch(resetStatus());
};

export const onAddUser = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetUserList
	try {
		const response = await fetch.post(`${baseURL}/user`, {
			...data.userData,
			role: 'user',
			link: `${baseRedirectURL}/user/set-password`,
		});
		console.log(response);
		if (response.status === 201) {
			dispatch(updateStatus({ status: 'add user success' }));
			dispatch(onGetUserList());
			// notification display
		} else {
			console.log('Something went wrong while adding new user.');
			dispatch(updateStatus({ status: 'add user failed' }));
		}
	} catch (error) {
		// 400 bad request for non-unique email ids - consider custom error notifications
		console.log(error);
		console.log(error.response);
		console.log(error.response.data.message);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'add user failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onEditUser = (data) => async (dispatch, getState) => {
	const state = getState();
	const { loggedUser, role } = state.loginSlice;
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetUserList
	try {
		const response = await fetch.put(data.editSelf ? `${baseURL}/user` : `${baseURL}/user/${data.id}`, {
			...data.userData,
		});
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'edit user success' }));
			console.log(data.id);
			console.log(loggedUser.id);
			if (data.id === loggedUser.id) {
				dispatch(login({ loggedUser: { ...loggedUser, ...data.userData }, role }));
			}
			dispatch(onGetUserList());
			// notification display
		} else {
			console.log('Something went wrong while editing user details.');
			dispatch(updateStatus({ status: 'edit user failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		// 404 error - put not post
		// 400 - pending status, validation isAlpha, edit other admins
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'edit user failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onDeleteUser = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch // onGetUserList
	try {
		const response = await fetch.delete(`${baseURL}/user/delete/${data.id}`);
		console.log(response);
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'delete user success' }));
			dispatch(onGetUserList());
			// notification display
		} else {
			console.log('Something went wrong while deleting user.');
			dispatch(updateStatus({ status: 'delete user failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
		}
		dispatch(updateStatus({ status: 'delete user failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};

export const onChangePassword = (data) => async (dispatch) => {
	// reset
	dispatch(resetStatus());
	// loading
	dispatch(updateStatus({ status: 'loading' }));
	// try-catch
	try {
		const response = await fetch.put(`${baseURL}/user/password/change`, {
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		});
		console.log(response);
		console.log(response.data);
		if (response.status === 200) {
			dispatch(updateStatus({ status: 'change password success' }));
			dispatch(login({ loggedUser: response.data.data.changePasswordUser, role: response.data.data.role }));
			// notification display
		} else {
			console.log('Something went wrong while changing password.');
			dispatch(updateStatus({ status: 'change password failed' }));
		}
	} catch (error) {
		console.log(error);
		console.log(error.response);
		if (error?.response?.status === 401) {
			console.log(error.response.data);
			dispatch(updateStatus({ status: 'change password failed' }));
		} else if (error?.response?.status === 404) {
			console.log(error.response.data);
			dispatch(updateStatus({ status: 'old password was wrong' }));
		} else dispatch(updateStatus({ status: 'change password failed' }));
	}
	// end loading
	// reset
	dispatch(resetStatus());
};