import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Marquee.css';
import { marqueeClients } from '../data/portfolioData';

export default function Marquee() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const anim = gsap.fromTo(section,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section className="marquee-section" ref={sectionRef}>
      <div className="marquee-track">
        <div className="marquee-content">
          {[...marqueeClients, ...marqueeClients, ...marqueeClients].map((client, i) => (
            <span className="marquee-item" key={i}>
              <span className="marquee-dot" />
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
