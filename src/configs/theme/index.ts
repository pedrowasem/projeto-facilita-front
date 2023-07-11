import { Theme } from '@mui/material';

import darkTheme from './dark';
import lightTheme from './light';

type ThemeName = 'dark' | 'light';

export function getTheme(name: ThemeName): Theme {
	const themes: { [name: string]: Theme } = {
		dark: darkTheme,
		light: lightTheme,
	};

	return themes[name];
}
