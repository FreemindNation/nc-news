import { Card } from "react-bootstrap";
import { timeConverter } from "../utils/time-converter";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {


  return (
    <Link to={`/articles/${article.article_id}`}>
      <Card key={article.article_id} style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={article.article_img_url}
          alt="Image of the article"
        />
        <Card.Body>
          <Card.Title>
            <strong>Title:</strong> {article.title}
          </Card.Title>
          <Card.Text>
            <strong>Author:</strong> {article.author}
          </Card.Text>
          <Card.Text>
            <strong>Topic:</strong> {article.topic}
          </Card.Text>
          <Card.Text>
            <strong>Comments:</strong> {article.comment_count}
          </Card.Text>
          <Card.Text className="mb-2 text-muted">
            {timeConverter(article.created_at)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ArticleCard;
