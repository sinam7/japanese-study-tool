import React, { useState } from 'react';
import HiraganaTable from './HiraganaTable';
import { hiraganaCategories } from '../../../data/extendedHiraganaData';
import styles from './ExtendedHiraganaTable.module.css';

const ExtendedHiraganaTable = ({ 
  selectedCharacters, 
  isAllSelected,
  toggleCharacter,
  toggleRow,
  toggleColumn,
  toggleAll,
  getResponsiveData,
  getResponsiveColumns
}) => {
  const [activeCategory, setActiveCategory] = useState('basic');

  const categoryKeys = Object.keys(hiraganaCategories);
  const currentCategory = hiraganaCategories[activeCategory];
  const currentData = getResponsiveData(activeCategory);
  const currentColumns = getResponsiveColumns(activeCategory);

  // 현재 카테고리의 선택된 문자 수 계산
  const getSelectedCountForCategory = (categoryKey) => {
    const categoryData = hiraganaCategories[categoryKey].data;
    let count = 0;
    
    categoryData.forEach(row => {
      row.characters.forEach(char => {
        if (char && selectedCharacters.has(`${char.hiragana}-${char.romaji}`)) {
          count++;
        }
      });
    });
    
    return count;
  };

  // 현재 카테고리의 전체 문자 수 계산
  const getTotalCountForCategory = (categoryKey) => {
    const categoryData = hiraganaCategories[categoryKey].data;
    let count = 0;
    
    categoryData.forEach(row => {
      row.characters.forEach(char => {
        if (char) count++;
      });
    });
    
    return count;
  };

  return (
    <div className={styles.extendedHiraganaTable}>
      {/* 탭 헤더 */}
      <div className={styles.tabsContainer}>
        {categoryKeys.map(categoryKey => {
          const category = hiraganaCategories[categoryKey];
          const selectedCount = getSelectedCountForCategory(categoryKey);
          const totalCount = getTotalCountForCategory(categoryKey);
          
          return (
            <button
              key={categoryKey}
              className={`${styles.tab} ${activeCategory === categoryKey ? styles.active : ''}`}
              onClick={() => setActiveCategory(categoryKey)}
            >
              <span className={styles.tabName}>{category.name}</span>
              <span className={styles.tabCount}>
                {selectedCount}/{totalCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* 카테고리 설명 */}
      <div className={styles.categoryDescription}>
        <h3 className={styles.categoryTitle}>{currentCategory.name}</h3>
        <p className={styles.categorySubtext}>{currentCategory.description}</p>
      </div>

      {/* 히라가나 테이블 */}
      <HiraganaTable
        selectedCharacters={selectedCharacters}
        currentData={currentData}
        currentColumns={currentColumns}
        isAllSelected={isAllSelected(currentData)}
        toggleCharacter={toggleCharacter}
        toggleRow={toggleRow}
        toggleColumn={(colIndex) => toggleColumn(colIndex, currentData)}
        toggleAll={() => toggleAll(currentData)}
        currentCategory={activeCategory}
      />
    </div>
  );
};

export default ExtendedHiraganaTable; 