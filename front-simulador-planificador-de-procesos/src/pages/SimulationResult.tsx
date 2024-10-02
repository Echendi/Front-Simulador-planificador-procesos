import { useLocation } from "react-router-dom";
import { ProcessTaleTable } from "../components/ProcessTaleTable";
import { useState } from "react";
import { Box, Button, Typography, Grid2, TextField } from "@mui/material";
import { SimulationLog } from "../common/interfaces/Simulation";
import CPUTaskCard from "../components/CPUTaskCard";
import EventViewer from "../components/EventViewer";

export const SimulationResult = () => {
    const location = useLocation();
    const [time, setTime] = useState(0);
    const [inputTime, setInputTime] = useState(0);

    const { simulationData } = location.state as { simulationData: SimulationLog[] } || {};

    const handleNext = () => {
        setTime(prevTime => Math.min(prevTime + 1, simulationData.length - 1));
    };

    const handlePrevious = () => {
        setTime(prevTime => Math.max(prevTime - 1, 0));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setInputTime(value);
    };

    const handleSetTime = () => {
        if (inputTime >= 0 && inputTime < simulationData.length) {
            setTime(inputTime);
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Resultados de la Simulación
                </Typography>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#2196F3' }}>
                    Tiempo de reloj: <span className="time-span" style={{ color: '#ff5722', fontWeight: 'bold' }}>{time}</span>
                </Typography>
            </Box>

            <Grid2 container spacing={4}>
                <Grid2 size={6}>
                    <ProcessTaleTable tale={simulationData[time].readyQueue} name="Cola de Procesos Listos" type="READY" />
                    <ProcessTaleTable tale={simulationData[time].endQueue} name="Cola de Procesos Terminados" type="ENDED" />
                </Grid2>

                <Grid2 size={6}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={6} marginTop={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <CPUTaskCard
                                    status={simulationData[time].cpuStatus}
                                    currentProcess={simulationData[time].runningProcess}
                                    remainingQuantum={simulationData[time].remainingQuantum}
                                />
                            </Box>
                        </Grid2>

                        <Grid2 size={6} marginTop={4}>
                            <EventViewer log={simulationData[time]} />
                        </Grid2>

                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <TextField
                                    type="number"
                                    label="Modificar Tiempo"
                                    variant="standard"
                                    value={inputTime}
                                    onChange={handleInputChange}
                                    slotProps={{ htmlInput: { min: 0, max: simulationData.length - 1 } }}
                                    sx={{ width: 150 }}
                                />
                                <Button variant="outlined" color="primary" onClick={handleSetTime} sx={{ marginLeft: 2 }}>
                                    Establecer
                                </Button>
                            </Box>


                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                                <Button variant="outlined" color="primary" onClick={handlePrevious} disabled={time <= 0} sx={{ margin: 2 }}>
                                    Anterior
                                </Button>
                                <Button variant="contained" color="success" onClick={handleNext} disabled={time >= simulationData.length - 1} sx={{ margin: 2 }}>
                                    Siguiente
                                </Button>
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    );
};