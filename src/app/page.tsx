"use client";

import { RaceTimer } from "@/components/clock";
import { Configuration } from "@/components/configuration";
import { DateTime } from "luxon";
import { useState } from "react";

export default function Home() {
  const [startDateTime, setStartDateTime] = useState<DateTime | undefined>(
    DateTime.now().plus({ minutes: 5 })
  );

  return (
    <>
      <Configuration
        startDateTime={startDateTime}
        setStartDateTime={setStartDateTime}
      />
      <RaceTimer startDateTime={startDateTime} />
    </>
  );
}
