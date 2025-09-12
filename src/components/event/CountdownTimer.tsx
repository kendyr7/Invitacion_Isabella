"use client";

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculateTimeLeft = () => {
      // Parse the target date with timezone information
      const targetDateTime = new Date(targetDate);
      const currentTime = new Date();
      
      // Calculate the difference in milliseconds
      const difference = targetDateTime.getTime() - currentTime.getTime();
      let newTimeLeft: TimeLeft = {};

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return newTimeLeft;
    };
    
    setTimeLeft(calculateTimeLeft()); // Initial calculation

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isClient]);

  if (!isClient) {
    // Render placeholder or skeleton on server/initial client render
    const colors = ['#ff98c3', '#ffe900', '#ffbea2', '#2387e9', '#7fb717'];

    return (
      <div className="flex justify-center gap-2 sm:gap-3 animate-in fade-in duration-1000 delay-500 w-full px-4">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => (
          <div 
            key={index}
            className="flex flex-col items-center justify-center backdrop-blur-sm rounded-2xl shadow-lg p-3 sm:p-4 flex-1 max-w-[80px] sm:max-w-[100px] animate-pulse"
            style={{
              backgroundColor: `${colors[index]}20`,
              borderColor: `${colors[index]}40`,
              borderWidth: '1px'
            }}
          >
            <span 
              className="text-xl sm:text-3xl font-bold leading-none mb-1"
              style={{ color: colors[index] }}
            >
              00
            </span>
            <span 
              className="text-xs sm:text-sm uppercase tracking-wider font-medium leading-none opacity-80"
              style={{ color: colors[index] }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }
  
  const timerComponents = [
    { label: 'Dias', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Seg', value: timeLeft.seconds },
  ];

  const colors = ['#ff98c3', '#ffe900', '#ffbea2', '#2387e9', '#7fb717'];

  return (
    <div className="flex justify-center gap-2 sm:gap-3 animate-in fade-in duration-1000 delay-500 w-full px-4">
      {timerComponents.map((component, index) => (
        component.value !== undefined && (
          <div 
            key={index} 
            className="flex flex-col items-center justify-center backdrop-blur-sm rounded-2xl shadow-lg p-3 sm:p-4 flex-1 max-w-[80px] sm:max-w-[100px] transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              backgroundColor: `${colors[index]}20`,
              borderColor: `${colors[index]}40`,
              borderWidth: '1px'
            }}
          >
            <span 
              className="text-xl sm:text-3xl font-bold leading-none mb-1"
              style={{ color: colors[index] }}
            >
              {String(component.value).padStart(2, '0')}
            </span>
            <span 
              className="text-xs sm:text-sm uppercase tracking-wider font-medium leading-none opacity-80"
              style={{ color: colors[index] }}
            >
              {component.label}
            </span>
          </div>
        )
      ))}
    </div>
  );
};

export default CountdownTimer;

    
