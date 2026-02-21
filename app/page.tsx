"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Boot loader messages ──
const BOOT_SEQUENCE = [
  { text: "booting system", delay: 300 },
  { text: "loading modules", delay: 400 },
  { text: "fetching data", delay: 350 },
  { text: "system ready", delay: 200 },
];

const NAV_SECTIONS = [
  { id: "intro", label: "Overview" },
  { id: "work", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "connect", label: "Contact" },
];

const EXPERIENCE = [
  {
    year: "2024 — Present",
    role: "Software Engineer",
    company: "Len Inovasi Teknologi",
    description:
      "Developing a Combat Management System for the Indonesian Navy",
    tech: ["Websocket", "React", "TypeScript", "WebRTC", "Webpack"],
  },
  {
    year: "2022 — 2024",
    role: "Node JS Developer",
    company: "PT. Mitrais",
    description:
      "Developing a web-based Internal system for employee assessment and development",
    tech: ["Node JS", "NestJS", "NextJS", "React", "TypeScript", "PostgreSQL"],
  },
  {
    year: "2020 — 2022",
    role: "Software Engineer",
    company: "PT Len Industri",
    description:
      "Developing a web-based asset management system and system information intelligence",
    tech: ["Neo4j", "React", "PostgreSQL", "Python"],
  },
  {
    year: "2019 — 2020",
    role: "Full Stack Developer",
    company: "PT. Indocisc",
    description: "Created a web-based weather monitoring system",
    tech: ["Django", "PostgreSQL", "HTML", "CSS", "InfluxDB"],
  },
];

const PROJECTS = [
  {
    title: "xDraw",
    description:
      "A collaborative drawing application powered by Excalidraw with real-time collaboration features.",
    url: "https://xdraw.web.id",
    tech: ["React", "Excalidraw", "WebSocket"],
  },
];

