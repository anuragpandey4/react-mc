import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StoryList from './pages/StoryList';
import StoryDetail from './pages/StoryDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StoryList />} />
        <Route path="/story/:id" element={<StoryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;