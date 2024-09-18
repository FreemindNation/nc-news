import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { postComment } from "../utils/api-calls";
import { ErrorContext } from "../contexts/ErrorContext";
import { Button, TextField, Box, Typography } from "@mui/material";

const CommentAdder = ({ article, setArticle, setComments, commentsError }) => {
  const { user, setUser } = useContext(UserContext);
  const { error, setError } = useContext(ErrorContext);
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPosting(true);

    postComment(newComment, article.article_id, user)
      .then((newCommentFromApi) => {
        setNewComment("");
        setComments((currentComments) => {
          return [newCommentFromApi, ...currentComments];
        });
        setArticle((currentArticle) => {
          return {
            ...currentArticle,
            comment_count: article.comment_count + 1,
          };
        });
        alert("Comment posted successfully!");
        setIsPosting(false);
      })
      .catch((err) => {
        alert("Failed to post comment. Please try again later.");
        setIsPosting(false);
      });
  };

  if (error) {
    return (
      <Typography variant="body1">
        Sorry, unable to comment, please try again later.
      </Typography>
    );
  }

  return (
    <Box component="section">
      {commentsError ? null : (
        <>
          <form action="" className="comment-form" onSubmit={handleSubmit}>
            <TextField
              value={newComment}
              fullWidth
              multiline
              minRows={3}
              maxRows={20}
              sx={{ my: 1 }}
              id="new-comment"
              variant="outlined"
              label="Comment below"
              placeholder="what's your thought?"
              onChange={handleChange}
              required
            />
            <Button
              variant="outlined"
              size="small"
              type="submit"
              sx={{ mb: 3, textTransform: "none" }}
              disabled={isPosting}
            >
              {isPosting ? "Posting comment..." : "Post comment"}
            </Button>
          </form>
        </>
      )}
    </Box>
  );
};

export default CommentAdder;
