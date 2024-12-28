import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import { Calendar } from "./ui/calendar";
import { DateTime } from "luxon";

interface DateTimeProps {
  startDateTime: DateTime | undefined;
  setStartDateTime: (date: DateTime | undefined) => void;
}

interface ConfigurationDialogProps extends DateTimeProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function ConfigurationDialog({
  open,
  setOpen,
  startDateTime,
  setStartDateTime,
}: ConfigurationDialogProps) {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure race</DialogTitle>
          <DialogDescription>Set up your backyard ultra.</DialogDescription>
        </DialogHeader>
        <Calendar
          mode="single"
          selected={startDateTime?.toJSDate()}
          onSelect={handleDaySelect}
          className="rounded-md border"
        />
        <form style={{ marginBlockEnd: "1em" }}>
          <label>
            Set the time:{" "}
            <input type="time" value={timeValue} onChange={handleTimeChange} />
          </label>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Configuration(props: DateTimeProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        className="absolute top-2 left-2"
        onClick={() => setOpen(true)}
      >
        <Settings />
        <span className="hidden">Configure race</span>
      </Button>
      <ConfigurationDialog open={open} setOpen={setOpen} {...props} />
    </>
  );
}
