import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

function WeddingForm() {
  const [formData, setFormData] = useState({
    groomName: '',
    brideName: '',
    tickets: '',
    ticketPrice: '',
    preWeddingImages: [],
    ourStory: '',
    languages: '',
    menu: 'veg',
    alcohol: 'no',
    transportation: 'not included',
    accommodation: 'not included',
    day1: { eventName: '', place: '', date: '', description: '', music: 'no', dressCode: '', time: '' },
    day2: { eventName: '', place: '', date: '', description: '', music: 'no', dressCode: '', time: '' },
    appetizers: '',
    mainCourse: '',
    desserts: '',
  });

  // Retrieve hostId from user session or authentication context
  const hostId = "670751cb7e2e3b40f8e2d9ab"; // Replace with actual hostId from user session or context

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? [...files] : value,
    }));
  };

  // Handle changes in day event fields
  const handleDayChange = (day, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [day]: { ...prevState[day], [name]: value },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare wedding data including hostId
    const weddingData = { ...formData, hosts: [hostId] }; // Include hosts field here
    
    // Convert preWeddingImages to a format suitable for your API, if needed
    const formDataToSend = new FormData();
    Object.entries(weddingData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((file) => formDataToSend.append(key, file));
        } else {
            formDataToSend.append(key, value);
        }
    });

    try {
        const response = await axios.post('http://localhost:8000/api/weddings/create', formDataToSend, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Response:', response.data);
        alert('Wedding created successfully!');
    } catch (error) {
        console.error('Error creating wedding:', error.response?.data || error.message);
        alert('Failed to create wedding.');
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Wedding Details Form
      </Typography>
      <Grid container spacing={3} style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Groom and Bride Names */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Groom's Name" name="groomName" value={formData.groomName} onChange={handleChange} required variant="outlined" size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Bride's Name" name="brideName" value={formData.brideName} onChange={handleChange} required variant="outlined" size="small" />
        </Grid>
        {/* Tickets and Price */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Number of Tickets" type="number" name="tickets" value={formData.tickets} onChange={handleChange} required variant="outlined" size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Amount per Ticket" type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} required variant="outlined" size="small" />
        </Grid>
        {/* Pre-wedding Images */}
        <Grid item xs={12}>
          <Button variant="contained" component="label" fullWidth style={{ backgroundColor: '#E4D6A7', color: '#000' }}>
            Upload Pre-Wedding Images
            <input type="file" name="preWeddingImages" multiple hidden onChange={handleChange} />
          </Button>
        </Grid>
        {/* Our Story */}
        <Grid item xs={12}>
          <TextField fullWidth label="Our Story" name="ourStory" value={formData.ourStory} onChange={handleChange} multiline rows={3} required variant="outlined" size="small" />
        </Grid>
        {/* Overview Section */}
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Languages Spoken" name="languages" value={formData.languages} onChange={handleChange} variant="outlined" size="small" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Menu Offered</InputLabel>
            <Select name="menu" value={formData.menu} onChange={handleChange}>
              <MenuItem value="veg">Veg</MenuItem>
              <MenuItem value="non-veg">Non-Veg</MenuItem>
              <MenuItem value="jain">Jain</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Alcohol Offered</InputLabel>
            <Select name="alcohol" value={formData.alcohol} onChange={handleChange}>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Transportation and Accommodation */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Transportation</InputLabel>
            <Select name="transportation" value={formData.transportation} onChange={handleChange}>
              <MenuItem value="included">Included</MenuItem>
              <MenuItem value="not included">Not Included</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Accommodation</InputLabel>
            <Select name="accommodation" value={formData.accommodation} onChange={handleChange}>
              <MenuItem value="included">Included</MenuItem>
              <MenuItem value="not included">Not Included</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Appetizers, Main Course, and Desserts */}
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Appetizers" name="appetizers" value={formData.appetizers} onChange={handleChange} variant="outlined" size="small" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Main Course" name="mainCourse" value={formData.mainCourse} onChange={handleChange} variant="outlined" size="small" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Desserts" name="desserts" value={formData.desserts} onChange={handleChange} variant="outlined" size="small" />
        </Grid>
        {/* Day 1 and Day 2 Accordion */}
        {['day1', 'day2'].map((day, index) => (
          <Grid item xs={12} key={day}>
            <Accordion style={{ boxShadow: 'none', marginBottom: '10px' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{`Day ${index + 1} Event Details`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Card style={{ borderRadius: '8px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Event Name" name="eventName" value={formData[day].eventName} onChange={(e) => handleDayChange(day, e)} variant="outlined" size="small" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Place" name="place" value={formData[day].place} onChange={(e) => handleDayChange(day, e)} variant="outlined" size="small" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Date" name="date" type="date" value={formData[day].date} onChange={(e) => handleDayChange(day, e)} variant="outlined" size="small" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Description" name="description" value={formData[day].description} onChange={(e) => handleDayChange(day, e)} variant="outlined" size="small" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Music Included</InputLabel>
                          <Select name="music" value={formData[day].music} onChange={(e) => handleDayChange(day, e)}>
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Dress Code" name="dressCode" value={formData[day].dressCode} onChange={(e) => handleDayChange(day, e)} variant="outlined" size="small" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Time" name="time" type="time" value={formData[day].time} onChange={(e) => handleDayChange(day, e)} variant="outlined" size="small" />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Wedding
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default WeddingForm;
