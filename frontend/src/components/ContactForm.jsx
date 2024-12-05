import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { TextField, Grid } from "@mui/material";

const ContactFormPage = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "user_name":
        return value.trim() ? "" : "Name is required.";
      case "user_email":
        if (!value.trim()) return "Email is required.";
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
          return "Invalid email format.";
        return "";
      case "subject":
        return value.trim() ? "" : "Subject is required.";
      case "message":
        return value.trim() ? "" : "Message is required.";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Validate the specific field
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });

    setErrors(newErrors);
    return Object.keys(newErrors).every((key) => !newErrors[key]);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    emailjs
      .sendForm("service_24skmup", "template_1wkp3pp", form.current, {
        publicKey: "jE8-xTHgDQ4kU95-u",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setSuccessMessage("Message sent successfully!");
          form.current.reset(); // Reset the form
          setFormData({
            user_name: "",
            user_email: "",
            subject: "",
            message: "",
          }); // Reset the state
          setErrors({});
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="user_name"
            variant="outlined"
            fullWidth
            placeholder="Your Name"
            value={formData.user_name}
            onChange={handleChange}
            error={!!errors.user_name}
            helperText={errors.user_name}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="user_email"
            type="email"
            variant="outlined"
            fullWidth
            placeholder="Your Email"
            value={formData.user_email}
            onChange={handleChange}
            error={!!errors.user_email}
            helperText={errors.user_email}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Subject"
            name="subject"
            variant="outlined"
            fullWidth
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            error={!!errors.subject}
            helperText={errors.subject}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Message"
            name="message"
            variant="outlined"
            fullWidth
            placeholder="Message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
          />
        </Grid>

        <Grid item xs={12}>
          <div className="text-center mt-8">
            <input
              type="submit"
              value="Send Message"
              variant="contained"
              size="large"
              className="text-sm font-bold uppercase subscribe-btn w-40"
            />
          </div>
        </Grid>

        {successMessage && (
          <Grid item xs={12}>
            <div style={{ color: "green", textAlign: "center" }}>
              {successMessage}
            </div>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default ContactFormPage;
