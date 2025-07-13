import React from 'react';
import HiraganaCard from './HiraganaCard';
import { hiraganaData } from '../../data/hiraganaData';
import '../../styles/components/LearningPage.css';

const LearningPage = () => {
  return (
    <div className="learning-page">
      <h2>히라가나 연상 학습</h2>
      <div className="hiragana-cards-container">
        {hiraganaData.map(row => {
          return row.characters.map((char, index) => {
            if (char) {
              return (
                <HiraganaCard
                  key={`${row.row}-${index}`}
                  hiragana={char.hiragana}
                  romanji={char.romaji}
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