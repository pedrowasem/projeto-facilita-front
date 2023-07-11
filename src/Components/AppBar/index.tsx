import { Logout } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Box, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { hideLoading, showLoading } from '../../store/modules/Loading/loadingSlice';
import { setTheme } from '../../store/modules/Theme/themeSlice';
import Loading from '../Loading';

const MyAppBar = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const themeName = useAppSelector((state) => state.theme) as 'light' | 'dark';

	const dispatch = useAppDispatch();

	const logout = () => {
		localStorage.removeItem('token');
		sessionStorage.removeItem('token');

		dispatch(showLoading());
		setTimeout(() => {
			dispatch(hideLoading());
			navigate('/');
		}, 3000);
	};

	const handleChangeTheme = () => {
		dispatch(setTheme(themeName === 'light' ? 'dark' : 'light'));
	};

	return (
		<Box sx={{ flexGrow: 1, width: '95%', margin: 'auto' }}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: '#ffffff00',
					height: '15vh',
					justifyContent: 'center',
					borderRadius: '0 0 30px 30px',
					boxShadow: 'inset 2px 2px 5px #ffffff34, inset -5px -5px 5px #babecc46',
				}}>
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<Typography variant="h4" color="primary">
						NoteHub
					</Typography>

					<Box component="nav">
						<IconButton onClick={handleChangeTheme}>
							{theme.palette.mode === 'dark' ? (
								<Brightness4Icon />
							) : (
								<Brightness7Icon />
							)}
						</IconButton>
						<IconButton onClick={logout}>
							<Logout fontSize="large" color="secondary" />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<Loading />
		</Box>
	);
};

export default MyAppBar;
