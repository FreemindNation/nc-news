import { Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const ErrorPage = () => {
  return (
    <Container sx={{ height: "100vh", mt: 10, flexDirection: "row" }}>
      <Typography variant="h1" color="error">
        Error - Page Not Found!
      </Typography>
      <Typography variant="body1" color="info" sx={{ fontSize: 25, my: 3 }}>
        Sorry, the page you are looking for does not exist. Please check the URL
        and try again.
      </Typography>
      <Typography
        variant="body1"
        color="primary"
        sx={{ textDecoration: "none", fontSize: 23 }}
      >
        <Link to="/" className="topic-list">
          Return to home page
        </Link>
      </Typography>
    </Container>
  );
};

export default ErrorPage;
