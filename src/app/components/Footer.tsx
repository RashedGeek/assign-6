import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="FitLog logo" width={20} height={20} />
          <span className="text-sm font-bold tracking-wide">FITLOG</span>
        </Link>

        <p className="text-sm text-base-content/50">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}