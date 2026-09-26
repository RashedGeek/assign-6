import HeroBanner from "@/app/components/HeroBanner";
import WorkoutLibrary from "@/app/components/WorkoutLibrary";
import type { Workout } from "@/data/workout";

export default async function Home() {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog");

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const workouts: Workout[] = await response.json();

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