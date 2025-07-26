import { useState, useCallback, useEffect } from 'react';
import { hiraganaData, columns } from '../data/hiraganaData';

const useHiraganaSelector = () => {
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

  return {
    // 상태들
    selectedCharacters,
    quizType,
    setQuizType,
    choiceCount,
    setChoiceCount,
    currentData,
    currentColumns,
    
    // 계산된 값들
    isAllSelected: isAllSelected(),
    selectedCharactersArray: getSelectedCharactersArray(),
    
    // 함수들
    toggleCharacter,
    toggleRow,
    toggleColumn,
    toggleAll,
  };
};

export default useHiraganaSelector; 