import { timeConverter } from "../utils/time-converter";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { deleteComment, getUser, patchComment } from "../utils/api-calls";
import { Paper, Button, Typography, Avatar, Stack, Tooltip } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { motion } from "framer-motion";



const CommentCard = ({
  comment,
  comments,
  setComments,
  article,
  setArticle,
  index,
}) => {
  const { user, setUser } = useContext(UserContext);
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  const [increment, setIncrement] = useState(0);
  // const [hasVotedUp, setHasVotedUp] = useState(false);
  // const [hasVotedDown, setHasVotedDown] = useState(false);
  const [vote, setVote] = useState(0);
  const [voteError, setVoteError] = useState(null);
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const commentId = comment.comment_id;

  useEffect(()=> {
    getUser(comment.author)
    .then((res)=> {
      setAvatar(res.user.avatar_url);
    })
  }, [comment.author]);


  const handleIcrements = (increment) => {
    let newVote;

    if(vote === increment){
      newVote = 0;
    }else {
      newVote = increment;
    }

    setVote(newVote);

    const voteDifference = newVote - vote;

    // setIncrement((currentVotesCount) => {
    //   return currentVotesCount + increment;
    // });

    // if (increment === 1) {
    //   setHasVotedUp(true);
    //   setHasVotedDown(false);
    // } else {
    //   setHasVotedDown(true);
    //   setHasVotedUp(false);
    // }

    setComments((currentComments) => {
        return currentComments.map((comment)=> {
          if(comment.comment_id === commentId) {
            return {...comment, votes: comment.votes + voteDifference };
          }
          return comment;
        });
    });
    
    patchComment(commentId, voteDifference).catch((err) => {
      setComments((currentComments) => {
        return currentComments.map((comment)=> {
          if(comment.comment_id === commentId) {
            return {...comment, votes: comment.votes - voteDifference };
          }
          return comment;
        });
    });
      setVoteError(
        "Oops! Something went wrong, please refresh the page and try again"
      );
    });

  };

  const handleDelete = () => {
    setIsDeletingComment(true);

    deleteComment(comment.comment_id)
      .then(() => {
        const updatedComments = [...comments];
        updatedComments.splice(index, 1);
        setComments(updatedComments);
        setArticle((currentArticle) => {
          return {
            ...currentArticle,
            comment_count: article.comment_count - 1,
          };
        });
        alert("Comment deleted successfully!");
        setIsDeletingComment(false);
      })
      .catch(() => {
        alert("Failed to delete comment. Please try again later");
        setIsDeletingComment(false);
      });
  };

  if (isLoading) {
    return (
      <Typography variant="body1" color="primary">
        Loading image...
      </Typography>
    );
  }

  return (
    <Paper variant="outlined" style={{ padding: "40px 20px"}}>
      <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
        <Avatar src={avatar} alt="avatar image of the comment's author" />
        <Stack sx={{ width: "100%" }}>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} md={8} >
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {comment.author}
              </Typography>
              <Typography
                variant="body2"
                sx={{ textAlign: "left", color: "gray", mb: 2 }}
              >
                {timeConverter(comment.created_at)}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: "left", mb: 3 }}>
                {comment.body}
              </Typography>
            </Grid2>
            <Grid2 item xs={12} md={4}>
              <Stack direction={{xs: "column-reverse", sm:"row"}} justifyContent="flex-end" gap={3} alignItems="center">
                <Typography
                  variant="body1"
                  style={{ textAlign: "left", color: "gray" }}
                >
                  Votes: {comment.votes}
                </Typography>
                <Stack
                direction="row"
                spacing={2}
                >
                {voteError ? <p>{voteError}</p> : null}
                <Tooltip title="Vote up">
                  <Button
                    variant="outlined"
                    color={ vote === 1 ? "success" : "primary"}
                    id="thumb-up"
                    sx={{ textTransform: "none", width: { xs: "100%", sm: "auto"} }}
                    onClick={() => handleIcrements(1)}
                  >
                    {vote === 1 ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
                  </Button>
                </Tooltip>
                <Tooltip title="Vote down">
                  <Button
                    variant="outlined"
                    color={vote === -1 ? "error" : "primary"}
                    id="thumb-down"
                    sx={{ textTransform: "none", width: { xs: "100%", sm: "auto"} }}
                    onClick={() => handleIcrements(-1)}
                  >
                    {vote === -1 ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                  </Button>
                </Tooltip>
              </Stack>
              </Stack>
            </Grid2>
          </Grid2>
          <Grid2>
            {user === comment.author ? (
              <Button
                variant="contained"
                sx={{ textTransform: "none", mt: 2 }}
                onClick={handleDelete}
                disabled={isDeletingComment}
              >
                {isDeletingComment ? "Deleting comment..." : "Delete comment"}
              </Button>
            ) : null}
          </Grid2>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CommentCard;
