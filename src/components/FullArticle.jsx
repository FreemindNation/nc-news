import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchArticle } from "../utils/api-calls";
import { timeConverter } from "../utils/time-converter";
import CommentsList from "./CommentsList";
import Collapsible from "./Collapsible";
import ErrorComponent from "./ErrorComponent";
import { ErrorContext } from "../contexts/ErrorContext";
import {
  Container,
  Box,
  Typography,
  Button,
  Tooltip,
  Stack,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const FullArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [increment, setIncrement] = useState(0);
  const { error, setError } = useContext(ErrorContext);
  const [voteError, setVoteError] = useState(null);
  const [hasVotedUp, setHasVotedUp] = useState(false);
  const [hasVotedDown, setHasVotedDown] = useState(false);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((res) => {
        setArticle(res.article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [article_id]);

  const handleIcrements = (increment) => {
    setIncrement((currentVotesCount) => {
      return currentVotesCount + increment;
    });
    if (increment === 1) {
      setHasVotedUp(true);
      setHasVotedDown(false);
    } else {
      setHasVotedDown(true);
      setHasVotedUp(false);
    }
    patchArticle(article.article_id, increment).catch((err) => {
      setArticle((currentArticle) => {
        return { ...currentArticle, votes: article.Votes - increment };
      });
      setVoteError(
        "Oops! Something went wrong, please refresh the page and try again"
      );
    });

    setArticle((currentArticle) => {
      return { ...currentArticle, votes: article.votes + increment };
    });
  };

  if (error) {
    return <ErrorComponent message={error} />;
  }

  if (isLoading) {
    return (
      <Typography variant="body1" color="primary" sx={{ my: 20 }}>
        Loading article...
      </Typography>
    );
  }

  return (
    <>
      <Container
        component="section"
        sx={{ textAlign: "left", flexGrow: 1, my: 5 }}
      >
        <Box component="section">
          <Box component="article">
            <header>
              <Typography variant="h2" sx={{ fontWeight: 500 }}>
                {article.title}
              </Typography>
              <Box component="div" sx={{ my: 3 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", fontWeight: 500 }}
                >
                  {" "}
                  - {article.author}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", fontWeight: 500 }}
                >
                  {" "}
                  - {timeConverter(article.created_at)}
                </Typography>
              </Box>
            </header>
            <Box component="figure">
              <Box
                component="img"
                sx={{
                  maxHeight: { xs: 333, md: 450 },
                  maxWidth: { xs: 340, md: 500 },
                }}
                src={article.article_img_url}
                alt={`Image relating to ${article.topic}`}
              />
              <figcaption>
                <em>
                  <small>Image relating to {article.title}</small>
                </em>
              </figcaption>
            </Box>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {article.body}
            </Typography>

            <Stack
              component="div"
              direction={{ xs: "column-reverse", sm: "row" }}
              gap={3}
              justifyContent="space-around"
              sx={{ mb: 3 }}
            >
              <Box component="div">
                <Typography variant="h6" fontWeight="900">
                  Votes: {article.votes}
                </Typography>
              </Box>
              <Stack
                direction="row"
                justifyContent="space-around"
                spacing={4}
                component="div"
                className="thumbs"
              >
                {voteError ? <p>{voteError}</p> : null}
                <Tooltip title="Vote up">
                  <Button
                    variant="outlined"
                    id="thumb-up"
                    sx={{
                      textTransform: "none",
                      width: { xs: "100%", sm: "auto" },
                    }}
                    onClick={() => handleIcrements(1)}
                    disabled={hasVotedUp}
                    endIcon={<ThumbUpIcon />}
                  >
                    Vote
                  </Button>
                </Tooltip>
                <Tooltip title="Vote down">
                  <Button
                    variant="outlined"
                    id="thumb-down"
                    sx={{
                      textTransform: "none",
                      width: { xs: "100%", sm: "auto" },
                    }}
                    onClick={() => handleIcrements(-1)}
                    disabled={hasVotedDown}
                    endIcon={<ThumbDownIcon />}
                  >
                    Vote
                  </Button>
                </Tooltip>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box component="section">
          <Collapsible
            contentDescriptor={"comments"}
            commentCount={article.comment_count}
          >
            <CommentsList
              article={article}
              setArticle={setArticle}
              increment={increment}
              setIncrement={setIncrement}
              voteError={voteError}
              setVoteError={setVoteError}
              hasVotedUp={hasVotedUp}
              setHasVotedUp={setHasVotedUp}
              hasVotedDown={hasVotedDown}
              setHasVotedDown={setHasVotedDown}
            />
          </Collapsible>
        </Box>
      </Container>
    </>
  );
};

export default FullArticle;
