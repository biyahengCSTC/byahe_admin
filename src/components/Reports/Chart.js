import { React, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import { PieChart, Pie, LabelList, ResponsiveContainer } from "recharts";
import axios from "../../config/axios";

export default function Chart() {
  const [counts, setCount] = useState([]);

  useEffect(() => {
    axios.get("/contact/count").then((response) => {
      const data = response.data.map((item) => {
        const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
          Math.random() * 256
        )},${Math.floor(Math.random() * 256)})`;

        return {
          course: item.course,
          count: parseInt(item.count),
          fill: color,
        };
      });
      setCount(data);
    });
  }, []);

  return (
    <ResponsiveContainer>
      <ResponsiveContainer>
        {counts.length > 0 ? (
          <PieChart width={730} height={250}>
            <Pie
              data={counts}
              dataKey="count"
              nameKey="course"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {" "}
              <LabelList dataKey="course" position="top" />
            </Pie>
          </PieChart>
        ) : (
          <Box my={10}>
            <Typography
              variant="h3"
              color="text.secondary"
              fontFamily="PoppinsBold"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              No Inquiry
            </Typography>
          </Box>
        )}
      </ResponsiveContainer>
    </ResponsiveContainer>
  );
}
