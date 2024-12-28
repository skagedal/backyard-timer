import { useInterval } from "@/lib/interval-hook";
import { DateTime } from "luxon";
import { useState } from "react";
import { Player } from "./player";

export interface ClockProps {
  startDateTime: DateTime | undefined;
}

function Clock({ start }: { start: DateTime<true> }) {
  const [now, setNow] = useState(DateTime.now());
  useInterval(() => {
    setNow(DateTime.now());
  }, 1000);

  const [first, second] = now > start ? [start, now] : [now, start];
  const formatted = first.until(second).toDuration().toFormat("hh:mm:ss");
  return (
    <>
      <Player start={start} now={now} />
      <div className="text-[20vw] tabular-nums">{formatted}</div>
    </>
  );
}

export function RaceTimer({ startDateTime }: ClockProps) {
  return (
    <div className="flex h-screen items-center justify-center">
      {startDateTime ? (
        <Clock start={startDateTime} />
      ) : (
        <div>No start time set.</div>
      )}
    </div>
  );
}
