import Link from "next/link";

export default function NotFound() {
  return (
    <div className="dot-grid-bg page-frame min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 px-6">
        <h1 className="text-7xl font-semibold tracking-tight text-foreground">
          404
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground font-medium hover:text-muted-foreground transition-colors duration-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  );
}