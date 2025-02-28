'use client'
import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import styles from './Combined.module.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
//---components---
import Hobbies from '@/components/Hobbies';
import Game from '@/components/Game';
import PersonalProfile from '@/components/PersonalProfile';
import Testimonials from '@/components/Testimonials';
import Biography from '@/components/Biography';
import ClientParticles from '@/components/ClientParticles';

export default function Combined() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Преобразование прокрутки для перемещения заголовков
  const xTitle = useTransform(scrollYProgress, [0, 1], ['-100%', '0%']);
  const xDescription = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Проверяем, достигли ли мы низа страницы
      if (scrollTop + windowHeight >= documentHeight - 10) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: containerRef.current.children,
              translateY: [50, 0],
              opacity: [0, 1],
              delay: anime.stagger(200),
              easing: 'easeOutExpo',
              duration: 1000
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
    <section className={styles.combined} ref={containerRef} style={{ overflowY: isAtBottom ? 'auto' : 'hidden', height: '100vh' }}>
      <div className={styles.about}>
        <motion.h2 
          className={styles.title} 
          style={{ x: xTitle }}
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          Legal Innovation Leader
        </motion.h2>
        <motion.p 
          className={styles.description} 
          style={{ x: xDescription }}
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Partner at AP Law & Consulting, heading the IP/IT practice with unparalleled expertise 
          in intellectual property and information technology law.
        </motion.p>
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
      </div>
      <div className={styles.expertise}>
        <motion.h2 
          className={styles.title} 
          style={{ x: xTitle }}
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Areas of Excellence
        </motion.h2>
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
      </div>
      <ClientParticles />
      <Hobbies />
      <Testimonials />
      <Biography />
      <PersonalProfile />
      <Game />
    </section>
  );
} 