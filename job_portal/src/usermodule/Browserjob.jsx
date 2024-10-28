import Navuser from './Navuser'
import { Button, Card, CardContent, Grid, Typography, TextField, MenuItem } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const Browserjob = () => {
  var location = useLocation();
  var name = location.state;

  var [jobs, setJobs] = useState([]);
  var [filteredJobs, setFilteredJobs] = useState([]);
  var [filters, setFilters] = useState({
    jobType: '',
    location: '',
    salaryRange: '',
  });

  useEffect(() => {
    axios
      .get("http://localhost:3005/view")
      .then((res) => {
        setJobs(res.data);
        setFilteredJobs(res.data); // Initially set filtered jobs to all jobs
      })
      .catch((err) => console.log(err));
  }, []);

  const applyJob = (val) => {
    axios.post("http://localhost:3005/jobapply", val, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    }).then((res) => {
      console.log(res.data.message);
      alert(res.data.message);
    }).catch((err) => {
      console.log(err);
    });
  };

  // Handle filter change and update the filtered jobs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    // Filter jobs based on the selected criteria
    const filtered = jobs.filter((job) => {
      return (
        (filters.jobType ? job.Jobtype === filters.jobType : true) &&
        (filters.location ? job.Location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
        (filters.salaryRange ? job.Salary <= filters.salaryRange : true)
      );
    });

    setFilteredJobs(filtered);
  };

  return (
    <div className="user">
      <div className="nav">
        <Navuser></Navuser>
        <br/><br/>
        <Typography variant='h4'>List of All Available Jobs</Typography>
        <br/><br/>
        <div>
          <TextField
            name="jobType"
            label="Job Type"
            select
            value={filters.jobType}
            onChange={handleFilterChange}
            variant="outlined"
            style={{ marginRight: '10px' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Full-Time">Full-Time</MenuItem>
            <MenuItem value="Part-Time">Part-Time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>
          <TextField
            name="location"
            label="Location"
            value={filters.location}
            onChange={handleFilterChange}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          <TextField
            name="salaryRange"
            label="Max Salary"
            type="number"
            value={filters.salaryRange}
            onChange={handleFilterChange}
            variant="outlined"
          />
        </div>
        <br/><br/>
        <Grid container spacing={2}>
          {
            filteredJobs.map((val, i) => {
              return (
                <Grid item xs={12} md={3} key={i}>
                  <Card sx={{ maxWidth: 345, height: '100%' }}>
                    <CardContent>
                      <Typography sx={{ mb: 1.5 }}>
                        Job Name: {val.Jobname}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }}>
                        Description: {val.Description}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }}>
                        Requirements: {val.Reqirements}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }}>
                        Location: {val.Location}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }}>
                        Salary: {val.Salary}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }}>
                        Job Type: {val.Jobtype}
                      </Typography>
                      <Button variant='contained'>SAVE</Button> &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button variant='contained' onClick={() => { applyJob(val); }}>APPLY</Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          }
        </Grid>
      </div>
    </div>
  );
};

export default Browserjob;
