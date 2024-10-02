import {
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid2,
    Snackbar,
    Alert,
    IconButton
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { NewProcess } from '../common/interfaces/NewProcess';

interface NewProcessTableProps {
    onAddProcess: (processList: NewProcess[]) => void;
}

export const NewProcessTable = ({ onAddProcess }: NewProcessTableProps) => {
    const [processes, setProcesses] = useState<NewProcess[]>([]);
    const [arrivalTime, setArrivalTime] = useState('');
    const [burstTime, setBurstTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const addProcess = () => {
        if (!arrivalTime || !burstTime) {
            setErrorMessage('Todos los campos son obligatorios.');
            setOpenSnackbar(true);
            return;
        }

        const arrival = parseInt(arrivalTime);
        const burst = parseInt(burstTime);

        if (isNaN(arrival) || isNaN(burst)) {
            setErrorMessage('Los campos de tiempo de llegada y ráfaga deben ser números válidos.');
            setOpenSnackbar(true);
            return;
        }

        if (arrival<0) {
            setErrorMessage('El tiempo de llegada debe ser mayo o igual a cero.');
            setOpenSnackbar(true);
            return;
        }

        if (burst<=0) {
            setErrorMessage('El tiempo de ráfaga debe ser mayo o igual a uno.');
            setOpenSnackbar(true);
            return;
        }

        const newProcess: NewProcess = {
            arrival: arrival,
            burst: burst,
        };

        const newProcessList = [...processes, newProcess]
        setProcesses(newProcessList);
        onAddProcess(newProcessList);

        setArrivalTime('');
        setBurstTime('');
    };

    const deleteProcess = (index: number) => {
        const updatedProcesses = processes.filter((_, i) => i !== index);
        setProcesses(updatedProcesses);
        onAddProcess(updatedProcesses);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
                <Grid2 size={4}>
                    <TextField
                        label="Tiempo de Llegada"
                        type="number"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        slotProps={{ htmlInput: { min: 0 } }}
                    />
                </Grid2>
                <Grid2 size={4}>
                    <TextField
                        label="Tiempo de Ráfaga"
                        type="number"
                        value={burstTime}
                        onChange={(e) => setBurstTime(e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        slotProps={{ htmlInput: { min: 1 } }}
                    />
                </Grid2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addProcess}
                >
                    Añadir Proceso
                </Button>
            </Grid2>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tiempo de Llegada (AT)</TableCell>
                            <TableCell>Tiempo de Ráfaga (BT)</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {processes.map((process, index) => (
                            <TableRow key={index}>
                                <TableCell>{process.arrival}</TableCell>
                                <TableCell>{process.burst}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => deleteProcess(index)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
