import { useState } from "react";
import { Plus, Clock, Users, BookOpen, Video, MoreVertical, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockClasses = [
  { id: 1, name: "Hifz Circle - Beginners", type: "Group", tutor: "Ustadh Bilal Ahmad", students: 5, maxStudents: 8, schedule: "Mon, Wed, Fri • 9:00 AM", duration: "45 min", subject: "Hifz", level: "Beginner", status: "active", totalSessions: 48, completedSessions: 36 },
  { id: 2, name: "Tajweed Mastery", type: "1-on-1", tutor: "Ustadha Khadijah", students: 1, maxStudents: 1, schedule: "Tue, Thu • 3:00 PM", duration: "30 min", subject: "Tajweed", level: "Intermediate", status: "active", totalSessions: 24, completedSessions: 18 },
  { id: 3, name: "Advanced Hifz - Juz 15-20", type: "1-on-1", tutor: "Ustadh Omar", students: 1, maxStudents: 1, schedule: "Mon-Fri • 4:00 PM", duration: "45 min", subject: "Hifz", level: "Advanced", status: "active", totalSessions: 60, completedSessions: 52 },
  { id: 4, name: "Revision Group", type: "Group", tutor: "Ustadh Bilal Ahmad", students: 6, maxStudents: 10, schedule: "Sat • 10:00 AM", duration: "60 min", subject: "Revision", level: "Mixed", status: "active", totalSessions: 12, completedSessions: 8 },
  { id: 5, name: "Evening Tajweed", type: "Group", tutor: "Ustadha Fatima", students: 4, maxStudents: 6, schedule: "Mon, Wed • 6:00 PM", duration: "45 min", subject: "Tajweed", level: "Beginner", status: "paused", totalSessions: 30, completedSessions: 20 },
  { id: 6, name: "Intensive Hifz Program", type: "Group", tutor: "Ustadh Omar", students: 3, maxStudents: 5, schedule: "Daily • 8:00 AM", duration: "90 min", subject: "Hifz", level: "Advanced", status: "active", totalSessions: 90, completedSessions: 65 },
];

const AcademyAdminClasses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "paused">("all");

  const filteredClasses = mockClasses.filter((cls) => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || cls.tutor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || cls.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Class Management</h2>
          <p className="text-sm text-muted-foreground">{mockClasses.length} total classes • {mockClasses.filter(c => c.status === "active").length} active</p>
        </div>
        <Button size="sm" className="gap-1"><Plus className="w-4 h-4" /> Create Class</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search classes or tutors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "paused"] as const).map((status) => (
            <button key={status} onClick={() => setFilterStatus(status)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${filterStatus === status ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-soft transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-foreground">{cls.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cls.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{cls.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{cls.subject} • {cls.level} • {cls.type}</p>
              </div>
              <button className="p-1.5 hover:bg-secondary rounded-lg"><MoreVertical className="w-4 h-4 text-muted-foreground" /></button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCapIcon className="w-4 h-4" />
                <span>{cls.tutor}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{cls.schedule} • {cls.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{cls.students}/{cls.maxStudents} students</span>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{Math.round((cls.completedSessions / cls.totalSessions) * 100)}%</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-gradient-gold rounded-full" style={{ width: `${(cls.completedSessions / cls.totalSessions) * 100}%` }} />
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs flex-1">Edit</Button>
              <Button size="sm" variant="outline" className="text-xs flex-1">View Details</Button>
              {cls.status === "active" ? (
                <Button size="sm" variant="outline" className="text-xs text-destructive hover:text-destructive">Pause</Button>
              ) : (
                <Button size="sm" className="text-xs">Resume</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GraduationCapIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </svg>
);

export default AcademyAdminClasses;
