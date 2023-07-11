import { zodResolver } from '@hookform/resolvers/zod';
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import Loading from '../../Components/Loading';
import ModalSignupUser from '../../Components/ModalSignUpUser';
import { SnackBarComp } from '../../Components/SnackBar';
import { buttonProps, inputProps } from '../../configs/Layout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { hideLoading, showLoading } from '../../store/modules/Loading/loadingSlice';
import { showSnackBar } from '../../store/modules/SnackBar/snackBarSlice';
import { LoginReturn, loginAsyncThunk } from '../../store/modules/Users/usersSlice';

const schemaLogin = z.object({
	name: z.string().nonempty('Campo não pode estar vazio'),
	password: z.string().nonempty('Campo não pode estar vazio'),
});

type TLogin = z.infer<typeof schemaLogin>;
const Login: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.users);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TLogin>({
		resolver: zodResolver(schemaLogin),
	});

	const [isLogged, setIsLogged] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<TLogin> = async (data) => {
		const loginPayload = (await dispatch(loginAsyncThunk(data))).payload as LoginReturn;

		if (!loginPayload.success) {
			dispatch(showSnackBar('Erro ao realizar o login'));
			return;
		}
		const token = loginPayload.token;
		isLogged ? localStorage.setItem('token', token) : sessionStorage.setItem('token', token);
		dispatch(showLoading());
		setTimeout(() => {
			dispatch(hideLoading());
			navigate('/home');
		}, 3000);

		return user;
	};

	const loggedUser = (event: React.SyntheticEvent<Element, Event>, checked: boolean) => {
		setIsLogged(checked);
	};
	const handleClickOpenModal = () => {
		setIsOpen(true);
	};

	return (
		<>
			<Box
				component={'form'}
				sx={{ maxWidth: '80%', margin: 'auto' }}
				onSubmit={handleSubmit(onSubmit)}>
				<Grid
					container
					sx={{
						alignItems: 'center',
						justifyContent: 'space-around',
						height: '93vh',
					}}>
					<Grid item>
						<Typography variant="h1">NoteHub</Typography>
					</Grid>
					<Grid
						item
						sx={{
							flexDirection: 'column',
							display: 'flex',
							width: '400px',
							height: 'auto',
							padding: '40px',
							borderRadius: '20px',
							boxShadow: 'inset 2px 2px 5px #ffffff34, inset -5px -5px 5px #babecc46',
						}}>
						<Typography variant="h5" sx={{ marginBottom: '18px', textAlign: 'center' }}>
							Login
						</Typography>
						<TextField
							{...register('name')}
							variant="standard"
							placeholder="Nome"
							type="text"
							helperText={errors.name?.message}
							error={!!errors.name}
							sx={inputProps}
						/>
						<TextField
							{...register('password')}
							variant="standard"
							placeholder="Senha"
							type="password"
							helperText={errors.password?.message}
							error={!!errors.password}
							sx={inputProps}
						/>
						<Button
							color="secondary"
							variant="outlined"
							type="submit"
							sx={[buttonProps, { marginBottom: '18px', width: '100%' }]}>
							Entrar
						</Button>
						<FormControlLabel
							control={<Checkbox />}
							label="Permanecer logado?"
							onChange={loggedUser}
							value={isLogged}
						/>
						<Typography variant={'caption'} sx={{ fontSize: '14px' }}>
							Ainda não tem conta?{' '}
							<Link
								color="secondary"
								component={'button'}
								type="button"
								sx={{ textDecoration: 'underline' }}
								onClick={handleClickOpenModal}>
								Criar uma!
							</Link>
						</Typography>
						<SnackBarComp />
					</Grid>
				</Grid>
			</Box>
			<ModalSignupUser open={isOpen} changeOpen={setIsOpen} />
			<Loading />
		</>
	);
};

export default Login;
