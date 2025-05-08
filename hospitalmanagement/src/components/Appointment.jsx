
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    AppBar, Toolbar, TextField, Button,
    Typography, Card as MuiCard, CardContent, Grid, Stack,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100vh',
    padding: theme.spacing(2),
    justifyContent: 'center',
    backgroundColor: 'white',
    textAlign: 'center'
}));

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    maxWidth: '400px',
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(30px)',
    boxShadow: '0px 10px 95px rgba(0, 0, 0, 2.22)',
    borderRadius:'10px 11px'
}));

const AppointmentBooking = () => {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [doctorName, setDoctorName] = useState("");
    const [patientName, setPatientName] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [message, setMessage] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/appointmentfixed');
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchDoctors();
        fetchAppointments();
    }, []);

   // Handle appointment booking
   const handleAppointment = async (e) => {
       e.preventDefault();
       setMessage("");

       // Check if the appointment date is in the past
       const selectedDate = new Date(appointmentDate);
       const currentDate = new Date();

       if (selectedDate < currentDate) {
           setMessage("Selected date cannot be in the past.");
           return;
       }

       const filtered = doctors.filter(doctor =>
           doctor.name.toLowerCase() === doctorName.toLowerCase()
       );

       if (filtered.length > 0) {
           const doctor = filtered[0];

           if (doctor.holiday_dates.includes(appointmentDate)) {
               setMessage("Try to make an appointment on another date.");
               return;
           }

           alert(`Appointment fixed with ${doctor.name} on ${appointmentDate}`);

           const appointmentData = {
               patient_name: patientName,
               appointed_doctor: doctor.name,
               date: appointmentDate,
               time: new Date().toLocaleString(),
           };

           try {
               await axios.post('http://localhost:3000/appointmentfixed', appointmentData);
               setAppointments([...appointments, appointmentData]);
           } catch (error) {
               console.error("Error registering appointment:", error);
           }
       } else {
           setMessage("No matching doctors found.");
       }
   };

   // Handle doctor name change
   const handleDoctorNameChange = (e) => {
       const value = e.target.value;
       setDoctorName(value);

       if (value) {
           const filtered = doctors.filter(doctor =>
               doctor.name.toLowerCase().includes(value.toLowerCase())
           );
           setFilteredDoctors(filtered);
       } else {
           setFilteredDoctors([]);
       }
   };

   // New function to handle selecting a doctor
   const handleDoctorSelect = (doctor) => {
       setDoctorName(doctor.name); // Set selected doctor's name
       setFilteredDoctors([]); // Clear suggestions
   };

   // Function to handle logout
   const handleLogout = () => {
       localStorage.removeItem('user'); // Clear user data from local storage
       
       navigate('/login'); // Redirect to login page or home page
   };

 return (
       <SignInContainer direction="column" justifyContent="center">
           <AppBar position="static" >
               <Toolbar>
                   <Typography variant="h6" sx={{ flexGrow: 2 }}>
                       Aura Hospital
                   </Typography>
                   <Button color="inherit" onClick={handleLogout}>Sign Out</Button>
               </Toolbar>
           </AppBar>
           
           <Typography variant="h4" gutterBottom style={{ margin:'auto', color: '#333' }}>
               Book an Appointment
           </Typography>

           <Card>
               <CardContent>
                   <form onSubmit={handleAppointment}>
                       <Grid container spacing={2}>
                           <Grid item xs={12}>
                               <TextField
                                   label="Doctor's Name"
                                   variant="outlined"
                                   value={doctorName}
                                   onChange={handleDoctorNameChange}
                                   required
                                   InputLabelProps={{
                                       style: { color: '#333' },
                                   }}
                                   InputProps={{
                                       style: { color: '#333' },
                                   }}
                               />
                               {filteredDoctors.length > 0 && (
                                   <TableContainer component={Paper} style={{ marginTop: '8px', backgroundColor: '#f7f7f7' }}>
                                       <Table>
                                           <TableHead>
                                               <TableRow>
                                                   <TableCell style={{ color: '#333' }}>Doctor Name</TableCell>
                                                   <TableCell style={{ color: '#333' }}>Speciality</TableCell>
                                                   <TableCell style={{ color: '#333' }}>Phone</TableCell>
                                               </TableRow>
                                           </TableHead>
                                           <TableBody>
                                               {filteredDoctors.map((doctor) => (
                                                   <TableRow key={doctor.id} hover onClick={() => handleDoctorSelect(doctor)}>
                                                       <TableCell style={{ color: '#333' }}>{doctor.name}</TableCell>
                                                       <TableCell style={{ color: '#333' }}>{doctor.speciality}</TableCell>
                                                       <TableCell style={{ color: '#333' }}>{doctor.phone}</TableCell>
                                                   </TableRow>
                                               ))}
                                           </TableBody>
                                       </Table>
                                   </TableContainer>
                               )}
                           </Grid>
                           <Grid item xs={12}>
                               <TextField
                                   required
                                   label="Patient Name"
                                   variant="outlined"
                                   value={patientName}
                                   onChange={(e) => setPatientName(e.target.value)}
                                   InputLabelProps={{
                                       style: { color: '#333' },
                                   }}
                                   InputProps={{
                                       style: { color: '#333' },
                                   }}
                               />
                           </Grid>
                           <Grid item xs={12}>
                               <TextField
                                   required
                                   label="Appointment Date"
                                   type="date"
                                   value={appointmentDate}
                                   onChange={(e) => setAppointmentDate(e.target.value)}
                                   InputLabelProps={{
                                       shrink: true,
                                       style: { color: '#333' },
                                   }}
                                   InputProps={{
                                       style: { color: '#333' },
                                   }}
                               />
                           </Grid>
                       </Grid>
                       <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                           Book Appointment
                       </Button>

                       {/* Button to navigate to Delete Appointment page */}
                       <Button 
                           variant="contained" 
                           color="secondary" 
                           style={{ marginTop:'16px', marginLeft:'16px' }} 
                           onClick={() => navigate('/deleteappointment')}
                       >
                           Manage Appointments
                       </Button>

                   </form>

                   {message && (
                       <Typography variant="body1" style={{ marginTop: '16px', color: '#333' }}>
                           {message}
                       </Typography>
                   )}
               </CardContent>
           </Card>

       </SignInContainer>
   );
};

export default AppointmentBooking;
