import { useEffect, useState } from "react";

const PROMOTION_END = new Date("2024-10-15T23:59:59Z").getTime(); // Set your promotion end date here
let timeLeft = PROMOTION_END - Date.now();

const formatTime = (time: number) => {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const Countdown = () => {
  const [time, setTime] = useState(formatTime(timeLeft));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    const interval = setInterval(() => {
      timeLeft = PROMOTION_END - Date.now();
      setTime(formatTime(timeLeft));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return "Loading promotion...";

  return <span id="countdown">Time left: {time}</span>;
};

export default Countdown;
