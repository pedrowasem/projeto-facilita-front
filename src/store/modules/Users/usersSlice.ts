import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import { axios } from '../../../service/api';

export interface CreateUser {
	name: string;
	password: string;
	passwordConfirm: string;
}

export interface CreateUserReturn {
	message: string;
	sucess: boolean;
	user: User;
}

export interface Login {
	name: string;
	password: string;
}

export interface User {
	_id: string;
	_name: string;
}

export interface UserReturn {
	_id: string;
	_name: string;
	token: string;
}

export interface LoginReturn {
	message: string;
	success: boolean;
	token: string;
}

const adapter = createEntityAdapter<User>({
	selectId: (user) => user._name,
});

////////////////////////////////////////////////////////////

export const createLoginAsyncThunk = createAsyncThunk('user/create', async (data: CreateUser) => {
	const response = await axios.post('/users', {
		name: data.name,
		password: data.password,
		passwordConfirm: data.passwordConfirm,
	});
	return response.data as CreateUserReturn;
});

export const loginAsyncThunk = createAsyncThunk('user/login', async (data: Login) => {
	const response = await axios.post('/login', { name: data.name, password: data.password });
	return response.data as LoginReturn;
});

//////////////////////////////////////////////////////////////

export const { selectAll: users } = adapter.getSelectors((state: RootState) => state.users);

const usersSlice = createSlice({
	name: 'users',
	initialState: adapter.getInitialState(),
	reducers: {},

	extraReducers: (builder) => {
		builder.addCase(createLoginAsyncThunk.fulfilled, (state, action) => {
			console.log(action);
		});

		builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
			if (action.payload.success) {
				console.log(action);
			}
		});
	},
});

export default usersSlice.reducer;
export const userActions = usersSlice.actions;
