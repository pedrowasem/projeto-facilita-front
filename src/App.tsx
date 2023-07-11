/* eslint-disable no-constant-condition */
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';

import AppRoutes from './configs/routes/AppRoutes';
import { getTheme } from './configs/theme';
import { useAppSelector } from './store/hooks';

function App() {
	const nameTheme = useAppSelector((state) => state.theme) as 'light' | 'dark';
	const [theme, setThemeState] = useState(getTheme(nameTheme));

	useEffect(() => {
		setThemeState(getTheme(nameTheme));
	}, [nameTheme]);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppRoutes />
		</ThemeProvider>
	);
}

export default App;
