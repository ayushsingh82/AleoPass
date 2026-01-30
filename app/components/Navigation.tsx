"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletButton } from "../wallet/WalletButton";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-[100]">
      <div className="text-center py-2.5 px-4 text-sm bg-black text-white">
        Redirect to{" "}
        <code className="bg-white/20 px-1.5 py-0.5 rounded text-white font-medium">/</code>,{" "}
        <code className="bg-white/20 px-1.5 py-0.5 rounded text-white font-medium">/check-status</code>, or{" "}
        <code className="bg-white/20 px-1.5 py-0.5 rounded text-white font-medium">/verify</code>{" "}
        by editing the route in your browser.
      </div>
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto" style={{ backgroundColor: "#C4FEC2" }}>
        <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="black" />
            <path d="M30 65 L50 25 L70 65 Z" fill="#C4FEC2" stroke="#C4FEC2" strokeWidth="3" strokeLinejoin="round" />
            <circle cx="50" cy="55" r="8" fill="black" />
            <path d="M35 72 Q50 80 65 72" stroke="#C4FEC2" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
          <span className="text-2xl font-bold text-black">AleoPass</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={pathname === "/" ? "text-black font-semibold underline" : "text-black hover:underline font-medium"}
          >
            Home
          </Link>
          <Link
            href="/check-status"
            className={
              pathname === "/check-status"
                ? "text-black font-semibold underline"
                : "text-black hover:underline font-medium"
            }
          >
            Check Verify Status
          </Link>
          <Link
            href="/verify"
            className={pathname === "/verify" ? "text-black font-semibold underline" : "text-black hover:underline font-medium"}
          >
            Verify
          </Link>
          <WalletButton />
        </nav>
        <div className="md:hidden flex items-center gap-4">
          <Link href="/check-status" className="text-black hover:underline font-medium text-sm cursor-pointer">
            Check Status
          </Link>
          <Link href="/verify" className="text-black hover:underline font-medium text-sm cursor-pointer">
            Verify
          </Link>
          <WalletButton />
        </div>
      </header>
    </div>
  );
}
