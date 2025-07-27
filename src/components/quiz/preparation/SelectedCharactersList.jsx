import React from 'react';
import styles from './SelectedCharactersList.module.css';

const SelectedCharactersList = ({ 
  selectedCharacters, 
  selectedCharactersArray, 
  onStartQuiz 
}) => {
  if (selectedCharacters.size === 0) {
    return null;
  }

  return (
    <div className={styles.selectedCharacters}>
      <button className={styles.startQuizBtn} onClick={onStartQuiz}>
        퀴즈 시작하기
      </button>

      <h3>선택된 히라가나 ({selectedCharacters.size}개):</h3>
      
      <div className={styles.selectedList}>
        {selectedCharactersArray.map((char, index) => (
          <span key={index} className={styles.selectedChar}>
            {char.hiragana}({char.romaji})
          </span>
        ))}
      </div>
    </div>
  );
};

export default SelectedCharactersList; 