"use client";

import { useEffect } from "react";
import { NAV_SECTIONS } from "./data";
import BootLoader from "./BootLoader";
import Content from "./Content";
import Nav from "./Nav";
import ScrollToTop from "./ScrollToTop";
import { useBootLoader } from "./hooks/useBootLoader";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { useTheme } from "./hooks/useTheme";

export default function Portfolio() {
  const { isLoading, loadingExit, loadingLines, progress } = useBootLoader();
  const { isDark, toggleTheme } = useTheme();
  const { activeSection, sectionsRef } = useScrollSpy(
    NAV_SECTIONS.map((s) => s.id),
  );
  const { show: showScrollTop, scrollToTop } = useScrollToTop();

  useEffect(() => {
    if (isLoading) {
      document.documentElement.classList.add("loading");
    } else {
      document.documentElement.classList.remove("loading");
    }
  }, [isLoading]);

  return (
    <div className="dot-grid-bg page-frame min-h-screen relative">
      {isLoading && (
        <BootLoader
          loadingLines={loadingLines}
          progress={progress}
          loadingExit={loadingExit}
        />
      )}

      <div aria-hidden={isLoading}>
        <Nav
          activeSection={activeSection}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onScrollToTop={scrollToTop}
        />

        <main className="max-w-4xl mx-auto px-6 relative z-1">
          <Content sectionsRef={sectionsRef} />
        </main>

        <ScrollToTop show={showScrollTop} onClick={scrollToTop} />
      </div>
    </div>
  );
}
