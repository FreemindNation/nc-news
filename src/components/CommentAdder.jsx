import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { postComment } from "../utils/api-calls";
import { ErrorContext } from "../contexts/ErrorContext";

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
    return <p>Sorry, unable to comment, please try again later.</p>;
  }

  return (
    <section>
      <br/>
      {commentsError ? null : (
        <>
          <form action="" className="comment-form" onSubmit={handleSubmit}>
            <label htmlFor="new-comment">Comment below:</label>
            <textarea
              value={newComment}
              multiline="true"
              id="new-comment"
              placeholder="what's your thought?"
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={isPosting}>
              {isPosting ? "Posting comment..." : "Add comment"}
            </button>
          </form>
          <br />
        </>
      )}
    </section>
  );
};

export default CommentAdder;
