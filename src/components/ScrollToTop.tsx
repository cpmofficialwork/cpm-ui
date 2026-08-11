import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../routes';

// Browsers keep the previous scroll position across client-side route
// changes (unlike full page loads), so a fresh page would otherwise open
// mid-scroll wherever the last route happened to leave off.
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // /join renders the same page as home and scrolls itself to the
    // conference section before opening the pass modal — resetting to
    // the top here would just fight that.
    if (pathname === ROUTES.JOIN) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
