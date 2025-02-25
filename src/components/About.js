import { useEffect, useRef } from 'react';
import anime from 'animejs';
import styles from './About.module.scss';

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    anime({
      targets: containerRef.current.children,
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(200),
      easing: 'easeOutExpo'
    });
  }, []);

  return (
    <section className={styles.about} ref={containerRef}>
      <h2 className={styles.title}>Legal Innovation Leader</h2>
      <p className={styles.description}>
        Partner at AP Law & Consulting, heading the IP/IT practice with unparalleled expertise 
        in intellectual property and information technology law.
      </p>
      <div className={styles.achievements}>
        <div className={styles.achievement}>
          <span className={styles.highlight}>Chambers Europe</span>
          <p>Recognized as a leading IP expert</p>
        </div>
        <div className={styles.achievement}>
          <span className={styles.highlight}>IP/IT Practice</span>
          <p>Department Head & Innovator</p>
        </div>
      </div>
    </section>
  );
} 