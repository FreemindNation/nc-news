import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getArticles, patchArticle } from "../utils/api-calls";
import { timeConverter } from "../utils/time-converter";
import CommentsList from "./CommentsList";
import Collapsible from "./Collapsible";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

const FullArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [increment, setIncrement] = useState(0);
  const [error, setError] = useState(null);

  
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then((res) => {
        console.log(res.article);
      setArticle(res.article);
      setIsLoading(false);
    })
    .catch((err)=> {
        console.log(err, '<<<<error');
    });
  }, [article_id]);

  const handleIcrements = (increment)=> {
    setIncrement((currentVotesCount)=> {
        return currentVotesCount + increment;
    });
    
    patchArticle(article.article_id, increment)
    .catch((err)=> {
        setArticle((currentArticle)=>{
            return {...currentArticle, votes: article.Votes - increment}
            
        })
        setError('Oops! Something went wrong, please try again')
    });

    setArticle((currentArticle)=> {
        return {...currentArticle, votes: article.votes + increment}
    })
   }
   

  if (isLoading) {
    return <p>Loading article...</p>;
  }

  if(!article) {
    return <p>Article not found!</p>
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
            <figcaption><em><small>Image relating to {article.title}</small></em></figcaption>
          </figure>
          <div className="comments-votes">
            <p>Votes: {article.votes}</p>
            <div className="thumbs">
                {error ? <p>{error}</p> : null}
                <button id='thumb-up' onClick={()=> handleIcrements(1)}>
                    <FaRegThumbsUp />
                </button>
                <button id="thumb-down" onClick={()=> handleIcrements(-1)}>
                    <FaRegThumbsDown />
                </button>
            </div>
          </div>
        </article>
      </section> <br />
      <section>
        <Collapsible contentDescriptor={'comments'} commentCount={article.comment_count}>
            <CommentsList article={article} setArticle={setArticle} />
        </Collapsible>
      </section>
    </>
  );
};

export default FullArticle;
