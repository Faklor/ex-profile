'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './Game.module.scss';

let Phaser;
if (typeof window !== 'undefined') {
  Phaser = require('phaser');
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
  }

  preload() {
    this.load.image('player', '/game/accountant.png');
    this.load.image('document', '/game/document.png');
    this.load.image('obstacle', '/game/warning.png');
  }

  create() {
    this.player = this.add.sprite(400, 500, 'player');
    this.player.setDisplaySize(64, 64);

    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    this.documents = this.physics.add.group();
    this.obstacles = this.physics.add.group();

    this.physics.add.overlap(this.player, this.documents, this.collectDocument, null, this);
    this.physics.add.overlap(this.player, this.obstacles, this.gameOver, null, this);

    // Анимация покачивания для игрока
    this.tweens.add({
      targets: this.player,
      y: '+=10',
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.inOut'
    });

    // Таймеры для создания объектов
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnDocument,
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 3000,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'Arial'
    });

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

  spawnDocument() {
    const x = Phaser.Math.Between(100, 700);
    const document = this.documents.create(x, 0, 'document');
    document.setDisplaySize(40, 48);
    document.setVelocityY(200);
  }

  spawnObstacle() {
    const x = Phaser.Math.Between(100, 700);
    const obstacle = this.obstacles.create(x, 0, 'obstacle');
    obstacle.setDisplaySize(40, 40);
    obstacle.setVelocityY(300);
  }

  collectDocument(player, document) {
    document.destroy();
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    this.tweens.add({
      targets: this.scoreText,
      scale: 1.2,
      duration: 100,
      yoyo: true
    });
  }

  gameOver() {
    this.scene.pause();
    this.game.events.emit('gameOver', this.score);
  }
}

export default function Game() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const gameRef = useRef(null);

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

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);

    const { width, height } = getGameDimensions();

    const config = {
      type: Phaser.AUTO,
      parent: 'game-container',
      width,
      height,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container',
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      },
      scene: GameScene,
      backgroundColor: '#1a1a1a'
    };

    gameRef.current = new Phaser.Game(config);

    gameRef.current.events.on('gameOver', (finalScore) => {
      setScore(finalScore);
      setIsPlaying(false);
      gameRef.current.destroy(true);
    });
  };

  return (
    <section className={styles.gameSection}>
      <div className={styles.gameInfo}>
        <h2>Legal Documents Collector</h2>
        <p>Collect legal documents and avoid obstacles!</p>
        <p className={styles.score}>Score: {score}</p>
        {!isPlaying && (
          <button className={styles.startButton} onClick={startGame}>
            Start Game
          </button>
        )}
      </div>
      <div id="game-container" className={styles.gameContainer} />
    </section>
  );
} 