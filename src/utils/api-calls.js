import axios from "axios";


const ncNews = axios.create({
    baseURL: 'https://nc-news-4642.onrender.com/api'
});


export const getArticles = (article_id)=> {
    if(article_id) {
        return ncNews.get(`/articles/${article_id}`, )
    .then((res)=> {
        return res.data;
    });
    }
    
    return ncNews.get('/articles/', )
    .then((res)=> {
        return res.data;
    });
}

export const getCommentsByArticleId = (article_id)=> {
    return ncNews.get(`/articles/${article_id}/comments`)
    .then((res)=> {
        return res.data;
    })
}

// export const getTopics = ()=> {
//     return ncNews.get('/topics')
//     .then((res)=> {
//         // console.log(res.data);
//     })
// }