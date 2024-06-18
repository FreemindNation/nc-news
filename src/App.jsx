import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Login from './Login';
import ArticlesList from './components/ArticlesList';
import { UserProvider } from './contexts/UserContext';



const App = () => {
   
  const [articles, setArticles] = useState([]);

  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/articles' element={<ArticlesList articles={articles} setArticles={setArticles}/>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;
