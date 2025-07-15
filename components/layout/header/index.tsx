"use client";
import { useState, useEffect } from "react";
import { DesktopNav } from "./desktop-nav";
import { HeaderActions } from "./header-actions";
import { MobileNav } from "./mobile-nav";
import { Logo } from "./logo";
import { useAuthStore } from "@/lib/stores/auth";
import { SearchModal } from "./search-modal";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-4 mb-3">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <DesktopNav />
            <HeaderActions
              onSearchOpen={() => setIsSearchOpen(true)}
              isMobileMenuOpen={isMobileMenuOpen}
              onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>

          {isMobileMenuOpen && (
            <MobileNav onSearchOpen={() => setIsSearchOpen(true)} />
          )}
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
