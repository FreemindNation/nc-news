import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../utils/api-calls";
import CommentCard from "./CommentCard";

import CommentAdder from "./CommentAdder";



const CommentsList = ({ article, setArticle }) => {


  
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);
  


  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article.article_id).then((res) => {
      setComments(res.comments);
      setIsLoading(false);
    })
    .catch((err)=> {
      setIsLoading(false);
      setCommentsError({ err })
    });
  }, [article.article_id]);

  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <section>
        <CommentAdder commentsError={commentsError} article={article} setArticle={setArticle} setComments={setComments} />
      </section>
      
        {commentsError ? (<p>Sorry, failed to show comments. Please try gain later.</p>) : (<section>
          {comments.map((comment, index) => {
            return <CommentCard key={comment.comment_id} setArticle={setArticle} article={article} comment={comment} comments={comments} setComments={setComments} index={index} />;
          })}
        </section>)}
    </section>
  );
};

export default CommentsList;
