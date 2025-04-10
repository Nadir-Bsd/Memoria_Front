"use client";
import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

interface TimerContextType {
  timeLeft: number;
  setTimeLeft: (value: number | ((prev: number) => number)) => void;
  isRunning: boolean;
  setIsRunning: (value: boolean) => void;
  isBreak: boolean;
  setIsBreak: (value: boolean) => void;
  hasPlusFiveBeenUsed: boolean;
  setHasPlusFiveBeenUsed: (value: boolean) => void;
  hasPlusTenBeenUsed: boolean;
  setHasPlusTenBeenUsed: (value: boolean) => void;
  addTime: (minutes: number) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  // État global pour le timer
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes en secondes
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [hasPlusFiveBeenUsed, setHasPlusFiveBeenUsed] = useState(false);
  const [hasPlusTenBeenUsed, setHasPlusTenBeenUsed] = useState(false);
  
  // Référence pour le timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Gérer le décompte du timer
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

  // Fonction pour ajouter du temps
  const addTime = (minutes: number) => {
    // Vérification de sécurité
    if (
      (minutes === 5 && hasPlusFiveBeenUsed) ||
      (minutes === 10 && hasPlusTenBeenUsed)
    ) {
      return;
    }

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

  // Persistance des données dans le localStorage
  useEffect(() => {
    // Charger l'état depuis localStorage au montage du composant
    const savedTimer = localStorage.getItem('timer');
    if (savedTimer) {
      const { 
        timeLeft: savedTimeLeft, 
        isRunning: savedIsRunning, 
        isBreak: savedIsBreak,
        hasPlusFiveBeenUsed: savedHasPlusFiveBeenUsed,
        hasPlusTenBeenUsed: savedHasPlusTenBeenUsed
      } = JSON.parse(savedTimer);
      
      setTimeLeft(savedTimeLeft);
      setIsRunning(savedIsRunning);
      setIsBreak(savedIsBreak);
      setHasPlusFiveBeenUsed(savedHasPlusFiveBeenUsed);
      setHasPlusTenBeenUsed(savedHasPlusTenBeenUsed);
    }
  }, []);

  // Sauvegarder les changements dans localStorage
  useEffect(() => {
    localStorage.setItem('timer', JSON.stringify({
      timeLeft,
      isRunning, 
      isBreak,
      hasPlusFiveBeenUsed,
      hasPlusTenBeenUsed
    }));
  }, [timeLeft, isRunning, isBreak, hasPlusFiveBeenUsed, hasPlusTenBeenUsed]);

  const value = {
    timeLeft,
    setTimeLeft,
    isRunning,
    setIsRunning,
    isBreak,
    setIsBreak,
    hasPlusFiveBeenUsed,
    setHasPlusFiveBeenUsed,
    hasPlusTenBeenUsed,
    setHasPlusTenBeenUsed,
    addTime
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};