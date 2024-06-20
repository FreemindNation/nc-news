import { useEffect, useState } from "react";
import { getArticles } from "../utils/api-calls";
import ArticleCard from "./ArticleCard";
import { useParams } from "react-router-dom";

const ArticlesList = ()=> {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();

    useEffect(()=> {
        setIsLoading(true);
        getArticles(null, slug)
        .then((res)=> {
            setArticles(res.articles)
            setIsLoading(false)
        })
    }, [slug])

    if(isLoading){
        return <p>Loading...</p>
    }

    return (

        <section className="article-grid">
                {articles.map((article)=> {
                    return (
                        <ArticleCard key={article.article_id} article={article}/>
                    )
                })}
        </section>
    )
}

export default ArticlesList;