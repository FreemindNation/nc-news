import { useState, useEffect, useContext } from "react";
import { getTopics } from "../utils/api-calls";
import { capitaliseFirstLetter } from "../utils/capitalise-first-letter";
import { Link } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";
import { Typography, Tooltip, Stack } from "@mui/material";

const NavBar = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { error, setError } = useContext(ErrorContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((res) => {
        setTopics(res.topics);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError({ err });
      });
  }, []);

  if (isLoading) {
    return (
      <Typography variant="body1" color="primary" textAlign="left">
        Loading topics...
      </Typography>
    );
  }

  return (
    <Stack overflow="auto" direction="row">
      {topics.map((topic) => {
        return (
          <Tooltip title={`View ${topic.slug} articles`} key={topic.slug}>
            <Typography variant="h6" sx={{ m: 2 }}>
              <Link
                to={`/topics/${topic.slug}`}
                className="topic-list"
                key={topic.slug}
              >
                {capitaliseFirstLetter(topic.slug)}
              </Link>
            </Typography>
          </Tooltip>
        );
      })}
    </Stack>
  );
};

export default NavBar;
