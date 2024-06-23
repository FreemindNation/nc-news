import { Link } from "react-router-dom";
import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";

const ErrorComponent = () => {

    const { error, setError } = useContext(ErrorContext);

  return (
    <section>
      <section>
        {!error.err.response ? (
          <section>
            <h2>
              Oops! Something went wrong with the network! please try again
              later.
            </h2>
          </section>
        ) : (
          <section>
            <h1>{error.err.response.status} Error!!</h1>
            <h2>{error.err.response.data.msg}</h2>
            <p>
              Sorry, we can't find the page you are looking for. Please check
              the URL and try again.
            </p>
          </section>
        )}
      </section>
      <Link to={"/"}>Back to Home page</Link>
    </section>
  );
};

export default ErrorComponent;
