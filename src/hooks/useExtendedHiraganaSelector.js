import { useState, useCallback, useEffect, useMemo } from 'react';
import { hiraganaCategories, columns } from '../data/extendedHiraganaData';

const useExtendedHiraganaSelector = () => {
  const [selectedCharacters, setSelectedCharacters] = useState(new Set());
  // sessionStorage에서 퀴즈 타입 불러오기
  const [quizType, setQuizType] = useState(() => {
    return sessionStorage.getItem('quiz-type') || 'input';
  });
  const [choiceCount, setChoiceCount] = useState(3);
  const [isWideScreen, setIsWideScreen] = useState(false);

  // 카테고리별 가로 모드용 전치 데이터 생성
  const getTransposedDataForCategory = useCallback((categoryData) => {
    const transposed = [];
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const newRow = {
        row: columns[colIndex],
        characters: categoryData.map(rowData => rowData.characters[colIndex])
      };
      transposed.push(newRow);
    }
    return transposed;
  }, []);

  // 화면 크기에 따른 반응형 카테고리 데이터
  const getResponsiveData = useCallback((categoryKey) => {
    const originalData = hiraganaCategories[categoryKey].data;
    return isWideScreen ? getTransposedDataForCategory(originalData) : originalData;
  }, [isWideScreen, getTransposedDataForCategory]);

  // 화면 크기에 따른 반응형 컬럼
  const getResponsiveColumns = useCallback((categoryKey) => {
    const originalData = hiraganaCategories[categoryKey].data;
    return isWideScreen ? originalData.map(row => row.row) : columns;
  }, [isWideScreen]);

  // 모든 카테고리의 데이터를 합친 전체 데이터
  const allCharactersList = useMemo(() => {
    const allChars = [];
    Object.values(hiraganaCategories).forEach(category => {
      category.data.forEach(row => {
        row.characters.forEach(char => {
          if (char) {
            allChars.push(char);
          }
        });
      });
    });
    return allChars;
  }, []);

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
    const key = `${character.hiragana}-${character.romaji}`;
    setSelectedCharacters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  }, []);

  // 행 전체 토글 (특정 카테고리 내에서)
  const toggleRow = useCallback((rowData) => {
    const rowCharacters = rowData.characters.filter(char => char !== null);
    const rowKeys = rowCharacters.map(char => `${char.hiragana}-${char.romaji}`);
    
    const allSelected = rowKeys.every(key => selectedCharacters.has(key));
    
    setSelectedCharacters(prev => {
      const newSet = new Set(prev);
      if (allSelected) {
        rowKeys.forEach(key => newSet.delete(key));
      } else {
        rowKeys.forEach(key => newSet.add(key));
      }
      return newSet;
    });
  }, [selectedCharacters]);

  // 열 전체 토글 (특정 카테고리 내에서)
  const toggleColumn = useCallback((colIndex, currentData) => {
    const columnCharacters = currentData
      .map(row => row.characters[colIndex])
      .filter(char => char !== null);
    
    const columnKeys = columnCharacters.map(char => `${char.hiragana}-${char.romaji}`);
    const allSelected = columnKeys.every(key => selectedCharacters.has(key));
    
    setSelectedCharacters(prev => {
      const newSet = new Set(prev);
      if (allSelected) {
        columnKeys.forEach(key => newSet.delete(key));
      } else {
        columnKeys.forEach(key => newSet.add(key));
      }
      return newSet;
    });
  }, [selectedCharacters]);

  // 전체 선택/해제 (현재 카테고리만)
  const toggleAll = useCallback((currentData) => {
    const allCharacters = [];
    currentData.forEach(row => {
      row.characters.forEach(char => {
        if (char) allCharacters.push(char);
      });
    });
    
    const allKeys = allCharacters.map(char => `${char.hiragana}-${char.romaji}`);
    const allSelected = allKeys.every(key => selectedCharacters.has(key));
    
    setSelectedCharacters(prev => {
      const newSet = new Set(prev);
      if (allSelected) {
        allKeys.forEach(key => newSet.delete(key));
      } else {
        allKeys.forEach(key => newSet.add(key));
      }
      return newSet;
    });
  }, [selectedCharacters]);

  // 전체 카테고리에서 모든 문자 선택/해제
  const toggleAllCategories = useCallback(() => {
    const allKeys = allCharactersList.map(char => `${char.hiragana}-${char.romaji}`);
    const allSelected = allKeys.every(key => selectedCharacters.has(key));
    
    setSelectedCharacters(prev => {
      if (allSelected) {
        return new Set();
      } else {
        return new Set(allKeys);
      }
    });
  }, [allCharactersList, selectedCharacters]);

  // 현재 카테고리의 모든 선택 상태 확인
  const isAllSelected = useCallback((currentData) => {
    const allCharacters = [];
    currentData.forEach(row => {
      row.characters.forEach(char => {
        if (char) allCharacters.push(char);
      });
    });
    
    if (allCharacters.length === 0) return false;
    
    return allCharacters.every(char => 
      selectedCharacters.has(`${char.hiragana}-${char.romaji}`)
    );
  }, [selectedCharacters]);

  // 선택된 문자들을 실제 문자 객체로 변환
  const selectedCharactersList = useMemo(() => {
    return allCharactersList.filter(char => 
      selectedCharacters.has(`${char.hiragana}-${char.romaji}`)
    );
  }, [allCharactersList, selectedCharacters]);

  // 선택된 문자 수
  const selectedCount = selectedCharacters.size;

  return {
    selectedCharacters,
    selectedCharactersList,
    selectedCount,
    quizType,
    setQuizType,
    choiceCount,
    setChoiceCount,
    isWideScreen,
    toggleCharacter,
    toggleRow,
    toggleColumn,
    toggleAll,
    toggleAllCategories,
    isAllSelected,
    allCharactersList,
    getResponsiveData,
    getResponsiveColumns
  };
};

export default useExtendedHiraganaSelector; 