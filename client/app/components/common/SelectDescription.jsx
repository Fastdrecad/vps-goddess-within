import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const DescriptionSelect = ({
  label,
  value,
  onChange,
  defaultValue,
  multi,
  error,
  options
}) => {
  const handleChange = selectedOption => {
    onChange(selectedOption.value);
  };

  const styles = `select-box${error ? ' invalid' : ''}`;

  const animatedComponents = makeAnimated();

  return (
    <div className={styles}>
      {label && <label>{label}</label>}
      <Select
        options={options.map(option => ({
          value: option,
          label: option
        }))}
        isMulti={multi}
        className='select-container'
        classNamePrefix='react-select'
        value={{ value: value, label: value }}
        onChange={handleChange}
        isClearable={true}
        defaultValue={defaultValue}
        components={animatedComponents}
        styles={dropdownStyles}
      />
    </div>
  );
};

export default DescriptionSelect;

const dropdownStyles = {
  control: (styles, { isFocused }) => {
    return {
      ...styles,
      color: '#000',
      fontFamily: 'Roboto',
      backgroundColor: 'white',
      transition: '0.3s',
      boxShadow: 'none',
      borderRadius: 0,
      fontSize: '14px',
      padding: '4px 0px',

      borderColor: isFocused ? '#000' : '#000',

      ':hover': {
        borderColor: !isFocused ? '#000' : '#000',
        boxShadow: 'none'
      }
    };
  },
  menu: styles => {
    return {
      ...styles,
      zIndex: 2
    };
  },
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: '#000',
      fontFamily: 'Roboto',
      fontSize: '14px',
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? '#eceef3'
        : isFocused
        ? '#f8f9fa'
        : undefined,

      ':hover': {
        ...styles[':hover'],
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? undefined
          : '#f8f9fa'
      },
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? '#000' : undefined
      }
    };
  },
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none'
  }),
  dropdownIndicator: (base, { isFocused }) => ({
    ...base,
    transform: isFocused ? 'rotate(180deg)' : undefined,
    transition: 'transform 0.3s'
  }),
  input: styles => ({
    ...styles,
    color: '#323232'
  }),
  placeholder: styles => ({
    ...styles,
    color: '#323232'
  }),
  singleValue: styles => ({
    ...styles,
    color: '#323232',
    fontFamily: 'Roboto'
  })
};
