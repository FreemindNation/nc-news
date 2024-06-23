import { Card } from "react-bootstrap";
import { timeConverter } from "../utils/time-converter";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {


  return (
    <Link to={`/articles/${article.article_id}`}>
      <Card key={article.article_id} style={{ width: "18rem" }} className="mb-3 article-card">
        <Card.Img
        className=""
          variant="top"
          src={article.article_img_url}
          alt="Image of the article"
        />
        <Card.Body>
          <Card.Text className="flush">
            <strong>Title:</strong> {article.title} <br />
            <strong>Author:</strong> {article.author} <br />
            <strong>Topic:</strong> {article.topic} <br />
            <strong>Comments:</strong> {article.comment_count} <br />
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
