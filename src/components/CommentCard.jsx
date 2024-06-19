import { Card } from "react-bootstrap";
import { timeConverter } from "../utils/time-converter";


const CommentCard = ({ comment })=> {

    return (
        <Card style={{width: '30em'}}>
            <Card.Body>
                <Card.Text>
                    {comment.body}
                </Card.Text>
                <Card.Text>
                        Votes: {comment.votes}
                    </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text=muted">By {comment.author} on {timeConverter(comment.created_at)}</small>
            </Card.Footer>
        </Card>
    )
}



export default CommentCard;