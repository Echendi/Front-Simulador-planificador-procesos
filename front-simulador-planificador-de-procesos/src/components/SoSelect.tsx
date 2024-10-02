import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SoSelectProps {
    items: string[];
    onChange: (value: string) => void;
}

export const SoSelect: React.FC<SoSelectProps> = ({ items, onChange  }) => {
    const [algorithm, setAlgorithm] = useState<string>(items[0]);

    const handleChange = (event: SelectChangeEvent) => {
        const selectedAlgorithm = event.target.value as string;
        setAlgorithm(selectedAlgorithm);
        onChange(selectedAlgorithm); 
    };

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Algoritmo</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={algorithm}
                    label="Algoritmo"
                    onChange={handleChange}
                >
                    {items.map((item: string) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}