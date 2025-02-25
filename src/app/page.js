'use client'
import Hero from '@/components/Hero';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Hero />
      <About />
      <Expertise />
    </div>
  );
}
