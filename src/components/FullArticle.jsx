import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../utils/api-calls";
import { timeConverter } from "../utils/time-converter";
import CommentsList from "./CommentsList";
import Collapsible from "./Collapsible";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

const FullArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticles(article_id).then((res) => {
      setArticle(res.article);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <article>
          <header>
            <h2>{article.title}</h2>
            <div>
              <address> By {article.author}</address>
              on <time>{timeConverter(article.created_at)}</time>
            </div>
          </header>
          <p>{article.body}</p>
          <figure>
            <img src={article.article_img_url} alt="Image of the article" />
            <figcaption>Image relating to {article.title}</figcaption>
          </figure>
          <div className="comments-votes">
            <p>Votes: {article.votes}</p>
            <div className="thumbs">
                <button id='thumb-up'>
                    <FaRegThumbsUp />
                </button>
                <button id="thumb-down">
                    <FaRegThumbsDown />
                </button>
            </div>
          </div>
        </article>
      </section> <br />
      <section>
        <Collapsible contentDescriptor={'comments'} commentCount={article.comment_count}>
            <CommentsList article={article} />
        </Collapsible>
      </section>
    </>
  );
};

export default FullArticle;
