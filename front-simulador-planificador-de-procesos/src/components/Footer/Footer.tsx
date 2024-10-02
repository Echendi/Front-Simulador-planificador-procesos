import { Box, Typography, Grid2 } from '@mui/material';
import universityLogo from '../../assets/uptc-logo.png'
import schoolLogo from '../../assets/LogoISC.png';
import './styles.css'

const Footer = () => {
    const members = [
        "Julian Alberto Ardila Arguello",
        "Juana Valentina Celis Forero",
        "Nicolas David Fajardo Acuña",
        "Julian Steven Huertas Henao",
        "Juan Esteban Quiroga Hernández",
    ];

    return (
        <Box sx={{ bgcolor: '#6ddbda', padding: 3, marginTop: 'auto', borderRadius: 5 }}>
            <Grid2 container spacing={2} alignItems="center" justifyContent="center">
                <Grid2 size={2} textAlign="center">
                    <img className='logo' src={universityLogo} alt="Logo de la UPTC" style={{ width: '200px', height: 'auto', marginBottom: '16px' }} />
                </Grid2>
                <Grid2 size={5} textAlign="center">
                    <Typography variant="h6" fontWeight="bold">Universidad Pedagógica y Tecnológica de Colombia</Typography>
                    <Typography variant="subtitle1">Facultad de Ingeniería</Typography>
                    <Typography variant="subtitle2">Ingeniería de Sistemas y Computación</Typography>
                    <Typography variant="body1">2024</Typography>
                </Grid2>
                <Grid2 size={2} textAlign="center">
                    <img className='logo' src={schoolLogo} alt="Logo de la Escuala de Ingeniería de SIstemas y Computación de la UPTC" style={{ width: '150px', height: 'auto', marginBottom: '16px' }} />
                </Grid2>
                <Grid2 size={3} textAlign="center">
                    <Typography variant="h6" fontWeight="bold"> Creado por:</Typography>
                    {members.map((member, index) => (
                        <Typography key={index} variant="body2">{member}</Typography>
                    ))}
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Footer;