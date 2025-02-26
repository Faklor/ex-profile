'use client'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Game.module.scss';
import GameFooter from './GameFooter';

let Phaser;
if (typeof window !== 'undefined') {
  Phaser = require('phaser');
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
    this.lives = 2;
    this.speed = 200;
    this.speedIncrease = 20;
    this.scoreMultiplier = 1;
    this.isInvulnerable = false;
    this.obstacleDelay = 3000;
    this.minObstacleDelay = 1000;
    this.obstacleCount = 1; // Начальное количество препятствий
    this.maxObstacleCount = 4; // Максимальное количество препятствий
  }

  preload() {
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL || '';
    this.load.image('player', `${baseUrl}/game/accountant.png`);
    this.load.image('document', `${baseUrl}/game/document.png`);
    this.load.image('special-document', `${baseUrl}/game/special-document.png`);
    this.load.image('obstacle', `${baseUrl}/game/warning.png`);
    this.load.image('bonus', `${baseUrl}/game/bonus.png`);
  }

  create() {
    // Создаем игрока
    this.player = this.add.sprite(400, 500, 'player');
    this.player.setDisplaySize(64, 64);

    // Физика
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // Группы объектов
    this.documents = this.physics.add.group();
    this.obstacles = this.physics.add.group();
    this.bonuses = this.physics.add.group();

    // Коллизии
    this.physics.add.overlap(this.player, this.documents, this.collectDocument, null, this);
    this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);
    this.physics.add.overlap(this.player, this.bonuses, this.collectBonus, null, this);

    // Обновленные таймеры
    this.documentTimer = this.time.addEvent({
      delay: 2000,
      callback: this.spawnDocument,
      callbackScope: this,
      loop: true
    });

    this.obstacleTimer = this.time.addEvent({
      delay: this.obstacleDelay,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    this.bonusTimer = this.time.addEvent({
      delay: 15000,
      callback: this.spawnBonus,
      callbackScope: this,
      loop: true
    });

    // Таймер увеличения сложности
    this.time.addEvent({
      delay: 10000,
      callback: this.increaseDifficulty,
      callbackScope: this,
      loop: true
    });

    // Тексты
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'Arial'
    });

    this.livesText = this.add.text(16, 56, 'Lives: ❤️❤️', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'Arial'
    });

    this.multiplierText = this.add.text(16, 96, 'Multiplier: x1', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'Arial'
    });

    // Управление
    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.text(16, this.game.config.height - 40, 'Use ← → arrows or touch sides to move', {
      fontSize: '16px',
      fill: '#fff',
      fontFamily: 'Arial'
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.x -= 5;
    }
    if (this.cursors.right.isDown) {
      this.player.x += 5;
    }

    if (this.input.activePointer.isDown) {
      const touchX = this.input.activePointer.x;
      if (touchX < this.game.config.width / 2) {
        this.player.x -= 5;
      } else {
        this.player.x += 5;
      }
    }
  }

  increaseDifficulty() {
    // Увеличиваем скорость
    this.speed += this.speedIncrease;

    // Увеличиваем количество препятствий
    if (this.obstacleCount < this.maxObstacleCount) {
      this.obstacleCount++;
      // Показываем уведомление об увеличении количества препятствий
      this.showBonusText(`Warning: ${this.obstacleCount}x obstacles!`, '#ff0000');
    }

    // Уменьшаем задержку между волнами препятствий
    this.obstacleDelay = Math.max(
      this.minObstacleDelay,
      this.obstacleDelay - 200
    );

    // Обновляем таймер препятствий
    this.obstacleTimer.destroy();
    this.obstacleTimer = this.time.addEvent({
      delay: this.obstacleDelay,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });
  }

  spawnDocument() {
    const x = Phaser.Math.Between(100, 700);
    const isSpecial = Math.random() < 0.2;
    const document = this.documents.create(x, 0, isSpecial ? 'special-document' : 'document');
    document.setDisplaySize(40, 48);
    document.setVelocityY(this.speed);
    document.isSpecial = isSpecial;
  }

  spawnObstacle() {
    // Создаем несколько препятствий в зависимости от текущего уровня сложности
    for (let i = 0; i < this.obstacleCount; i++) {
      const segment = this.game.config.width / (this.obstacleCount + 1);
      const baseX = segment * (i + 1);
      // Добавляем случайное отклонение в пределах сегмента
      const x = Phaser.Math.Between(
        Math.max(100, baseX - segment/2), 
        Math.min(700, baseX + segment/2)
      );
      
      const obstacle = this.obstacles.create(x, 0, 'obstacle');
      obstacle.setDisplaySize(40, 40);
      obstacle.setVelocityY(this.speed + 100);
    }
  }

  spawnBonus() {
    const x = Phaser.Math.Between(100, 700);
    const bonus = this.bonuses.create(x, 0, 'bonus');
    bonus.setDisplaySize(40, 40);
    bonus.setVelocityY(150);
    bonus.setTint(0xffff00); // Желтый цвет для отличия
  }

  collectDocument(player, document) {
    document.destroy();
    const points = document.isSpecial ? 25 : 10;
    this.score += points * this.scoreMultiplier;
    this.scoreText.setText('Score: ' + this.score);

    this.tweens.add({
      targets: this.scoreText,
      scale: 1.2,
      duration: 100,
      yoyo: true
    });
  }

  hitObstacle(player, obstacle) {
    if (this.isInvulnerable) return;
    
    obstacle.destroy();
    this.lives--;
    this.livesText.setText('Lives: ' + '❤️'.repeat(this.lives));

    if (this.lives <= 0) {
      this.scene.pause();
      this.game.events.emit('gameOver', this.score);
    } else {
      // Временная неуязвимость
      this.isInvulnerable = true;
      this.player.alpha = 0.5;
      this.time.delayedCall(2000, () => {
        this.isInvulnerable = false;
        this.player.alpha = 1;
      });
    }
  }

  collectBonus(player, bonus) {
    bonus.destroy();
    const bonusType = Phaser.Math.Between(0, 2);
    
    switch(bonusType) {
      case 0: // Замедление
        this.speed = Math.max(200, this.speed - 50);
        this.showBonusText('Speed Down!');
        break;
      case 1: // Дополнительная жизнь
        if (this.lives < 5) {
          this.lives++;
          this.livesText.setText('Lives: ' + '❤️'.repeat(this.lives));
          this.showBonusText('+1 Life!');
        }
        break;
      case 2: // Двойные очки
        this.scoreMultiplier = 2;
        this.multiplierText.setText('Multiplier: x2');
        this.showBonusText('Double Points!');
        this.time.delayedCall(10000, () => {
          this.scoreMultiplier = 1;
          this.multiplierText.setText('Multiplier: x1');
        });
        break;
    }
  }

  showBonusText(text, color = '#ffff00') {
    const bonusText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, text, {
      fontSize: '32px',
      fill: color,
      fontFamily: 'Arial'
    });
    
    bonusText.setOrigin(0.5);
    
    this.tweens.add({
      targets: bonusText,
      y: bonusText.y - 50,
      alpha: 0,
      duration: 1500,
      onComplete: () => bonusText.destroy()
    });
  }
}

