import { React, useState, useEffect } from "react";
import {
  Box,
  Toolbar,
  Grid,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import NavBar from "./NavBar";
import Chart from "./Reports/Chart";
import Prenrollment from "./Reports/Pre-enrollment";
import Survey from "./Reports/Survey";
import Footer from "./Footer";

export default function Dashboard() {
  let [nav, setNav] = useState(0);
  const handleNav = (event, index) => {
    switch (index) {
      case 1:
        window.location.href = "/admin/courses";
        break;
      case 2:
        window.location.href = "/admin/campuses";
        break;
      case 3:
        window.location.href = "/admin/faqs";
        break;
      case 4:
        window.location.href = "/admin/trivias";
        break;
      case 5:
        window.location.href = "/admin/activities";
        break;
      case 6:
        window.location.href = "/admin/users";
        break;
      default:
        window.location.href = "/admin/dashboard";
    }
    setNav(index);
  };
  const session = JSON.parse(localStorage.getItem("session"));
  useEffect(() => {
    if (session === null) {
      window.location.href = "/signin";
    }
  }, []);
  return (
    <main>
      <Box sx={{ display: "flex" }}>
        <NavBar navClick={handleNav} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 25 }}>
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              gutterBottom
            >
              Today
            </Typography>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Prenrollment />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Survey />
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </Box>
      </Box>
    </main>
  );
}
