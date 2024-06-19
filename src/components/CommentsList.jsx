import { useState, useEffect, useContext } from "react";
import { getCommentsByArticleId } from "../utils/api-calls";
import CommentCard from "./CommentCard";

import CommentAdder from "./CommentAdder";


const CommentsList = ({ article, setArticle }) => {


  
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
      <CommentAdder  article={article} setArticle={setArticle} setComments={setComments} />
      
        {comments.map((comment, index) => {
          return <CommentCard key={comment.comment_id} setArticle={setArticle} article={article} comment={comment} comments={comments} setComments={setComments} index={index} />;
        })}
      
    </section>
  );
};

export default CommentsList;
