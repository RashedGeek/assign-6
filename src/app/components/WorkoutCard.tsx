"use client";

import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/data/workout";
import { useFitlog } from "@/context/FitlogContext";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  const {
    planWorkouts,
    addToPlan,
    removeFromPlan,
    planLimit,
  } = useFitlog();

  const inPlan = planWorkouts.some(
    (item) => item.id === workout.id
  );

  const isPlanFull = !inPlan && planWorkouts.length >= planLimit;

  const handlePlan = () => {
    if (inPlan) {
      removeFromPlan(workout.id);
    } else {
      addToPlan(workout);
    }
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/workouts/${workout.id}`} className="block">
      <div className="relative h-56 w-full overflow-hidden bg-base-200">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute right-4 top-4">
          <span className="badge bg-base-100/90 font-semibold">
            {workout.difficulty}
          </span>
        </div>
      </div>

      <div className="p-5 pb-0">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="badge badge-warning badge-sm font-semibold"
            >
              {muscle}
            </span>
          ))}

          <span className="badge badge-outline badge-sm">
            {workout.difficulty}
          </span>
        </div>

        <h2 className="text-xl font-black uppercase tracking-wide">
          {workout.name}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-base-content/60">
          {workout.description}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 border-y border-base-300 py-4">
          <div>
            <p className="text-xs uppercase text-base-content/40">
              Time
            </p>
            <p className="mt-1 font-semibold">
              {workout.duration} min
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-base-content/40">
              Sets
            </p>
            <p className="mt-1 font-semibold">
              {workout.sets}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-base-content/40">
              Reps
            </p>
            <p className="mt-1 font-semibold">
              {workout.reps}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-base-content/40">
              Calories
            </p>
            <p className="font-semibold">
              {workout.caloriesBurned} kcal
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase text-base-content/40">
              Rating
            </p>
            <p className="font-semibold">
              <span className="text-yellow-400">★</span>{" "}
              {workout.rating}
            </p>
          </div>
        </div>
      </div>
      </Link>

      <div className="px-5 pb-5">
        <button
          onClick={handlePlan}
          disabled={isPlanFull}
          className={`btn mt-5 w-full font-bold ${
            inPlan ? "btn-outline" : "btn-warning"
          }`}
        >
          {inPlan
            ? "✓ Added to Plan"
            : isPlanFull
            ? "Plan is full"
            : "Add to Plan"}
        </button>
      </div>
    </article>
  );
}