import { useInterval } from "@/lib/interval-hook";
import { DateTime } from "luxon";
import { useState } from "react";
import { Player } from "./player";

export interface ClockProps {
  startDateTime: DateTime | undefined;
}

function CountDown({
  start,
  now,
}: {
  start: DateTime<true>;
  now: DateTime<true>;
}) {
  const formatted = now
    .until(start.plus({ second: 1 }))
    .toDuration()
    .toFormat("hh:mm:ss");
  return (
    <div className="flex flex-col items-center">
      <div className="text-[5vw] uppercase text-sky-400">Countdown</div>
      <div className="text-[20vw] tabular-nums">{formatted}</div>
    </div>
  );
}

function LapTimer({
  start,
  now,
}: {
  start: DateTime<true>;
  now: DateTime<true>;
}) {
  const lap = Math.floor(start.until(now).toDuration("hours").hours) + 1;
  const lapClock = start
    .until(now)
    .toDuration(["hours", "minutes", "seconds"])
    .set({ hours: 0 })
    .toFormat("mm:ss");
  return (
    <div className="flex flex-col items-center">
      <div className="text-[5vw] uppercase text-sky-400">Lap {lap}</div>
      <div className="text-[20vw] tabular-nums">{lapClock}</div>
    </div>
  );
}

function Clock({ start }: { start: DateTime<true> }) {
  const [now, setNow] = useState(DateTime.now());
  useInterval(() => {
    setNow(DateTime.now());
  }, 1000);

  return (
    <>
      <Player start={start} now={now} />
      {now < start ? (
        <CountDown start={start} now={now} />
      ) : (
        <LapTimer start={start} now={now} />
      )}
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
