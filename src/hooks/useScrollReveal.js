import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 40,
      x = 0,
      opacity = 0,
      duration = 1,
      ease = 'power3.out',
      delay = 0,
      stagger = 0,
      start = 'top 85%',
      children = false,
    } = options;

    const targets = children ? el.children : el;

    gsap.set(targets, { y, x, opacity });

    const anim = gsap.to(targets, {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      ease,
      delay,
      stagger,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return ref;
}

export function useTextReveal(selector = '.reveal-word') {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll(selector);
    if (!words.length) return;

    gsap.set(words, { y: '110%', opacity: 0 });

    const anim = gsap.to(words, {
      y: '0%',
      opacity: 1,
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return containerRef;
}
