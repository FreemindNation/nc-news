import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Typography } from "@mui/material";
import { Divider, Stack, AppBar } from "@mui/material";
const Header = ()=> {

    const { user, setUser } = useContext(UserContext);

    return (
        <AppBar position="sticky">
            <Stack container wrap="wrap" sx={{bgcolor: '#0D46A1'}}>
                <h1>NC News</h1>
                { user ? <Typography sx={{ml: 30, color: 'gray'}} fontSize={15} >
            <small>Logged in as {user}</small>
                  </Typography> : null }
                <Divider variant="fullWidth" style={{ margin: "20px 0", border: '2px solid #0D46A1' }} />
            </Stack>
        </AppBar>
    )
}

export default Header;