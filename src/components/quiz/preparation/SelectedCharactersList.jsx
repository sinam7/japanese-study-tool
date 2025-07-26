import React from 'react';
import '../../../styles/components/HiraganaSelector.css';

const SelectedCharactersList = ({ 
  selectedCharacters, 
  selectedCharactersArray, 
  onStartQuiz 
}) => {
  if (selectedCharacters.size === 0) {
    return null;
  }

  return (
    <div className="selected-characters">
      <button className="start-quiz-btn" onClick={onStartQuiz}>
        퀴즈 시작하기
      </button>

      <h3>선택된 히라가나 ({selectedCharacters.size}개):</h3>
      
      <div className="selected-list">
        {selectedCharactersArray.map((char, index) => (
          <span key={index} className="selected-char">
            {char.hiragana}({char.romaji})
          </span>
        ))}
      </div>
    </div>
  );
};

export default SelectedCharactersList; 