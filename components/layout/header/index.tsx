"use client";
import { useState, useEffect } from "react";
import { DesktopNav } from "./desktop-nav";
import { HeaderActions } from "./header-actions";
import { MobileNav } from "./mobile-nav";
import { Logo } from "./logo";
import { useAuthStore } from "@/lib/stores/auth";
import { SearchModal } from "./search-modal";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-[#543D2A] text-white backdrop-blur-md shadow-sm`}
      >
        <div className="mx-auto px-4 mb-3">
          <div className="flex items-center justify-between h-16">
            <div className="hi"></div>
            <Logo />
            <div className="flex items-center gap-8">
              <DesktopNav />
              <HeaderActions
                onSearchOpen={() => setIsSearchOpen(true)}
                isMobileMenuOpen={isMobileMenuOpen}
                onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
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
