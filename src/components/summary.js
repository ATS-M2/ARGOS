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

export default function SummaryPanel({total}) {


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
            <Typography style={{ textAlign: 'left' }}>
                Event
            </Typography>
            <Typography style={{ textAlign: 'center', fontSize : '60px', fontWeight : 'bold' , color : 'cyan' }}>
                {total}K
            </Typography>

        </Box>
    );
}
