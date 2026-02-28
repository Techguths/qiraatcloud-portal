import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const weeklySchedule: Record<string, { time: string; student: string; type: string; duration: string; status: string }[]> = {
  Monday: [
    { time: "2:00 PM", student: "Ahmed Hassan / Omar Khalid", type: "Hifz Circle - Beginners", duration: "45 min", status: "confirmed" },
    { time: "4:00 PM", student: "Aisha Bint Yusuf", type: "Advanced Hifz", duration: "45 min", status: "confirmed" },
  ],
  Tuesday: [
    { time: "3:00 PM", student: "Fatima Ali", type: "Tajweed Mastery", duration: "30 min", status: "confirmed" },
    { time: "5:00 PM", student: "Yusuf Ibrahim", type: "Hifz Review", duration: "45 min", status: "pending" },
  ],
  Wednesday: [
    { time: "2:00 PM", student: "Ahmed Hassan / Omar Khalid", type: "Hifz Circle - Beginners", duration: "45 min", status: "confirmed" },
    { time: "4:00 PM", student: "Aisha Bint Yusuf", type: "Advanced Hifz", duration: "45 min", status: "confirmed" },
    { time: "6:00 PM", student: "Maryam Abdullah", type: "Tajweed Practice", duration: "30 min", status: "confirmed" },
  ],
  Thursday: [
    { time: "3:00 PM", student: "Fatima Ali", type: "Tajweed Mastery", duration: "30 min", status: "confirmed" },
  ],
  Friday: [
    { time: "2:00 PM", student: "Ahmed Hassan / Omar Khalid", type: "Hifz Circle - Beginners", duration: "45 min", status: "confirmed" },
    { time: "4:00 PM", student: "Aisha Bint Yusuf", type: "Advanced Hifz", duration: "45 min", status: "confirmed" },
  ],
  Saturday: [
    { time: "10:00 AM", student: "Group Session", type: "Revision Group", duration: "60 min", status: "confirmed" },
  ],
  Sunday: [],
};

const TutorSchedule = () => {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const today = new Date().getDay();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Weekly Schedule</h2>
          <p className="text-sm text-muted-foreground">Manage your teaching timetable</p>
        </div>
        <Button size="sm" variant="outline">Set Availability</Button>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-2">
        <button onClick={() => setCurrentDay((currentDay - 1 + 7) % 7)} className="p-2 hover:bg-secondary rounded-lg">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 flex gap-1 overflow-x-auto">
          {weekDays.map((day, i) => (
            <button
              key={day}
              onClick={() => setCurrentDay(i)}
              className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                currentDay === i
                  ? "bg-primary text-primary-foreground"
                  : i === today
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {day.slice(0, 3)}
              {weeklySchedule[day]?.length > 0 && (
                <span className="block text-[10px] opacity-70">{weeklySchedule[day].length} classes</span>
              )}
            </button>
          ))}
        </div>
        <button onClick={() => setCurrentDay((currentDay + 1) % 7)} className="p-2 hover:bg-secondary rounded-lg">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Schedule for Selected Day */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-5 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">{weekDays[currentDay]}'s Schedule</h3>
        </div>
        {weeklySchedule[weekDays[currentDay]]?.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-muted-foreground text-sm">No classes scheduled for {weekDays[currentDay]}.</p>
            <Button size="sm" variant="outline" className="mt-3">Add a Class</Button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {weeklySchedule[weekDays[currentDay]]?.map((session, i) => (
              <div key={i} className="p-5 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[60px]">
                    <p className="text-sm font-bold text-foreground">{session.time}</p>
                    <p className="text-xs text-muted-foreground">{session.duration}</p>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{session.type}</p>
                    <p className="text-xs text-muted-foreground">{session.student}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    session.status === "confirmed" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                  }`}>
                    {session.status}
                  </span>
                  {currentDay === today && (
                    <Button size="sm" className="text-xs gap-1"><Video className="w-3 h-3" /> Join</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <p className="font-display text-2xl font-bold text-foreground">
            {Object.values(weeklySchedule).reduce((sum, day) => sum + day.length, 0)}
          </p>
          <p className="text-xs text-muted-foreground">Total Classes/Week</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <p className="font-display text-2xl font-bold text-foreground">18</p>
          <p className="text-xs text-muted-foreground">Teaching Hours/Week</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <p className="font-display text-2xl font-bold text-foreground">6</p>
          <p className="text-xs text-muted-foreground">Unique Students</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <p className="font-display text-2xl font-bold text-foreground">1</p>
          <p className="text-xs text-muted-foreground">Day Off</p>
        </div>
      </div>
    </div>
  );
};

export default TutorSchedule;
