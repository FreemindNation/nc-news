import { Card } from "react-bootstrap";
import { timeConverter } from "../utils/time-converter";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { deleteComment } from "../utils/api-calls";
import { Paper, Button, Typography, Avatar, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const CommentCard = ({
  comment,
  comments,
  setComments,
  article,
  setArticle,
  index,
  increment,
  setIncrement,
  voteError,
  setVoteError,
  hasVotedUp,
  setHasVotedUp,
  hasVotedDown,
  setHasVotedDown
}) => {
  const { user, setUser } = useContext(UserContext);
  const [isDeletingComment, setIsDeletingComment] = useState(false);

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
  return (
    <Paper variant="outlined" style={{ padding: "40px 20px" }}>
      <Stack direction="row" spacing={2}>
        <Avatar />
        <Stack>
          <Grid2 container wrap="wrap" spacing={2}>
            <Grid2 justifyContent={"left"} item xs zeroMinWidth>
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

              <Typography
                variant="body1"
                style={{ textAlign: "left", color: "gray" }}
              >
                Votes: {comment.votes}
              </Typography>
            </Grid2>
          </Grid2>
          <Grid2>
            {user === comment.author ? (
              <Button
                variant="outlined"
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
