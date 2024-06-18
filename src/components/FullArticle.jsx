import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../utils/api-calls";
import { timeConverter } from "../utils/time-converter";


const FullArticle = ()=> {

    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState ({});

    const { article_id } = useParams();
    
    useEffect(()=> {
       
        setIsLoading(true);
        getArticles(article_id)
        .then((res)=> {
            setArticle(res.article)
            setIsLoading(false)
        })
    }, [article_id])

    if(isLoading) {
        return <h1>Loading...</h1>
    }

    return (
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
                <div>
                    <p>Comments: {article.comment_count}</p>
                    <p>Votes: {article.votes}</p>
                </div>
            </article>
        </section>
    )
}




export default FullArticle;