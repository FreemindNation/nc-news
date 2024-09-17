import { useEffect, useState, useContext } from "react";
import { getArticles } from "../utils/api-calls";
import ArticleCard from "./ArticleCard";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import { ErrorContext } from "../contexts/ErrorContext";
import { MenuItem, TextField, FormControl, Container, Typography } from "@mui/material";



const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { error, setError } = useContext(ErrorContext);
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    getArticles(slug, sortBy, order)
      .then((res) => {
          setArticles(res.articles);
          setIsLoading(false);
      })
      .catch((err) => {
          setIsLoading(false);
          setError({ err });
          });
  }, [slug, sortBy, order]);

  const handleSortChange = (newSortBy) => {
    setSearchParams({ sort_by: newSortBy, order });
  };

  const handleOrderChange = (newOrder) => {
    setSearchParams({ sort_by: sortBy, order: newOrder });
  };
  
  if(error) {
    return <ErrorComponent message={error} />
  }

  return (
    <section>
      <Typography variant="h1" fontWeight="500"> Articles</Typography>
      <section>
        <FormControl sx={{m: 3,}} htmlFor="sortBy">
          <TextField
            id="sort-by"
            label="Sort by:"
            select
            value={sortBy}
            onChange={(event) => handleSortChange(event.target.value)}
          >
            <MenuItem value="created_at" >Date</MenuItem>
            <MenuItem value="comment_count">Comment Count</MenuItem>
            <MenuItem value="votes">Votes</MenuItem>
          </TextField>
        </FormControl>
        <FormControl sx={{m: 3}} htmlFor="order">
          <TextField
            id="order"
            label="Order"
            select
            value={order}
            onChange={(event) => {
              handleOrderChange(event.target.value);
            }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </TextField>
        </FormControl>
      </section>
      <Container>
        {isLoading ? (
          <Typography textAlign="center"> Loading articles...</Typography>
        ) : (
          <section className="article-grid">
            {articles.map((article) => {
              return <ArticleCard key={article.article_id} article={article} />;
            })}
          </section>
        )}
      </Container>
    </section>
  );
};

export default ArticlesList;
