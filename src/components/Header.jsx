import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Typography } from "@mui/material";
import {
  Divider,
  Stack,
  AppBar,
  Tooltip,
  Toolbar,
  Container,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import PublicIcon from "@mui/icons-material/Public";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack direction="row" spacing={0.5} sx={{ flexGrow: 1 }}>
            <Typography variant="h2" sx={{ m: 2 }}>
              NC
            </Typography>
            <PublicIcon fontSize="large" />
            <Typography variant="h2">News</Typography>
          </Stack>
          {user ? (
            <Tooltip title={`Logged in as ${user}`}>
              <Grid2 container spacing={1} >
                <AccountCircleIcon />
                <small>{user}</small>
              </Grid2>
            </Tooltip>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
