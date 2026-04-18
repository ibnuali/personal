import { ArrowUpIcon } from "./icons";

interface ScrollToTopProps {
  show: boolean;
  onClick: () => void;
}

export default function ScrollToTop({ show, onClick }: ScrollToTopProps) {
  return (
    <button
      onClick={onClick}
      className={`scroll-top-btn ${show ? "visible" : ""}`}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}
