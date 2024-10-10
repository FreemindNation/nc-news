import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../utils/api-calls";
import CommentCard from "./CommentCard";
import CommentAdder from "./CommentAdder";
import { Box, Typography, Stack, Pagination } from "@mui/material";

const CommentsList = ({ article, setArticle }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article.article_id, currentPage, limit)
      .then((res) => {
        setComments(res.comments);
        setTotalPages(res.totalPages);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setCommentsError({ err });
      });
  }, [article.article_id, currentPage, limit]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

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
        <>
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
                />
              );
            })}
          </Box>
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
              mt: 3,
              mb: 5,
            }}
          >
            <Pagination
              color="primary"
              page={currentPage}
              count={totalPages}
              onChange={handlePageChange}
              size="large"
              variant="outlined"
              showFirstButton
              showLastButton
            />
          </Stack>
        </>
      )}
    </Box>
  );
};

export default CommentsList;
