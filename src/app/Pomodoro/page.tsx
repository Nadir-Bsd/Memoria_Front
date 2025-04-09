"use client";
import { useState, useEffect, JSX, Fragment, useRef } from "react";

const DesktopTimerPage = (): JSX.Element => {
    // set the time left before switching phase
    const [timeLeft, setTimeLeft] = useState(25 * 60); // Start with 25 minutes
    // check if the timer is running
    const [isRunning, setIsRunning] = useState(false);
    // check the current phase (work or break)
    const [isBreak, setIsBreak] = useState(false);
    // check if minutes have been added
    const [hasPlusFiveBeenUsed, setHasPlusFiveBeenUsed] = useState(false);
    const [hasPlusTenBeenUsed, setHasPlusTenBeenUsed] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const addTimePossible = [5, 10];

    useEffect(() => {
        // Clear any existing timer when effect re-runs
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        // check if isRunning is true and timeLeft is greater than 0
        if (isRunning && timeLeft > 0) {
            // set the timer to decrease the state timeLeft every second
            timerRef.current = setTimeout(() => {
                // Decrease the state TimeLeft by using lastest state
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            // if timeLeft 0 switch phase and set the timer of the next phase
        } else if (timeLeft === 0) {
            // Switch between work and break phases
            setIsBreak((prev) => !prev);
            // Set time for next phase
            setTimeLeft(!isBreak ? 5 * 60 : 25 * 60);
        }

        // Cleanup function
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isRunning, timeLeft, isBreak]);

    // Add minutes to the timer and clear the current timeout
    const addTime = (minutes: number) => {
        // Clear current timeout
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        // Check if the minutes have already been used
        if (minutes === 5) {
            setHasPlusFiveBeenUsed(true);
        }
        if (minutes === 10) {
            setHasPlusTenBeenUsed(true);
        }

        // Add the minutes
        setTimeLeft((prev) => prev + minutes * 60);
    };

    // Format minutes and seconds
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    // Split digits for display
    const timeDigits = [...minutes, ...seconds];

    return (
        <main className="w-full bg-neutral-950 flex flex-col justify-center items-center h-screen">
            {/* Phase indicator */}
            <div className="text-white tracking-wide uppercase px-6 py-3 rounded-md">
                <h1
                    className={`text-6xl font-extrabold text-center tracking-wider transition-all duration-500 ${
                        isBreak ? "text-green-400" : "text-white"
                    }`}
                >
                    {isBreak ? "Break Time" : "Work Time"}
                </h1>
            </div>

            {/* Timer Controls */}
            <div className="w-[60%] items-center mt-10">
                <div className="flex gap-5">
                    {addTimePossible.map((time) => (
                        <button
                            key={time}
                            onClick={() => addTime(time)}
                            className={`w-[90px] h-[39px] bg-gray-700 text-white rounded-[5px] hover:bg-gray-600 ${
                                time === 5 && hasPlusFiveBeenUsed
                                    ? "cursor-not-allowed"
                                    : ""
                            } ${
                                time === 10 && hasPlusTenBeenUsed
                                    ? "cursor-not-allowed"
                                    : ""
                            }`}
                            disabled={
                                (time === 5 && hasPlusFiveBeenUsed) ||
                                (time === 10 && hasPlusTenBeenUsed)
                            }
                        >
                            +{time}m
                        </button>
                    ))}
                </div>
            </div>

            {/* Timer Display */}
            <div
                className="h-[200px] top-[337px] flex justify-center gap-[18px]"
                onClick={() => setIsRunning(!isRunning)}
            >
                {timeDigits.map((digit, index) => (
                    <Fragment key={index}>
                        <p className="w-[121px] h-[200px] rounded-[5px] flex items-center justify-center cursor-pointer bg-transparent">
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
            <div className="text-xl text-white text-center">
                {isRunning ? "Click timer to pause" : "Click timer to start"}
            </div>
        </main>
    );
};

export default DesktopTimerPage;
