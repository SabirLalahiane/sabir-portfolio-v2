import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Pricing.css';
import { pricingPlans } from '../data/portfolioData';

export default function Pricing() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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

    const cards = gridRef.current?.children;
    if (cards?.length) {
      tl.fromTo(cards,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
        '-=0.4'
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="pricing" id="pricing" ref={sectionRef}>
      <div className="container">
        <div ref={headerRef} className="pricing-header">
          <span className="section-label">Investment</span>
          <h2 className="section-title">
            Choose Your <span style={{ color: 'var(--accent)' }}>Growth Package</span>
          </h2>
          <p className="pricing-subtitle">Transparent pricing. No hidden fees. Every package is designed to deliver measurable ROI within 30-60 days.</p>
        </div>

        <div className="roi-banner">
          <p>💰 <strong>Typical clients see 2X–4X ROAS</strong> within the first 60 days. Your investment pays for itself.</p>
        </div>

        <div className="pricing-grid" ref={gridRef}>
          {pricingPlans.map((plan, i) => (
            <div className={`pricing-card hover-target ${plan.popular ? 'popular' : ''}`} key={i}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-desc">{plan.desc}</div>
              <div className="plan-price">{plan.price}<span>{plan.period}</span></div>
              <div className="plan-note">{plan.note}</div>
              <div className="divider" />
              <ul className="features-list">
                {plan.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
                {plan.missingFeatures.map((feat, idx) => (
                  <li className="missing" key={idx}>{feat}</li>
                ))}
              </ul>
              <a href={plan.ctaLink} className={`plan-cta ${plan.popular ? 'cta-primary' : 'cta-secondary'}`}>
                {plan.ctaText}
              </a>
            </div>
          ))}
        </div>

        <div className="guarantee">
          <div className="guarantee-icon">🛡️</div>
          <h4>30-Day Performance Guarantee</h4>
          <p>If we don't hit agreed KPIs within 30 days, I'll work the next month at no management fee. I'm that confident.</p>
        </div>
      </div>
    </section>
  );
}
