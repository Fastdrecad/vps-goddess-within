import Select from "react-select";
import { FaWindowClose } from "react-icons/fa";
import makeAnimated from "react-select/animated";

const SelectSizesQtyInput = ({
  sizeOptions,
  formData,
  setFormData,
  disabled,
  error,
  label,
  multi,
  defaultValue
}) => {
  const handleSizeChange = (selectedOption) => {
    const sizeExists = formData.sizes.some(
      (size) => size.size === selectedOption.value
    );

    if (!sizeExists) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        sizes: selectedOption
          ? [...prevFormData.sizes, { size: selectedOption.value, quantity: 1 }]
          : []
      }));
    }
  };

  const handleQuantityChange = (index, quantity) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sizes: prevFormData.sizes.map((item, i) =>
        i === index ? { ...item, quantity } : item
      )
    }));
  };

  const handleRemoveSize = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sizes: prevFormData.sizes.filter((_, index) => index !== indexToRemove)
    }));
  };

  const animatedComponents = makeAnimated();

  const styles = `select-box-size${error ? " invalid" : ""}`;

  return (
    <div className="d-flex flex-wrap gap-2">
      {formData?.sizes?.map((sizeObj, index) => (
        <div key={index}>
          <div className="border border-1 border-dark">
            <div className="border-bottom border-black">
              <label htmlFor="quantity" className="select-size-qty-label">
                Size & Qty*
              </label>
              <FaWindowClose
                style={{
                  fontSize: "15px",
                  cursor: "pointer",
                  fill: "black",
                  paddingRight: "4px"
                }}
                onClick={() => handleRemoveSize(index)}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center flex-column p-1">
              <div className={styles}>
                {label && <label>{label}</label>}
                <Select
                  value={{ value: sizeObj.size, label: sizeObj.size }}
                  onChange={(selectedOption) =>
                    handleSizeChange(selectedOption, index)
                  }
                  options={sizeOptions}
                  isDisabled={disabled}
                  className="select-container"
                  classNamePrefix="react-select"
                  components={animatedComponents}
                  isMulti={multi}
                  defaultValue={defaultValue}
                  styles={dropdownStyles}
                />
                <span className="invalid-message">{error && error[0]}</span>
              </div>
              <input
                style={{ maxWidth: "80px", padding: "4px 6px" }}
                type="number"
                placeholder="qty"
                value={sizeObj.quantity}
                onChange={(e) =>
                  handleQuantityChange(index, parseInt(e.target.value))
                }
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectSizesQtyInput;

const dropdownStyles = {
  control: (styles, { isFocused }) => {
    return {
      ...styles,
      color: "#000",
      fontFamily: "Roboto",
      backgroundColor: "white",
      transition: "0.3s",
      boxShadow: "none",
      borderRadius: 0,
      fontSize: "14px",
      padding: "4px 0px",

      borderColor: isFocused ? "#000" : "#000",

      ":hover": {
        borderColor: !isFocused ? "#000" : "#000",
        boxShadow: "none"
      }
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      zIndex: 2
    };
  },
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: "#000",
      fontFamily: "Roboto",
      fontSize: "14px",
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? "#eceef3"
          : isFocused
            ? "#f8f9fa"
            : undefined,

      ":hover": {
        ...styles[":hover"],
        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? undefined
            : "#f8f9fa"
      },
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? "#000" : undefined
      }
    };
  },
  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none"
  }),
  dropdownIndicator: (base, { isFocused }) => ({
    ...base,
    transform: isFocused ? "rotate(180deg)" : undefined,
    transition: "transform 0.3s"
  }),
  input: (styles) => ({
    ...styles,
    color: "#323232"
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "#323232"
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#323232",
    fontFamily: "Roboto"
  })
};
