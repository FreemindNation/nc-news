import { timeConverter } from "../utils/time-converter";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Tooltip } from "@mui/material";

const ArticleCard = ({ article }) => {


  return (
    <Link to={`/articles/${article.article_id}`} style={{ textDecoration: "black dotted" }}>
      <Tooltip title="Click to read article" color="primary" followCursor>
        <Card sx={{maxWidth: 345, minHeight: 300 }} key={article.article_id} style={{ width: "18rem", background: "#BBDEFB", color:"black" }} className="mb-3 article-card">
          <CardActionArea>
            <CardMedia
              variant="top"
              sx={{ height: 180 }}
              image={article.article_img_url}
              // alt="Image of the article"
            />
            <CardContent>
              <Typography variant="body2" style={{ fontWeight:'500' }}>
                {article.title}
                {/* <strong>{article.title}</strong> <br /> */}
                {/* <strong>Author:</strong> {article.author} <br />
                <strong>Topic:</strong> {article.topic} <br />
                <strong>Comments:</strong> {article.comment_count} <br /> */}
              </Typography>
              <Typography sx={{mt: 1, mr: 15, color:'gray' }}>
                <small>By {article.author}</small>
              </Typography>
              {/* <Card.Text className="mb-2 text-muted">
                {timeConverter(article.created_at)}
              </Card.Text> */}
            </CardContent>
          </CardActionArea>
        </Card>
      </Tooltip>
    </Link>
  );
};

export default ArticleCard;
