import { useState } from "react";
import { Search, Filter, Plus, MoreVertical, BookOpen, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockStudents = [
  { id: 1, name: "Ahmed Malik", email: "ahmed@email.com", level: "Advanced", plan: "Premium", progress: 92, juz: "Juz 15", status: "active", lastSession: "Today", tutor: "Ustadh Bilal" },
  { id: 2, name: "Fatima Yusuf", email: "fatima@email.com", level: "Intermediate", plan: "Premium", progress: 88, juz: "Juz 8", status: "active", lastSession: "Today", tutor: "Ustadha Mariam" },
  { id: 3, name: "Omar Hassan", email: "omar@email.com", level: "Intermediate", plan: "Basic", progress: 72, juz: "Juz 5", status: "active", lastSession: "Yesterday", tutor: "Sheikh Ahmad" },
  { id: 4, name: "Aisha Rahman", email: "aisha@email.com", level: "Advanced", plan: "Intensive", progress: 85, juz: "Juz 12", status: "active", lastSession: "Today", tutor: "Ustadha Mariam" },
  { id: 5, name: "Ibrahim Ali", email: "ibrahim@email.com", level: "Intermediate", plan: "Basic", progress: 78, juz: "Juz 6", status: "active", lastSession: "2 days ago", tutor: "Ustadh Bilal" },
  { id: 6, name: "Khadija Noor", email: "khadija@email.com", level: "Beginner", plan: "Basic", progress: 35, juz: "Juz 1", status: "active", lastSession: "Today", tutor: "Sheikh Ahmad" },
  { id: 7, name: "Yusuf Amin", email: "yusuf@email.com", level: "Advanced", plan: "Premium", progress: 95, juz: "Juz 20", status: "active", lastSession: "Yesterday", tutor: "Sheikh Ahmad" },
  { id: 8, name: "Maryam Khan", email: "maryam@email.com", level: "Beginner", plan: "Basic", progress: 20, juz: "Juz 1", status: "pending", lastSession: "—", tutor: "Unassigned" },
];

const AcademyStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");

  const filteredStudents = mockStudents.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === "all" || s.level.toLowerCase() === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Students</h2>
          <p className="text-sm text-muted-foreground">{mockStudents.length} total students enrolled</p>
        </div>
        <Button className="bg-gradient-hero hover:opacity-90 gap-2">
          <Plus className="w-4 h-4" />
          Add Student
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="px-4 py-2 bg-card border border-input rounded-lg text-sm"
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Student</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Plan</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Tutor</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Progress</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.level} • {student.juz}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.plan === "Premium" ? "bg-accent/20 text-accent-foreground" :
                      student.plan === "Intensive" ? "bg-primary/10 text-primary" :
                      "bg-secondary text-secondary-foreground"
                    }`}>
                      {student.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{student.tutor}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-gold rounded-full" style={{ width: `${student.progress}%` }} />
                      </div>
                      <span className="text-xs font-medium text-foreground">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === "active" ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcademyStudents;
