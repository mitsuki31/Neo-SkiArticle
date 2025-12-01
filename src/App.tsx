import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import CreateErrorPage from '@/layouts/ErrorPageLayout';
import HomePage from '@/pages/Home';
import ArticlePage from '@/pages/ArticlePage';
import SecurityPage from '@/pages/Security';
import CodeOfConductPage from '@/pages/CodeOfConduct';
import PrivacyPage from '@/pages/Privacy';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Home route */}
          <Route index element={<HomePage />} />

          {/* Security routes */}
          <Route path="/:lang?/security" element={<SecurityPage />} />

          {/* Code of Conduct route */}
          <Route path="/:lang?/code-of-conduct" element={<CodeOfConductPage />} />

          {/* Privacy Policy route */}
          <Route path="/:lang?/privacy" element={<PrivacyPage />} />

          {/* Article route */}
          <Route path="/a/:slug" element={<ArticlePage key={location.pathname} />} />

          {/* Unknown routes */}
          <Route path="*" element={
            <CreateErrorPage
              errno={404}
              message='Halaman tidak ditemukan'
              description='Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.'
            />
          } />
        </Routes>
      </Router>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
