import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stats.css';
import { stats } from '../data/portfolioData';

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const anim = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        let start = 0;
        const duration = 2000;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
    });

    return () => anim.kill();
  }, [target]);

  return <span ref={ref} className="stat-num">{count}{suffix}</span>;
}

export default function Stats() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current?.children;
    if (!section || !cards?.length) return;

    gsap.set(cards, { y: 40, opacity: 0 });

    const anim = gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section className="stats" id="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid" ref={cardsRef}>
          {stats.map((stat, i) => (
            <div className="stat-card hover-target" key={i}>
              <div className="stat-number">
                <CountUp target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-line" style={{ background: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--purple)' : i === 2 ? 'var(--green)' : 'var(--blue)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
