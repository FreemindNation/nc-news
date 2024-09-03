import { useState, useEffect, useContext } from "react";
import { getTopics } from "../utils/api-calls";
import { UserContext } from "../contexts/UserContext";
import { capitaliseFirstLetter } from "../utils/capitalise-first-letter";
import { Link } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";
import { Box, Typography, Tooltip } from "@mui/material";

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
    
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} >
        {topics.map((topic) => {
          return (
            <Tooltip title={`View ${topic.slug} articles`} key={topic.slug}>
              <Typography sx={{ minWidth: 100, my: 3 }} color='primary' >
                <Link to={`/topics/${topic.slug}`} className="topic-list" key={topic.slug}>
                  {capitaliseFirstLetter(topic.slug)}
                </Link>
              </Typography>
            </Tooltip>
          );
        })}
      </Box>
    
  );
};

export default NavBar;
