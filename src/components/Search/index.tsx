import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../store/filterSlice';
import clearSvg from '../../assets/img/clear.svg';

const Search: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 350),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className="dropdown">
      <input
        ref={inputRef}
        className="dropdown_search-input"
        type="text"
        placeholder="Name"
        value={value}
        onChange={onChangeInput}
      />
      {value
          && (
          <button type="button" className="dropdown_btn-clear" onClick={onClickClear}>
            <img src={clearSvg} alt="clear" />
          </button>
          )}
    </div>
  );
});

export default Search;
