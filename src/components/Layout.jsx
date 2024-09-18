import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Container component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
