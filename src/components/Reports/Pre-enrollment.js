import { React, useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import axios from "../../config/axios";

export default function PreEnrollment() {
  const [count, setCount] = useState("");
  useEffect(() => {
    axios.get("/user/count").then((response) => {
      setCount(response.data);
    });
  }, []);
  return (
    <Box m={5}>
      <Typography
        variant="h4"
        color="primary"
        fontFamily="PoppinsBold"
        gutterBottom
      >
        Daily Visitors
      </Typography>{" "}
      <Typography component="p" variant="h5">
        {count}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {new Date().toDateString()}
      </Typography>
    </Box>
  );
}
