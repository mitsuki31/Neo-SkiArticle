import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '@/pages/Home';
import ArticlePage from '@/pages/ArticlePage';
import CreateErrorPage from '@/layout/ErrorPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/a/:slug" element={<ArticlePage />} />
        <Route path="*" element={<CreateErrorPage />} />
      </Routes>
    </Router>
  );
}
