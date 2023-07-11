import { TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';

interface TextFieldProps {
	placeholder: string;
	value?: string;
	helperText?: string;
	error?: boolean;
	type?: string;
	onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const StyledTextField: React.FC<TextFieldProps> = ({
	placeholder,
	value,
	helperText,
	error,
	type,
	onChange,
}) => {
	return (
		<TextField
			variant="standard"
			placeholder={placeholder}
			helperText={helperText}
			error={error}
			value={value}
			type={type}
			onChange={onChange}
			sx={{
				outline: '0',
				borderRadius: '20px',
				padding: '15px',
				backgroundColor: '#ffffff17',
				border: 'none',
				marginBottom: '36px',
				boxShadow: 'inset 2px 2px 5px #babecc50, inset -5px -5px 5px #ffffff50',
				width: '100%',
				transition: '0.2s ease-in-out',
				'&:hover': {
					boxShadow: 'inset 1px 1px 2px #babecc, inset -1px -1px 2px #fff',
				},
			}}
		/>
	);
};

export default StyledTextField;
