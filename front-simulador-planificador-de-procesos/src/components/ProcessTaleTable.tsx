import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Process } from "../common/interfaces/Simulation";

interface ProcessTaleTableProps {
    tale: Process[];
    name: string;
    type: string;
}

export const ProcessTaleTable = ({ tale, name, type }: ProcessTaleTableProps) => {
    return (
        <>
            <Typography
                variant="h5"
                component="h2"
                sx={{ marginTop: 4, marginBottom: 1, fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}
            >
                {name}
            </Typography>
            <TableContainer
                component={Paper}
                sx={{ marginTop: 1, boxShadow: 3, borderRadius: 2 }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.light' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tiempo de Llegada (AT)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Tiempo de Ráfaga (BT)</TableCell>
                            {type === "READY" && <TableCell sx={{ fontWeight: 'bold' }}>Tiempo Restante</TableCell>}
                            {type === "READY" &&<TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>}
                            {type === "ENDED" && <TableCell sx={{ fontWeight: 'bold' }}>Tiempo en que se completó (CT)</TableCell>}
                            {type === "ENDED" && <TableCell sx={{ fontWeight: 'bold' }}>Tiempo en el sistema (TAT)</TableCell>}
                            {type === "ENDED" && <TableCell sx={{ fontWeight: 'bold' }}>Tiempo en el sistema Normalizado (NTAT)</TableCell>}
                            {type === "ENDED" && <TableCell sx={{ fontWeight: 'bold' }}>Tiempo de espera (WT)</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tale.map((process: Process, index) => (
                            <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                                <TableCell>{process.id}</TableCell>
                                <TableCell>{process.timeArrive}</TableCell>
                                <TableCell>{process.burstTime}</TableCell>
                                {type === "READY" &&<TableCell>{process.remainingTime}</TableCell>}
                                {type === "READY" &&<TableCell>{process.status}</TableCell>}
                                {type === "ENDED" && <TableCell>{process.completionTime}</TableCell>}
                                {type === "ENDED" && <TableCell>{process.turnaroundTime}</TableCell>}
                                {type === "ENDED" && <TableCell>{process.normalizedTurnaroundTime}</TableCell>}
                                {type === "ENDED" && <TableCell>{process.waitingTime}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
