import { Link } from "react-router-dom";
import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";
import { Container, Typography } from "@mui/material";

const ErrorComponent = () => {
  const { error, setError } = useContext(ErrorContext);

  return (
    <Container sx={{ height: "100vh", flexDirection: "row" }}>
      <section>
        {!error.err.response ? (
          <section>
            <Typography variant="h3" color="error" sx={{ mt: 20 }}>
              Oops! Something went wrong with the network! please try again
              later.
            </Typography>
          </section>
        ) : (
          <section>
            <Typography variant="h1" color="error">
              {error.err.response.status} Error!!
            </Typography>
            <Typography variant="h2" color="error">
              {error.err.response.data.msg}
            </Typography>
            <Typography variant="body1" color="error">
              Sorry, we can't find the page you are looking for. Please check
              the URL and try again.
            </Typography>
          </section>
        )}
      </section>
      <Typography variant="body1" sx={{ mt : 10 }}>
        <Link to={"/"} className="topic-list">
          Back to Home page
        </Link>
      </Typography>
    </Container>
  );
};

export default ErrorComponent;
