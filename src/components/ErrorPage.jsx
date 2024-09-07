import { Link } from "react-router-dom";
import { Container } from "@mui/material";

const ErrorPage = ()=> {

    return (
        <Container sx={{height: '100vh', mt: 10}}>
            <h1>Error - Page Not Found!</h1>
            <p>Sorry, the page you are looking for does not exist. Please check the URL and try again.</p>
            <Link to='/'>Return to the home page</Link>
        </Container>
    );
};


export default ErrorPage;