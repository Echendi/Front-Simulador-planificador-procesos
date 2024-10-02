import React from 'react';
import { Box, TextField, Typography, Grid2 } from '@mui/material';

interface RandomProcessProps {
    processCount: number;
    minBurstTime: number;
    maxBurstTime: number;
    maxArrivalTime: number;
    setProcessCount: (value: number) => void;
    setMinBurstTime: (value: number) => void;
    setMaxBurstTime: (value: number) => void;
    setMaxArrivalTime: (value: number) => void;
}

export const RandomProcess: React.FC<RandomProcessProps> = ({
    processCount,
    minBurstTime,
    maxBurstTime,
    maxArrivalTime,
    setProcessCount,
    setMinBurstTime,
    setMaxBurstTime,
    setMaxArrivalTime
}) => {
    return (
        <Box sx={{ width: '50%', margin: '0 auto' }}>
            <Typography variant="h5" align="center" marginBottom={4}>
                Configuración de Simulación
            </Typography>

            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <TextField
                        label="Cantidad de procesos a simular"
                        type="number"
                        value={processCount}
                        onChange={(e) => setProcessCount(Number(e.target.value))}
                        fullWidth
                        variant="outlined"
                        size="small"
                        inputProps={{ min: 1 }}
                        sx={{ marginBottom: 2 }}
                    />
                </Grid2>

                <Grid2 size={6}>
                    <TextField
                        label="Tiempo de Llegada Máximo"
                        type="number"
                        value={maxArrivalTime}
                        onChange={(e) => setMaxArrivalTime(Number(e.target.value))}
                        fullWidth
                        variant="outlined"
                        size="small"
                        inputProps={{ min: 1 }}
                        sx={{ marginBottom: 2 }}
                    />
                </Grid2>

                <Grid2 size={6}>
                    <TextField
                        label="Tiempo de Ráfaga Mínimo"
                        type="number"
                        value={minBurstTime}
                        onChange={(e) => setMinBurstTime(Number(e.target.value))}
                        fullWidth
                        variant="outlined"
                        size="small"
                        inputProps={{ min: 1 }}
                        sx={{ marginBottom: 2 }}
                    />
                </Grid2>

                <Grid2 size={6}>
                    <TextField
                        label="Tiempo de Ráfaga Máximo"
                        type="number"
                        value={maxBurstTime}
                        onChange={(e) => setMaxBurstTime(Number(e.target.value))}
                        fullWidth
                        variant="outlined"
                        size="small"
                        inputProps={{ min: minBurstTime + 1 }}
                        sx={{ marginBottom: 2 }}
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};