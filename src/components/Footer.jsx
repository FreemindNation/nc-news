import { Toolbar, Typography, Stack , Link} from "@mui/material"
import CopyrightIcon from '@mui/icons-material/Copyright';
import GitHubIcon from '@mui/icons-material/GitHub';


const Footer = () => {


    return (
        <Toolbar sx={{bgcolor: '#0C234A', height:'10vh',}}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={8} sx={{ flexGrow: 1 }}>
                <Typography variant="h6" textAlign="center" sx={{textAlign:'center', color:'white'}}>Coyright <CopyrightIcon /> 2024 NC News</Typography>
                <Link href="https://github.com/FreemindNation">
                    <GitHubIcon sx={{ color:"white"}} className="icon" />
                </Link>
            </Stack>
        </Toolbar>
    )
}

export default Footer