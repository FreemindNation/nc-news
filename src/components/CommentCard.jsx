import { Card } from "react-bootstrap";
import { timeConverter } from "../utils/time-converter";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { deleteComment } from "../utils/api-calls";
const CommentCard = ({ comment, comments, setComments, article, setArticle, index })=> {

    const { user, setUser } = useContext(UserContext);
    const [isDeletingComment, setIsDeletingComment] = useState(false);

    const handleDelete= ()=> {
        setIsDeletingComment(true);
        
        deleteComment(comment.comment_id)
        .then(()=> {
            const updatedComments = [...comments]
        updatedComments.splice(index, 1)
        setComments(updatedComments);
        setArticle((currentArticle)=> {
            return {...currentArticle, comment_count: article.comment_count - 1}
        })
            alert('Comment deleted successfully!');
            setIsDeletingComment(false);
        })
        .catch((err)=> {
            alert('Failed to delete comment. Please try again later');
            setIsDeletingComment(false);
        })
    }
    return (
        <Card style={{width: '18em'}}>
            <Card.Body>
                <Card.Text>
                    {comment.body}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="card-footer">
                <small className="text=muted">By {comment.author} on {timeConverter(comment.created_at)}</small>
                <small>Votes: {comment.votes}</small>
            </Card.Footer>
            {user === comment.author ? <button onClick={handleDelete} disabled={isDeletingComment}>{isDeletingComment ? 'Deleting comment...' : 'Delete comment'}</button> : null}
        </Card>

    )
}



export default CommentCard;