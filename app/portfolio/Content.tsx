import Link from "next/link";
import { EXPERIENCE, PROJECTS, SKILLS, SOCIALS } from "./data";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  XIcon,
} from "./icons";
import type { MutableRefObject } from "react";

const SOCIAL_ICONS = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
  Instagram: InstagramIcon,
} as const;

interface ContentProps {
  sectionsRef: MutableRefObject<(HTMLElement | null)[]>;
}

export default function Content({ sectionsRef }: ContentProps) {
  return (
    <>
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
              <span className="text-foreground font-medium">performance</span>,
              and{" "}
              <span className="text-foreground font-medium">user impact</span>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="status-dot" />
                <span className="text-sm text-muted-foreground font-mono">
                  Available for work
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPinIcon />
                <span>Indonesia</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MailIcon />
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
                    <ExternalLinkIcon className="w-4 h-4 text-muted-foreground transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
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
                <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="intro-label text-xs">Social</div>
              <div className="grid grid-cols-1 gap-2">
                {SOCIALS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.name as keyof typeof SOCIAL_ICONS];
                  return (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      className="social-card group"
                    >
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {Icon && <Icon className="w-5 h-5" />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">
                          {social.name}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono truncate">
                          {social.handle}
                        </div>
                      </div>
                      <ExternalLinkIcon className="w-4 h-4 text-muted-foreground transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="footer-text">
            © {new Date().getFullYear()} Ibnu Ali Mukhtarom
          </div>
          <div className="footer-text">Built with Next.js</div>
        </div>
      </footer>
    </>
  );
}
