import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

const weekSchedule = [
  {
    day: "Monday",
    sessions: [
      { time: "10:00 AM", type: "Hifz - New Lesson", duration: "45 min", tutor: "Ustadh Bilal" },
      { time: "2:00 PM", type: "Revision", duration: "30 min", tutor: "Ustadh Bilal" },
    ],
  },
  {
    day: "Tuesday",
    sessions: [
      { time: "10:00 AM", type: "Tajweed Practice", duration: "30 min", tutor: "Ustadh Bilal" },
    ],
  },
  {
    day: "Wednesday",
    sessions: [
      { time: "10:00 AM", type: "Hifz - New Lesson", duration: "45 min", tutor: "Ustadh Bilal" },
      { time: "4:00 PM", type: "Group Revision", duration: "60 min", tutor: "Sheikh Ahmad" },
    ],
  },
  {
    day: "Thursday",
    sessions: [
      { time: "2:00 PM", type: "Revision + Assessment", duration: "45 min", tutor: "Ustadh Bilal" },
    ],
  },
  {
    day: "Friday",
    sessions: [],
  },
  {
    day: "Saturday",
    sessions: [
      { time: "10:00 AM", type: "Hifz - New Lesson", duration: "45 min", tutor: "Ustadh Bilal" },
    ],
  },
  {
    day: "Sunday",
    sessions: [],
  },
];

const StudentSchedule = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">My Schedule</h2>
        <p className="text-sm text-muted-foreground">Your weekly class timetable</p>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between bg-card rounded-xl border border-border p-4">
        <button className="p-2 rounded-lg hover:bg-secondary">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="font-display font-semibold text-foreground">This Week</h3>
        <button className="p-2 rounded-lg hover:bg-secondary">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekly Schedule */}
      <div className="space-y-4">
        {weekSchedule.map((day) => (
          <div
            key={day.day}
            className={`bg-card rounded-xl border ${
              day.day === today ? "border-primary" : "border-border"
            }`}
          >
            <div className={`px-5 py-3 border-b ${
              day.day === today ? "border-primary/30 bg-primary/5" : "border-border"
            } flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <h3 className={`font-display font-semibold ${
                  day.day === today ? "text-primary" : "text-foreground"
                }`}>
                  {day.day}
                </h3>
                {day.day === today && (
                  <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">Today</span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {day.sessions.length} session{day.sessions.length !== 1 ? "s" : ""}
              </span>
            </div>
            {day.sessions.length > 0 ? (
              <div className="divide-y divide-border">
                {day.sessions.map((session, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-center w-16">
                        <p className="text-sm font-medium text-foreground">{session.time}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                          <Clock className="w-3 h-3" />
                          {session.duration}
                        </p>
                      </div>
                      <div className="w-1 h-8 rounded-full bg-accent" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{session.type}</p>
                        <p className="text-xs text-muted-foreground">{session.tutor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No sessions scheduled
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSchedule;
