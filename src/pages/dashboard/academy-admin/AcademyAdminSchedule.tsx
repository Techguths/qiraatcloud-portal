import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const weeklySchedule: Record<string, { time: string; class: string; tutor: string; students: number; type: string }[]> = {
  Sunday: [],
  Monday: [
    { time: "9:00 AM", class: "Hifz Circle - Beginners", tutor: "Ustadh Bilal", students: 5, type: "Group" },
    { time: "2:00 PM", class: "Advanced Hifz", tutor: "Ustadh Omar", students: 1, type: "1-on-1" },
    { time: "4:00 PM", class: "Intensive Hifz", tutor: "Ustadh Omar", students: 3, type: "Group" },
    { time: "6:00 PM", class: "Evening Tajweed", tutor: "Ustadha Fatima", students: 4, type: "Group" },
  ],
  Tuesday: [
    { time: "3:00 PM", class: "Tajweed Mastery", tutor: "Ustadha Khadijah", students: 1, type: "1-on-1" },
    { time: "4:00 PM", class: "Intensive Hifz", tutor: "Ustadh Omar", students: 3, type: "Group" },
  ],
  Wednesday: [
    { time: "9:00 AM", class: "Hifz Circle - Beginners", tutor: "Ustadh Bilal", students: 5, type: "Group" },
    { time: "4:00 PM", class: "Intensive Hifz", tutor: "Ustadh Omar", students: 3, type: "Group" },
    { time: "6:00 PM", class: "Evening Tajweed", tutor: "Ustadha Fatima", students: 4, type: "Group" },
  ],
  Thursday: [
    { time: "3:00 PM", class: "Tajweed Mastery", tutor: "Ustadha Khadijah", students: 1, type: "1-on-1" },
    { time: "4:00 PM", class: "Intensive Hifz", tutor: "Ustadh Omar", students: 3, type: "Group" },
  ],
  Friday: [
    { time: "9:00 AM", class: "Hifz Circle - Beginners", tutor: "Ustadh Bilal", students: 5, type: "Group" },
    { time: "4:00 PM", class: "Intensive Hifz", tutor: "Ustadh Omar", students: 3, type: "Group" },
  ],
  Saturday: [
    { time: "10:00 AM", class: "Revision Group", tutor: "Ustadh Bilal", students: 6, type: "Group" },
  ],
};

const AcademyAdminSchedule = () => {
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[new Date().getDay()]);

  const sessions = weeklySchedule[selectedDay] || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Academy Schedule</h2>
        <p className="text-sm text-muted-foreground">View and manage all classes across the week</p>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedDay === day ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Sessions */}
      {sessions.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <p className="text-muted-foreground">No classes scheduled for {selectedDay}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 min-w-[120px]">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">{session.time}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-semibold text-foreground">{session.class}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    session.type === "Group" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                  }`}>{session.type}</span>
                </div>
                <p className="text-sm text-muted-foreground">{session.tutor}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{session.students} students</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs">Reschedule</Button>
                <Button size="sm" variant="outline" className="text-xs text-destructive hover:text-destructive">Cancel</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Weekly Summary */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-display font-semibold text-foreground mb-3">Weekly Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <p className="text-2xl font-bold text-foreground">{Object.values(weeklySchedule).flat().length}</p>
            <p className="text-xs text-muted-foreground">Total Sessions</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <p className="text-2xl font-bold text-foreground">{new Set(Object.values(weeklySchedule).flat().map(s => s.tutor)).size}</p>
            <p className="text-xs text-muted-foreground">Active Tutors</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <p className="text-2xl font-bold text-foreground">{Object.values(weeklySchedule).flat().reduce((sum, s) => sum + s.students, 0)}</p>
            <p className="text-xs text-muted-foreground">Student Slots</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-secondary/50">
            <p className="text-2xl font-bold text-foreground">{Object.values(weeklySchedule).filter(d => d.length > 0).length}</p>
            <p className="text-xs text-muted-foreground">Active Days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyAdminSchedule;