export default function Game() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const gameRef = useRef(null);
  const gameSectionRef = useRef(null);

  const getGameDimensions = () => {
    const width = Math.min(800, window.innerWidth);
    const height = Math.min(600, window.innerHeight);
    return { width, height };
  };

  useEffect(() => {
    const handleResize = () => {
      if (gameRef.current) {
        const { width, height } = getGameDimensions();
        gameRef.current.scale.resize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  const startGame = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingProgress(0);
    setShowFooter(false);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASEURL || '';
      const resources = [
        `${baseUrl}/game/accountant.png`,
        `${baseUrl}/game/document.png`,
        `${baseUrl}/game/special-document.png`,
        `${baseUrl}/game/warning.png`,
        `${baseUrl}/game/bonus.png`
      ];

      let loadedCount = 0;
      await Promise.all(
        resources.map(url => 
          new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              loadedCount++;
              setLoadingProgress((loadedCount / resources.length) * 100);
              resolve();
              
            };
            img.onerror = () => {
              console.error(`Failed to load: ${url}`);
              reject(new Error(`Failed to load: ${url}`));
            };
            img.src = url;
          })
        )
      );

      setShowGame(true);
      setIsPlaying(true);
      setScore(0);
      gameSectionRef.current.style.height = '100vh';
      
      const { width, height } = getGameDimensions();

      const config = {
        type: Phaser.AUTO,
        parent: 'game-container',
        width,
        height,
        pixelArt: false,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 }
          }
        },
        render: {
          antialias: true,
          pixelArt: false,
          roundPixels: true
        },
        scene: GameScene,
        backgroundColor: '#1a1a1a'
      };

      if (gameRef.current) {
        gameRef.current.destroy(true);
      }

      gameRef.current = new Phaser.Game(config);
      router.push('#game-container',undefined, { shallow: true });
      // setTimeout(() => {
      //   const path = `/#game-container`;
      //   router.push(path);
      // }, 150);
      

      gameRef.current.events.on('gameOver', (finalScore) => {
        setScore(finalScore);
        setIsPlaying(false);
        setShowGame(false);
        setShowFooter(true);
        if (gameRef.current) {
          gameRef.current.destroy(true);
        }
        gameSectionRef.current.style.height = '80vh';
      });

    } catch (error) {
      console.error('Failed to initialize game:', error);
      setIsLoading(false);
      setLoadingProgress(0);
      setShowGame(false);
      setIsPlaying(false);
      alert('Failed to load game resources. Please try again.');
      return;
    }

    setIsLoading(false);
    setLoadingProgress(0);
  };

  // Добавляем обработчик хэша URL
 

  return (
    <section className={styles.gameSection} ref={gameSectionRef} id="game-container" >
      <div className={styles.gameInfo}> 
        <h2>Legal Documents Collector</h2>
        <p>Collect legal documents and avoid obstacles!</p>
        <p className={styles.score}>Score: {score}</p>
        {!isPlaying && (
          <button 
            className={`${styles.startButton} ${isLoading ? styles.loading : ''}`} 
            onClick={startGame}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Start Game'}
          </button>
        )}
      </div>
      {isLoading && (
        <div className={styles.loadingScreen}>
          <div className={styles.spinner}></div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p>Loading game resources... {Math.round(loadingProgress)}%</p>
        </div>
      )}
      <div 
        
        className={`${styles.gameContainer} ${showGame ? styles.visible : styles.hidden}`} 
      />
      <GameFooter score={score} isVisible={showFooter} />
    </section>
  );
} 