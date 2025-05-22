import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import HomePage from '@/pages/Home';
import ArticlePage from '@/pages/ArticlePage';
import CreateErrorPage from '@/layout/ErrorPage';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/a/:slug" element={<ArticlePage key={location.pathname} />} />
          <Route path="*" element={<CreateErrorPage />} />
        </Routes>
      </Router>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
