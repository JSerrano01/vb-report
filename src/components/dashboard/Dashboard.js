import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Profile from '../profile/Profile';
import GenerarReporte from '../generarReporte/GenerarReporte';
import VerReportes from '../verReportes/VerReportes';
import './Dashboard.css';
import { Button } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {

  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Dashboard(props) {
  const [value, setValue] = React.useState(0);
  const [active, setactive] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const calculateHeight = () => {
    if (value == 1) {
      return '100vh'
    }

    if (value == 2) {
      return '100%'
    }

    else {
      return '100vh'
    }
  }

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: calculateHeight(), minHeight: '100%',width: '120vw'}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-around'}}
      >
        <Tab sx={{margin: '10px 0'}} label="Actualizar perfil" {...a11yProps(0)} />
        <Tab sx={{margin: '10px 0'}} label="Generar reporte" {...a11yProps(1)} />
        <Tab sx={{margin: '10px 0'}} label="Mis reportes" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Profile token={props.token}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GenerarReporte token={props.token}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VerReportes token={props.token}/>
      </TabPanel>
    </Box>
  );
}
