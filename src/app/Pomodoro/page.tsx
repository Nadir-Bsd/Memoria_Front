"use client";
import { useState, useEffect, JSX, Fragment } from "react";
// import { Card } from "../../components/ui/card";

const DesktopTimerPage = (): JSX.Element => {
    // set the time left before switching phase
    const [timeLeft, setTimeLeft] = useState(25 * 1); // Start with 25 minutes
    // check if the timer is running
    const [isRunning, setIsRunning] = useState(false);
    // check the current phase (work or break)
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        // check if isRunning is true and timeLeft is greater than 0
        if (isRunning && timeLeft > 0) {
            // set the timer to decrease the state timeLeft every second
            timer = setTimeout(() => {
                // Decrease the state TimeLeft by using lastest state
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            // if timeLeft 0 switch phase and set the timer of the next phase
        } else if (timeLeft === 0) {
            // Switch between work and break phases
            setIsBreak((prev) => !prev);
            // Set time for next phase
            setTimeLeft(!isBreak ? 5 * 1 : 25 * 1);
        }
    }, [isRunning, timeLeft, isBreak]);

    // const addTime = (minutes: number) => {
    //   setTimeLeft((prev) => prev + minutes * 60);
    // };

    // Format minutes and seconds
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    // Split digits for display
    const timeDigits = [...minutes, ...seconds];

    return (
        <main className="relative w-full bg-neutral-950">
            {/* Phase indicator */}
            <div className="absolute top-[250px] left-1/2 -translate-x-1/2 text-white tracking-wide uppercase px-6 py-3 rounded-md">
                <h1
                    className={`text-6xl font-extrabold text-center tracking-wider transition-all duration-500 ${
                        isBreak ? "text-green-400" : "text-white"
                    }`}
                >
                    {isBreak ? "Break Time" : "Work Time"}
                </h1>
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
            <div 
                className="absolute w-[608px] h-[400px] top-[337px] left-1/2 -translate-x-1/2 flex gap-[18px]" 
                onClick={() => setIsRunning(!isRunning)}
            >
                {timeDigits.map((digit, index) => (
                    <Fragment key={index} >
                        <p className="w-[121px] h-[400px] rounded-[5px] flex items-center justify-center cursor-pointer bg-transparent">
                            {/* nnumbers */}
                            <span
                                className={`text-[200px] font-bold ${
                                    timeLeft <= 3
                                        ? "text-red-500 animate-pulse"
                                        : "text-white"
                                } transition-transform duration-500 ${
                                    isRunning ? "scale-100" : "scale-75"
                                }`}
                            >
                                {digit}
                            </span>
                        </p>
                        {index === 1 ? (
                            <div className="w-[82px] flex items-center justify-center">
                                <span className="text-8xl font-bold text-white">
                                    :
                                </span>
                            </div>
                        ) : null}
                    </Fragment>
                ))}
            </div>

            {/* Play/Pause Status */}
            <div className="absolute top-[770px] left-1/2 -translate-x-1/2 text-xl text-white">
                {isRunning ? "Click timer to pause" : "Click timer to start"}
            </div>
        </main>
    );
};

export default DesktopTimerPage;
