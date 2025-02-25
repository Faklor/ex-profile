'use client'
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import Hobbies from '@/components/Hobbies';
import styles from './page.module.scss';

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
    </div>
  );
}
