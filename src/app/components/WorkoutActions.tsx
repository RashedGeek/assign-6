"use client";

import { useFitlog } from "@/context/FitlogContext";
import type { Workout } from "@/data/workout";

type WorkoutActionsProps = {
  workout: Workout;
};

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const {
    planWorkouts,
    savedWorkouts,
    addToPlan,
    removeFromPlan,
    saveForLater,
    removeSaved,
    planLimit,
  } = useFitlog();

  const inPlan = planWorkouts.some(
    (item) => item.id === workout.id
  );

  const isPlanFull = !inPlan && planWorkouts.length >= planLimit;

  const saved = savedWorkouts.some(
    (item) => item.id === workout.id
  );

  const handlePlan = () => {
    if (inPlan) {
      removeFromPlan(workout.id);
    } else {
      addToPlan(workout);
    }
  };

  const handleSave = () => {
    if (saved) {
      removeSaved(workout.id);
    } else {
      saveForLater(workout);
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handlePlan}
        disabled={isPlanFull}
        className={`btn flex-1 ${
          inPlan ? "btn-outline" : "btn-warning"
        }`}
      >
        {inPlan
          ? "✓ Added to Today's Plan"
          : isPlanFull
          ? "Plan is full"
          : "Add to Today's Plan"}
      </button>

      <button
        onClick={handleSave}
        className={`btn flex-1 ${
          saved ? "btn-outline" : "btn-warning"
        }`}
      >
        {saved ? "✓ Saved for Later" : "Save for Later"}
      </button>
    </div>
  );
}