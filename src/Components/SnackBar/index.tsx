import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showSnackBar } from '../../store/modules/SnackBar/snackBarSlice';

export const SnackBarComp = () => {
	const select = useAppSelector((state) => state.snack.message);
	const [message, setMessage] = useState('');
	const [open, setOpen] = useState(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (select.length > 0) {
			setMessage(select);
			setOpen(true);
			setTimeout(() => {
				setOpen(false);
				dispatch(showSnackBar(''));
			}, 3000);
		}
	}, [dispatch, select]);
	return (
		<div>
			<Snackbar open={open}>
				<Alert severity="error">{message}</Alert>
			</Snackbar>
		</div>
	);
};
