/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { setCreatedFrom, setCreatedBefore } from '../../store/filterSlice';
import clearSvg from '../../assets/img/clear.svg';

const SearchCreated = React.memo(() => {
  const dispatch = useDispatch();
  const [active, setActive] = React.useState(false);
  const [createdFrom, setCreateFrom] = React.useState('');
  const [createdBefore, setCreateBefore] = React.useState('');

  const updateCreatedFrom = React.useCallback(
    debounce((str: string) => {
      dispatch(setCreatedFrom(str));
    }, 350),
    [],
  );

  const updateCreatedBefore = React.useCallback(
    debounce((str: string) => {
      dispatch(setCreatedBefore(str));
    }, 350),
    [],
  );

  const onChangeInputFrom = (valueFrom: string) => {
    setCreateFrom(valueFrom);
    updateCreatedFrom(valueFrom);
  };

  const onChangeInputBefore = (valueBefore: string) => {
    setCreateBefore(valueBefore);
    updateCreatedBefore(valueBefore);
  };

  const onClickClear = () => {
    dispatch(setCreatedFrom(''));
    dispatch(setCreatedBefore(''));
    setCreateFrom('');
    setCreateBefore('');
  };

  return (
    <div className="dropdown">
      <button type="button" onClick={() => setActive(!active)} className={active ? 'dropdown_btn dropdown_active' : 'dropdown_btn'}>
        {createdFrom || createdBefore ? `${createdFrom} - ${createdBefore}` : 'Created'}
        <svg className="dropdown_svg" width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.3659e-08 1.09203 0L8.90797 6.73452e-07C9.87892 7.57113e-07 10.3652 1.15702 9.67861 1.8337Z" />
        </svg>
      </button>
      {active && (
        <ul className="dropdown_range">
          <li className="dropdown_range-item dropdown_range-after">
            <input
              className="dropdown_range-input"
              onChange={(e) => onChangeInputFrom(String(e.target.value))}
              type="number"
              value={createdFrom}
              placeholder="from"
            />
          </li>
          <li className="dropdown_range-item">
            <input
              className="dropdown_range-input"
              onChange={(e) => onChangeInputBefore(String(e.target.value))}
              type="number"
              value={createdBefore}
              placeholder="before"
            />
          </li>
        </ul>
      )}
      {(createdFrom || createdBefore)
        && (
          <button type="button" className="dropdown_btn-clear" onClick={onClickClear}>
            <img src={clearSvg} alt="clear" />
          </button>
        )}
    </div>
  );
});

export default SearchCreated;
