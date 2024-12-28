import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";

export interface PlayerProps {
  start: DateTime<true>;
  now: DateTime<true>;
}

export function Player({ start, now }: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined"
      ? new Audio("/audio/referee-whistle-blow-gymnasium.wav")
      : undefined
  );

  const nowRounded = now.set({ millisecond: 0 });
  const startRounded = start.set({ millisecond: 0 });
  const nowSeconds = nowRounded.toMillis();
  const [latestNotification, setLatestNotification] = useState(nowSeconds);
  const nextLapStart = findNextLapStart(startRounded, nowRounded);
  const secondsToNextLapStart = nowRounded
    .until(nextLapStart)
    .toDuration()
    .as("seconds");
  useEffect(() => {
    if (latestNotification === nowSeconds) {
      return;
    }
    if ([180, 179, 178, 120, 119, 60, 3600].includes(secondsToNextLapStart)) {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
      setLatestNotification(nowSeconds);
    }
  }, [latestNotification, nowSeconds, secondsToNextLapStart]);
  return <></>;
}

function findNextLapStart(start: DateTime, now: DateTime) {
  if (now < start) {
    return start;
  }
  const thisHour = now.set({
    minute: start.minute,
    second: start.second,
    millisecond: start.millisecond,
  });
  if (now < thisHour) {
    return thisHour;
  }
  return thisHour.plus({ hours: 1 });
}
