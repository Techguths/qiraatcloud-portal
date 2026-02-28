import { useState } from "react";
import { Search, Filter, Star, TrendingUp, TrendingDown, BookOpen, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockStudents = [
  { id: 1, name: "Ahmed Hassan", age: 14, plan: "Premium", juzCompleted: 8, totalJuz: 30, currentSurah: "Al-Isra", avgScore: 92, streak: 45, trend: "up", lastSession: "Today", status: "active" },
  { id: 2, name: "Fatima Ali", age: 12, plan: "Intensive", juzCompleted: 5, totalJuz: 30, currentSurah: "Al-Anfal", avgScore: 88, streak: 30, trend: "up", lastSession: "Today", status: "active" },
  { id: 3, name: "Omar Khalid", age: 16, plan: "Basic", juzCompleted: 3, totalJuz: 30, currentSurah: "Ali Imran", avgScore: 75, streak: 12, trend: "down", lastSession: "Yesterday", status: "active" },
  { id: 4, name: "Aisha Bint Yusuf", age: 11, plan: "Premium", juzCompleted: 12, totalJuz: 30, currentSurah: "Al-Anbiya", avgScore: 95, streak: 60, trend: "up", lastSession: "Today", status: "active" },
  { id: 5, name: "Yusuf Ibrahim", age: 15, plan: "Intensive", juzCompleted: 6, totalJuz: 30, currentSurah: "Al-A'raf", avgScore: 82, streak: 8, trend: "down", lastSession: "3 days ago", status: "inactive" },
  { id: 6, name: "Maryam Abdullah", age: 13, plan: "Premium", juzCompleted: 10, totalJuz: 30, currentSurah: "Maryam", avgScore: 90, streak: 25, trend: "up", lastSession: "Today", status: "active" },
];

const TutorStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = mockStudents.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || s.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">My Students</h2>
          <p className="text-sm text-muted-foreground">{mockStudents.length} students assigned</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm outline-none w-full sm:w-40"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid gap-4">
        {filtered.map((student) => (
          <div key={student.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-soft transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                  <span className="text-sm font-bold text-accent-foreground">
                    {student.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-foreground">{student.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      student.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {student.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Age {student.age} • {student.plan} Plan • Last session: {student.lastSession}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-secondary rounded-lg">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Progress</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-gold rounded-full" style={{ width: `${(student.juzCompleted / student.totalJuz) * 100}%` }} />
                  </div>
                  <span className="text-xs font-medium text-foreground">{student.juzCompleted}/{student.totalJuz}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current</p>
                <p className="text-sm font-medium text-foreground flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> {student.currentSurah}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Avg Score</p>
                <p className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Star className="w-3 h-3 text-accent" /> {student.avgScore}%
                  {student.trend === "up" ? <TrendingUp className="w-3 h-3 text-primary" /> : <TrendingDown className="w-3 h-3 text-destructive" />}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Streak</p>
                <p className="text-sm font-medium text-foreground">🔥 {student.streak} days</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" className="text-xs">View Profile</Button>
              <Button size="sm" variant="outline" className="text-xs">Session Notes</Button>
              <Button size="sm" className="text-xs">Start Session</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorStudents;
