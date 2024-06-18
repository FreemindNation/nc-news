import { useEffect, useState } from "react";
import { getArticles } from "../utils/api-calls";
import { timeConverter } from "../utils/time-converter";
import { Card } from "react-bootstrap";

const ArticlesList = ({ articles, setArticles })=> {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        setIsLoading(true);
        getArticles()
        .then((res)=> {
            console.log(res.articles);
            setArticles(res.articles)
            setIsLoading(false)
        })
    }, [])


    return (


        <section>
            <ul className="article-list">
                {articles.map((article)=> {
                    return (
                        <li key={article.article_id}>
                            <img src={article.article_img_url} alt="Image of the article" />
                            <p><strong>Title:</strong> {article.title}</p>
                            <p><strong>Author:</strong> {article.author}</p>
                            <p><strong>Topic:</strong> {article.topic}</p>
                            <p><strong>Comments:</strong> {article.comment_count}</p>
                            <p>{timeConverter(article.created_at)}</p>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default ArticlesList;