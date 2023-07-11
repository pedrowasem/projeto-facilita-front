import { Button } from '@mui/material';

interface ButtonProps {
	context: 'Login' | 'Modal';
	children: string;
	type: 'button' | 'submit' | 'reset' | undefined;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const StyledButton: React.FC<ButtonProps> = ({ children, type, onClick, context, disabled }) => {
	let width = '30%';
	let marginBottom = '0';

	if (context === 'Login') {
		width = '100%';
		marginBottom = '18px';
	}
	return (
		<Button
			color="secondary"
			variant="outlined"
			type={type}
			onClick={onClick}
			disabled={disabled}
			sx={{
				boxSizing: 'border-box',
				outline: '0',
				borderRadius: '20px',
				padding: '15px',
				backgroundColor: '#ffffff17',
				border: 'none',
				marginBottom: marginBottom,
				boxShadow: '-5px -5px 10px #ffffff8a, 5px 5px 10px #babecc7c',
				width: width,
				transition: '0.2s ease-in-out',
				'&:hover, &:focus': {
					boxShadow: '-2px -2px 5px #fff, 2px 2px 5px #babecc',
					border: 'none',
				},
				'&:active': {
					boxShadow: 'inset 1px 1px 2px #babecc, inset -1px -1px 2px #fff',
					border: 'none',
				},
			}}>
			{children}
		</Button>
	);
};

export default StyledButton;
