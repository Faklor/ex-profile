'use client'
import { useRef } from 'react'; 
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './page.module.scss';
import Hero from '@/components/Hero';
import Combined from '@/components/Combined';


export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const cards = [
    {
      component: Hero,
      background: "#ffffff"
    },
    {
      component: Combined,
      background: "#ffffff"
    },
   
  ];

  return (
    <main ref={containerRef} className={styles.mainContainer}>
      <video className={styles.backgroundVideo} autoPlay muted loop playsInline>
        <source src={`${process.env.NEXT_PUBLIC_BASEURL}/backgroundScroll/main.mp4`} type="video/mp4" />
      </video>
      {cards.map((card, index) => {
        const progress = useTransform(
          scrollYProgress,
          [index * 0.3, (index * 0.3) + 0.3],
          [0, 1]
        );

        const scale = useTransform(
          progress,
          [0, 0.5],
          [1, 0.5]
        );

        const borderRadius = useTransform(
          progress,
          [0, 0.5],
          ['0px', '30px']
        );

        const y = useTransform(
          progress,
          [0, 0.5],
          ['100vh', '0vh']
        );

        return (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: index === 0 ? 1 : 0 }}
            style={{
              scale: index === 0 ? scale : 1,
              y: index === 0 ? 0 : y,
              opacity: index === 0 ? 1 : progress,
              backgroundColor: card.background,
              borderRadius: index === 0 ? borderRadius : 0,
              overflow: 'hidden'
            }}
          >
            {index === 0 ? (
              <card.component />
            ) : (
              <card.component />
            )}
          </motion.div>
         
        );
        
      })}
      
    </main>
  );
}
