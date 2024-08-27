import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Login from './components/Login';
import ArticlesList from './components/ArticlesList';
import { UserProvider } from './contexts/UserContext';
import FullArticle from './components/FullArticle';
import Layout from './components/Layout';
import ErrorPage from './components/ErrorPage';
import { ErrorProvider } from './contexts/ErrorContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import  Grid2  from '@mui/material/Unstable_Grid2/Grid2';


const App = () => {
   

  return (
    <Grid2 container spacing={2}>
      <UserProvider>
        <ErrorProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='*' element={<ErrorPage />}/>
              <Route element={<Layout/>}>
                <Route path='/articles/' element={<ArticlesList />} />
                <Route path='/articles/:article_id' element={<FullArticle />} />
                <Route path='/topics/:slug' element={<ArticlesList />}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </ErrorProvider>
      </UserProvider>
    </Grid2>
  )
}

export default App;
