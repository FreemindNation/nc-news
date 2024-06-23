import { Link } from "react-router-dom";
const ErrorPage = ()=> {

    return (
        <section>
            <h1>Error - Page Not Found!</h1>
            <p>Sorry, the page you are looking for does not exist. Please check the URL and try again.</p>
            <Link to='/'>return to the home page</Link>
        </section>
    );
};


export default ErrorPage;