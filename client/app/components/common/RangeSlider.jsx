import { useState } from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls='rc-slider-tooltip'
      overlay={`$${value}`}
      visible={dragging}
      placement='top'
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const RangeSlider = ({
  type = 'range',
  marks,
  step,
  defaultValue,
  max,
  allowCross,
  onChange
}) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [rangeValue, setRangeValue] = useState(defaultValue);

  const onSliderChange = v => {
    setSliderValue(v);
  };

  const onRangeChange = v => {
    setRangeValue(v);
  };

  const onAfterSliderChange = value => {
    onChange(value);
  };

  const onAfterRangeChange = value => {
    onChange(value);
  };

  return (
    <>
      {type === 'slider' ? (
        <Slider
          className='slider'
          dots
          reverse
          allowCross={allowCross}
          step={step}
          defaultValue={defaultValue}
          marks={marks}
          value={sliderValue}
          onChange={onSliderChange}
          onAfterChange={onAfterSliderChange}
        />
      ) : (
        <Range
          className='slider'
          pushable={10}
          allowCross={allowCross}
          min={1}
          max={max}
          step={step}
          defaultValue={defaultValue}
          marks={marks}
          handle={handle}
          tipFormatter={value => `$${value}`}
          value={rangeValue}
          onChange={onRangeChange}
          onAfterChange={onAfterRangeChange}
        />
      )}
    </>
  );
};

RangeSlider.defaultProps = {
  type: 'range',
  allowCross: true
};

export default RangeSlider;
