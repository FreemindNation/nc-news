import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Divider, Stack } from "@mui/material";
const Header = ()=> {
    return (
        <Stack container wrap="wrap">
            <h1>NC News</h1>
            <Divider variant="fullWidth" style={{ margin: "10px 0", border: '5px solid blue' }} />
        </Stack>
    )
}

export default Header;