import Image from "next/image";
import banner from "@/assets/banner.png";

export default function HeroBanner() {
  return (
    <section className="mb-10 overflow-hidden rounded-2xl bg-neutral-900">
      <div className="grid min-h-[320px] md:grid-cols-2">

        {/* Left side - Banner content */}
        <div className="flex items-center px-8 py-10 md:px-12">
          <div className="max-w-xl">

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
              Workout Library
            </p>

            <h1 className="text-4xl font-black uppercase leading-tight text-white md:text-5xl">
              Train with intent.
              <br />
              Log every set.
            </h1>

            <p className="mt-5 text-base leading-7 text-white/60">
              Discover workouts designed to help you build strength,
              improve performance, and stay consistent with your training.
            </p>

            <a href="#library" className="btn btn-warning mt-6">
              Browse Workouts
            </a>

          </div>
        </div>

        {/* Right side - Banner image */}
        <div className="relative min-h-[260px] md:min-h-[320px]">
          <Image
            src={banner}
            alt="FitLog workout"
            fill
            priority
            // className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}