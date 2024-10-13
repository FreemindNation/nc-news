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
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


const FullArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const { error, setError } = useContext(ErrorContext);
  // const [increment, setIncrement] = useState(0);
  const [voteError, setVoteError] = useState(null);
  // const [hasVotedUp, setHasVotedUp] = useState(false);
  // const [hasVotedDown, setHasVotedDown] = useState(false);
  // const [hasReversedUpVote, setHasReversedUpVote] = useState(false);
  // const [hasReversedDownVote, setHasReversedDownVote] =useState(false);
  const [vote, setVote] = useState(0);

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
    let newVote = vote + increment;

    if(newVote === 2 || newVote === -2 || newVote === 0) {
      newVote = 0;
    }

    setVote(newVote);

    setArticle((currentArticle) => ({...currentArticle, votes: currentArticle.votes + (newVote - vote)}));

    patchArticle(article.article_id, newVote - vote)
    .catch((err) => {
      setVote(vote);
      setArticle((currentArticle) => ({...currentArticle, votes: currentArticle.votes - (newVote - vote)}));
      setVoteError(
        "Oops! Something went wrong, please refresh the page and try again"
      );
    })
    // setIncrement((currentVotesCount) => {
    //   return currentVotesCount + increment;
    // });
    // if (increment === 1) {
    //   setHasVotedUp(true);
    
    // }

    // if(increment === -1){
    //   setHasVotedDown(true);
    // }
    
    // if(increment === -1 && hasVotedUp) {
    //   setHasReversedUpVote(true);
    //   setHasVotedUp(false);
    //   setHasVotedDown(false);
    // }

    // if(increment === 1 && hasVotedDown) {
    //   setHasReversedDownVote(true)
    //   setHasVotedDown(false);
    //   setHasVotedUp(false);

    // }

    setArticle((currentArticle) => {
      return { ...currentArticle, votes: article.votes + increment };
      });
    };
    
    patchArticle(article.article_id, n).catch((err) => {
      setArticle((currentArticle) => {
        return { ...currentArticle, votes: article.Votes - increment };
      });
      
    });


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
                {hasVotedUp ? <IconButton 
                    variant="contained"
                    size="large"
                    color="success"
                    sx={{
                      textTransform: "none",
                      width: { xs: "100%", sm: "auto" },
                    }}
                    onClick={() => handleIcrements(-1)} ><ThumbUpIcon fontSize="inherit"/></IconButton> : <Tooltip title="Vote up">
                  <IconButton
                    variant="outlined"
                    id="thumb-up"
                    size="large"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      width: { xs: "100%", sm: "auto" },
                    }}
                    onClick={() => handleIcrements(1)}
                  >
                    <ThumbUpAltOutlinedIcon  fontSize="inherit"/>
                  </IconButton>
                </Tooltip>}
                {hasVotedDown ? <IconButton 
                    
                    size="large"
                    color="error"
                    sx={{
                      textTransform: "none",
                      width: { xs: "100%", sm: "auto" },
                    }}
                    onClick={() => handleIcrements(1)} ><ThumbDownIcon fontSize="inherit"/></IconButton> : <Tooltip title="Vote down">
                  <IconButton
                    variant="outlined"
                    id="thumb-down"
                    size="large"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      width: { xs: "100%", sm: "auto" },
                    }}
                    onClick={() => handleIcrements(-1)}
                    
                  >
                    <ThumbDownOutlinedIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>}
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
