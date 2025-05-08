import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    AppBar, Toolbar, Button,
    Typography, Card as MuiCard, CardContent, Stack
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100vh',
    padding: theme.spacing(2),
    backgroundColor: 'white',
    textAlign: 'center',
}));

const HeaderContainer = styled(Stack)(({ theme }) => ({
    marginBottom: theme.spacing(4), // Space between header and content
}));

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: '10px auto', // Center the card with margin
    maxWidth: '400px',
    backdropFilter: 'blur(30px)',
    boxShadow: '0px 10px 95px rgba(0, 0, 0, 2.22)',
    borderRadius:'10px 11px'
}));

const DeleteAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/appointmentfixed');
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

   // Function to handle deleting an appointment
   const handleDeleteAppointment = async (appointmentId) => {
       try {
           await axios.delete(`http://localhost:3000/appointmentfixed/${appointmentId}`);
           // Update the appointments state after deletion
           setAppointments(prevAppointments => 
               prevAppointments.filter(app => app.id !== appointmentId)
           );
           alert("Appointment successfully deleted.");
       } catch (error) {
           console.error("Error deleting appointment:", error);
           alert("Failed to delete the appointment.");
       }
   };

   // Function to handle logout
//    const handleLogout = () => {
//        localStorage.removeItem('user'); // Clear user data from local storage
//        navigate('/login'); // Redirect to login page or home page
//    };

   return (
       <SignInContainer direction="column">
           <AppBar position="static">
               <Toolbar>
                   <Typography variant="h6" sx={{ flexGrow: 2 }}>
                       Aura Hospital
                   </Typography>
                   {/* Uncomment if you want a logout button */}
                   {/* <Button color="inherit" onClick={handleLogout}>Sign Out</Button> */}
               </Toolbar>
           </AppBar>

           <HeaderContainer>
               <Typography variant="h4" gutterBottom style={{ color: '#333', marginTop: '20px' }}>
                   Appointments
               </Typography>
           </HeaderContainer>

           {/* Stack for vertical alignment */}
           <Stack spacing={2} alignItems="center">
               {appointments.length > 0 ? (
                   appointments.map((appointment) => (
                       <Card key={appointment.id} style={{ backgroundColor:'#f7f7f7' }}>
                           <CardContent>
                               <Typography variant="h6">Patient: {appointment.patient_name}</Typography>
                               <Typography>Doctor: {appointment.appointed_doctor}</Typography>
                               <Typography>Date: {appointment.date}</Typography>
                               <Typography>Time: {appointment.time}</Typography>

                               {/* Delete button for each appointment */}
                               <Button
                                   variant="contained"
                                   color="secondary"
                                   style={{ marginTop:'16px' }}
                                   onClick={() => handleDeleteAppointment(appointment.id)} // Pass appointment ID for deletion logic
                               >
                                   Delete Appointment
                               </Button>
                           </CardContent>
                       </Card>
                   ))
               ) : (
                   <Typography variant="body1" style={{ color:'#333', padding:'25px' }}>
                       No appointments found.
                   </Typography>
               )}
           </Stack>
       </SignInContainer>
   );
};

export default DeleteAppointment;
