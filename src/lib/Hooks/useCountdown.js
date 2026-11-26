import { useEffect, useState } from "react";

export const useCountdown = (duration = 120) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isRunning]);

  const restart = () => {
    setTimeLeft(duration);
    setIsRunning(true);
  };

  const getFormatedTime = () => {
    const minuts = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minuts}:${seconds.toString().padStart(2, "0")}`;
  };

  return {
    timeLeft,
    isRunning,
    getFormatedTime,
    isExpired: timeLeft === 0,
    restart,
  };
};
