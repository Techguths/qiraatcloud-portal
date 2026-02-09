import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  MapPin,
  Users,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface PendingAcademy {
  id: number;
  name: string;
  owner: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  certifications: string[];
  expectedStudents: number;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
}

const pendingData: PendingAcademy[] = [
  {
    id: 1, name: "Al-Noor Hifz Academy", owner: "Sheikh Muhammad Tariq", email: "tariq@alnoorhifz.com",
    phone: "+1 (555) 123-4567", location: "London, UK", description: "A specialized Hifz academy focusing on traditional memorization methods with modern tracking tools.",
    certifications: ["Ijazah in Hafs", "Teaching Certificate"], expectedStudents: 50, submittedDate: "2 hours ago", status: "pending",
  },
  {
    id: 2, name: "Bayyinah Tajweed Center", owner: "Ustadha Mariam Al-Hashimi", email: "mariam@bayyinahtc.com",
    phone: "+971 50 123 4567", location: "Dubai, UAE", description: "Online Tajweed training center for women, offering personalized learning paths.",
    certifications: ["Ijazah in Warsh", "Ijazah in Hafs"], expectedStudents: 120, submittedDate: "5 hours ago", status: "pending",
  },
  {
    id: 3, name: "Quran Connect Academy", owner: "Brother Yusuf Patel", email: "yusuf@quranconnect.org",
    phone: "+27 82 123 4567", location: "Cape Town, SA", description: "Community-driven Quran learning center for youth ages 7-18.",
    certifications: ["Teaching Certificate"], expectedStudents: 30, submittedDate: "1 day ago", status: "pending",
  },
  {
    id: 4, name: "Dar al-Ilm Institute", owner: "Dr. Abdullah Siddique", email: "abdullah@daralilm.edu",
    phone: "+92 321 123 4567", location: "Islamabad, PK", description: "Academic institution offering accredited Quran sciences programs.",
    certifications: ["Ijazah in all 10 Qira'at", "PhD Islamic Studies"], expectedStudents: 200, submittedDate: "2 days ago", status: "pending",
  },
];

const AdminApprovals = () => {
  const [approvals, setApprovals] = useState(pendingData);
  const [selectedApproval, setSelectedApproval] = useState<PendingAcademy | null>(null);
  const { toast } = useToast();

  const handleAction = (id: number, action: "approved" | "rejected") => {
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: action } : a)));
    setSelectedApproval(null);
    toast({
      title: action === "approved" ? "Academy Approved" : "Academy Rejected",
      description: action === "approved" ? "The academy can now accept students." : "The application has been rejected.",
    });
  };

  const pending = approvals.filter((a) => a.status === "pending");
  const processed = approvals.filter((a) => a.status !== "pending");

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border border-border">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10"><Clock className="w-5 h-5 text-accent" /></div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">{pending.length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><CheckCircle2 className="w-5 h-5 text-primary" /></div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">{processed.filter((a) => a.status === "approved").length}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10"><XCircle className="w-5 h-5 text-destructive" /></div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">{processed.filter((a) => a.status === "rejected").length}</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending List */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-display">Pending Academy Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pending.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-primary/30" />
              <p>All applications have been processed!</p>
            </div>
          )}
          {pending.map((academy) => (
            <div key={academy.id} className="p-4 rounded-xl border border-border bg-card hover:shadow-soft transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{academy.name}</h3>
                    <p className="text-sm text-muted-foreground">{academy.owner}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {academy.location}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {academy.expectedStudents} expected</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {academy.submittedDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => setSelectedApproval(academy)}>
                    <Eye className="w-4 h-4 mr-1" /> Review
                  </Button>
                  <Button size="sm" onClick={() => handleAction(academy.id, "approved")}>
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleAction(academy.id, "rejected")}>
                    <XCircle className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Processed */}
      {processed.length > 0 && (
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display">Recently Processed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {processed.map((academy) => (
              <div key={academy.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{academy.name}</p>
                    <p className="text-xs text-muted-foreground">{academy.owner}</p>
                  </div>
                </div>
                <Badge variant="outline" className={academy.status === "approved" ? "bg-primary/10 text-primary border-primary/20" : "bg-destructive/10 text-destructive border-destructive/20"}>
                  {academy.status === "approved" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                  {academy.status === "approved" ? "Approved" : "Rejected"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Detail Dialog */}
      <Dialog open={!!selectedApproval} onOpenChange={() => setSelectedApproval(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Application Review</DialogTitle>
          </DialogHeader>
          {selectedApproval && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{selectedApproval.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedApproval.owner}</p>
                </div>
              </div>
              <p className="text-sm text-foreground">{selectedApproval.description}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{selectedApproval.email}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">{selectedApproval.phone}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{selectedApproval.location}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Expected Students</p>
                  <p className="text-sm font-medium text-foreground">{selectedApproval.expectedStudents}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {selectedApproval.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="bg-primary/5">{cert}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button className="flex-1" onClick={() => handleAction(selectedApproval.id, "approved")}>
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Approve Academy
                </Button>
                <Button variant="destructive" className="flex-1" onClick={() => handleAction(selectedApproval.id, "rejected")}>
                  <XCircle className="w-4 h-4 mr-1" /> Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminApprovals;
