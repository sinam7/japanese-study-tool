import React from 'react';
import styles from './CategoryInfo.module.css';

const CategoryInfo = ({ category }) => {
  return (
    <div className={styles.categoryDescription}>
      <h3 className={styles.categoryTitle}>{category.name}</h3>
      <p className={styles.categorySubtext}>{category.description}</p>
    </div>
  );
};

export default CategoryInfo; 