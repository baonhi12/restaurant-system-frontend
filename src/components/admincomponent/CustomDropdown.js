import React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(1.8),

    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 13,
      padding: '8px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 5,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
}));
  

const CustomDropdown = ({ selected, onChange }) => {
    // const [unit, setUnit] = React.useState('');
    // const handleChange = (event) => {
    //     setUnit(event.target.value);
    // };
    const handleChange = (event) => {
      onChange(event.target.value);
    };
    return (
        <div>
            <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel id="demo-customized-select-label">Periodic</InputLabel>
                <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={selected}
                onChange={handleChange}
                input={<BootstrapInput />}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default CustomDropdown;