"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Boot loader messages ──
const BOOT_SEQUENCE = [
  { text: "booting system", delay: 300 },
  { text: "loading modules", delay: 400 },
  { text: "fetching data", delay: 350 },
  { text: "system ready", delay: 200 },
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

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

        // show line in "loading" state
        setLoadingLines((prev) => [
          ...prev,
          { text: step.text, status: "loading" },
        ]);
        setProgress(Math.round(((i + 0.5) / BOOT_SEQUENCE.length) * 100));

        await new Promise((r) => setTimeout(r, step.delay));
        if (cancelled) return;

        // mark as done
        setLoadingLines((prev) =>
          prev.map((line, idx) =>
            idx === i ? { ...line, status: "done" } : line,
          ),
        );
        setProgress(Math.round(((i + 1) / BOOT_SEQUENCE.length) * 100));
      }

      // small pause after 100%
      await new Promise((r) => setTimeout(r, 400));
      if (cancelled) return;

      // begin exit
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
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isLoading]);

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
    <div className="min-h-screen bg-background text-foreground relative">
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-20 group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg
            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
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
            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() =>
                document
                  .getElementById(section)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section
                  ? "bg-foreground"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => {
            sectionsRef.current[0] = el;
          }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">
                  HI, I'M
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Ibnu Ali
                  <br />
                  <span className="text-muted-foreground">Mukhtarom</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Software Engineer building scalable systems at the crossroads
                  of
                  <span className="text-foreground"> innovation</span>,
                  <span className="text-foreground"> performance</span>, and
                  <span className="text-foreground"> user impact</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Indonesia</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">
                  CURRENTLY
                </div>
                <div className="space-y-2">
                  <div className="text-foreground">Software Engineer</div>
                  <div className="text-muted-foreground">
                    @ Len Inovasi Teknologi
                  </div>
                  <div className="text-xs text-muted-foreground">
                    2024 — Present
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">
                  FOCUS
                </div>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Next.js", "Node.js"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => {
            sectionsRef.current[1] = el;
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Selected Work</h2>
              <div className="text-sm text-muted-foreground font-mono">
                2019 — Present
              </div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2024",
                  role: "Software Engineer",
                  company: "Len Inovasi Teknologi",
                  description:
                    "Developing a Combat Management System for the Indonesian Navy",
                  tech: [
                    "Websocket",
                    "React",
                    "TypeScript",
                    "WebRTC",
                    "Webpack",
                  ],
                },
                {
                  year: "2022",
                  role: "Node JS Developer",
                  company: "PT. Mitrais",
                  description:
                    "Developing a web-based Internal system for employee assessment and development",
                  tech: [
                    "Node JS",
                    "NestJS",
                    "NextJS",
                    "React",
                    "TypeScript",
                    "PostgreSQL",
                  ],
                },
                {
                  year: "2020",
                  role: "Software Engineer",
                  company: "PT Len Industri",
                  description:
                    "Developing a web-based asset management system and system information intelligence",
                  tech: ["Neo4j", "React", "PostgreSQL", "Python"],
                },
                {
                  year: "2019",
                  role: "Full Stack Developer",
                  company: "PT. Indocisc",
                  description: "Created a web-based weather monitoring system",
                  tech: ["Django", "PostgreSQL", "HTML", "CSS", "InfluxDB"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">
                        {job.role}
                      </h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">
                      {job.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => {
            sectionsRef.current[2] = el;
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Mini Projects</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "xDraw",
                  excerpt:
                    "A collaborative drawing application powered by Excalidraw with real-time collaboration features.",
                },
              ].map((post, index) => (
                <article
                  key={index}
                  onClick={() => window.open("https://xdraw.web.id", "_blank")}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono"></div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>View Project</span>
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
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="connect"
          ref={(el) => {
            sectionsRef.current[3] = el;
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and
                  conversations about technology and design.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:mail@ibnua.li"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">Mail Me</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
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
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">
                Social Media
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "GitHub",
                    handle: "@ibnuali",
                    url: "https://github.com/ibnuali",
                  },
                  {
                    name: "Instagram",
                    handle: "@ibnualii",
                    url: "https://www.instagram.com/ibnualii/",
                  },
                  {
                    name: "X",
                    handle: "@iibnuali",
                    url: "https://x.com/iibnuali",
                  },
                  {
                    name: "LinkedIn",
                    handle: "Ibnu Ali Mukhtarom",
                    url: "https://www.linkedin.com/in/ibnuali/",
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {social.handle}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
