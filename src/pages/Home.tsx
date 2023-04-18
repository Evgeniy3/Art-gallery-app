import React from 'react';
import { useSelector } from 'react-redux';
import Search from '../components/Search';
import SearchAuthor from '../components/SearchAuthor';
import SearchLocation from '../components/SearchLocation';
import SearchCreated from '../components/SearchCreated';
import ArtItem from '../components/ArtItem';
import { artSelect, fetchArts } from '../store/artSlice';
import { useAppDispatch } from '../store/store';
import { Art } from '../store/artSlice/types';
import { filterSelect } from '../store/filterSlice';
import Skeleton from '../components/ArtItem/Skeleton';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(artSelect);
  const {
    searchValue, currentPage, authorId, locationId, createdFrom, createdBefore,
  } = useSelector(filterSelect);

  const getArts = async () => {
    const search = searchValue;
    const currentAuthor = authorId ? `${authorId}` : '';
    const currentLocation = locationId ? `${locationId}` : '';
    const currentCreatedFrom = createdFrom ? `${createdFrom}` : '';
    const currentCreatedBefore = createdBefore ? `${createdBefore}` : '';

    dispatch(
      fetchArts({
        search,
        currentPage,
        currentAuthor,
        currentLocation,
        currentCreatedFrom,
        currentCreatedBefore,
      }),
    );
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getArts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, currentPage, authorId, locationId, createdFrom, createdBefore]);

  const arts = items.map((obj: Art) => <ArtItem key={obj.id} {...obj} />);
  const skeletons = [...new Array(12)].map((_) => <Skeleton key={Math.random()} />);

  return (
    <>
      <div className="filter_block">
        <Search />
        <SearchAuthor />
        <SearchLocation />
        <SearchCreated />
      </div>
      {status === 'error' ? (
        <div className="content_item-error">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить арты. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content_item">{status === 'loading' ? skeletons : arts}</div>
      )}
    </>
  );
};

export default Home;
