import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage';
import Profile from './pages/profile';
import NotFound from './pages/NotFound';
import CategoryDetail from './pages/CategoryDetail';
import Categories from './pages/Categories';
import Quiz from './pages/Quiz';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:slug" element={<Quiz />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/profile" element={<div className="min-h-screen flex items-center justify-center"><h1>Profile Page - Coming Soon</h1></div>} />
          <Route path="/leaderboard" element={<div className="min-h-screen flex items-center justify-center"><h1>Leaderboard Page - Coming Soon</h1></div>} />
          <Route path="/resources" element={<div className="min-h-screen flex items-center justify-center"><h1>Resources Page - Coming Soon</h1></div>} />
          <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><h1>About Page - Coming Soon</h1></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
