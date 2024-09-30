import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../utils/api-calls";
import CommentCard from "./CommentCard";
import CommentAdder from "./CommentAdder";
import { Box, Typography } from "@mui/material";

const CommentsList = ({ article, setArticle, increment, setIcrement, voteError, setVoteError, hasVotedUp, setHasVotedUp, hasVotedDown, setHasVotedDown  }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article.article_id)
      .then((res) => {
        setComments(res.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setCommentsError({ err });
      });
  }, [article.article_id]);

  if (isLoading) {
    return (
      <Typography variant="body1" color="primary">
        Loading comments...
      </Typography>
    );
  }

  return (
    <Box component="section">
      <Box component="section">
        <CommentAdder
          commentsError={commentsError}
          article={article}
          setArticle={setArticle}
          setComments={setComments}
        />
      </Box>

      {commentsError ? (
        <Typography variant="body1">
          Sorry, failed to show comments. Please try gain later.
        </Typography>
      ) : (
        <Box component="section">
          {comments.map((comment, index) => {
            return (
              <CommentCard
                key={comment.comment_id}
                setArticle={setArticle}
                article={article}
                comment={comment}
                comments={comments}
                setComments={setComments}
                index={index}
                increment={increment}
                setIcrement={setIcrement}
                voteError={voteError}
                setVoteError={setVoteError}
                hasVotedUp={hasVotedUp}
                setHasVotedUp={setHasVotedUp}
                hasVotedDown={hasVotedDown}
                setHasVotedDown={setHasVotedUp}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default CommentsList;
