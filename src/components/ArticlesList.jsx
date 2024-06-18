import { useEffect, useState } from "react";
import { getArticles } from "../utils/api-calls";
import ArticleCard from "./ArticleCard";

const ArticlesList = ({ articles, setArticles })=> {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        setIsLoading(true);
        getArticles()
        .then((res)=> {
            setArticles(res.articles)
            setIsLoading(false)
        })
    }, [])

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