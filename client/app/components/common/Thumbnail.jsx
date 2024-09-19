import { useState } from 'react';

const Thumbnail = ({ product, setSelectedImg }) => {
  const [active, setActive] = useState(0);
  const { images } = product;

  return (
    <>
      {images.map((image, index) => (
        <img
          key={index}
          src={image?.thumbnail}
          alt={`Product ${index}`}
          className={`${index === active ? 'active' : ''}`}
          onMouseOver={() => {
            setActive(index);
            setSelectedImg(index);
          }}
        />
      ))}
    </>
  );
};

export default Thumbnail;
