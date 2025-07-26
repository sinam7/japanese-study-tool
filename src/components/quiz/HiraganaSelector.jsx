import React, { useState, useCallback, useEffect } from 'react';
import { hiraganaData, columns } from '../../data/hiraganaData';
import '../../styles/components/HiraganaSelector.css';

const HiraganaSelector = ({ onStartQuiz }) => {
  const [selectedCharacters, setSelectedCharacters] = useState(new Set());
  // sessionStorage에서 퀴즈 타입 불러오기
  const [quizType, setQuizType] = useState(() => {
    return sessionStorage.getItem('quiz-type') || 'input';
  });
  const [choiceCount, setChoiceCount] = useState(3);
  const [isWideScreen, setIsWideScreen] = useState(false);

  // 가로 모드용 전치 데이터 생성
  const getTransposedData = useCallback(() => {
    const transposed = [];
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const newRow = {
        row: columns[colIndex],
        characters: hiraganaData.map(rowData => rowData.characters[colIndex])
      };
      transposed.push(newRow);
    }
    return transposed;
  }, []);

  // 화면 크기에 따른 반응형 데이터
  const currentData = isWideScreen ? getTransposedData() : hiraganaData;
  const currentColumns = isWideScreen ? hiraganaData.map(row => row.row) : columns;

  // quizType을 sessionStorage에 저장
  useEffect(() => {
    sessionStorage.setItem('quiz-type', quizType);
  }, [quizType]);

  // 미디어 쿼리 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 912px)');
    setIsWideScreen(mediaQuery.matches);

    const handleChange = (e) => {
      setIsWideScreen(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 개별 문자 토글
  const toggleCharacter = useCallback((character) => {
    setSelectedCharacters(prev => {
      const newSet = new Set(prev);
      const key = `${character.hiragana}-${character.romaji}`;
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  }, []);

  // 행별 전체 토글
  const toggleRow = useCallback((rowData) => {
    const rowCharacters = rowData.characters.filter(char => char !== null);
    const allSelected = rowCharacters.every(char => 
      selectedCharacters.has(`${char.hiragana}-${char.romaji}`)
    );

    setSelectedCharacters(prev => {
      const newSet = new Set(prev);
      rowCharacters.forEach(char => {
        const key = `${char.hiragana}-${char.romaji}`;
        if (allSelected) {
          newSet.delete(key);
        } else {
          newSet.add(key);
        }
      });
      return newSet;
    });
  }, [selectedCharacters]);

  // 열별 전체 토글
  const toggleColumn = useCallback((columnIndex) => {
    const columnCharacters = currentData
      .map(row => row.characters[columnIndex])
      .filter(char => char !== null);
    
    const allSelected = columnCharacters.every(char => 
      selectedCharacters.has(`${char.hiragana}-${char.romaji}`)
    );

    setSelectedCharacters(prev => {
      const newSet = new Set(prev);
      columnCharacters.forEach(char => {
        const key = `${char.hiragana}-${char.romaji}`;
        if (allSelected) {
          newSet.delete(key);
        } else {
          newSet.add(key);
        }
      });
      return newSet;
    });
  }, [selectedCharacters, currentData]);

  // 전체 선택/해제
  const toggleAll = useCallback(() => {
    const allCharacters = hiraganaData
      .flatMap(row => row.characters)
      .filter(char => char !== null);
    
    const allSelected = allCharacters.every(char => 
      selectedCharacters.has(`${char.hiragana}-${char.romaji}`)
    );

    if (allSelected) {
      // 모든 문자가 선택된 경우에만 해제
      setSelectedCharacters(new Set());
    } else {
      // 0개 또는 일부만 선택된 경우 전체 선택
      setSelectedCharacters(new Set(allCharacters.map(char => `${char.hiragana}-${char.romaji}`)));
    }
  }, [selectedCharacters]);

  // 전체 선택 상태 확인
  const isAllSelected = useCallback(() => {
    const allCharacters = hiraganaData
      .flatMap(row => row.characters)
      .filter(char => char !== null);
    
    return allCharacters.every(char => 
      selectedCharacters.has(`${char.hiragana}-${char.romaji}`)
    );
  }, [selectedCharacters]);

  // 선택된 문자들을 배열로 변환
  const getSelectedCharactersArray = useCallback(() => {
    return Array.from(selectedCharacters).map(key => {
      const [hiragana, romaji] = key.split('-');
      return { hiragana, romaji };
    });
  }, [selectedCharacters]);

  const handleStartQuiz = () => {
    const settings = {
      type: quizType,
      choiceCount: choiceCount,
      autoSubmit: true // 기본값을 true로 설정
    };
    onStartQuiz(getSelectedCharactersArray(), settings);
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
            {isAllSelected() ? '전체\n해제' : '전체\n선택'}
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
              {getSelectedCharactersArray().map((char, index) => (
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