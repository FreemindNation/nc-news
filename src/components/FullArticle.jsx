import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchArticle } from "../utils/api-calls";
import { timeConverter } from "../utils/time-converter";
import CommentsList from "./CommentsList";
import Collapsible from "./Collapsible";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import ErrorComponent from "./ErrorComponent"
import { ErrorContext } from "../contexts/ErrorContext"
import { Container, Box, Typography } from "@mui/material";

const FullArticle = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [increment, setIncrement] = useState(0);
  const { error, setError } = useContext(ErrorContext);
  const [voteError, setVoteError] = useState(null)
  const [hasVotedUp, setHasVotedUp] = useState(false);
  const [hasVotedDown, setHasVotedDown] = useState(false);
  
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then((res) => {
      setArticle(res.article);
      setIsLoading(false);
    })
    .catch((err)=> {
        setError({ err });
    });
  }, [article_id]);

  const handleIcrements = (increment)=> {
    setIncrement((currentVotesCount)=> {
        return currentVotesCount + increment;
    });
    if(increment === 1) {
      setHasVotedUp(true);
      setHasVotedDown(false);
    }else {
      setHasVotedDown(true);
      setHasVotedUp(false);
    }
    patchArticle(article.article_id, increment)
    .catch((err)=> {
        setArticle((currentArticle)=>{
            return {...currentArticle, votes: article.Votes - increment}
            
        })
        setVoteError('Oops! Something went wrong, please refresh the page and try again')
    });

    setArticle((currentArticle)=> {
        return {...currentArticle, votes: article.votes + increment}
    })
   }

   if(error) {
    return <ErrorComponent message={error} />
  }

  if (isLoading) {
    return <Typography variant="body1" color="primary" sx={{ my: 20 }}>Loading article...</Typography>;
  }

  return (
    <>
      <Container sx={{ textAlign:'left', flexGrow: 1, my: 5}} >
        <section>
          <article>
            <header>
              <Typography variant="h2" sx={{ fontWeight: 500 }}>{article.title}</Typography>
              <Box component="div" sx={{ mb: 2 }} >
                <Typography variant="body2" sx={{ color:'gray', fontWeight: 500 }}> - {article.author}</Typography>
                 <Typography variant="body2" sx={{ color:'gray', fontWeight: 500 }}> - {timeConverter(article.created_at)}</Typography>
              </Box>
            </header>
            <figure>
              <Box
              component='img'
              sx={{
                maxHeight: { xs: 333, md: 450 },
                maxWidth: { xs: 450, md: 500 },
              }}
              src={article.article_img_url} 
              alt={`Image relating to ${article.topic}`} 
              />
              <figcaption><em><small>Image relating to {article.title}</small></em></figcaption>
            </figure>
            <p>{article.body}</p>
            
            <div className="comments-votes">
              <p>Votes: {article.votes}</p>
              <div className="thumbs">
                  {voteError ? <p>{voteError}</p> : null}
                  <button id='thumb-up' onClick={()=> handleIcrements(1)} disabled={hasVotedUp}>
                      <FaRegThumbsUp />
                  </button>
                  <button id="thumb-down" onClick={()=> handleIcrements(-1)} disabled={hasVotedDown}>
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
      </Container>
    </>
  );
};

export default FullArticle;
