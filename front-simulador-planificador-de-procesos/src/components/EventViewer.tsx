import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { SimulationLog } from '../common/interfaces/Simulation';

const EventViewer: React.FC<{ log: SimulationLog }> = ({ log }) => {
    return (
        <Card sx={{ minWidth: 340, maxWidth: 340, minHeight: 300, maxHeight: 345 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2, justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div" gutterBottom>
                        Eventos
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        {log.batch &&
                            (<Typography variant="body2">
                                Lote: {log.batch}
                            </Typography>)}
                    </Box>
                </Box>

                <hr />

                <ul>
                    {log.toReadyProcess.map(process => (
                        <li key={process.id}>
                            Proceso {process.id} ha entrado a la cola de listos.
                        </li>
                    ))}
                </ul>

                {log.toEndedProcess && (
                    <Typography variant="body1">
                        El proceso {log.toEndedProcess.id} ha finalizado.
                    </Typography>
                )}

                {log.toRunningProcess && (
                    <Typography variant="body1">
                        El proceso {log.toRunningProcess.id} inicia su ejecución en la CPU.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default EventViewer;