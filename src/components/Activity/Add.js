import { React, useState } from "react";
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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Snack from "../Snack";

export default function AddTrivia(props) {
  const [name, setName] = useState("");
  const [date, setdate] = useState(new Date("2022-08-18T21:11:54"));
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const formData = new FormData();
  formData.append("name", name);
  formData.append("date", date);
  formData.append("images", selectedFile);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const req = await axios.post(`/activities`, formData);
      setSuccess(req.data.message);
      window.location.reload(false);
    } catch (error) {
      if (name === "" || date === "" || selectedFile === "") {
        setErrorMsg("Fields not allowed to be empty!");
      } else {
        setErrorMsg(error.response.data);
      }
    }
  }
  const handleDate = (e) => {
    setdate(e);
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };
  return (
    <main>
      <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
        Activities
      </Typography>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" gutterBottom>
            New Activity
          </Typography>
          <Grid container spacing={3} component="form">
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
                label="Question"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  id="date"
                  name="date"
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={handleDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <input
                id="images"
                name="images"
                type="file"
                onChange={handleFileSelect}
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
      <Snack values={success} />
    </main>
  );
}
