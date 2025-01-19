import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export function useEffectEverySecond(callback: () => void) {
  useEffect(() => {
    const current = new Date().getMilliseconds();
    const wait = 1000 - current;

    const timeout = setTimeout(callback, wait);
    return () => clearTimeout(timeout);
  });
}

export function useEverySecond() {
  const [date, setDate] = useState(DateTime.now());
  useEffectEverySecond(() => setDate(DateTime.now()));
  return date;
}
