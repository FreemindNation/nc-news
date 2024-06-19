import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../utils/api-calls";
import CommentCard from "./CommentCard";
import { Stack } from "react-bootstrap";
const CommentsList = ({ article }) => {
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article.article_id).then((res) => {
      setComments(res.comments);
      setIsLoading(false);
    });
  }, [article.article_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <section><br />
        <form action="" className="comment-form" >
          <label htmlFor="new-comment">Comment below:</label>
          <textarea multiline='true' id="new-comment" placeholder="what's your thought?"/>
          <button>Add comment</button>
        </form>
      </section>
      <section>
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </section>
    </section>
  );
};

export default CommentsList;
