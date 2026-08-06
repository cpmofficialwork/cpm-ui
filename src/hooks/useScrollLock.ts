import { useEffect } from 'react';

let lockCount = 0;
let touchStartY = 0;

/**
 * Walks up from a touch target to find the nearest ancestor that can
 * actually scroll vertically. Used to tell "this touch is panning the
 * drawer/modal's own content" apart from "this touch is trying to drag
 * the page behind it."
 */
function findScrollableAncestor(node: Element | null): Element | null {
  while (node && node !== document.body) {
    const style = getComputedStyle(node);
    const canScrollY =
      (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
      node.scrollHeight > node.clientHeight;
    if (canScrollY) return node;
    node = node.parentElement;
  }
  return null;
}

function handleTouchStart(e: TouchEvent) {
  touchStartY = e.touches[0]?.clientY ?? 0;
}

function handleTouchMove(e: TouchEvent) {
  const scrollable = findScrollableAncestor(e.target as Element | null);

  if (!scrollable) {
    e.preventDefault();
    return;
  }

  // Inside a scrollable region: block the rubber-band overscroll that would
  // otherwise chain into the page behind once the region hits its own edge.
  const touchY = e.touches[0]?.clientY ?? touchStartY;
  const movingDown = touchY > touchStartY;
  const atTop = scrollable.scrollTop <= 0;
  const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight;
  if ((atTop && movingDown) || (atBottom && !movingDown)) {
    e.preventDefault();
  }
}

/**
 * Locks page scroll while `locked` is true, without moving, resizing, or
 * repositioning anything on the page.
 *
 * Only `<html>` gets `overflow: hidden` — `<body>` is deliberately left
 * alone. Setting `overflow: hidden` on `<body>` makes body itself a CSS
 * scroll container (per spec, any `overflow` other than `visible`
 * qualifies, even `hidden`), and a scroll container that sits between a
 * `position: sticky` element and the real viewport becomes THAT element's
 * reference frame for its sticky offset. Since `<body>`'s own `scrollTop`
 * never moves — the page has always scrolled via `<html>`, not `<body>` —
 * the sticky header ends up pinned to the top of `<body>`'s box instead of
 * the visual viewport. Once the page has been scrolled down before the
 * lock engages (e.g. after navigating to a lower section), body's top edge
 * sits well above the visible viewport, so the "pinned" header renders
 * off-screen above the fold: collapsed, clipped, or simply gone. `<html>`
 * doesn't have this problem — it IS the root scroller, so locking it
 * doesn't interpose a new reference frame between the header and the
 * viewport.
 *
 * `overflow: hidden` on `<html>` blocks wheel/keyboard/scrollbar scrolling
 * everywhere, but iOS Safari still allows touch-driven dragging of the
 * background, so a `touchmove` listener blocks that directly — while still
 * permitting genuinely scrollable regions (the drawer, a modal body) to
 * scroll normally.
 *
 * A module-level counter lets nested locks (e.g. a modal opened while the
 * mobile menu is open) stack without one closing early unlocking the page
 * out from under the other.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    if (lockCount === 0) {
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        document.documentElement.style.overflow = '';
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [locked]);
}
