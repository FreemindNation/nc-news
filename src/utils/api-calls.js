import axios from "axios";

const ncNews = axios.create({
    baseURL: 'https://nc-news-4642.onrender.com/api'
});


export const getArticles = ()=> {
    return ncNews.get('/articles')
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