'use client'
import { useEffect, useRef } from 'react';
import anime from 'animejs';
import styles from './Expertise.module.scss';

export default function Expertise() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: '.expertise-item',
              scale: [0.9, 1],
              opacity: [0, 1],
              delay: anime.stagger(150),
              duration: 1500,
              easing: 'easeOutElastic(1, .5)'
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.expertise} ref={containerRef}>
      <h2 className={styles.title}>Areas of Excellence</h2>
      <div className={styles.grid}>
        <div className="expertise-item">
          <h3>Intellectual Property</h3>
          <p>Protection and management of IP assets</p>
        </div>
        <div className="expertise-item">
          <h3>Information Technology</h3>
          <p>Digital law and technology regulations</p>
        </div>
        <div className="expertise-item">
          <h3>Legal Innovation</h3>
          <p>Modern approaches to legal challenges</p>
        </div>
        <div className="expertise-item">
          <h3>Strategic Consulting</h3>
          <p>Business-oriented legal solutions</p>
        </div>
      </div>
    </section>
  );
} 