import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDot = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDot.current;

    const move = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power3.out' });
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
    };

    const enterLink = () => gsap.to(cursor, { scale: 2.5, backgroundColor: 'rgba(244, 98, 66, 0.15)', duration: 0.3 });
    const leaveLink = () => gsap.to(cursor, { scale: 1, backgroundColor: 'rgba(244, 98, 66, 0.08)', duration: 0.3 });

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, .hover-target').forEach((el) => {
      el.addEventListener('mouseenter', enterLink);
      el.addEventListener('mouseleave', leaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      document.querySelectorAll('a, button, .hover-target').forEach((el) => {
        el.removeEventListener('mouseenter', enterLink);
        el.removeEventListener('mouseleave', leaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorDot} className="custom-cursor-dot" />
    </>
  );
}
