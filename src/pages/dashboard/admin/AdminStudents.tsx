import { useState } from "react";
import {
  GraduationCap,
  Search,
  MoreVertical,
  Eye,
  Ban,
  Flag,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type StudentStatus = "active" | "flagged" | "disabled";

interface Student {
  id: number;
  name: string;
  email: string;
  academy: string;
  level: string;
  progress: number;
  status: StudentStatus;
  joinedDate: string;
  lastActive: string;
}

const studentsData: Student[] = [
  { id: 1, name: "Ahmed Mohammed", email: "ahmed@email.com", academy: "Al-Noor Academy", level: "Intermediate", progress: 72, status: "active", joinedDate: "Feb 2024", lastActive: "2 hours ago" },
  { id: 2, name: "Fatima Hassan", email: "fatima@email.com", academy: "Bayyinah Institute", level: "Advanced", progress: 91, status: "active", joinedDate: "Jan 2024", lastActive: "30 min ago" },
  { id: 3, name: "Omar Ali", email: "omar@email.com", academy: "Al-Huda International", level: "Beginner", progress: 23, status: "active", joinedDate: "Nov 2024", lastActive: "1 day ago" },
  { id: 4, name: "Aisha Yusuf", email: "aisha@email.com", academy: "Al-Noor Academy", level: "Hafiz Track", progress: 85, status: "flagged", joinedDate: "Mar 2024", lastActive: "5 hours ago" },
  { id: 5, name: "Ibrahim Khan", email: "ibrahim@email.com", academy: "Quran Academy Online", level: "Beginner", progress: 10, status: "disabled", joinedDate: "Sep 2024", lastActive: "2 weeks ago" },
  { id: 6, name: "Khadijah Noor", email: "khadijah@email.com", academy: "Madinah Quran Center", level: "Intermediate", progress: 55, status: "active", joinedDate: "Aug 2024", lastActive: "3 hours ago" },
];

const statusConfig: Record<StudentStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-primary/10 text-primary border-primary/20" },
  flagged: { label: "Flagged", className: "bg-destructive/10 text-destructive border-destructive/20" },
  disabled: { label: "Disabled", className: "bg-muted text-muted-foreground border-border" },
};

const AdminStudents = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<StudentStatus | "all">("all");
  const [students, setStudents] = useState(studentsData);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const filtered = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()) || s.academy.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "all" || s.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const updateStatus = (id: number, status: StudentStatus) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    toast({ title: `Student ${status}`, description: `Student status updated to ${status}.` });
  };

  const counts = {
    all: students.length,
    active: students.filter((s) => s.status === "active").length,
    flagged: students.filter((s) => s.status === "flagged").length,
    disabled: students.filter((s) => s.status === "disabled").length,
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(["all", "active", "flagged", "disabled"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`p-3 rounded-xl border text-left transition-all ${
              filterStatus === s ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card hover:bg-muted/50"
            }`}
          >
            <p className="text-2xl font-display font-bold text-foreground">{counts[s]}</p>
            <p className="text-xs text-muted-foreground capitalize">{s === "all" ? "Total Students" : s}</p>
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg font-display">All Students</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Student</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Academy</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Level</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Progress</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => {
                  const sc = statusConfig[student.status];
                  return (
                    <tr key={student.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-accent font-semibold text-sm">{student.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{student.academy}</td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <Badge variant="outline">{student.level}</Badge>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${student.progress}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={sc.className}>{sc.label}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedStudent(student)}>
                              <Eye className="w-4 h-4 mr-2" /> View Profile
                            </DropdownMenuItem>
                            {student.status !== "flagged" && (
                              <DropdownMenuItem onClick={() => updateStatus(student.id, "flagged")}>
                                <Flag className="w-4 h-4 mr-2" /> Flag
                              </DropdownMenuItem>
                            )}
                            {student.status === "flagged" && (
                              <DropdownMenuItem onClick={() => updateStatus(student.id, "active")}>
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Unflag
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {student.status !== "disabled" ? (
                              <DropdownMenuItem className="text-destructive" onClick={() => updateStatus(student.id, "disabled")}>
                                <Ban className="w-4 h-4 mr-2" /> Disable Account
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => updateStatus(student.id, "active")}>
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Re-enable
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">No students found.</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Student Profile Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Student Profile</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-accent font-bold text-xl">{selectedStudent.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{selectedStudent.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Academy", value: selectedStudent.academy },
                  { label: "Level", value: selectedStudent.level },
                  { label: "Progress", value: `${selectedStudent.progress}%` },
                  { label: "Joined", value: selectedStudent.joinedDate },
                  { label: "Last Active", value: selectedStudent.lastActive },
                  { label: "Status", value: selectedStudent.status },
                ].map((field) => (
                  <div key={field.label} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">{field.label}</p>
                    <p className="text-sm font-medium text-foreground capitalize">{field.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                {selectedStudent.status === "flagged" && (
                  <Button size="sm" onClick={() => { updateStatus(selectedStudent.id, "active"); setSelectedStudent(null); }}>
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Unflag
                  </Button>
                )}
                {selectedStudent.status !== "flagged" && (
                  <Button variant="outline" size="sm" onClick={() => { updateStatus(selectedStudent.id, "flagged"); setSelectedStudent(null); }}>
                    <Flag className="w-4 h-4 mr-1" /> Flag
                  </Button>
                )}
                {selectedStudent.status !== "disabled" ? (
                  <Button variant="destructive" size="sm" onClick={() => { updateStatus(selectedStudent.id, "disabled"); setSelectedStudent(null); }}>
                    <Ban className="w-4 h-4 mr-1" /> Disable
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => { updateStatus(selectedStudent.id, "active"); setSelectedStudent(null); }}>
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Re-enable
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStudents;
