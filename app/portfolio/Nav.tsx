import Link from "next/link";
import { NAV_SECTIONS } from "./data";
import { MoonIcon, SunIcon } from "./icons";

interface NavProps {
  activeSection: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onScrollToTop: () => void;
}

export default function Nav({
  activeSection,
  isDark,
  onToggleTheme,
  onScrollToTop,
}: NavProps) {
  return (
    <nav className="sticky-nav">
      <div className="sticky-nav-inner">
        <div className="flex items-center gap-6">
          <button
            onClick={onScrollToTop}
            className="font-semibold text-foreground tracking-tight text-lg hover:opacity-70 transition-opacity"
          >
            IA
          </button>
          <div className="hidden sm:flex items-center gap-5">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() =>
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={`nav-link ${activeSection === section.id ? "active" : ""}`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
