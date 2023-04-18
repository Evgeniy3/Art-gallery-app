import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ArtItem.module.scss';
import { authorsSelect } from '../../store/authorSlice';
import { locationsSelect } from '../../store/locationSlice';
import { Art } from '../../store/artSlice/types';
import { Authors } from '../../store/authorSlice/types';
import { Locations } from '../../store/locationSlice/types';

const ArtItem: React.FC<Art> = ({
  authorId, locationId, imageUrl, name, created,
}) => {
  const { authors } = useSelector(authorsSelect);
  const { locations } = useSelector(locationsSelect);

  return (
    <div className={styles.item}>
      <img className={styles.item_img} src={`https://test-front.framework.team/${imageUrl}`} alt="" />
      <div className={styles.item_description}>
        <h4 className={styles.item_title}>{name}</h4>
        <p className={styles.item_text}>
          Author:
          <span>{authors.map((author: Authors) => (author.id === authorId ? author.name : ''))}</span>
        </p>
        <p className={styles.item_text}>
          Created:
          <span>{created}</span>
        </p>
        <p className={styles.item_text}>
          Location:
          <span>{locations.map((location: Locations) => (location.id === locationId ? location.location : ''))}</span>
        </p>
      </div>
    </div>
  );
};

export default ArtItem;
