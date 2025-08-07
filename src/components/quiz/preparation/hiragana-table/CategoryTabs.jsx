import React, { useMemo } from 'react';
import { hiraganaCategories } from './extendedHiraganaData';
import { useHiraganaContext } from '../../../../contexts/HiraganaContext.jsx';
import styles from './CategoryTabs.module.css';

// 컴포넌트 외부에서 categoryKeys 계산 (정적 데이터이므로)
const categoryKeys = Object.keys(hiraganaCategories);

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const { selectedCharacters } = useHiraganaContext();

  // 모든 카테고리의 카운트를 한 번에 계산하여 메모이제이션
  const categoryCounts = useMemo(() => {
    const counts = {};
    
    categoryKeys.forEach(categoryKey => {
      const categoryData = hiraganaCategories[categoryKey].data;
      let selectedCount = 0;
      let totalCount = 0;
      
      categoryData.forEach(row => {
        row.characters.forEach(char => {
          if (char) {
            totalCount++;
            if (selectedCharacters.has(`${char.hiragana}-${char.romaji}`)) {
              selectedCount++;
            }
          }
        });
      });
      
      counts[categoryKey] = { selectedCount, totalCount };
    });
    
    return counts;
  }, [selectedCharacters]);

  return (
    <div className={styles.tabsContainer}>
      {categoryKeys.map(categoryKey => {
        const category = hiraganaCategories[categoryKey];
        const { selectedCount, totalCount } = categoryCounts[categoryKey];
        
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