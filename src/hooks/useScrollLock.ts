import { useEffect } from 'react';

let lockCount = 0;
let savedScrollY = 0;

/**
 * The App-level wrapper around the scrollable page content (everything
 * except the `position: sticky` header). Locking is applied to this
 * element instead of <body> so the sticky header — which sits outside
 * it as a sibling — never gets dragged along with the pinned offset.
 */
export const SCROLL_LOCK_TARGET_ID = 'app-scroll-content';

/**
 * Locks the page's background scroll while `locked` is true.
 *
 * Plain `overflow: hidden` on <body> doesn't reliably stop touch-scroll
 * on mobile Safari/Chrome (the page behind a fixed overlay still pans).
 * Pinning the content wrapper with `position: fixed` at the current
 * scroll offset is the technique that actually blocks touch-scroll on
 * those browsers.
 *
 * Pinning <body> itself (the previous approach) dragged the sticky
 * header off-screen along with it whenever the page was scrolled down
 * before the lock engaged, since a sticky element with no scrolling
 * ancestor just renders at its shifted static position. Targeting the
 * content wrapper — a sibling of the header, not an ancestor — avoids
 * that entirely.
 *
 * A module-level counter lets multiple locks (e.g. a modal opened while
 * the mobile menu is open) stack without one closing early unlocking
 * the page out from under the other.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const target = document.getElementById(SCROLL_LOCK_TARGET_ID);

    if (lockCount === 0) {
      savedScrollY = window.scrollY;
      const { body, documentElement: html } = document;
      if (target) {
        target.style.position = 'fixed';
        target.style.top = `-${savedScrollY}px`;
        target.style.left = '0';
        target.style.right = '0';
        target.style.width = '100%';
      }
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        const { body, documentElement: html } = document;
        if (target) {
          target.style.position = '';
          target.style.top = '';
          target.style.left = '';
          target.style.right = '';
          target.style.width = '';
        }
        body.style.overflow = '';
        html.style.overflow = '';
        window.scrollTo(0, savedScrollY);
      }
    };
  }, [locked]);
}
