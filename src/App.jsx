import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Login from './components/Login';
import ArticlesList from './components/ArticlesList';
import { UserProvider } from './contexts/UserContext';
import FullArticle from './components/FullArticle';
import NavBar from './components/NavBar';
import Layout from './components/Layout';



const App = () => {
   

  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<Layout/>}>
            <Route path='/articles/' element={<ArticlesList />} />
            <Route path='/articles/:article_id' element={<FullArticle />} />
            <Route path='/topics/:slug' element={<ArticlesList />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;
