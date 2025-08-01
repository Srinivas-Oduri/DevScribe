import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';
import AdminPage from './pages/AdminPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import { BlogProvider } from './context/BlogContext';

function App() {
  return (
    <BlogProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<PostPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/create" element={<CreatePostPage />} />
              <Route path="/admin/edit/:id" element={<EditPostPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;