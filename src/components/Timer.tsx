"use client";
import { Fragment, JSX } from "react";
import { useRouter } from "next/navigation";
import { useTimer } from "@/Provider/TimerProvider";

interface TimerProps {
    isCompact?: boolean; // Pour différencier l'affichage navbar vs page complète
    onTimerClick?: () => void; // Action personnalisable au clic
}

const Timer = ({
    isCompact = false,
    onTimerClick,
}: TimerProps): JSX.Element => {
    const {
        timeLeft,
        isRunning,
        setIsRunning,
        isBreak,
        hasPlusFiveBeenUsed,
        hasPlusTenBeenUsed,
        addTime,
        resteTime,
    } = useTimer();

    const router = useRouter();
    const addTimePossible = [5, 10];

    // Format minutes and seconds
    const minutes = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    // Split digits for display
    const timeDigits = [...minutes, ...seconds];

    // Fonction pour gérer le clic sur le timer
    const handleTimerClick = () => {
        if (isCompact) {
            // Si dans la navbar, navigue vers la page Pomodoro
            router.push("/Pomodoro");
        } else {
            // Si dans la page Pomodoro, démarre/pause le timer
            setIsRunning(!isRunning);
        }

        // Si une fonction onTimerClick est fournie, l'exécuter
        if (onTimerClick) {
            onTimerClick();
        }
    };

    // Styles adaptés selon le mode (navbar ou page complète)
    const containerClasses = isCompact
        ? "h-[40px] flex justify-center gap-[5px] cursor-pointer"
        : "h-[200px] flex justify-center gap-[18px] cursor-pointer";

    const digitClasses = isCompact
        ? "w-[24px] h-[40px] flex items-center justify-center"
        : "w-[121px] h-[200px] rounded-[5px] flex items-center justify-center";

    const fontClasses = isCompact
        ? `text-[40px] font-bold ${
              timeLeft <= 3 ? "text-red-500 animate-pulse" : "text-white"
          }`
        : `text-[200px] font-bold ${
              timeLeft <= 3 ? "text-red-500 animate-pulse" : "text-white"
          }`;

    const separatorClasses = isCompact
        ? "text-2xl font-bold text-white"
        : "text-8xl font-bold text-white";

    return (
        <div className="flex flex-col items-center h-full justify-center gap-5">
            {/* Phase indicator - only shown in full mode (if it's false) */}
            {!isCompact && (
                <div className="text-white tracking-wide uppercase px-6 py-3 rounded-md">
                    <h1
                        className={`text-6xl font-extrabold text-center tracking-wider transition-all duration-500 ${
                            isBreak ? "text-green-400" : "text-white"
                        }`}
                    >
                        {isBreak ? "Break Time" : "Work Time"}
                    </h1>
                </div>
            )}

            {/* Timer Controls - only shown in full mode (if it's false)*/}
            {!isCompact && (
                <div className="w-[100%] flex justify-between items-center mt-10 mb-8 relative z-10">
                    <div className="flex gap-5">
                        {addTimePossible.map((time) => (
                            <button
                                key={time}
                                onClick={(e) => {
                                    e.stopPropagation(); // Empêche le déclenchement du click du timer
                                    addTime(time);
                                }}
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
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Empêche le déclenchement du click du timer
                            resteTime();
                        }}
                        className="w-[90px] h-[39px] bg-gray-700 text-white rounded-[5px] hover:bg-gray-600"
                    >
                        reste
                    </button>
                </div>
            )}

            {/* Timer Display */}
            <div className={containerClasses} onClick={handleTimerClick}>
                {timeDigits.map((digit, index) => (
                    <Fragment key={index}>
                        <p className={digitClasses}>
                            <span
                                className={`${fontClasses} transition-transform duration-500 ${
                                    isRunning && !isCompact
                                        ? "scale-100"
                                        : isCompact
                                        ? "scale-100"
                                        : "scale-75"
                                } relative z-0`}
                            >
                                {digit}
                            </span>
                        </p>
                        {index === 1 ? (
                            <div
                                className={
                                    isCompact
                                        ? "flex items-center justify-center"
                                        : "w-[82px] flex items-center justify-center"
                                }
                            >
                                <span className={separatorClasses}>:</span>
                            </div>
                        ) : null}
                    </Fragment>
                ))}
            </div>

            {/* Play/Pause Status - only shown in full mode (if it's false) */}
            {!isCompact && (
                <div className="text-xl text-white text-center mt-2">
                    {isRunning
                        ? "Click timer to pause"
                        : "Click timer to start"}
                </div>
            )}
        </div>
    );
};

export default Timer;
