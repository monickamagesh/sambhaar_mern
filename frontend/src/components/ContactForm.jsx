import React, { useState } from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";

const ContactFormpage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
    isChecked: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.subject) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name}
            disabled={isLoading}
            fullWidth
            placeholder="Your Name"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email}
            disabled={isLoading}
            fullWidth
            placeholder="Your Email"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.subject}
            helperText={errors.subject}
            disabled={isLoading}
            fullWidth
            placeholder="Subject"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description}
            disabled={isLoading}
            fullWidth
            placeholder="Message"
            multiline
            rows={4}
            maxLength={150}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="isChecked"
                checked={formData.isChecked}
                onChange={handleChange}
                color="primary"
                disabled={isLoading}
              />
            }
            label="I'd like to hear from Sambhaar in the future. (You can unsubscribe at any time)"
            className="text-[#1F2937] text-base font-medium"
          />
        </Grid>

        <Grid item xs={12}>
          <div className="text-center mt-8">
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="text-sm font-bold uppercase"
              disabled={isLoading}
              style={{backgroundColor:'#EA580C', borderRadius: '10px'}}
            >
              Send Message
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactFormpage;