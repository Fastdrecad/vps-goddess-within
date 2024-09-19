import { sliderItems } from '../data';
import { NavLink } from 'react-router-dom';
import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

const Carousel = () => {
  return (
    <section className='carousel'>
      <CarouselItems>
        {sliderItems.map(item => (
          <div className='slide' key={item.id}>
            <div className='slide-container'>
              <img src={item.img} />
            </div>
            <div className='info-content'>
              <h1 className='info-title'>{item.title}</h1>
              <p>{item.desc}</p>
              <NavLink to={`/shop`}>
                <button className='slide-button'>{item.btn}</button>
              </NavLink>
            </div>
          </div>
        ))}
      </CarouselItems>
    </section>
  );
};

const CarouselItems = ({ children }) => {
  const containerRef = useRef();
  const [current, setCurrent] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const intervalRef = useRef(null);

  const goToSlide = slideIndex => {
    containerRef.current.style.transitionDuration = '1200ms';
    setTranslateX(containerRef.current.clientWidth * slideIndex);
    setCurrent(slideIndex);
  };

  const actionHandler = useCallback(
    mode => {
      containerRef.current.style.transitionDuration = '1200ms';
      if (mode === 'prev') {
        if (current <= 1) {
          setTranslateX(0);
          setCurrent(children.length);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current - 1));
          setCurrent(prev => --prev);
        }
      } else if (mode === 'next') {
        if (current >= children.length) {
          setTranslateX(
            containerRef.current.clientWidth * (children.length + 1)
          );
          setCurrent(1);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current + 1));
          setCurrent(prev => ++prev);
        }
      }
    },
    [children, current]
  );

  // This is for infinite scroll smooth effect
  useEffect(() => {
    const transitionEnd = () => {
      if (current <= 1) {
        containerRef.current.style.transitionDuration = '0ms';
        setTranslateX(containerRef.current.clientWidth * current);
      }

      if (current >= children.length) {
        containerRef.current.style.transitionDuration = '0ms';
        setTranslateX(containerRef.current.clientWidth * children.length);
      }
    };

    document.addEventListener('transitionend', transitionEnd);

    return () => {
      document.removeEventListener('transitionend', transitionEnd);
    };
  }, [current, children]);

  // for autoplay
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      actionHandler('next');
    }, 4000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [actionHandler]);

  const slides = useMemo(() => {
    if (children.length > 1) {
      let items = Children.map(children, (child, i) => (
        <li key={i}>{child}</li>
      ));

      return [
        <li key={children.length + 1}>{children[children.length - 1]}</li>,
        ...items,
        <li key={children.length + 2}>{children[0]}</li>
      ];
    }

    return <li>{children[0]}</li>;
  }, [children]);

  // The Keypress Event Handler
  const changeChild = useCallback(
    e => {
      if (e.key === 'ArrowLeft') {
        // If supposed previous child is < 0 set it to last child
        if (current <= 1) {
          setTranslateX(0);
          setCurrent(children.length);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current - 1));
          setCurrent(prev => --prev);
        }
      } else if (e.key === 'ArrowRight') {
        // If supposed next child is > length - 1 set it to first child
        if (current >= children.length) {
          setTranslateX(
            containerRef.current.clientWidth * (children.length + 1)
          );
          setCurrent(1);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current + 1));
          setCurrent(prev => ++prev);
        }
      }
    },
    [children, current]
  );

  // Set and cleanup the event listener
  useEffect(() => {
    document.addEventListener('keydown', changeChild);

    return function cleanup() {
      document.removeEventListener('keydown', changeChild);
    };
  });

  // position first element correctly & this will render only once
  useLayoutEffect(() => {
    setTranslateX(containerRef.current.clientWidth * current);
  }, []);

  return (
    <div className='carousel-items'>
      {/* ------------------------------------------- */}
      <button className='arrow btn-left' onClick={() => actionHandler('prev')}>
        <GoArrowLeft />
      </button>
      <button className='arrow btn-right' onClick={() => actionHandler('next')}>
        <GoArrowRight />
      </button>
      {/* ------------------------------------------- */}
      <ul
        className='carousel-list'
        ref={containerRef}
        style={{
          transform: `translate3d(${-translateX}px, 0, 0)`
        }}
      >
        {slides}
      </ul>
      {/* ------------------------------------------- */}
      <div className='dots-container'>
        {sliderItems.map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`dot ${current === slideIndex + 1 ? 'active' : ''}`}
            onClick={() => goToSlide(slideIndex + 1)}
          >
            &#11044;
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
