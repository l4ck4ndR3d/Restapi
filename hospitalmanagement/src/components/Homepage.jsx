import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Box, Paper, Stack,
  Card, CardContent, Button
} from '@mui/material';
import axios from 'axios';
// import About from './About';
// import Help from './Help';

function MainPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [displayServices, setDisplayServices] = useState(false);
  const [institution, setInstitution] = useState([]);
  const [displayinstitution, setDisplayinstitution] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  // Fetching services from the API
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/services'); // Fetching services from the correct API endpoint
      setServices(response.data);

    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
  const fetchInstitutions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/educationalCourses'); // Fetching services from the correct API endpoint
      setInstitution(response.data);

    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };


const handleServiceClick = () => {
  setDisplayServices((prev) => !prev); // Toggle the displayServices state
  if (!displayServices) {
    fetchServices(); // Fetch services only when displaying them
  }
};
const handleEducationClick = () => {
  setDisplayinstitution((prev) => !prev); 
  if (!displayinstitution) {
    fetchInstitutions(); 
  }
};
const handleAppointmentClick = () => {
  setIsUserLoggedIn('')
  if (!isUserLoggedIn) {
    navigate('/login'); 
  } else {
    navigate('/appointment'); 
  }
};
  return (
    <div >
      {/* Header with Navigation Bar */}
      <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none',color:"black" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
             Aura Hospital   👨‍⚕️
          </Typography>
          {/* <Button color="inherit" onClick={() => navigate('/about')}>About</Button> */}
          {/* <Button color="inherit" onClick={() => navigate('/help')}>Help</Button> */}
          <Button color="inherit" onClick={handleServiceClick}>Services</Button>
          <Button color="inherit" onClick={handleEducationClick}>Institution</Button>
          {/* <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button> */}
          <Button color="inherit" onClick={handleAppointmentClick}>Appointment</Button>
        </Toolbar>
      </AppBar>

      <main>
        <Box sx={{ padding: '20px',color:"black" }}>
          {/* Welcome Section */}
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px',boxShadow: '0px 3px 40px rgba(112, 113, 112, 2.22)' ,color:'black'}}>
            <Typography variant="h4" gutterBottom align="center">
              Welcome to Aura Hospital
            </Typography>
            <Typography variant="body1" align="center">
              Your health is our priority. We provide a range of services to cater to all your medical needs.
            </Typography>
          </Paper>
          
          {/* Services Section */}
          {displayServices && (
            <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px',boxShadow: '0px 3px 3px rgba(112, 113, 112, 2.22)',color:'black'}}>
              <Typography variant="h4" gutterBottom>
                Hospital Services
              </Typography>
              <Stack spacing={2}>
                {services.map((service) => (
                  <Card key={service.id} variant="outlined">
                    <CardContent>
                      <Typography variant="h6">{service.name}</Typography>
                      <Typography variant="body2">{service.description}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Paper>
          )}

          {/* Education Programs Section */}
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px',boxShadow: '0px 3px 34px rgba(112, 113, 112, 2.22)',color:"black" }}>
            <Typography variant="h4" gutterBottom>
              Education Programs
            </Typography>
            <Typography variant="body1">
              We offer various programs for healthcare professionals:
              <ul>
                <li>Undergraduate degrees</li>
                <li>Postgraduate degrees</li>
                <li>Diplomas</li>
                <li>Certificate Programs</li>
              </ul>

              {displayinstitution && (
            <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px',boxShadow: '0px 3px 34px rgba(112, 113, 112, 2.22)',color:"black"}}>
              <Typography variant="h4" gutterBottom>
                Program details
              </Typography>
              <Stack spacing={2}>
                {institution.map((ins) => (
                  <Card key={ins.id} variant="outlined">
                    <CardContent>
                      <Typography variant="h6">{ins.title}</Typography>
                      <Typography variant="h5">{ins.duration}</Typography>
                      <Typography variant="body2">{ins.description}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Paper>
          )}
            </Typography>
          </Paper>

          {/* Helpline Section */}
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', boxShadow: '0px 3px 34px rgba(112, 113, 112, 2.22)',color:"black"  }}>
            <Typography variant="h4" gutterBottom>
              Helpline
            </Typography>
            <Typography variant="body1">
              Our helpline is available 24/7 for emergencies or inquiries. Call (91) 654-3210.
            </Typography>
          </Paper>

          {/* Honorables Section */}
          <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px',boxShadow: '0px 3px 34px rgba(112, 113, 112, 2.22)',color:"black"  }}>
            <Typography variant="h4" gutterBottom>
              Honorables
            </Typography>
            <ul>
              <li><strong>Dr. John Doe:</strong> Chief Executive Officer</li>
              <li><strong>Dr. Jane Smith:</strong> Chief Medical Officer</li>
              <li><strong>Dr. Emily Johnson:</strong> Head of Pediatrics</li>
            </ul>
          </Paper>

        </Box>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#141e30', color: '#fff', padding: '10px', textAlign: 'center' }}>
        <Typography variant="body2">&copy; 2024 WhaleRise Hospital. All rights reserved.</Typography>
      </footer>
    </div>
  );
}

export default MainPage;
//qwe!@#123W