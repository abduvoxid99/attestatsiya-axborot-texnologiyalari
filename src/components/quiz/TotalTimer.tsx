import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TotalTimerProps {
  totalMinutes: number;
  isRunning: boolean;
  onTimeUp: () => void;
}

interface TimeLeft {
  minutes: number;
  seconds: number;
}

export const TotalTimer: React.FC<TotalTimerProps> = ({
  totalMinutes,
  isRunning,
  onTimeUp,
}) => {
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(totalMinutes * 60);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setTotalSecondsLeft(totalMinutes * 60);
    setIsComplete(false);
  }, [totalMinutes]);

  useEffect(() => {
    if (!isRunning || isComplete) return;

    const timer = setInterval(() => {
      setTotalSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsComplete(true);
          onTimeUp();
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onTimeUp, isComplete]);

  const timeLeft: TimeLeft = {
    minutes: Math.floor(totalSecondsLeft / 60),
    seconds: totalSecondsLeft % 60,
  };

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  if (isComplete) {
    return (
      <Card className="w-auto">
        <CardContent className="p-2 text-center">
          <h2 className="text-xs font-bold text-destructive">Vaqt tugadi!</h2>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Imzolash vaqti tugadi
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-auto">
      <CardContent className="p-2">
        <div className="grid grid-cols-2 gap-1.5 text-center">
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-foreground">
              {formatNumber(timeLeft.minutes)}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              Daqiqa
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-foreground">
              {formatNumber(timeLeft.seconds)}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              Soniya
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
