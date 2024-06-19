import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { postComment } from "../utils/api-calls";

const CommentAdder = ({ article, setArticle, setComments }) => {

  const { user, setUser } = useContext(UserContext);

  const [newComment, setNewComment] = useState("");
  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    postComment(newComment, article.article_id, user)
    .then((newCommentFromApi)=> {
        setNewComment('');
        setComments((currentComments)=> {
            return [newCommentFromApi, ...currentComments]
        });
        setArticle((currentArticle)=>{
            return {...currentArticle, comment_count: article.comment_count + 1}
        });

    })

    
  };

  return (
    <section>
      <br />
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
        <button>Add comment</button>
      </form>
    </section>
  );
};

export default CommentAdder;
