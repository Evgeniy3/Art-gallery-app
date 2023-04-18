import React from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch } from 'react-redux';
import styles from './Pagination.module.scss';
import { setCurrentPage } from '../../store/filterSlice';

const PaginationBlock: React.FC = () => {
  const [activePage, setActivePage] = React.useState(1);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      setCurrentPage(activePage),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  return (
    <div className={styles.pagination_block}>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={12}
        totalItemsCount={33}
        pageRangeDisplayed={3}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={setActivePage.bind(this)}
        prevPageText="<"
        nextPageText=">"
      />
    </div>
  );
};

export default PaginationBlock;
