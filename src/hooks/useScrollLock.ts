import { useEffect } from 'react';

let lockCount = 0;
let savedScrollY = 0;

/**
 * Locks the page's background scroll while `locked` is true.
 *
 * Plain `overflow: hidden` on <body> doesn't reliably stop touch-scroll
 * on mobile Safari/Chrome (the page behind a fixed overlay still pans).
 * Pinning body with `position: fixed` at the current scroll offset is
 * the technique that actually blocks touch-scroll on those browsers.
 *
 * A module-level counter lets multiple locks (e.g. a modal opened while
 * the mobile menu is open) stack without one closing early unlocking
 * the page out from under the other.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    if (lockCount === 0) {
      savedScrollY = window.scrollY;
      const { body, documentElement: html } = document;
      body.style.position = 'fixed';
      body.style.top = `-${savedScrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        const { body, documentElement: html } = document;
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        body.style.overflow = '';
        html.style.overflow = '';
        window.scrollTo(0, savedScrollY);
      }
    };
  }, [locked]);
}
