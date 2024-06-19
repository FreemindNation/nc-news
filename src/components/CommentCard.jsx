import { Card } from "react-bootstrap";
import { timeConverter } from "../utils/time-converter";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { deleteComment } from "../utils/api-calls";
const CommentCard = ({ comment, comments, setComments, article, setArticle, index })=> {

    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    const handleDelete= ()=> {
        const updatedComments = [...comments]
        updatedComments.splice(index, 1)
        setComments(updatedComments);
        setArticle((currentArticle)=> {
            return {...currentArticle, comment_count: article.comment_count - 1}
        })
        deleteComment(comment.comment_id)
        .catch((err)=> {
            setError('Something went wrong, please try again');
            setArticle((currentArticle)=> {
                return {...currentArticle, comment_count: article.comment_count - 1}
            })
        })
    }
    return (
        <Card style={{width: '30em'}}>
            <Card.Body>
                <Card.Text>
                    {comment.body}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="card-footer">
                <small className="text=muted">By {comment.author} on {timeConverter(comment.created_at)}</small>
                <small>Votes: {comment.votes}</small>
            </Card.Footer>
            {user === comment.author ? <button onClick={handleDelete}>
                Delete comment
            </button> : null}
        </Card>

    )
}



export default CommentCard;