import { useEffect, useRef, useState } from 'react';

const CountdownTimer = () => {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date('March 20, 2024 00:00:00').getTime();

    interval.current = setInterval(() => {
      const now = new Date();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop timer
        clearInterval(interval.current);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <span className='countdown'>
      <span className='fw-bold m-0'>
        {timerDays > 9 ? timerDays : `${timerDays}`}
      </span>
      {timerDays <= 1 ? <span> day,</span> : <span>days,</span>}
      <span className='fw-bold m-0'>
        {timerHours > 9 ? timerHours : `${timerHours}`}
      </span>
      {timerHours <= 1 ? <span> hr, </span> : <span>hrs,</span>}
      <span className='fw-bold m-0'>
        {timerMinutes > 9 ? timerMinutes : `${timerMinutes}`}
      </span>
      <span>min,</span>
      <span className='fw-bold m-0'>
        {timerSeconds > 9 ? timerSeconds : `${timerSeconds}`}
      </span>
      <span>sec</span>
    </span>
  );
};

export default CountdownTimer;
