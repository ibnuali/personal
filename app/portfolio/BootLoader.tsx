import { CheckIcon, ChevronRightIcon } from "./icons";

interface LoadingLine {
  text: string;
  status: "done" | "loading";
}

interface BootLoaderProps {
  loadingLines: LoadingLine[];
  progress: number;
  loadingExit: boolean;
}

export default function BootLoader({
  loadingLines,
  progress,
  loadingExit,
}: BootLoaderProps) {
  return (
    <div className={`loader-screen ${loadingExit ? "exit" : ""}`}>
      <div className="loader-glow" />
      <div className="loader-terminal">
        {loadingLines.map((line, i) => (
          <div
            key={i}
            className={`loader-line ${line.status === "done" ? "success" : ""}`}
          >
            {line.status === "done" ? <CheckIcon /> : <ChevronRightIcon />}
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
