import { useState } from "react";
import { Plus, Clock, Users, BookOpen, Video, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockClasses = [
  {
    id: 1, name: "Hifz Circle - Beginners", type: "Group", students: ["Ahmed Hassan", "Omar Khalid"], maxStudents: 5,
    schedule: "Mon, Wed, Fri • 2:00 PM", duration: "45 min", subject: "Hifz", level: "Beginner", status: "active",
    nextSession: "Today, 2:00 PM", totalSessions: 48, completedSessions: 36,
  },
  {
    id: 2, name: "Tajweed Mastery", type: "1-on-1", students: ["Fatima Ali"], maxStudents: 1,
    schedule: "Tue, Thu • 3:00 PM", duration: "30 min", subject: "Tajweed", level: "Intermediate", status: "active",
    nextSession: "Tomorrow, 3:00 PM", totalSessions: 24, completedSessions: 18,
  },
  {
    id: 3, name: "Advanced Hifz - Juz 15-20", type: "1-on-1", students: ["Aisha Bint Yusuf"], maxStudents: 1,
    schedule: "Mon-Fri • 4:00 PM", duration: "45 min", subject: "Hifz", level: "Advanced", status: "active",
    nextSession: "Today, 4:00 PM", totalSessions: 60, completedSessions: 52,
  },
  {
    id: 4, name: "Revision Group", type: "Group", students: ["Maryam Abdullah", "Yusuf Ibrahim", "Ahmed Hassan"], maxStudents: 6,
    schedule: "Sat • 10:00 AM", duration: "60 min", subject: "Revision", level: "Mixed", status: "active",
    nextSession: "Saturday, 10:00 AM", totalSessions: 12, completedSessions: 8,
  },
];

const TutorClasses = () => {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">My Classes</h2>
          <p className="text-sm text-muted-foreground">{mockClasses.length} active classes</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-card border border-border rounded-lg overflow-hidden">
            <button onClick={() => setView("grid")} className={`px-3 py-1.5 text-xs font-medium ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>Grid</button>
            <button onClick={() => setView("list")} className={`px-3 py-1.5 text-xs font-medium ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>List</button>
          </div>
          <Button size="sm" className="gap-1"><Plus className="w-4 h-4" /> New Class</Button>
        </div>
      </div>

      <div className={view === "grid" ? "grid md:grid-cols-2 gap-4" : "space-y-4"}>
        {mockClasses.map((cls) => (
          <div key={cls.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-soft transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-foreground">{cls.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    cls.type === "Group" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                  }`}>{cls.type}</span>
                </div>
                <p className="text-xs text-muted-foreground">{cls.subject} • {cls.level}</p>
              </div>
              <button className="p-1.5 hover:bg-secondary rounded-lg">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{cls.schedule} • {cls.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{cls.students.length}/{cls.maxStudents} students</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Video className="w-4 h-4" />
                <span>Next: {cls.nextSession}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Course Progress</span>
                <span className="font-medium text-foreground">{cls.completedSessions}/{cls.totalSessions}</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-gradient-gold rounded-full" style={{ width: `${(cls.completedSessions / cls.totalSessions) * 100}%` }} />
              </div>
            </div>

            {/* Students Avatars */}
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {cls.students.map((s, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center">
                    <span className="text-[10px] font-bold text-foreground">{s.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs">Details</Button>
                <Button size="sm" className="text-xs gap-1"><Video className="w-3 h-3" /> Start</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorClasses;
