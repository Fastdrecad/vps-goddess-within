import { useEffect, useRef, useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp
} from 'react-icons/md';

const Dropdown = ({ value, options, onChange, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleDropdownClick = e => {
      if (!dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleDropdownClick, true);

    return () => {
      document.removeEventListener('click', handleDropdownClick, true);
    };
  }, []);

  const handleChange = option => {
    onChange(option);
    setIsOpen(false);
  };

  const renderedOptions = options?.map(option => {
    return (
      <li
        onClick={() => handleChange(option)}
        key={option.value}
        className='dropdown-listItem'
      >
        {option.label}
      </li>
    );
  });

  return (
    <div ref={dropDownRef} className='dropdown-container'>
      <div
        onClick={handleClick}
        className={`dropdown-header ${isOpen ? 'active' : ''}`}
      >
        {value?.label || title}
        {isOpen ? (
          <MdOutlineKeyboardArrowUp style={{ fontSize: '25px' }} />
        ) : (
          <MdOutlineKeyboardArrowDown style={{ fontSize: '25px' }} />
        )}
      </div>
      {isOpen && (
        <div className='dropdownList-container'>
          <ul className='dropdown-list'>{renderedOptions}</ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
