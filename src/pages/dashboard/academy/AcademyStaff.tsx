import { useState } from "react";
import { Search, Plus, MoreVertical, Mail, Phone, Shield, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type StaffRole = "tutor" | "admin";

interface StaffMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  title: string;
  status: "active" | "pending" | "inactive";
  joinedAt: string;
  meta: string;
}

const mockStaff: StaffMember[] = [
  { id: 1, name: "Sheikh Ahmad", email: "ahmad@alnoor-academy.com", phone: "+44 20 1111 2222", role: "tutor", title: "Senior Qur'an Tutor", status: "active", joinedAt: "Jan 2023", meta: "32 students • Tajweed, Hifz" },
  { id: 2, name: "Ustadh Bilal", email: "bilal@alnoor-academy.com", phone: "+44 20 1111 3333", role: "tutor", title: "Tajweed Specialist", status: "active", joinedAt: "Mar 2023", meta: "24 students • Tajweed" },
  { id: 3, name: "Ustadha Mariam", email: "mariam@alnoor-academy.com", phone: "+44 20 1111 4444", role: "tutor", title: "Hifz Coach", status: "active", joinedAt: "Jun 2023", meta: "28 students • Hifz, Qira'at" },
  { id: 4, name: "Ustadh Yahya", email: "yahya@alnoor-academy.com", phone: "+44 20 1111 5555", role: "tutor", title: "Junior Tutor", status: "pending", joinedAt: "Pending", meta: "Awaiting approval" },
  { id: 5, name: "Sister Aisha", email: "aisha.admin@alnoor-academy.com", phone: "+44 20 2222 1111", role: "admin", title: "Academy Admin", status: "active", joinedAt: "Feb 2023", meta: "Manages enrollment & scheduling" },
  { id: 6, name: "Brother Hamza", email: "hamza@alnoor-academy.com", phone: "+44 20 2222 2222", role: "admin", title: "Operations Admin", status: "active", joinedAt: "Apr 2023", meta: "Manages tutors & classes" },
  { id: 7, name: "Sister Zainab", email: "zainab@alnoor-academy.com", phone: "+44 20 2222 3333", role: "admin", title: "Support Admin", status: "inactive", joinedAt: "May 2023", meta: "On leave" },
];

const statusStyles: Record<StaffMember["status"], string> = {
  active: "bg-primary/10 text-primary",
  pending: "bg-accent/20 text-accent-foreground",
  inactive: "bg-secondary text-muted-foreground",
};

const AcademyStaff = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"all" | StaffRole>("all");

  const filtered = mockStaff.filter((s) => {
    const matchesTab = activeTab === "all" || s.role === activeTab;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesTab && matchesSearch && matchesStatus;
  });

  const tutorCount = mockStaff.filter((s) => s.role === "tutor").length;
  const adminCount = mockStaff.filter((s) => s.role === "admin").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Staff</h2>
          <p className="text-sm text-muted-foreground">
            {tutorCount} tutors • {adminCount} admins
          </p>
        </div>
        <Button className="bg-gradient-hero hover:opacity-90 gap-2">
          <Plus className="w-4 h-4" />
          Invite Staff
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="grid w-full sm:w-auto grid-cols-3">
          <TabsTrigger value="all">All ({mockStaff.length})</TabsTrigger>
          <TabsTrigger value="tutor" className="gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            Tutors ({tutorCount})
          </TabsTrigger>
          <TabsTrigger value="admin" className="gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Admins ({adminCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-card border border-input rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Staff Grid */}
          {filtered.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <p className="text-sm text-muted-foreground">No staff members match your search.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((member) => (
                <div
                  key={member.id}
                  className="bg-card border border-border rounded-xl p-5 hover:shadow-elevated transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
                        member.role === "tutor" ? "bg-primary/10" : "bg-accent/20"
                      }`}>
                        <span className={`text-sm font-semibold ${
                          member.role === "tutor" ? "text-primary" : "text-accent-foreground"
                        }`}>
                          {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{member.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{member.title}</p>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{member.phone}</span>
                    </div>
                  </div>

                  <p className="text-xs text-foreground/80 mb-4 line-clamp-2">{member.meta}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[member.status]}`}>
                        {member.status}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        member.role === "tutor" ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent-foreground"
                      }`}>
                        {member.role}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{member.joinedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademyStaff;