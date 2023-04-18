/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useSelector } from 'react-redux';
import { fetchLocations, locationsSelect } from '../../store/locationSlice';
import { useAppDispatch } from '../../store/store';
import { Locations } from '../../store/locationSlice/types';
import clearSvg from '../../assets/img/clear.svg';
import { setlocationId } from '../../store/filterSlice';

const SearchLocation: React.FC = React.memo(() => {
  const [active, setActive] = React.useState(false);
  const [value, setValue] = React.useState('');
  const dispatch = useAppDispatch();
  const { locations } = useSelector(locationsSelect);

  React.useEffect(() => {
    dispatch(
      fetchLocations(),
    );
  }, []);

  const onChangeSelect = (locationValue: React.SetStateAction<string>) => {
    setValue(locationValue);
    const locationId = locations.find((location: Locations) => (location.location === locationValue ? location.id : '')) as Locations;

    dispatch(
      setlocationId(String(locationId.id)),
    );
  };

  const onClickClear = () => {
    setValue('');
    setActive(false);
    dispatch(
      setlocationId(''),
    );
  };

  return (
    <div className="dropdown">
      <button type="button" onClick={() => setActive(!active)} className={active ? 'dropdown_btn dropdown_active' : 'dropdown_btn'}>
        {value || 'Location'}
        <svg className="dropdown_svg" width="10" height="6" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.3659e-08 1.09203 0L8.90797 6.73452e-07C9.87892 7.57113e-07 10.3652 1.15702 9.67861 1.8337Z" />
        </svg>
      </button>
      {active && (
      <ul onClick={() => setActive(!active)} className="dropdown_list">
        {locations.map((location: Locations) => <li onClick={(e) => onChangeSelect((e.target as HTMLElement).innerText)} className="dropdown_list-item" key={location.id}>{location.location}</li>)}
      </ul>
      )}
      {value
        && (
        <button type="button" className="dropdown_btn-clear" onClick={onClickClear}>
          <img src={clearSvg} alt="clear" />
        </button>
        )}
    </div>
  );
});

export default SearchLocation;
