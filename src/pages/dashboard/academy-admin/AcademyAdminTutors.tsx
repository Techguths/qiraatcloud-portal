import { useState } from "react";
import { Search, MoreVertical, Star, Clock, Users, CheckCircle, XCircle, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockTutors = [
  { id: 1, name: "Ustadh Bilal Ahmad", email: "bilal@academy.com", specialization: "Hifz & Tajweed", classes: 3, students: 14, rating: 4.9, status: "active", hoursThisMonth: 48, joinedDate: "Jun 2024", certification: "Ijazah - Al-Azhar" },
  { id: 2, name: "Ustadha Khadijah Noor", email: "khadijah@academy.com", specialization: "Tajweed", classes: 1, students: 4, rating: 4.8, status: "active", hoursThisMonth: 16, joinedDate: "Sep 2024", certification: "Ijazah - Madinah University" },
  { id: 3, name: "Ustadh Omar Farooq", email: "omar@academy.com", specialization: "Hifz", classes: 2, students: 7, rating: 4.7, status: "active", hoursThisMonth: 60, joinedDate: "Mar 2024", certification: "Ijazah - Dar al-Quran" },
  { id: 4, name: "Ustadha Fatima Zahra", email: "fatima@academy.com", specialization: "Tajweed", classes: 1, students: 4, rating: 4.6, status: "active", hoursThisMonth: 12, joinedDate: "Jan 2025", certification: "Ijazah - Local Authority" },
  { id: 5, name: "Ustadh Hamza Ali", email: "hamza@academy.com", specialization: "Hifz & Revision", classes: 0, students: 0, rating: 0, status: "pending", hoursThisMonth: 0, joinedDate: "Pending", certification: "Ijazah - Pending Verification" },
];

const AcademyAdminTutors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "pending">("all");

  const filtered = mockTutors.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Tutor Management</h2>
          <p className="text-sm text-muted-foreground">{mockTutors.filter(t => t.status === "active").length} active tutors • {mockTutors.filter(t => t.status === "pending").length} pending</p>
        </div>
        <Button size="sm" className="gap-1">Invite Tutor</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search tutors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "pending"] as const).map((status) => (
            <button key={status} onClick={() => setFilterStatus(status)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${filterStatus === status ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tutors Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((tutor) => (
          <div key={tutor.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-soft transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">{tutor.name.split(" ").slice(1).map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">{tutor.name}</h3>
                  <p className="text-xs text-muted-foreground">{tutor.specialization}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tutor.status === "active" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>{tutor.status}</span>
            </div>

            <p className="text-xs text-muted-foreground mb-3">{tutor.certification}</p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 rounded-lg bg-secondary/50">
                <p className="text-lg font-bold text-foreground">{tutor.classes}</p>
                <p className="text-xs text-muted-foreground">Classes</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-secondary/50">
                <p className="text-lg font-bold text-foreground">{tutor.students}</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <p className="text-lg font-bold text-foreground">{tutor.rating || "—"}</p>
                </div>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {tutor.hoursThisMonth}h this month</span>
              <span>Joined: {tutor.joinedDate}</span>
            </div>

            <div className="flex gap-2">
              {tutor.status === "pending" ? (
                <>
                  <Button size="sm" className="flex-1 text-xs gap-1"><CheckCircle className="w-3 h-3" /> Approve</Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs gap-1 text-destructive hover:text-destructive"><XCircle className="w-3 h-3" /> Reject</Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="outline" className="flex-1 text-xs">View Profile</Button>
                  <Button size="sm" variant="outline" className="text-xs"><Flag className="w-3 h-3" /></Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademyAdminTutors;