const SOCIALS = [
  {
    name: "GitHub",
    handle: "@ibnuali",
    url: "https://github.com/ibnuali",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "Ibnu Ali Mukhtarom",
    url: "https://www.linkedin.com/in/ibnuali/",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "X",
    handle: "@iibnuali",
    url: "https://x.com/iibnuali",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@ibnualii",
    url: "https://www.instagram.com/ibnualii/",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

const SKILLS = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Docker",
  "WebSocket",
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("intro");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ── Loading state ──
  const [isLoading, setIsLoading] = useState(true);
  const [loadingExit, setLoadingExit] = useState(false);
  const [loadingLines, setLoadingLines] = useState<
    { text: string; status: "done" | "loading" }[]
  >([]);
  const [progress, setProgress] = useState(0);

  // ── Boot sequence ──
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      for (let i = 0; i < BOOT_SEQUENCE.length; i++) {
        if (cancelled) return;
        const step = BOOT_SEQUENCE[i];

        setLoadingLines((prev) => [
          ...prev,
          { text: step.text, status: "loading" },
        ]);
        setProgress(Math.round(((i + 0.5) / BOOT_SEQUENCE.length) * 100));

        await new Promise((r) => setTimeout(r, step.delay));
        if (cancelled) return;

        setLoadingLines((prev) =>
          prev.map((line, idx) =>
            idx === i ? { ...line, status: "done" } : line,
          ),
        );
        setProgress(Math.round(((i + 1) / BOOT_SEQUENCE.length) * 100));
      }

      await new Promise((r) => setTimeout(r, 400));
      if (cancelled) return;

      setLoadingExit(true);
      await new Promise((r) => setTimeout(r, 700));
      if (cancelled) return;
      setIsLoading(false);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    if (isLoading) return;
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
  }, [isLoading]);

  // Scroll to top visibility
  useEffect(() => {
    if (isLoading) return;
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // ── Loading screen ──
  if (isLoading) {
    return (
      <div className={`loader-screen ${loadingExit ? "exit" : ""}`}>
        <div className="loader-glow" />
        <div className="loader-terminal">
          {loadingLines.map((line, i) => (
            <div
              key={i}
              className={`loader-line ${line.status === "done" ? "success" : ""}`}
            >
              <span>{line.status === "done" ? "✓" : "›"}</span>
              <span>{line.text}</span>
              {line.status === "done" ? (
                <span className="status ml-auto">done</span>
              ) : (
                <span className="loader-cursor" />
              )}
            </div>
          ))}
        </div>
        <div className="loader-progress-container">
          <div className="loader-progress-bar">
            <div
              className="loader-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="loader-percentage">{progress}%</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dot-grid-bg page-frame min-h-screen relative">
      {/* ── Sticky Navigation ── */}
      <nav className="sticky-nav">
        <div className="sticky-nav-inner">
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
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
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="max-w-4xl mx-auto px-6 relative z-1">
        {/* ── Hero / Intro ── */}
        <header
          id="intro"
          ref={(el) => {
            sectionsRef.current[0] = el;
          }}
          className="min-h-screen flex items-center opacity-0 pt-16"
        >
          <div className="w-full space-y-10">
            <div className="space-y-5">
              <div className="intro-label">Software Engineer</div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
                Ibnu Ali
                <br />
                <span className="text-muted-foreground">Mukhtarom</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Building scalable systems at the crossroads of{" "}
                <span className="text-foreground font-medium">innovation</span>,{" "}
                <span className="text-foreground font-medium">performance</span>
                , and{" "}
                <span className="text-foreground font-medium">user impact</span>
                .
              </p>
            </div>

            {/* Overview info (chanhdai-style) */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="status-dot" />
                  <span className="text-sm text-muted-foreground font-mono">
                    Available for work
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Indonesia</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <Link
                    href="mailto:mail@ibnua.li"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    mail@ibnua.li
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <div className="intro-label text-xs">Currently</div>
                <div>
                  <div className="text-foreground font-medium">
                    Software Engineer
                  </div>
                  <div className="text-sm text-muted-foreground">
                    @ Len Inovasi Teknologi
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <div className="intro-label text-xs">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span key={skill} className="tech-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* ── Experience ── */}
        <section
          id="work"
          ref={(el) => {
            sectionsRef.current[1] = el;
          }}
          className="py-20 sm:py-28 opacity-0 section-divider"
        >
          <div className="space-y-8">
            <div className="flex items-baseline gap-3">
              <h2 className="section-header">Experience</h2>
              <span className="section-count">({EXPERIENCE.length})</span>
            </div>

            <div className="stagger-children">
              {EXPERIENCE.map((job, index) => (
                <div key={index} className="experience-card">
                  <div className="grid sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-3">
                      <div className="date-range font-mono text-xs text-muted-foreground">
                        {job.year}
                      </div>
                    </div>
                    <div className="sm:col-span-9 space-y-3">
                      <div>
                        <div className="font-semibold text-foreground">
                          {job.company}
                        </div>
                        <div className="font-mono text-sm text-muted-foreground">
                          {job.role}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.tech.map((tech) => (
                          <span key={tech} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section
          id="projects"
          ref={(el) => {
            sectionsRef.current[2] = el;
          }}
          className="py-20 sm:py-28 opacity-0 section-divider"
        >
          <div className="space-y-8">
            <div className="flex items-baseline gap-3">
              <h2 className="section-header">Projects</h2>
              <span className="section-count">({PROJECTS.length})</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {PROJECTS.map((project, index) => (
                <a
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card group block"
                >
                  <div className="relative z-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold group-hover:text-muted-foreground transition-colors duration-300">
                        {project.title}
                      </h3>
                      <svg
                        className="w-4 h-4 text-muted-foreground transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Connect ── */}
        <section
          id="connect"
          ref={(el) => {
            sectionsRef.current[3] = el;
          }}
          className="py-20 sm:py-28 opacity-0 section-divider"
        >
          <div className="space-y-8">
            <div className="flex items-baseline gap-3">
              <h2 className="section-header">Connect</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and
                  conversations about technology and design.
                </p>

                <Link
                  href="mailto:mail@ibnua.li"
                  className="group inline-flex items-center gap-2.5 text-foreground hover:text-muted-foreground transition-colors duration-300"
                >
                  <span className="font-medium">Send an email</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>

              <div className="space-y-3">
                <div className="intro-label text-xs">Social</div>
                <div className="grid grid-cols-1 gap-2">
                  {SOCIALS.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      className="social-card group"
                    >
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {social.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">
                          {social.name}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono truncate">
                          {social.handle}
                        </div>
                      </div>
                      <svg
                        className="w-4 h-4 text-muted-foreground transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 17L17 7M17 7H7M17 7v10"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer-section">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="footer-text">
              © {new Date().getFullYear()} Ibnu Ali Mukhtarom
            </div>
            <div className="footer-text">Built with Next.js</div>
          </div>
        </footer>
      </main>

      {/* ── Scroll to top ── */}
      <button
        onClick={scrollToTop}
        className={`scroll-top-btn ${showScrollTop ? "visible" : ""}`}
        aria-label="Scroll to top"
      >
        <svg
          className="w-4 h-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}
