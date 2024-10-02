import { Box, Typography, Button } from '@mui/material';
import logo from '/logo.svg';
import './styles.css'
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();
    const handleNewSimulation = async () => {
        navigate('/');
    }
    return (
        <Box
            sx={{
                bgcolor: '#6ddbda',
                color: '#424040',
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
            borderRadius={5}
            height={60}
        >
            <img src={logo} alt="Logo" className='logo' />
            <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }} marginLeft={4}>
                Simulador de Planificación de Procesos
            </Typography>
            <Button variant="contained" color="warning" sx={{ borderRadius: 20 }} onClick={handleNewSimulation}>
                Nueva Simulación
            </Button>
        </Box>
    );
};