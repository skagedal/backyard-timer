import { useInterval } from "@/lib/interval-hook";
import { DateTime } from "luxon";
import { useState } from "react";
import { Player } from "./player";

export interface ClockProps {
  startDateTime: DateTime | undefined;
}

function ClockLayout({ a, b }: { a: React.ReactNode; b: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[20vmin] leading-[20vmin] uppercase text-sky-400">
        {a}
      </div>
      <div className="text-[35vmin] leading-[35vmin] tabular-nums">{b}</div>
    </div>
  );
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
  return <ClockLayout a="Countdown" b={formatted} />;
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
  return <ClockLayout a={`Lap ${lap}`} b={lapClock} />;
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
