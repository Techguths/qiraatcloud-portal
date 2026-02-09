import { useState } from "react";
import {
  Building2,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Ban,
  Flag,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Users,
  Star,
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

type AcademyStatus = "active" | "pending" | "flagged" | "disabled";

interface Academy {
  id: number;
  name: string;
  owner: string;
  email: string;
  location: string;
  students: number;
  tutors: number;
  rating: number;
  status: AcademyStatus;
  plan: string;
  revenue: string;
  joinedDate: string;
}

const academiesData: Academy[] = [
  { id: 1, name: "Al-Noor Academy", owner: "Sheikh Ahmad", email: "ahmad@alnoor.com", location: "London, UK", students: 245, tutors: 12, rating: 4.8, status: "active", plan: "Enterprise", revenue: "$4,200/mo", joinedDate: "Jan 2024" },
  { id: 2, name: "Bayyinah Institute", owner: "Ustadh Omar", email: "omar@bayyinah.com", location: "Dallas, TX", students: 189, tutors: 8, rating: 4.9, status: "active", plan: "Professional", revenue: "$2,800/mo", joinedDate: "Mar 2024" },
  { id: 3, name: "Madinah Quran Center", owner: "Sheikh Khalid", email: "khalid@mqc.com", location: "Toronto, CA", students: 67, tutors: 4, rating: 4.5, status: "pending", plan: "Basic", revenue: "$450/mo", joinedDate: "Dec 2024" },
  { id: 4, name: "Al-Huda International", owner: "Dr. Farhat", email: "farhat@alhuda.org", location: "Karachi, PK", students: 520, tutors: 25, rating: 4.7, status: "active", plan: "Enterprise", revenue: "$6,100/mo", joinedDate: "Feb 2024" },
  { id: 5, name: "Quran Academy Online", owner: "Ustadh Yusuf", email: "yusuf@qao.com", location: "Cairo, EG", students: 34, tutors: 2, rating: 3.2, status: "flagged", plan: "Basic", revenue: "$180/mo", joinedDate: "Nov 2024" },
  { id: 6, name: "Nur ul Islam", owner: "Sheikh Hassan", email: "hassan@nui.com", location: "Melbourne, AU", students: 0, tutors: 0, rating: 0, status: "disabled", plan: "Basic", revenue: "$0/mo", joinedDate: "Oct 2024" },
];

const statusConfig: Record<AcademyStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-primary/10 text-primary border-primary/20" },
  pending: { label: "Pending", className: "bg-accent/10 text-accent border-accent/20" },
  flagged: { label: "Flagged", className: "bg-destructive/10 text-destructive border-destructive/20" },
  disabled: { label: "Disabled", className: "bg-muted text-muted-foreground border-border" },
};

const AdminAcademies = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<AcademyStatus | "all">("all");
  const [academies, setAcademies] = useState(academiesData);
  const [selectedAcademy, setSelectedAcademy] = useState<Academy | null>(null);
  const { toast } = useToast();

  const filtered = academies.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.owner.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "all" || a.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const updateStatus = (id: number, status: AcademyStatus) => {
    setAcademies((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    toast({ title: `Academy ${status}`, description: `Academy status updated to ${status}.` });
  };

  const counts = {
    all: academies.length,
    active: academies.filter((a) => a.status === "active").length,
    pending: academies.filter((a) => a.status === "pending").length,
    flagged: academies.filter((a) => a.status === "flagged").length,
    disabled: academies.filter((a) => a.status === "disabled").length,
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {(["all", "active", "pending", "flagged", "disabled"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`p-3 rounded-xl border text-left transition-all ${
              filterStatus === s ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card hover:bg-muted/50"
            }`}
          >
            <p className="text-2xl font-display font-bold text-foreground">{counts[s]}</p>
            <p className="text-xs text-muted-foreground capitalize">{s === "all" ? "Total" : s}</p>
          </button>
        ))}
      </div>

      {/* Search & Table */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg font-display">All Academies</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search academies..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Academy</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Students</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Plan</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((academy) => {
                  const sc = statusConfig[academy.status];
                  return (
                    <tr key={academy.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{academy.name}</p>
                            <p className="text-xs text-muted-foreground">{academy.owner}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{academy.location}</td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          <span className="text-foreground">{academy.students}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <Badge variant="outline">{academy.plan}</Badge>
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
                            <DropdownMenuItem onClick={() => setSelectedAcademy(academy)}>
                              <Eye className="w-4 h-4 mr-2" /> View Profile
                            </DropdownMenuItem>
                            {academy.status !== "active" && (
                              <DropdownMenuItem onClick={() => updateStatus(academy.id, "active")}>
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                              </DropdownMenuItem>
                            )}
                            {academy.status !== "flagged" && (
                              <DropdownMenuItem onClick={() => updateStatus(academy.id, "flagged")}>
                                <Flag className="w-4 h-4 mr-2" /> Flag
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {academy.status !== "disabled" ? (
                              <DropdownMenuItem className="text-destructive" onClick={() => updateStatus(academy.id, "disabled")}>
                                <Ban className="w-4 h-4 mr-2" /> Disable
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => updateStatus(academy.id, "active")}>
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
              <div className="py-12 text-center text-muted-foreground">No academies found.</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Academy Profile Dialog */}
      <Dialog open={!!selectedAcademy} onOpenChange={() => setSelectedAcademy(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Academy Profile</DialogTitle>
          </DialogHeader>
          {selectedAcademy && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{selectedAcademy.name}</h3>
                  <p className="text-sm text-muted-foreground">Owner: {selectedAcademy.owner}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Email", value: selectedAcademy.email },
                  { label: "Location", value: selectedAcademy.location },
                  { label: "Students", value: selectedAcademy.students.toString() },
                  { label: "Tutors", value: selectedAcademy.tutors.toString() },
                  { label: "Rating", value: selectedAcademy.rating ? `${selectedAcademy.rating}/5` : "N/A" },
                  { label: "Plan", value: selectedAcademy.plan },
                  { label: "Revenue", value: selectedAcademy.revenue },
                  { label: "Joined", value: selectedAcademy.joinedDate },
                ].map((field) => (
                  <div key={field.label} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">{field.label}</p>
                    <p className="text-sm font-medium text-foreground">{field.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                {selectedAcademy.status !== "active" && (
                  <Button size="sm" onClick={() => { updateStatus(selectedAcademy.id, "active"); setSelectedAcademy(null); }}>
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                  </Button>
                )}
                {selectedAcademy.status !== "flagged" && (
                  <Button variant="outline" size="sm" onClick={() => { updateStatus(selectedAcademy.id, "flagged"); setSelectedAcademy(null); }}>
                    <Flag className="w-4 h-4 mr-1" /> Flag
                  </Button>
                )}
                {selectedAcademy.status !== "disabled" && (
                  <Button variant="destructive" size="sm" onClick={() => { updateStatus(selectedAcademy.id, "disabled"); setSelectedAcademy(null); }}>
                    <Ban className="w-4 h-4 mr-1" /> Disable
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

export default AdminAcademies;
