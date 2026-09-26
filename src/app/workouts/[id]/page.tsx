import WorkoutActions from "@/app/components/WorkoutActions";
import Image from "next/image";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

type WorkoutPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function WorkoutDetailsPage({
  params,
}: WorkoutPageProps) {
  const { id } = await params;

  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  const workout: Workout = await response.json();

  return (
    <main className="flex-1 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Workout Image */}
          <div className="relative h-[400px] overflow-hidden rounded-2xl">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Workout Information */}
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="badge badge-warning font-semibold"
                >
                  {muscle}
                </span>
              ))}

              <span className="badge badge-outline">
                {workout.difficulty}
              </span>
            </div>

            <h1 className="text-4xl font-black uppercase">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-base-content/60">
              {workout.description}
            </p>

            {/* Workout Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-base-300 p-4">
                <p className="text-xs uppercase text-base-content/40">
                  Time
                </p>
                <p className="mt-1 font-bold">
                  {workout.duration} min
                </p>
              </div>

              <div className="rounded-xl border border-base-300 p-4">
                <p className="text-xs uppercase text-base-content/40">
                  Calories
                </p>
                <p className="mt-1 font-bold">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              <div className="rounded-xl border border-base-300 p-4">
                <p className="text-xs uppercase text-base-content/40">
                  Sets
                </p>
                <p className="mt-1 font-bold">
                  {workout.sets}
                </p>
              </div>

              <div className="rounded-xl border border-base-300 p-4">
                <p className="text-xs uppercase text-base-content/40">
                  Rating
                </p>
                <p className="mt-1 font-bold">
                  <span className="text-yellow-400">★</span>{" "}
                  {workout.rating}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-base-content/50">
                Equipment
              </p>

              <p className="mt-1 font-semibold">
                {workout.equipment}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-sm text-base-content/50">
                Reps
              </p>

              <p className="mt-1 font-semibold">
                {workout.reps}
              </p>
            </div>
            <WorkoutActions workout={workout} />
          </div>
        </div>

        {/* Instructions */}
        <section className="mt-12">
          <h2 className="text-2xl font-black uppercase">
            Instructions
          </h2>

          <ol className="mt-5 space-y-4">
            {workout.instructions.map((instruction, index) => (
              <li
                key={index}
                className="rounded-xl border border-base-300 p-4"
              >
                <span className="mr-3 font-bold text-yellow-400">
                  {index + 1}.
                </span>

                {instruction}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}