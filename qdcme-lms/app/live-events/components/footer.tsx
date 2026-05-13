import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/">
              <img
                src="/qd-logo.png"
                alt="QDcme"
                className="h-24 w-auto cursor-pointer hover:opacity-80 transition"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm text-neutral-500">
              Continuing Clinical Education for Modern Practice.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm font-medium text-neutral-600">
            <Link href="/">Home</Link>
            <Link href="/np-pa">NP / PA</Link>
            <Link href="/oncology">Oncology</Link>
            <Link href="/live-events">Live Events</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-neutral-400">
          © {new Date().getFullYear()} QDcme. All rights reserved.
        </div>
      </div>
    </footer>
  );
}