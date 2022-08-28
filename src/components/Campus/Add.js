import { React, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Alert,
} from "@mui/material";
import axios from "../../config/axios";

export default function AddCampus(props) {
  const [name, setName] = useState("");
  const [tour_url, setTour] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`/campus`, { name, tour_url });
      window.location.href = "/admin/campuses";
    } catch (error) {
      if (name === "" || tour_url === "") {
        console.log("catch", error.response.data);
        setErrorMsg(error.response.data.error[0]);
      } else {
        setErrorMsg(error.response.data.message);
      }
    }
  }
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else {
      setTour(e.target.value);
    }
  };
  return (
    <main>
      <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
        Campus
      </Typography>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" gutterBottom>
            New Campus
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {errorMsg && (
                <Alert severity="error" style={{ textTransform: "capitalize" }}>
                  {errorMsg}
                </Alert>
              )}
              <TextField
                required
                id="name"
                name="name"
                label="Campus Name"
                fullWidth
                autoComplete="given-campus"
                variant="standard"
                value={name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="tour_url"
                name="tour_url"
                label="Tour link url"
                fullWidth
                autoComplete="given-tour"
                variant="standard"
                value={tour_url}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button sx={{ mt: 3, ml: 1 }} onClick={props.cancelClick}>
              cancel
            </Button>

            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Container>
    </main>
  );
}
