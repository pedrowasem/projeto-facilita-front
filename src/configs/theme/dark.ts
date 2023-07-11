import { createTheme } from '@mui/material/styles';

const dark = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#ffffff',
		},
		secondary: {
			main: '#d9d9d9',
		},
	},
});

export default dark;
