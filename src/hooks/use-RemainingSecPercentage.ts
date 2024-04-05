import {useEffect, useRef, useState} from 'react';

export const useRemainingSecPercentage = (
  startTime,
  endTime,
  startInterval = true,
) => {
  const [percentageRemaining, setPercentageRemaining] = useState(null);
  const timeRef = useRef(null);

  useEffect(() => {
    calculatePercentageRemaining();
    if (startInterval) {
      timeRef.current = setInterval(calculatePercentageRemaining, 1000);
    }
    return () => {
      clearInterval(timeRef.current);
    };
  }, [startTime, endTime, startInterval]);

  const calculatePercentageRemaining = () => {
    const startDateTime = new Date(startTime);
    const endDateTime = new Date(endTime);

    const remainingTime = endDateTime - new Date();
    const totalTime = endDateTime - startDateTime;

    const percentage = (remainingTime / totalTime) * 100;
    if (percentage <= 0) {
      clearInterval(timeRef.current);
      setPercentageRemaining(0);
    } else {
      setPercentageRemaining(percentage.toFixed(2));
    }
  };
  return percentageRemaining;
};
