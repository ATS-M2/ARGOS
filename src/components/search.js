import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Person, Home, Email, Phone, Search, Download } from '@mui/icons-material';
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import PublicIcon from '@mui/icons-material/Public';

export default function SearchPanel({onGeoFenceClick}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, },
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                padding: '30px',
                // Set the text color to white
            }}
            noValidate
            autoComplete="off"
        >
            <Typography style={{ textAlign: 'center' }}>
                Search
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <FormControl
                    sx={{
                        m: 1,
                        // width: '25ch',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                            '& .MuiSvgIcon-root': { // Set the icon color to white
                                color: 'white',
                                paddingLeft: 0
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // Set the label color to white
                        },
                    }}
                    style={{ width: '100%' }}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password" style={{ color: 'white' }}>
                        Date From
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        style={{ paddingLeft: 0, color: 'white' }}
                        startAdornment={
                            <InputAdornment position="end" style={{ color: 'white', marginLeft: 0 }}>
                                <IconButton aria-label="toggle password Person" edge="end">
                                    <DateRangeIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Date From"
                    />
                </FormControl>
                <FormControl
                    sx={{
                        m: 1,
                        // width: '25ch',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                            '& .MuiSvgIcon-root': { // Set the icon color to white
                                color: 'white',
                                paddingLeft: 0
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // Set the label color to white
                        },
                    }}

                    style={{ width: '100%' }}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password" style={{ color: 'white' }}>
                        Date To
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        style={{ paddingLeft: 0, color: 'white' }}
                        startAdornment={
                            <InputAdornment position="end" style={{ color: 'white', marginLeft: 0 }}>
                                <IconButton aria-label="toggle password Person" edge="end">
                                    <DateRangeIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Date To"
                    />
                </FormControl>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <FormControl
                    sx={{
                        m: 1,
                        // width: '25ch',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                            '& .MuiSvgIcon-root': { // Set the icon color to white
                                color: 'white',
                                paddingLeft: 0
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // Set the label color to white
                        },
                    }}
                    style={{ width: '100%' }}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password" style={{ color: 'white' }}>
                        Time From
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        style={{ paddingLeft: 0, color: 'white' }}
                        startAdornment={
                            <InputAdornment position="end" style={{ color: 'white', marginLeft: 0 }}>
                                <IconButton aria-label="toggle password Person" edge="end">
                                    <AccessTimeIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Time From"
                    />
                </FormControl>
                <FormControl
                    sx={{
                        m: 1,
                        // width: '25ch',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                            '& .MuiSvgIcon-root': { // Set the icon color to white
                                color: 'white',
                                paddingLeft: 0
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // Set the label color to white
                        },
                    }}

                    style={{ width: '100%' }}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password" style={{ color: 'white' }}>
                        Time To
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        style={{ paddingLeft: 0, color: 'white' }}
                        startAdornment={
                            <InputAdornment position="end" style={{ color: 'white', marginLeft: 0 }}>
                                <IconButton aria-label="toggle password Person" edge="end">
                                    <AccessTimeIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Time To"
                    />
                </FormControl>
            </div>

            <div style={{ width: '100%', height: '70px', display: 'flex', alignItems: 'center', justifyContent: "space-evenly" }}>
                <Button variant="outlined" startIcon={<PublicIcon />} style={{ width: '30%', borderColor: 'white', color : 'white' }} onClick={onGeoFenceClick}>
                    Geocode
                </Button>
                <Button variant="outlined" startIcon={<Search />} style={{ borderColor: 'white', width: "30%", color : 'white' }}>
                    Search
                </Button>

            </div>

        </Box>
    );
}
