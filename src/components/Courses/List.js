import { React, useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import axios from "../../config/axios";

const columns = [
  { id: "name", label: "Course", minWidth: 200 },
  { id: "email", label: "Email Address", minWidth: 150 },
  { id: "contact", label: "Contact Number", minWidth: 150 },
  { id: "subject", label: "Subject", minWidth: 200 },
  { id: "message", label: "Message", minWidth: 200 },
  { id: "date", label: "Date", minWidth: 200 },
];

export default function StickyHeadTable(props) {
  const [rows, setRows] = useState([]);
  const [updateData, setupdateData] = useState("");
  const [courses, setCourse] = useState([]);
  const [courseCode, setCoursCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("/courses").then((response) => {
      setCourse(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get("/contact").then((response) => {
      setRows(response.data);
    });
  }, []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterCourse = async (courseCode) => {
    setCoursCode(courseCode);
    const res = await axios.get(`/contact?course=${courseCode}`);
    setRows(res.data);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h6"
        color="primary"
        fontFamily="PoppinsBold"
        gutterBottom
      >
        User Feedback
      </Typography>
      {updateData === "" && (
        <Box>
          <Box sx={{ width: "100%", overflow: "visible", marginBottom: 5 }}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-controlled-open-select-label">
                    Course
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    name="course"
                    label="Course"
                    value={courseCode}
                    onChange={(searchVal) =>
                      handleFilterCourse(searchVal.target.value)
                    }
                  >
                    {courses.map((data, i) => (
                      <MenuItem value={data.courseCode} key={i}>
                        {data.courseCode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell align="left">{row.course}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">{row.contact}</TableCell>
                          <TableCell align="left">{row.subject}</TableCell>
                          <TableCell align="left">{row.message}</TableCell>
                          <TableCell align="left">{row.date}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {rows.length === 0 && (
              <Stack spacing={2}>
                <Paper sx={{ textAlign: "center", padding: 5 }}>
                  No record
                </Paper>
              </Stack>
            )}
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
}
