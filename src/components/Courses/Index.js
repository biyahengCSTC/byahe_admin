import { React, useState } from "react";
import List from "./List";
import Add from "./Add";
import { Box, Toolbar } from "@mui/material";
import Footer from "../Footer";
import NavBar from "../NavBar";

export default function Course() {
  const [display, setDisplay] = useState("list");
  const handleAdd = async () => {
    setDisplay("add");
  };
  const handleCancel = async () => {
    setDisplay("list");
  };
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
  return (
    <main>
      <Box sx={{ display: "flex" }}>
        <NavBar navClick={handleNav} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          <Box sx={{ p: 3, mb: 25 }}>
            {display == "list" && <List addClick={handleAdd} />}
            {display == "add" && <Add cancelClick={handleCancel} />}
          </Box>
          <Footer />
        </Box>
      </Box>
    </main>
  );
}
