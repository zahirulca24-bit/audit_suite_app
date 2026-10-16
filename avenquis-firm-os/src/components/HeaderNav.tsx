import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderNavProps {
  onSignInClick: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onNavigateSection?: (section: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onSignInClick,
  isDarkMode = false,
  onToggleTheme,
  onNavigateSection,
}) => {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
      {/* Canonical Brand Lockup for Light Background */}
      <BrandLogo variant="light" showWordmark descriptor="Firm OS" size="md" />

      {/* Nav Links & Actions */}
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <button
            onClick={() => onNavigateSection?.('about')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => onNavigateSection?.('features')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => onNavigateSection?.('pricing')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Pricing
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-neutral-200/90 flex items-center justify-center text-neutral-700 hover:bg-neutral-100/80 transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Sign In CTA */}
          <button
            type="button"
            onClick={onSignInClick}
            className="bg-[#0B332A] hover:bg-[#07251E] text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};
