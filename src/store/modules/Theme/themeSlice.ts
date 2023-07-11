import Redux, { createSlice } from '@reduxjs/toolkit';

const initialState = 'dark';

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, action: Redux.PayloadAction<string>) => action.payload,
	},
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
