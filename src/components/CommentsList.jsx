import { useState, useEffect, useContext } from "react";
import { getCommentsByArticleId } from "../utils/api-calls";
import CommentCard from "./CommentCard";

import CommentAdder from "./CommentAdder";


const CommentsList = ({ article }) => {


  
  const [comments, setComments] = useState([]);
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
      <CommentAdder  article={article}setComments={setComments} />
      <section>
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </section>
    </section>
  );
};

export default CommentsList;
