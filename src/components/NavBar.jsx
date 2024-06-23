import { useState, useEffect, useContext } from "react";
import { getTopics } from "../utils/api-calls";
import { UserContext } from "../contexts/UserContext";
import { capitaliseFirstLetter } from "../utils/capitalise-first-letter";
import { Link } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";

const NavBar = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const { error, setError } = useContext(ErrorContext);

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((res) => {
      setTopics(res.topics);
      setIsLoading(false);
    })
    .catch((err)=> {
        setIsLoading(false);
        setError({ err })
    });
  }, []);

  if (isLoading) {
    return <p>Loading topics...</p>;
  }

  return (
    <nav className="nav-list">
      <section className="topic-list">
        {topics.map((topic) => {
          return (
            <Link to={`/topics/${topic.slug}`} key={topic.slug}>
              {capitaliseFirstLetter(topic.slug)}
            </Link>
          );
        })}
      </section>
      <section>
        <p>Logged in as {user}</p>
      </section>
    </nav>
  );
};

export default NavBar;
