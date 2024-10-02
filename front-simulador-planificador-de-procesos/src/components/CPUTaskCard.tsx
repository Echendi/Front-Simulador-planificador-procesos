import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CPUStatus, Process } from '../common/interfaces/Simulation';

interface CPUTaskCardProps {
    currentProcess?: Process;
    status: CPUStatus;
    remainingQuantum: number;
}

const CPUTaskCard: React.FC<CPUTaskCardProps> = ({ currentProcess, status, remainingQuantum }) => {
    return (
        <Card sx={{ minWidth: 340, maxWidth: 340, minHeight: 300, maxHeight: 345 }}>
            <CardContent>

                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2, justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div">
                        CPU
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="body2">
                            {status === CPUStatus.Busy ? 'Ocupado' : 'Libre'}
                        </Typography>
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                backgroundColor: status === CPUStatus.Busy ? 'red' : 'green',
                                marginRight: 1,
                                marginLeft: 2
                            }}
                        />

                    </Box>
                </Box>
                <hr />

                {currentProcess && <Box sx={{ marginTop: 1 }}>
                    <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Proceso Actual
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>ID:</Typography>
                                <Typography>{currentProcess.id}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Tiempo de Ráfaga:</Typography>
                                <Typography>{currentProcess.burstTime}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Tiempo restante:</Typography>
                                <Typography>{currentProcess.remainingTime}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Quantum Restante:</Typography>
                                <Typography>{remainingQuantum}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Estado:</Typography>
                                <Typography>{currentProcess.status}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>Tiempo de llegada:</Typography>
                                <Typography>{currentProcess.timeArrive}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>}
            </CardContent>
        </Card>
    );
};

export default CPUTaskCard;
