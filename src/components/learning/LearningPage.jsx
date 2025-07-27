import React from 'react';
import HiraganaCard from './HiraganaCard';
import { hiraganaData } from '../../data/hiraganaData';
import styles from './LearningPage.module.css';

const LearningPage = () => {
  return (
    <div className={styles.learningPage}>
      <h2 className={styles.learningPageTitle}>히라가나 연상 학습</h2>
      <div className={styles.hiraganaCardsContainer}>
        {hiraganaData.map(row => {
          return row.characters.map((char, index) => {
            if (char) {
              return (
                <HiraganaCard
                  key={`${row.row}-${index}`}
                  hiragana={char.hiragana}
                  romaji={char.romaji}
                  image={char.image || ''}
                  description={char.description || ''}
                />
              );
            }
            return null;
          });
        })}
      </div>
    </div>
  );
};

export default LearningPage;