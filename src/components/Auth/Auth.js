import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Login from './Login';
import Register from './Register';
import './Auth.css'

function Auth() {
    const [value, setValue] = React.useState('1');

    if(sessionStorage.getItem('auth-token')){
        return (
            window.location.replace('/')
        )
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    

    return (
        <Box sx={{ width: '50%', typography: 'body1',margin:'6rem auto' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    
                    <TabList onChange={handleChange} aria-label="lab API tabs example" >
                        <Tab label="Login" value="1" />
                        <Tab label="SignUp" value="2" />
                        
                    </TabList>
                </Box>
                <TabPanel value="1" style={{display:'flex',justifyContent:'center'}}><Login/></TabPanel>
                <TabPanel value="2" style={{display:'flex',justifyContent:'center'}}><Register/></TabPanel>
                
            </TabContext>
        </Box>
    );
}

export default Auth
