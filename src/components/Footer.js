import * as React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function FixedBottomNavigation() {
  function Copyright() {
    return (
      <Typography variant="body2" color="secondary" align="center">
        {" © "}
        <Link color="inherit" underline="none" href="https://mui.com/">
          CSTC COLLEGE OF SCIENCES, TECHNOLOGY AND COMMUNICATIONS, INC.
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        p: 2,
        mt: "auto",
      }}
      component="footer"
    >
      <Typography
        variant="h6"
        align="center"
        color="secondary"
        position="bottom"
        gutterBottom
      >
        <Copyright />
      </Typography>
    </Box>
  );
}
