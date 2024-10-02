import { useState } from 'react';
import { Grid2, Checkbox, FormControlLabel, Box, Button, Typography, TextField, Snackbar, Alert } from '@mui/material';
import { NewProcess } from '../common/interfaces/NewProcess';
import { SoSelect } from '../components/SoSelect';
import { NewProcessTable } from '../components/NewProcessTable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RandomProcess } from '../components/RandomProceess';

const algorithms = ["FCFS - First Come, First Served", "SJN - Shortest Job Next", "SRTF - Shortest Remaining Time First", "RR - Round Robin"];

export const NewSimulation = () => {
    const [addRandomProcesses, setAddOtherProcesses] = useState(false);
    const [batchCheck, setBatchCheck] = useState(false);
    const [processes, setProcesses] = useState<NewProcess[]>([]);
    const [simulationTime, setSimulationTime] = useState('20');
    const [quantum, setQuantum] = useState('1');
    const [batchCount, setBatchCount] = useState('2');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [selectedType, setSelectedType] = useState(algorithms[0]);

    const [processCount, setProcessCount] = useState(1);
    const [minBurstTime, setMinBurstTime] = useState(1);
    const [maxBurstTime, setMaxBurstTime] = useState(10);
    const [maxArrivalTime, setMaxArrivalTime] = useState(20);

    const navigate = useNavigate();

    const handleCheckboxRandomProcess = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddOtherProcesses(event.target.checked);
    };

    const handleBatchCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBatchCheck(event.target.checked);
    };

    const handleAddProcess = (newProcessList: NewProcess[]) => {
        setProcesses(newProcessList);
    };

    const handleSimulation = async () => {
        try {
            if (Number(simulationTime) <= 0) {
                setSnackbarMessage(`El tiempo de simulación debe ser mayor a cero.`);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            } else if ((selectedType === "RR - Round Robin" && Number(quantum) <= 0)) {
                setSnackbarMessage(`El tiempo del quantum debe ser mayor a cero.`);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            } else {
                if (addRandomProcesses) {
                    const response = await initRandomSimulation();
                    navigate('/simulation-result', { state: { simulationData: response.data } });
                } else {
                    const response = await initSimulation();
                    navigate('/simulation-result', { state: { simulationData: response.data } });
                }
            }
        } catch (error: any) {
            setSnackbarMessage(`Error al iniciar la simulación: ${error?.response?.data?.message || error.message || error.code}`);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }

    };

    async function initSimulation() {
        let count = 1;
        const data = {
            time: Number(simulationTime),
            type: selectedType.split(' - ')[0],
            quantum: selectedType === "RR - Round Robin" ? Number(quantum) : undefined,

            processList: processes.map(process => {
                return {
                    id: count++,
                    timeArrive: process.arrival,
                    burstTime: process.burst
                };
            }),
            enableBatchProcessing: batchCheck,
            batchCount: Number(batchCount)
        };
        const response = await axios.post('http://localhost:3000/simulator', data);
        return response;
    }

    async function initRandomSimulation() {
        const data = {
            time: Number(simulationTime),
            type: selectedType.split(' - ')[0],
            quantum: selectedType === "RR - Round Robin" ? Number(quantum) : undefined,
            enableBatchProcessing: batchCheck,
            batchCount: Number(batchCount),
            processAmount: processCount,
            maxArrivalTime: maxArrivalTime,
            maxBurstTime: maxBurstTime,
            minBurstTime: minBurstTime
        };
        const response = await axios.post('http://localhost:3000/simulator/random', data);
        return response;
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Typography
                variant="h3"
                align="center"
                gutterBottom
                sx={{ marginTop: 4, fontWeight: 'bold' }}
            >
                Simulador Planificador de Procesos
            </Typography>

            <Box sx={{ width: '65%', margin: '0 auto', }}>
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    disabled={processes.length === 0 && !addRandomProcesses}
                    onClick={handleSimulation}
                >
                    Iniciar Simulación
                </Button>

                <Grid2 container spacing={2} margin={4}>
                    <Grid2 size={6}>
                        <SoSelect
                            items={algorithms}
                            onChange={(value) => setSelectedType(value)}
                        />
                    </Grid2>

                    {selectedType === "RR - Round Robin" && (
                        <Grid2 size={3}>
                            <TextField
                                label="Quantum"
                                type="number"
                                value={quantum}
                                onChange={(e) => setQuantum(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                slotProps={{ htmlInput: { min: 1 } }}
                                sx={{ m: 1, maxWidth: 250 }}
                            />
                        </Grid2>
                    )}

                    <Grid2 size={3}>
                        <TextField
                            label="Tiempo de Simulación (Ciclos de reloj)"
                            type="number"
                            value={simulationTime}
                            onChange={(e) => setSimulationTime(e.target.value)}
                            fullWidth
                            variant="outlined"
                            size="small"
                            slotProps={{ htmlInput: { min: 1 } }}
                            sx={{ m: 1, maxWidth: 250 }}
                        />
                    </Grid2>

                    <Grid2 size={6} alignItems={'center'} alignContent={'center'}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={addRandomProcesses}
                                    onChange={handleCheckboxRandomProcess}
                                    color="primary"
                                />
                            }
                            label="Añadir procesos de forma aleatoria"
                            sx={{ ml: 1, minWidth: 120 }}
                        />
                    </Grid2>

                    <Grid2 size={3} alignItems={'center'} alignContent={'center'}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={batchCheck}
                                    onChange={handleBatchCheck}
                                    color="secondary"
                                />
                            }
                            label="Por lotes"
                            sx={{ ml: 1, minWidth: 120 }}
                        />
                    </Grid2>
                    <Grid2 size={3}>
                        {batchCheck && (
                            <TextField
                                label="Tiempo por Lote"
                                type="number"
                                value={batchCount}
                                onChange={(e) => setBatchCount(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                                slotProps={{ htmlInput: { min: 2 } }}
                                sx={{ maxWidth: 250 }}
                            />
                        )}
                    </Grid2>
                </Grid2>
                <hr />
                <Grid2 margin={4}>
                    {!addRandomProcesses && (
                        <NewProcessTable onAddProcess={handleAddProcess} />
                    )}
                    {addRandomProcesses && (
                        <RandomProcess
                            processCount={processCount}
                            minBurstTime={minBurstTime}
                            maxBurstTime={maxBurstTime}
                            maxArrivalTime={maxArrivalTime}
                            setProcessCount={setProcessCount}
                            setMinBurstTime={setMinBurstTime}
                            setMaxBurstTime={setMaxBurstTime}
                            setMaxArrivalTime={setMaxArrivalTime} />
                    )}
                </Grid2>
            </Box>

            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};