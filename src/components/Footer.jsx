import { Toolbar, Typography, Stack, Link, Box } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? "#0A1F44" : "#091B36",
        mt: "auto",
        py: 2,
        px: 2,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={8}
        sx={{ flexGrow: 1 }}
      >
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ textAlign: "center", color: "#F5F5F5" }}
        >
           <CopyrightIcon /> {`${new Date().getFullYear()} | NC News`}
        </Typography>
        <Link href="https://github.com/FreemindNation">
          <GitHubIcon sx={{ color: "#F5F5F5" }} className="icon" />
        </Link>
      </Stack>
    </Box>
  );
};

export default Footer;
