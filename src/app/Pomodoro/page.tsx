import React, { useState, useEffect, JSX } from "react";
// import { Avatar, AvatarFallback } from "../../components/ui/avatar";
// import { Card } from "../../components/ui/card";
// import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";

export const DesktopTimerPage = (): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Start with 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Switch between work and break phases
      setIsBreak((prev) => !prev);
      // Set time for next phase
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

  const addTime = (minutes: number) => {
    setTimeLeft((prev) => prev + minutes * 60);
  };

  // Format minutes and seconds
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  // Split digits for display
  const timeDigits = [...minutes, ...seconds];

  return (
    <main className="relative w-full h-screen bg-gray-900">
      {/* Header/Navigation Bar */}
      <header className="w-full h-[86px] bg-gray-800 flex items-center justify-between px-10">
        <div className="flex items-center gap-12">
          {/* Logo square */}
          <div className="w-[45px] h-[45px] bg-gray-700" />

          {/* Circular icon */}
          <div className="w-[45px] h-[45px] bg-gray-700 rounded-full" />
        </div>

        <div className="flex items-center gap-10">
          {/* AI icon */}
          <img className="w-[43px] h-[41px]" alt="AI icon" src="/ai-icon.svg" />

          {/* User avatar
          <Avatar className="w-[45px] h-[45px] bg-gray-700">
            <AvatarFallback className="rounded-full"></AvatarFallback>
          </Avatar> */}
        </div>
      </header>

      {/* Phase indicator */}
      <div className="absolute top-[250px] left-1/2 -translate-x-1/2 text-2xl font-bold text-white">
        {isBreak ? "Break Time" : "Work Time"}
      </div>

      {/* Timer Controls */}
      <div className="absolute top-[327px] left-1/2 -translate-x-1/2 flex justify-center">
        {/* <ToggleGroup type="single" className="flex gap-5">
          <ToggleGroupItem
            value="plus5"
            onClick={() => addTime(5)}
            className="w-[90px] h-[39px] bg-gray-700 text-white rounded-[5px] hover:bg-gray-600"
          >
            +5m
          </ToggleGroupItem>
          <ToggleGroupItem
            value="plus10"
            onClick={() => addTime(10)}
            className="w-[90px] h-[39px] bg-gray-700 text-white rounded-[5px] hover:bg-gray-600"
          >
            +10m
          </ToggleGroupItem>
        </ToggleGroup> */}
      </div>

      {/* Timer Display */}
      <div className="absolute w-[608px] h-[400px] top-[337px] left-1/2 -translate-x-1/2 flex gap-[18px]">
        {timeDigits.map((digit, index) => (
          <React.Fragment key={index}>
            <Card 
              className="w-[121px] h-[400px] rounded-[5px] flex items-center justify-center cursor-pointer bg-transparent"
              onClick={() => setIsRunning(!isRunning)}
            >
              <span className="text-[200px] font-bold text-white">{digit}</span>
            </Card>
            {index === 1 ? <div className="w-[82px] flex items-center justify-center">
              <span className="text-8xl font-bold text-white">:</span>
            </div> : null}
          </React.Fragment>
        ))}
      </div>

      {/* Play/Pause Status */}
      <div className="absolute top-[770px] left-1/2 -translate-x-1/2 text-xl text-white">
        {isRunning ? "Click timer to pause" : "Click timer to start"}
      </div>
    </main>
  );
};