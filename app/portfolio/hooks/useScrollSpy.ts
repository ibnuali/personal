import { useEffect, useRef, useState } from "react";

export function useScrollSpy(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -20% 0px" },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return { activeSection, sectionsRef };
}
