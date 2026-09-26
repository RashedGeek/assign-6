"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFitlog } from "@/context/FitlogContext";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const {
    planWorkouts,
    savedWorkouts,
    doneIds,
    isHydrated,
    planLimit,
    removeFromPlan,
    removeSaved,
    markDone,
  } = useFitlog();

  const [activeTab, setActiveTab] = useState<Tab>("plan");

  const activeList = activeTab === "plan" ? planWorkouts : savedWorkouts;

  // Metrics are always based on Today's Plan, per the spec, regardless of
  // which tab is currently being viewed.
  const metrics = useMemo(() => {
    return planWorkouts.reduce(
      (totals, workout) => ({
        exercises: totals.exercises + 1,
        minutes: totals.minutes + workout.duration,
        calories: totals.calories + workout.caloriesBurned,
      }),
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [planWorkouts]);

  return (
    <main className="flex-1 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-black uppercase">My Plan</h1>

        <p className="mt-2 text-base-content/60">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Metrics summary row */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-base-300 p-4 text-center">
            <p className="text-xs uppercase text-base-content/40">
              Exercises
            </p>
            <p className="mt-1 text-2xl font-black">
              {metrics.exercises}/{planLimit}
            </p>
          </div>

          <div className="rounded-2xl border border-base-300 p-4 text-center">
            <p className="text-xs uppercase text-base-content/40">Minutes</p>
            <p className="mt-1 text-2xl font-black">{metrics.minutes}</p>
          </div>

          <div className="rounded-2xl border border-base-300 p-4 text-center">
            <p className="text-xs uppercase text-base-content/40">
              Calories
            </p>
            <p className="mt-1 text-2xl font-black">{metrics.calories}</p>
          </div>
        </div>

        {/* Tabs */}
        <div role="tablist" className="tabs tabs-boxed mt-8 w-fit">
          <button
            role="tab"
            onClick={() => setActiveTab("plan")}
            className={`tab ${activeTab === "plan" ? "tab-active" : ""}`}
          >
            Today&apos;s Plan ({planWorkouts.length})
          </button>

          <button
            role="tab"
            onClick={() => setActiveTab("saved")}
            className={`tab ${activeTab === "saved" ? "tab-active" : ""}`}
          >
            Saved ({savedWorkouts.length})
          </button>
        </div>

        {/* Content */}
        {!isHydrated ? (
          <p className="mt-10 text-center text-base-content/60">
            Loading workouts…
          </p>
        ) : activeList.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-base-300 p-10 text-center">
            <h2 className="text-xl font-black uppercase">Nothing here yet</h2>

            <p className="mt-2 text-base-content/60">
              Browse the library and add a lift to get today moving.
            </p>

            <Link href="/" className="btn btn-warning mt-6">
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-4">
            {activeList.map((workout) => {
              const isDone = doneIds.includes(workout.id);

              return (
                <div
                  key={workout.id}
                  className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-4 sm:flex-row sm:items-center"
                >
                  <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-base-200 sm:w-32">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h2
                      className={`text-lg font-black uppercase ${
                        isDone ? "text-base-content/40 line-through" : ""
                      }`}
                    >
                      {workout.name}
                    </h2>

                    <p className="text-sm text-base-content/60">
                      {workout.equipment}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-base-content/60">
                      <span>⏱ {workout.duration} min</span>
                      <span>🔥 {workout.caloriesBurned} kcal</span>
                      <span>★ {workout.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="btn btn-outline btn-sm"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() => markDone(workout.id)}
                        disabled={isDone}
                        className="btn btn-warning btn-sm"
                      >
                        ✓ Mark as Done
                      </button>
                    )}

                    <button
                      onClick={() =>
                        activeTab === "plan"
                          ? removeFromPlan(workout.id)
                          : removeSaved(workout.id)
                      }
                      className="btn btn-ghost btn-sm"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}