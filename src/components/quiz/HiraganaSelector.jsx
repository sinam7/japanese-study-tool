import React from 'react';
import useHiraganaSelector from '../../hooks/useHiraganaSelector';
import '../../styles/components/HiraganaSelector.css';

const HiraganaSelector = ({ onStartQuiz }) => {
  const {
    // 상태들
    selectedCharacters,
    quizType,
    setQuizType,
    choiceCount,
    setChoiceCount,
    currentData,
    currentColumns,
    
    // 계산된 값들
    isAllSelected,
    selectedCharactersArray,
    
    // 함수들
    toggleCharacter,
    toggleRow,
    toggleColumn,
    toggleAll,
  } = useHiraganaSelector();

  const handleStartQuiz = () => {
    const settings = {
      type: quizType,
      choiceCount: choiceCount,
      autoSubmit: true // 기본값을 true로 설정
    };
    onStartQuiz(selectedCharactersArray, settings);
  };

  return (
    <div className="hiragana-selector">
      <div className="hiragana-table">
        {/* 열 헤더 */}
        <div className="table-header">
          <button 
            className="select-all-btn"
            onClick={toggleAll}
            title="전체 선택/해제"
          >
            {isAllSelected ? '전체\n해제' : '전체\n선택'}
          </button>
          {currentColumns.map((col, colIndex) => (
            <button
              key={col}
              className="column-header"
              onClick={() => toggleColumn(colIndex)}
              title={`${col}단 전체 선택/해제`}
            >
              {col}
            </button>
          ))}
        </div>

        {/* 각 행 */}
        {currentData.map((rowData, rowIndex) => (
          <div key={rowData.row} className="table-row">
            <button
              className="row-header"
              onClick={() => toggleRow(rowData)}
              title={`${rowData.row}행 전체 선택/해제`}
            >
              {rowData.row}
            </button>
            {rowData.characters.map((char, charIndex) => (
              <div key={charIndex} className="character-cell">
                {char ? (
                  <button
                    className={`character-btn ${
                      selectedCharacters.has(`${char.hiragana}-${char.romaji}`) ? 'selected' : ''
                    }`}
                    onClick={() => toggleCharacter(char)}
                  >
                    <div className="hiragana">{char.hiragana}</div>
                    <div className="romaji">{char.romaji}</div>
                  </button>
                ) : (
                  <div className="empty-cell"></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="bottom-sections">
        <div className="quiz-settings">
          <h3>퀴즈 설정</h3>
          <div className="setting-group">
            <label>퀴즈 타입:</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  value="input"
                  checked={quizType === 'input'}
                  onChange={(e) => setQuizType(e.target.value)}
                />
                <span>입력형 (히라가나 → 로마자 입력)</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  value="choice"
                  checked={quizType === 'choice'}
                  onChange={(e) => setQuizType(e.target.value)}
                />
                <span>선택형 (로마자 → 히라가나 선택)</span>
              </label>
            </div>
          </div>
          
          {quizType === 'choice' && (
            <div className="setting-group">
              <label>선택지 개수:</label>
              <div className="choice-count-buttons">
                {[3, 4, 5].map(count => (
                  <button
                    key={count}
                    className={`choice-count-btn ${choiceCount === count ? 'active' : ''}`}
                    onClick={() => setChoiceCount(count)}
                  >
                    {count}개
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedCharacters.size > 0 && (
          <div className="selected-characters">
            <button className="start-quiz-btn" onClick={handleStartQuiz}>
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
        )}
      </div>
    </div>
  );
};

export default HiraganaSelector; 