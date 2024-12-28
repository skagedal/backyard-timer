import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Play } from "lucide-react";
import { DateTime } from "luxon";
import { ChangeEventHandler, useState } from "react";

export interface IntroProps {
  startDateTime: DateTime | undefined;
  setStartDateTime: (date: DateTime | undefined) => void;
  start: () => void;
}

export function Intro({ startDateTime, setStartDateTime, start }: IntroProps) {
  const [timeValue, setTimeValue] = useState<string>(
    startDateTime?.toFormat("HH:mm") ?? "00:00"
  );

  const updateStart = (date: Date | undefined, time: string) => {
    if (!date) {
      setStartDateTime(undefined);
      return;
    }

    const parsedTime = DateTime.fromFormat(time, "HH:mm");
    setStartDateTime(
      DateTime.fromJSDate(date).set({
        hour: parsedTime.hour,
        minute: parsedTime.minute,
      })
    );
  };

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    setTimeValue(time);
    updateStart(startDateTime?.toJSDate(), time);
  };

  const handleDaySelect = (date: Date | undefined) => {
    updateStart(date, timeValue);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Backyard Ultra Timer
      </h1>
      <p className="leading-7 mt-6">
        This is a simple timer tool to manage your{" "}
        <a
          href="https://en.wikipedia.org/wiki/Backyard_ultra"
          className="font-medium text-primary underline underline-offset-4"
        >
          backyard ultra
        </a>{" "}
        race. Simply set the date and time for when the first lap starts and
        press start.
      </p>
      <div className="mt-4 flex flex-col items-start">
        <p className="font-semibold">Date</p>
        <Calendar
          mode="single"
          selected={startDateTime?.toJSDate()}
          onSelect={handleDaySelect}
          className="rounded-md border mt-1"
        />
      </div>
      <div className="mt-4 flex flex-col items-start">
        <p className="font-semibold">Time</p>
        <div className="mt-1 flex flex-col items-start">
          <div className="rounded-md border p-4">
            <input type="time" value={timeValue} onChange={handleTimeChange} />
          </div>
        </div>
      </div>
      <div className="mt-4 flex">
        <Button variant="default" disabled={!startDateTime} onClick={start}>
          <Play />
          Start
        </Button>
      </div>
    </div>
  );
}
