import { Card } from "react-bootstrap";
import { timeConverter } from "../utils/time-converter";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { deleteComment } from "../utils/api-calls";
import { Divider, Avatar, Grid, Paper  } from "@mui/material";

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
        <Paper style={{ padding: "40px 20px", backgroundColor: 'tomato' }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid justifyContent={"left"} item xs zeroMinWidth>
                    <h5 style={{ margin: 0, textAlign: "left" }}>{comment.author}</h5>
                    <p style={{ textAlign: "left" }}>{comment.body}</p>
                    <p style={{ textAlign: "left", color: "gray" }}>{timeConverter(comment.created_at)}</p>
                    <p style={{ textAlign: "left", color: "gray" }}>Votes: {comment.votes}</p>
                </Grid>
            </Grid>
            {user === comment.author ? <button onClick={handleDelete} disabled={isDeletingComment}>{isDeletingComment ? 'Deleting comment...' : 'Delete comment'}</button> : null}
            <Divider variant="fullWidth" style={{ margin: "30px 0", border: '1px solid black' }} />
        </Paper>

    )
}



export default CommentCard;