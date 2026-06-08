"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo-dark.png"
            alt="ListifyPH"
            width={140}
            height={36}
            className="h-9 w-auto"
            priority
          />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="#features" className="hover:text-navy transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-navy transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-navy transition-colors">Pricing</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-navy transition-colors">
            Log in
          </Link>
          <Link href="/signup" className="bg-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-navy/90 transition-colors">
            Start free
          </Link>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-brand-border px-4 py-4 flex flex-col gap-4">
          <a href="#features" className="text-sm font-medium text-text-secondary" onClick={() => setOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-text-secondary" onClick={() => setOpen(false)}>How it works</a>
          <a href="#pricing" className="text-sm font-medium text-text-secondary" onClick={() => setOpen(false)}>Pricing</a>
          <Link href="/login" className="text-sm font-medium text-text-secondary">Log in</Link>
          <Link href="/signup" className="bg-navy text-white text-sm font-medium px-4 py-2 rounded-lg text-center">Start free</Link>
        </div>
      )}
    </nav>
  );
}