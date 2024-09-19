import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

const SelectByFieldName = ({
  formData,
  data,
  error,
  type,
  setFormData,
  label
}) => {
  const fieldName = type;

  const styles = `select-box${error ? ' invalid' : ''}`;

  const animatedComponents = makeAnimated();

  return (
    <div className={styles}>
      {label && <label>{label}</label>}
      <CreatableSelect
        className='select-container'
        classNamePrefix='react-select'
        components={animatedComponents}
        styles={dropdownStyles}
        value={
          formData[fieldName]
            ? {
                label: formData[fieldName].name,
                value: formData[fieldName].name
              }
            : null
        }
        onChange={selectedOption => {
          if (selectedOption) {
            const selectedData = data.find(
              item => item.name === selectedOption.value
            );
            if (selectedData) {
              setFormData(prevFormData => ({
                ...prevFormData,
                [fieldName]: {
                  ...prevFormData[fieldName],
                  name: selectedOption.value,
                  _id: selectedData._id
                }
              }));
            } else {
              const newData = {
                name: selectedOption.value
              };

              setFormData(prevFormData => ({
                ...prevFormData,
                [fieldName]: newData
              }));
            }
          } else {
            setFormData(prevFormData => ({
              ...prevFormData,
              [fieldName]: null
            }));
          }
        }}
        onCreateOption={newOption => {
          const newData = {
            name: newOption
          };

          setFormData(prevFormData => ({
            ...prevFormData,
            [fieldName]: newData
          }));
        }}
        options={data.map(item => ({
          value: item.name,
          label: item.name
        }))}
      />
    </div>
  );
};

export default SelectByFieldName;

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
