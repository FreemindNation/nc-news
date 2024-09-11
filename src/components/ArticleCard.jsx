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
              alt="Image of the article"
            />
            <CardContent>
              <Typography variant="body2" style={{ fontWeight:'500' }}>
                {article.title}
              </Typography>
              <Typography sx={{mt: 1, mr: 15, color:'gray' }}>
                <small><strong>- {article.author}</strong></small>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Tooltip>
    </Link>
  );
};

export default ArticleCard;
