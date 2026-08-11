import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { ROUTES } from './routes';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        {/* Same page/component as Home — HomePage opens the pass modal
            when it sees this path, so "Join the Movement" is a real,
            shareable/back-button-friendly URL instead of just local state. */}
        <Route path={ROUTES.JOIN} element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
