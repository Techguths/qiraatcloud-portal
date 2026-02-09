import {
  Building2,
  GraduationCap,
  DollarSign,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminOverviewProps {
  onNavigate: (tab: string) => void;
}

const stats = [
  { label: "Total Academies", value: "127", change: "+12 this month", icon: Building2, color: "bg-primary/10 text-primary" },
  { label: "Total Students", value: "3,458", change: "+284 this month", icon: GraduationCap, color: "bg-accent/10 text-accent" },
  { label: "Monthly Revenue", value: "$45,230", change: "+18.2%", icon: DollarSign, color: "bg-primary/10 text-primary" },
  { label: "Active Sessions", value: "892", change: "Live now", icon: TrendingUp, color: "bg-accent/10 text-accent" },
];

const pendingApprovals = [
  { id: 1, name: "Al-Noor Academy", type: "Academy", status: "pending", date: "2 hours ago" },
  { id: 2, name: "Bayyinah Institute", type: "Academy", status: "pending", date: "5 hours ago" },
  { id: 3, name: "Hafiz Program", type: "Academy", status: "pending", date: "1 day ago" },
];

const recentActivity = [
  { id: 1, action: "New academy registered", detail: "Madinah Quran Center", time: "10 min ago", icon: Building2 },
  { id: 2, action: "Student flagged", detail: "Inappropriate behavior reported", time: "25 min ago", icon: AlertTriangle },
  { id: 3, action: "Academy approved", detail: "Riyad ul Quran", time: "1 hour ago", icon: UserCheck },
  { id: 4, action: "Subscription upgraded", detail: "Al-Huda Academy → Enterprise", time: "2 hours ago", icon: TrendingUp },
  { id: 5, action: "New student enrolled", detail: "Ahmed M. joined Bayyinah", time: "3 hours ago", icon: GraduationCap },
];

const AdminOverview = ({ onNavigate }: AdminOverviewProps) => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-primary flex items-center gap-1">
                  {stat.change} <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg font-display">Pending Approvals</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("approvals")}>
              View All <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-accent text-accent">
                  <Clock className="w-3 h-3 mr-1" /> Pending
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-display">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => onNavigate("approvals")}>
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-xs">Review Approvals</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => onNavigate("academies")}>
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-xs">Manage Academies</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => onNavigate("students")}>
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-xs">Manage Students</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => onNavigate("analytics")}>
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="text-xs">View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
