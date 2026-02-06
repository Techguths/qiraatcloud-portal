import { Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const todaysSessions = [
  { time: "09:00 AM", student: "Khadija Noor", type: "Beginner Reading", duration: "30 min", tutor: "Sheikh Ahmad", status: "completed" },
  { time: "10:00 AM", student: "Ahmed Malik", type: "Hifz - Juz 15", duration: "45 min", tutor: "Ustadh Bilal", status: "completed" },
  { time: "11:30 AM", student: "Yusuf Amin", type: "Hifz Review", duration: "45 min", tutor: "Sheikh Ahmad", status: "completed" },
  { time: "02:00 PM", student: "Omar Hassan", type: "New Lesson", duration: "45 min", tutor: "Sheikh Ahmad", status: "upcoming" },
  { time: "03:00 PM", student: "Fatima Yusuf", type: "Tajweed", duration: "30 min", tutor: "Ustadha Mariam", status: "upcoming" },
  { time: "04:30 PM", student: "Aisha Rahman", type: "Hifz - Juz 12", duration: "45 min", tutor: "Ustadha Mariam", status: "upcoming" },
  { time: "06:00 PM", student: "Ibrahim Ali", type: "Revision", duration: "30 min", tutor: "Ustadh Bilal", status: "upcoming" },
];

const weeklyOverview = [
  { day: "Mon", sessions: 12, hours: 8 },
  { day: "Tue", sessions: 10, hours: 7 },
  { day: "Wed", sessions: 14, hours: 9 },
  { day: "Thu", sessions: 11, hours: 7.5 },
  { day: "Fri", sessions: 6, hours: 4 },
  { day: "Sat", sessions: 8, hours: 5.5 },
  { day: "Sun", sessions: 4, hours: 3 },
];

const AcademySchedule = () => {
  const today = new Date();
  const currentDay = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Schedule</h2>
          <p className="text-sm text-muted-foreground">{currentDay}</p>
        </div>
        <Button className="bg-gradient-hero hover:opacity-90 gap-2">
          <Plus className="w-4 h-4" />
          New Session
        </Button>
      </div>

      {/* Date Navigation */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <button className="p-2 rounded-lg hover:bg-secondary">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="font-display font-semibold text-foreground">This Week</h3>
          <button className="p-2 rounded-lg hover:bg-secondary">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weeklyOverview.map((day, i) => (
            <button
              key={day.day}
              className={`p-3 rounded-xl text-center transition-all ${
                i === today.getDay() - 1
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              <p className="text-xs font-medium mb-1">{day.day}</p>
              <p className={`text-lg font-bold font-display ${i === today.getDay() - 1 ? "" : "text-foreground"}`}>
                {day.sessions}
              </p>
              <p className={`text-xs ${i === today.getDay() - 1 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                sessions
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Sessions */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-5 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">Today's Sessions</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {todaysSessions.filter(s => s.status === "completed").length} completed • {todaysSessions.filter(s => s.status === "upcoming").length} upcoming
          </p>
        </div>
        <div className="divide-y divide-border">
          {todaysSessions.map((session, i) => (
            <div
              key={i}
              className={`p-4 flex items-center justify-between ${
                session.status === "completed" ? "opacity-60" : ""
              } hover:bg-secondary/30 transition-colors`}
            >
              <div className="flex items-center gap-4">
                <div className="text-center w-16">
                  <p className="text-sm font-medium text-foreground">{session.time}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                    <Clock className="w-3 h-3" />
                    {session.duration}
                  </p>
                </div>
                <div className={`w-1 h-10 rounded-full ${
                  session.status === "completed" ? "bg-primary/30" : "bg-accent"
                }`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{session.student}</p>
                  <p className="text-xs text-muted-foreground">{session.type} • {session.tutor}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                session.status === "completed"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent/20 text-accent"
              }`}>
                {session.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademySchedule;
