const Input = props => {
  const {
    id,
    autoComplete,
    type,
    value,
    error,
    step,
    decimals,
    min,
    max,
    disabled,
    placeholder,
    rows,
    label,
    name,
    inlineElement,
    onInputChange,
    onInputFocus,
    onInputBlur
  } = props;

  if (type === 'textarea') {
    const styles = `input-box${error ? ' invalid' : ''}`;

    return (
      <div className={styles}>
        {label && <label htmlFor={id}>{label}</label>}
        <textarea
          type={'textarea'}
          onChange={onInputChange}
          rows={rows}
          name={name}
          value={value}
          placeholder={placeholder}
          className={'textarea-text'}
        />
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  } else if (type === 'number') {
    const styles = `input-box${error ? ' invalid' : ''}`;

    const handleOnInput = e => {
      // allow decimals
      if (decimals) {
        // Allow digits, dots, and only one dot
        e.target.value = e.target.value.replace(/[^\d.]/g, '');

        // Ensure only one dot
        const dotCount = e.target.value.split('.').length - 1;
        if (dotCount > 1) {
          e.target.value = e.target.value.slice(0, -1);
        }
      }
    };
    return (
      <div className={styles}>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          autoComplete={autoComplete}
          step={step}
          min={min || 0}
          max={max || null}
          pattern='[0-9]'
          onInput={handleOnInput}
          type={type}
          onChange={onInputChange}
          disabled={disabled}
          name={name}
          value={value}
          placeholder={placeholder}
          className={'input-number'}
        />
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  } else {
    const styles = `input-box${inlineElement ? ` inline-btn-box` : ''} ${
      error ? 'invalid' : ''
    }`;

    return (
      <div className={styles}>
        {label && <label htmlFor={id}>{label}</label>}
        <div className='input-text-block'>
          <input
            id={id}
            className={'input-text'}
            autoComplete={autoComplete}
            type={type}
            onChange={onInputChange}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            disabled={disabled}
            name={name}
            value={value}
            placeholder={placeholder}
          />
          {inlineElement}
        </div>
        <span className='invalid-message'>{error && error[0]}</span>
      </div>
    );
  }
};

export default Input;
