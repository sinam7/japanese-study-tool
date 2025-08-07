import React from 'react';
import { hiraganaCategories } from '../../../data/extendedHiraganaData';
import { useHiraganaContext } from '../../../contexts/HiraganaContext';
import styles from './CategoryTabs.module.css';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const { selectedCharacters } = useHiraganaContext();
  const categoryKeys = Object.keys(hiraganaCategories);

  // 카테고리별 선택된 문자 수 계산
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

  // 카테고리별 전체 문자 수 계산
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
    <div className={styles.tabsContainer}>
      {categoryKeys.map(categoryKey => {
        const category = hiraganaCategories[categoryKey];
        const selectedCount = getSelectedCountForCategory(categoryKey);
        const totalCount = getTotalCountForCategory(categoryKey);
        
        return (
          <button
            key={categoryKey}
            className={`${styles.tab} ${activeCategory === categoryKey ? styles.active : ''}`}
            onClick={() => onCategoryChange(categoryKey)}
          >
            <span className={styles.tabName}>{category.name}</span>
            <span className={styles.tabCount}>
              {selectedCount}/{totalCount}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs; 