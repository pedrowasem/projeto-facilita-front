import { createTheme } from '@mui/material/styles';

const light = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#000000',
		},
		secondary: {
			main: '#000000',
		},
		background: {
			default: '#999999',
			paper: '#999999aa',
		},
		text: {
			primary: '#000000',
		},
	},
});
export default light;
