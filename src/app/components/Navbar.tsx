"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { useFitlog } from "@/context/FitlogContext";

export default function Navbar() {
  const { planWorkouts, savedWorkouts } = useFitlog();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-base-300 bg-base-100 px-6 py-4">
      {/* Left side: Logo + FITLOG */}
      {/* Left side: Logo + FITLOG */}
<Link href="/" className="flex items-center gap-3">
  <Image
    src={logo}
    alt="FitLog logo"
    width={32}
    height={32}
  />

  <span className="text-xl font-bold tracking-wide">
    FITLOG
  </span>
</Link>

      {/* Middle: Navigation */}
      <div className="flex gap-8">
        <Link href="/" className="text-sm">
          Workouts
        </Link>

        <Link href="/my-plan" className="text-sm">
          My Plan
        </Link>
      </div>

      {/* Right side: Counters */}
      <div className="flex items-center gap-5 text-sm">
        <Link
          href="/my-plan"
          className="flex items-center gap-2"
        >
          Plan{" "}
          <span className="badge bg-yellow-400 text-black">
            {planWorkouts.length}
          </span>
        </Link>

        <Link
          href="/my-plan"
          className="flex items-center gap-2"
        >
          Saved{" "}
          <span className="badge badge-outline">
            {savedWorkouts.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}