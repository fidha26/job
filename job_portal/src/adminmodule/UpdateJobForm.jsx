import React, { useState } from 'react';
import axios from 'axios';

const UpdateJobForm = ({ job }) => {
    const [formData, setFormData] = useState({
        Jobname: location.state.val.Jobname,
        Description: location.state.val.Description,
        Reqirements: location.state.val.Reqirements,
        Location: location.state.val.Location,
        Salary: location.state.val.Salary,
        Jobtype: location.state.val.Jobtype,
        // Add other fields as necessary
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateJob(job._id, formData); // Call the update function with job ID and updated data
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="job_title"
                value={formData.Jobname}
                onChange={handleChange}
                placeholder="Job Title"
            />
            <input
                name="location"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Location"
            />
            <input
                name="jobType"
                value={formData.Jobtype}
                onChange={handleChange}
                placeholder="Job Type"
            />
            <input
                name="Reqirements"
                value={formData.Reqirements}
                onChange={handleChange}
                placeholder="Reqirements"
            />
             <input
                name="industry"
                value={formData.Reqirements}
                onChange={handleChange}
                placeholder="Industry"
            />
            {/* Add other fields as necessary */}
            <button type="submit">Update Job</button>
        </form>
    );
};

export default UpdateJobForm;
