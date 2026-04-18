import { useEffect, useRef, useState } from "react";
import { BOOT_SEQUENCE } from "../data";

export function useBootLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingExit, setLoadingExit] = useState(false);
  const [loadingLines, setLoadingLines] = useState<
    { text: string; status: "done" | "loading" }[]
  >([]);
  const [progress, setProgress] = useState(0);

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

  return { isLoading, loadingExit, loadingLines, progress };
}
