import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-4642.onrender.com/api",
});

export const getArticles = (topic, sort_by, order) => {
  const params = {};

  if (topic) {
    params.topic = topic;
  }
  if (sort_by) {
    params.sort_by = sort_by;
  }
  if (order) {
    params.order = order;
  }

  return ncNews.get("/articles", { params }).then((res) => {
    return res.data;
  });
};

export const getArticleById = (article_id)=> {
    return ncNews.get(`/articles/${article_id}`)
    .then((res)=> {
        return res.data;
    })
}

export const getCommentsByArticleId = (article_id) => {
  return ncNews.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data;
  });
};

export const patchArticle = (article_id, inc) => {
  const patchBody = { inc_vote: inc };

  return ncNews.patch(`/articles/${article_id}`, patchBody).then((res) => {
    return res.data.updatedArticle.votes;
  });
};

export const postComment = (newComment, article_id, user) => {
  const postBody = {
    username: user,
    body: newComment,
  };
  return ncNews
    .post(`/articles/${article_id}/comments`, postBody)
    .then((res) => {
      return res.data.newComment;
    });
};

export const deleteComment = (comment_id) => {
  return ncNews.delete(`/comments/${comment_id}`);
};

export const getTopics = () => {
  return ncNews.get("/topics").then((res) => {
    return res.data;
  });
};

export const patchComment = (comment_id, inc)=> {
  const patchBody = { inc_votes: inc }
  return ncNews.patch(`/comments/${comment_id}`, patchBody)
  .then((res)=> {
    return res.data.updatedComment.votes;
  })
}