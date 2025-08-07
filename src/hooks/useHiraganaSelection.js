import { useState, useCallback } from 'react';

const useHiraganaSelection = () => {
  const [selectedCharacters, setSelectedCharacters] = useState(new Set());

  // 공통 토글 로직을 위한 헬퍼 함수
  const toggleCharactersHelper = useCallback((characters) => {
    setSelectedCharacters(prev => {
      const newSet = new Set(prev);
      const validCharacters = characters.filter(char => char);
      
      // 모든 문자가 선택되어 있는지 확인
      const allSelected = validCharacters.every(char => 
        newSet.has(`${char.hiragana}-${char.romaji}`)
      );
      
      // 모두 선택되어 있으면 해제, 아니면 선택
      validCharacters.forEach(char => {
        const key = `${char.hiragana}-${char.romaji}`;
        if (allSelected) {
          newSet.delete(key);
        } else {
          newSet.add(key);
        }
      });
      
      return newSet;
    });
  }, []);

  // 개별 문자 토글
  const toggleCharacter = useCallback((char) => {
    setSelectedCharacters(prev => {
      const newSet = new Set(prev);
      const key = `${char.hiragana}-${char.romaji}`;
      
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      
      return newSet;
    });
  }, []);

  // 행 전체 토글
  const toggleRow = useCallback((rowData) => {
    const rowCharacters = rowData.characters;
    toggleCharactersHelper(rowCharacters);
  }, [toggleCharactersHelper]);

  // 열 전체 토글
  const toggleColumn = useCallback((colIndex, currentData) => {
    const columnCharacters = currentData.map(row => row.characters[colIndex]);
    toggleCharactersHelper(columnCharacters);
  }, [toggleCharactersHelper]);

  // 전체 토글
  const toggleAll = useCallback((currentData) => {
    const allCharacters = currentData.flatMap(row => row.characters);
    toggleCharactersHelper(allCharacters);
  }, [toggleCharactersHelper]);

  // 특정 데이터셋의 전체 선택 여부 확인
  const isAllSelected = useCallback((currentData) => {
    const allCharacters = currentData
      .flatMap(row => row.characters)
      .filter(char => char);
    
    return allCharacters.length > 0 && allCharacters.every(char => 
      selectedCharacters.has(`${char.hiragana}-${char.romaji}`)
    );
  }, [selectedCharacters]);

  return {
    selectedCharacters,
    toggleCharacter,
    toggleRow,
    toggleColumn,
    toggleAll,
    isAllSelected,
    setSelectedCharacters
  };
};

export default useHiraganaSelection; 