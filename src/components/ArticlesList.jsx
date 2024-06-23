import { useEffect, useState, useContext } from "react";
import { getArticles } from "../utils/api-calls";
import ArticleCard from "./ArticleCard";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import { ErrorContext } from "../contexts/ErrorContext";




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
      <h2>Articles</h2>
      <section>
        <label htmlFor="sortBy">
          Sort by:
          <select
            value={sortBy}
            onChange={(event) => handleSortChange(event.target.value)}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <label htmlFor="order">
          Order:
          <select
            value={order}
            onChange={(event) => {
              handleOrderChange(event.target.value);
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </section>
      <section>
        {isLoading ? (
          <p> Loading articles...</p>
        ) : (
          <section className="article-grid">
            {articles.map((article) => {
              return <ArticleCard key={article.article_id} article={article} />;
            })}
          </section>
        )}
      </section>
    </section>
  );
};

export default ArticlesList;
