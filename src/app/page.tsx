import HeroBanner from "@/app/components/HeroBanner";
import WorkoutLibrary from "@/app/components/WorkoutLibrary";
import type { Workout } from "@/data/workout";
import { workouts as fallbackWorkouts } from "@/data/workout";

// This is a Server Component (no "use client" at the top), so this fetch
// runs on the server before the page is ever sent to the browser — same
// pattern your workouts/[id]/page.tsx already uses for a single workout.
export default async function Home() {
  let workouts: Workout[];

  try {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "force-cache",
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch workouts: ${response.status} ${response.statusText}`
      );
    }

    workouts = await response.json();
  } catch (error) {
    // If the free API is rate-limited or briefly down, fall back to the
    // local copy instead of crashing the whole page.
    console.warn("Falling back to local workout data:", error);
    workouts = fallbackWorkouts;
  }

  return (
    <main className="flex-1 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <HeroBanner />

        <div id="library">
          <h1 className="text-3xl font-black uppercase">The Library</h1>

          <p className="mt-2 text-base-content/70">
            Twelve lifts covering every major muscle group.
          </p>

          <WorkoutLibrary workouts={workouts} />
        </div>
      </div>
    </main>
  );
}