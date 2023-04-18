import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './ArtItem.module.scss';

const Skeleton: React.FC = () => (
  <ContentLoader
    className={styles.item}
    speed={2}
    width={360}
    height={275}
    viewBox="0 0 360 275"
    backgroundColor="#ededed"
    foregroundColor="#f5f5f5"
  >
    <rect x="6" y="0" rx="20" ry="20" width="360" height="275" />
  </ContentLoader>
);

export default Skeleton;
