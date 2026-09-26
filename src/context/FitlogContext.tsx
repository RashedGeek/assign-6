"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Workout } from "@/data/workout";
import { useToast } from "@/context/ToastContext";

type FitlogContextType = {
  planWorkouts: Workout[];
  savedWorkouts: Workout[];
  doneIds: number[];
  isHydrated: boolean;
  planLimit: number;

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;

  saveForLater: (workout: Workout) => void;
  removeSaved: (id: number) => void;

  markDone: (id: number) => void;
};

const FitlogContext = createContext<FitlogContextType | undefined>(
  undefined
);

const PLAN_LIMIT = 5;
const STORAGE_KEY = "fitlog-state-v1";

export function FitlogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { showToast } = useToast();

  const [planWorkouts, setPlanWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // This effect's whole job is syncing React state with an external
        // system (localStorage) on mount, which is exactly what effects
        // are for — not a derived-state anti-pattern the lint rule guards against.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPlanWorkouts(parsed.planWorkouts ?? []);
        setSavedWorkouts(parsed.savedWorkouts ?? []);
        setDoneIds(parsed.doneIds ?? []);
      }
    } catch {
      // corrupt or missing data — just start fresh
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save back to localStorage whenever anything changes (after the initial load).
  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ planWorkouts, savedWorkouts, doneIds })
    );
  }, [planWorkouts, savedWorkouts, doneIds, isHydrated]);

  const addToPlan = (workout: Workout) => {
    if (planWorkouts.some((item) => item.id === workout.id)) return;

    if (planWorkouts.length >= PLAN_LIMIT) {
      showToast(`Today's plan is full (max ${PLAN_LIMIT} lifts)`);
      return;
    }

    setPlanWorkouts((current) => [...current, workout]);
    showToast("Added to today's plan");
  };

  const removeFromPlan = (id: number) => {
    setPlanWorkouts((current) => current.filter((w) => w.id !== id));
    setDoneIds((current) => current.filter((doneId) => doneId !== id));
    showToast("Removed from plan");
  };

  const saveForLater = (workout: Workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) return;

    setSavedWorkouts((current) => [...current, workout]);
    showToast("Saved for later");
  };

  const removeSaved = (id: number) => {
    setSavedWorkouts((current) => current.filter((w) => w.id !== id));
    showToast("Removed from saved");
  };

  const markDone = (id: number) => {
    setDoneIds((current) =>
      current.includes(id) ? current : [...current, id]
    );
    showToast("Marked as done 💪");
  };

  return (
    <FitlogContext.Provider
      value={{
        planWorkouts,
        savedWorkouts,
        doneIds,
        isHydrated,
        planLimit: PLAN_LIMIT,
        addToPlan,
        removeFromPlan,
        saveForLater,
        removeSaved,
        markDone,
      }}
    >
      {children}
    </FitlogContext.Provider>
  );
}

export function useFitlog() {
  const context = useContext(FitlogContext);

  if (!context) {
    throw new Error(
      "useFitlog must be used inside FitlogProvider"
    );
  }

  return context;
}