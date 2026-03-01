import { useState } from "react";
import { Search, Filter, MoreVertical, TrendingUp, TrendingDown, Flag, Ban, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockStudents = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed@email.com", class: "Hifz Circle - Beginners", tutor: "Ustadh Bilal", progress: 72, attendance: 95, status: "active", joinedDate: "Jan 2025", currentSurah: "Al-Baqarah", trend: "up" },
  { id: 2, name: "Fatima Ali", email: "fatima@email.com", class: "Tajweed Mastery", tutor: "Ustadha Khadijah", progress: 88, attendance: 100, status: "active", joinedDate: "Dec 2024", currentSurah: "Al-Imran", trend: "up" },
  { id: 3, name: "Omar Khalid", email: "omar@email.com", class: "Hifz Circle - Beginners", tutor: "Ustadh Bilal", progress: 45, attendance: 70, status: "flagged", joinedDate: "Feb 2025", currentSurah: "Al-Fatiha", trend: "down" },
  { id: 4, name: "Aisha Bint Yusuf", email: "aisha@email.com", class: "Advanced Hifz", tutor: "Ustadh Omar", progress: 95, attendance: 98, status: "active", joinedDate: "Sep 2024", currentSurah: "Taha", trend: "up" },
  { id: 5, name: "Maryam Abdullah", email: "maryam@email.com", class: "Revision Group", tutor: "Ustadh Bilal", progress: 60, attendance: 85, status: "active", joinedDate: "Nov 2024", currentSurah: "Yusuf", trend: "up" },
  { id: 6, name: "Yusuf Ibrahim", email: "yusuf@email.com", class: "Revision Group", tutor: "Ustadh Bilal", progress: 30, attendance: 50, status: "inactive", joinedDate: "Mar 2025", currentSurah: "Al-Baqarah", trend: "down" },
];

const AcademyAdminStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "flagged" | "inactive">("all");

  const filtered = mockStudents.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.class.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Student Roster</h2>
          <p className="text-sm text-muted-foreground">{mockStudents.length} students enrolled</p>
        </div>
        <Button size="sm" className="gap-1"><CheckCircle className="w-4 h-4" /> Enroll Student</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search students or classes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "flagged", "inactive"] as const).map((status) => (
            <button key={status} onClick={() => setFilterStatus(status)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${filterStatus === status ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Student</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Class</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden lg:table-cell">Tutor</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Progress</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Attendance</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-accent-foreground">{student.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.currentSurah}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{student.class}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{student.tutor}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm font-medium text-foreground">{student.progress}%</span>
                      {student.trend === "up" ? <TrendingUp className="w-3 h-3 text-primary" /> : <TrendingDown className="w-3 h-3 text-destructive" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <span className={`text-sm font-medium ${student.attendance >= 90 ? "text-primary" : student.attendance >= 70 ? "text-accent" : "text-destructive"}`}>{student.attendance}%</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      student.status === "active" ? "bg-primary/10 text-primary" :
                      student.status === "flagged" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                    }`}>{student.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-secondary rounded-lg" title="Flag student"><Flag className="w-3.5 h-3.5 text-muted-foreground" /></button>
                      <button className="p-1.5 hover:bg-secondary rounded-lg" title="Disable account"><Ban className="w-3.5 h-3.5 text-muted-foreground" /></button>
                      <button className="p-1.5 hover:bg-secondary rounded-lg"><MoreVertical className="w-3.5 h-3.5 text-muted-foreground" /></button>
                    </div>
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

export default AcademyAdminStudents;
