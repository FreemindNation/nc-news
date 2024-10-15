import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Typography } from "@mui/material";
import { Stack, AppBar, Tooltip, Toolbar, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import PublicIcon from "@mui/icons-material/Public";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ p: 2 }} enableColorOnDark>
        <Toolbar
          sx={{
            justifyContent: { xs: "center", sm: "left" },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ flexGrow: 1 }}
          >
            <Typography
              variant="h5"
              sx={{
                mr: 2,
                fontWeight: 700,
                letterSpacing: { xs: "0.1rem", sm: "0.2rem" },
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              NC
            </Typography>
            <Link to="/" style={{ color: "white" }}>
              <motion.div 
              animate= {{ rotate: 360 }} 
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}>
                <PublicIcon fontSize="large" />
              </motion.div>
            </Link>
            <Typography
              variant="h5"
              sx={{
                mr: 2,
                fontWeight: 700,
                letterSpacing: { xs: "0.1rem", sm: "0.2rem" },
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              News
            </Typography>
          </Stack>
          <Tooltip title={`Logged in as ${user}`}>
            <Grid2 container spacing={3}>
              <AccountCircleIcon />
              <small>{user}</small>
            </Grid2>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
