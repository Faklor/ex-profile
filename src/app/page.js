'use client'
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import Hobbies from '@/components/Hobbies';
import Biography from '@/components/Biography';
import ParticlesBackground from '@/components/ParticlesBackground';
import Testimonials from '@/components/Testimonials';
import PersonalProfile from '@/components/PersonalProfile';
import dynamic from 'next/dynamic';
import styles from './page.module.scss';

// Динамический импорт компонента Game без SSR
const Game = dynamic(() => import('@/components/Game'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: '#1a1a1a',
      color: '#ffffff'
    }}>
      Loading game...
    </div>
  )
});

export default function Home() {
  useEffect(() => {
    // Плавный скролл для всей страницы
    document.documentElement.style.scrollBehavior = 'smooth';

    // Настройка наблюдателя за появлением элементов
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Находим все секции для анимации
    const sections = document.querySelectorAll(`.${styles.section}`);
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      <ParticlesBackground />
      <Hero />
      <div className={`${styles.section} ${styles.fadeIn}`}>
        <About />
      </div>
      <div className={`${styles.section} ${styles.fadeIn}`}>
        <Expertise />
      </div>
      <div className={`${styles.section} ${styles.fadeIn}`}>
        <Hobbies />
      </div>
      <div className={`${styles.section} ${styles.fadeIn}`}>
        <Testimonials />
      </div>
      <Biography />
      <div className={`${styles.section} ${styles.fadeIn}`}>
        <PersonalProfile />
      </div>
      <Game />
    </div>
  );
}
