import { zodResolver } from '@hookform/resolvers/zod';
import { Close } from '@mui/icons-material';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	TextField,
} from '@mui/material';
import { SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { buttonProps, inputProps } from '../../configs/Layout';
import { useAppDispatch } from '../../store/hooks';
import {
	NotesModel,
	createNotesAsyncThunk,
	deleteNotesAsyncThunk,
	updateNotesAsyncThunk,
} from '../../store/modules/Notes/notesSlice';

interface ModalNotesProps {
	context: 'create' | 'update' | 'delete';
	open: boolean;
	setOpen: React.Dispatch<SetStateAction<boolean>>;
	noteSelected?: NotesModel;
}

const schemaNote = z.object({
	title: z
		.string()
		.nonempty('O título não pode estar vazio')
		.max(50, 'O títutlo não pode ter mais que 50 caracteres'),
	description: z.string().nonempty('A descrição não pode estar vazia'),
});

type TNote = z.infer<typeof schemaNote>;

const ModalNotes: React.FC<ModalNotesProps> = ({ context, open, setOpen, noteSelected }) => {
	const [title, setTitle] = useState(noteSelected ? noteSelected._title : '');
	const [description, setDescription] = useState(noteSelected ? noteSelected._description : '');

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TNote>({
		resolver: zodResolver(schemaNote),
	});

	const dispatch = useAppDispatch();
	const token = localStorage.getItem('token') ?? (sessionStorage.getItem('token') as string);

	const onSubmit: SubmitHandler<TNote> = async ({ title, description }) => {
		switch (context) {
			case 'create':
				await dispatch(createNotesAsyncThunk({ title, description, token }));

				setOpen(false);

				break;

			case 'update':
				if (noteSelected) {
					await dispatch(
						updateNotesAsyncThunk({ id: noteSelected._id, title, description, token }),
					);

					setOpen(false);
				}

				break;
			default:
		}
	};

	const close = () => {
		setTitle('');
		setDescription('');
		setOpen(false);
		reset();
	};

	return (
		<Dialog
			open={open}
			onClose={() => {
				close();
			}}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			PaperProps={{
				sx: {
					borderRadius: '20px',
					boxShadow: 'inset 2px 2px 5px #ffffff34, inset -5px -5px 5px #babecc46',
					backdropFilter: 'blur(6px)',
				},
			}}>
			<DialogTitle id="alert-dialog-title">
				{context === 'create' && 'Criar Novo Recado'}
				{context === 'update' && 'Editar Recado'}
				{context === 'delete' && 'Deletar Recado'}
				<IconButton
					aria-label="close"
					onClick={() => {
						close();
					}}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
					}}>
					<Close />
				</IconButton>
			</DialogTitle>
			<Divider />
			{context !== 'delete' && (
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<DialogContent sx={{ marginY: 2 }}>
						<Grid container>
							<Grid item xs={12}>
								<TextField
									{...register('title')}
									variant="standard"
									placeholder="Título"
									type="text"
									error={!!errors.title}
									helperText={errors.title?.message}
									value={title}
									sx={inputProps}
									onChange={(e) => {
										setTitle(e.target.value);
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									{...register('description')}
									variant="standard"
									placeholder="Descrição"
									type="text"
									error={!!errors.description}
									helperText={errors.description?.message}
									value={description}
									sx={inputProps}
									onChange={(e) => {
										setDescription(e.target.value);
									}}
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<Divider />
					<DialogActions sx={{ padding: 3, justifyContent: 'space-between' }}>
						<Button
							color="secondary"
							variant="outlined"
							type="button"
							onClick={() => {
								close();
							}}
							sx={[buttonProps, { width: '30%', marginBottom: 0 }]}>
							Cancelar
						</Button>
						<Button
							color="secondary"
							variant="outlined"
							type="submit"
							sx={[buttonProps, { width: '30%', marginBottom: 0 }]}>
							Confirmar
						</Button>
					</DialogActions>
				</Box>
			)}
			{context === 'delete' && (
				<Box component="div">
					<DialogContentText paddingX={3} paddingY={1} id="alert-dialog-description">
						Tem certeza que deseja apagar este recado? Este recado não pode ser
						recuperado!
					</DialogContentText>
					<Divider />
					<DialogActions sx={{ padding: 3, justifyContent: 'space-between' }}>
						<Button
							color="secondary"
							variant="outlined"
							type="button"
							onClick={() => {
								close();
							}}
							sx={[buttonProps, { width: '30%', marginBottom: 0 }]}>
							Cancelar
						</Button>
						<Button
							color="secondary"
							variant="outlined"
							type="button"
							onClick={async () => {
								if (noteSelected) {
									await dispatch(
										deleteNotesAsyncThunk({ _id: noteSelected._id, token }),
									);
								}
							}}
							sx={[buttonProps, { width: '30%', marginBottom: 0 }]}>
							Confirmar
						</Button>
					</DialogActions>
				</Box>
			)}
		</Dialog>
	);
};

export default ModalNotes;
