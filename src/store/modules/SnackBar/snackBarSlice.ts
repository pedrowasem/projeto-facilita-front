import Redux, { createSlice } from '@reduxjs/toolkit';

interface SnackBarProps {
	message: string;
}

const initialState: SnackBarProps = {
	message: '',
};

const snackBarSlice = createSlice({
	name: 'snackBar',
	initialState,
	reducers: {
		showSnackBar: (state, action: Redux.PayloadAction<string>) => {
			return {
				message: action.payload,
			};
		},
	},
});
export const { showSnackBar } = snackBarSlice.actions;

export default snackBarSlice.reducer;
