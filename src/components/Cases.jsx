import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Cases.css';
import { caseStudies } from '../data/portfolioData';

export default function Cases() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    const headerChildren = headerRef.current?.children;
    if (headerChildren?.length) {
      tl.fromTo(headerChildren,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
      );
    }

    const cards = trackRef.current?.children;
    if (cards?.length) {
      tl.fromTo(cards,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12 },
        '-=0.4'
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="work-section" id="work" data-theme="dark" ref={sectionRef}>
      <div className="container">
        {/* Section header */}
        <div className="work-top-layout" ref={headerRef}>
          <div className="work-top-left">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title section-title-white">
              Built with Strategy,<br/>Made to Perform
            </h2>
          </div>
          <div className="work-top-right">
            <p className="work-top-text">
              Over 7 years I've helped businesses scale through
              performance marketing, creative direction, and
              data-driven growth systems that deliver real results.
            </p>
          </div>
        </div>

        {/* Work cards track */}
        <div className="work-track" ref={trackRef}>
          {caseStudies.map((item, i) => (
            <a
              key={item.id}
              href={`https://vimeo.com/${item.video.split('/').pop()}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`work-card hover-target ${hoveredIndex !== null && hoveredIndex !== i ? 'is-dimmed' : ''}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background video/iframe */}
              <div className="work-card-bg">
                <iframe
                  src={`${item.video}?autoplay=0&title=0&byline=0&portrait=0`}
                  className="work-card-iframe"
                  allow="autoplay; fullscreen"
                  loading="lazy"
                />
              </div>

              {/* Card content overlay */}
              <div className="work-card-content">
                <div className="work-card-top">
                  <span className="work-card-number">0{i + 1}</span>
                  <div className="work-card-tags">
                    {item.results.slice(0, 2).map((r, j) => (
                      <span className="work-card-tag" key={j}>{r}</span>
                    ))}
                  </div>
                </div>

                <div className="work-card-bottom">
                  <h3 className="work-card-heading">{item.title}</h3>
                  <p className="work-card-desc">{item.description}</p>
                  <div className="work-card-arrow-wrap">
                    <span className="work-card-arrow">&rarr;</span>
                  </div>
                </div>
              </div>

              {/* Dark overlay (dims on sibling hover) */}
              <div className="work-card-overlay" style={{ '--card-color': item.color }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
