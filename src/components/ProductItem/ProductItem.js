import React from 'react';
import styles from './style.less';

const ProductItem = ({ imageLink, productName, price, isSale, isExclusive }) => {
  return (
    <div className={styles.ProductItem}>
      <img src={imageLink} alt={productName} />
      <div>
        {isSale && <div className={styles.sale}>{'Sale'}</div>}
        {isExclusive && <div className={styles.exclusive}>{'Exclusive'}</div>}
      </div>
      <div className={styles.info}>
        <div>{productName}</div>
        <div>{price}</div>
      </div>
    </div>
  );
};

export default ProductItem;
