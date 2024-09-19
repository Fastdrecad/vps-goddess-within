import { useEffect, useState } from 'react';
import { MdArrowUpward } from 'react-icons/md';

const GoToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
      <button
        onClick={goToTop}
        className={`go-to-top ${showTopBtn ? 'show' : ''}`}
      >
        <span>
          <span className='go-to-top-text'>Go To Top</span>
          <span className='icon-span'>
            <MdArrowUpward />
          </span>
        </span>
      </button>
    </>
  );
};

export default GoToTop;
