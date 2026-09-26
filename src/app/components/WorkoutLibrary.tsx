"use client";

import { useMemo, useState } from "react";
import type { Workout } from "@/data/workout";
import WorkoutCard from "./WorkoutCard";

type SortKey = "duration" | "calories" | "rating";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function WorkoutLibrary({
  workouts,
}: {
  workouts: Workout[];
}) {
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  // useMemo just means "only re-sort when workouts or sortKey actually change",
  // instead of re-sorting on every render for no reason.
  const sorted = useMemo(() => {
    const copy = [...workouts];

    switch (sortKey) {
      case "duration":
        return copy.sort((a, b) => a.duration - b.duration);
      case "calories":
        return copy.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
      case "rating":
        return copy.sort((a, b) => b.rating - a.rating);
    }
  }, [workouts, sortKey]);

  return (
    <div>
      <div className="mt-8 flex items-center justify-end">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-base-content/60">Sort By</span>
          <select
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as SortKey)}
            className="select select-bordered select-sm"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}