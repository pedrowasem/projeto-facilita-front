import { Box } from '@mui/material';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Box
			sx={{
				padding: '0px ',
				paddingBottom: '36px',
				margin: '0px',
				minHeight: '100vh',
				zIndex: '-1',
				backgroundColor: 'background',
			}}>
			{children}
		</Box>
	);
};

export const inputProps = {
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
};

export const buttonProps = {
	boxSizing: 'border-box',
	outline: '0',
	borderRadius: '20px',
	padding: '15px',
	backgroundColor: '#ffffff17',
	border: 'none',
	boxShadow: '-5px -5px 10px #ffffff8a, 5px 5px 10px #babecc7c',
	transition: '0.2s ease-in-out',
	'&:hover, &:focus': {
		boxShadow: '-2px -2px 5px #fff, 2px 2px 5px #babecc',
		border: 'none',
	},
	'&:active': {
		boxShadow: 'inset 1px 1px 2px #babecc, inset -1px -1px 2px #fff',
		border: 'none',
	},
};

export default Layout;
