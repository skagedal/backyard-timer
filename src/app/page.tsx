"use client";

import { RaceTimer } from "@/components/clock";
import { DateTime } from "luxon";
import { useState } from "react";
import { Intro } from "./intro";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function Home() {
  const [startDateTime, setStartDateTime] = useState<DateTime | undefined>(
    DateTime.now()
      .plus({ hour: 1 })
      .set({ minute: 0, second: 0, millisecond: 0 })
  );
  const [started, setStarted] = useState(false);

  return (
    <>
      {started && startDateTime ? (
        <>
          <Button
            variant="outline"
            className="absolute top-2 left-2"
            onClick={() => setStarted(false)}
          >
            {" "}
            <Settings />
            <span className="hidden">Configure race</span>
          </Button>
          {/* 
          <Configuration
            startDateTime={startDateTime}
            setStartDateTime={setStartDateTime}
          /> */}
          <RaceTimer startDateTime={startDateTime} />
        </>
      ) : (
        <Intro
          startDateTime={startDateTime}
          setStartDateTime={setStartDateTime}
          start={() => setStarted(true)}
        />
      )}
    </>
  );
}
