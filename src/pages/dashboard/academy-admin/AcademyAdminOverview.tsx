import { Users, BookOpen, GraduationCap, TrendingUp, Clock, AlertTriangle } from "lucide-react";

const stats = [
  { label: "Total Students", value: "156", change: "+12 this month", icon: Users, color: "bg-primary/10 text-primary" },
  { label: "Active Classes", value: "18", change: "3 starting soon", icon: BookOpen, color: "bg-accent/10 text-accent" },
  { label: "Tutors", value: "8", change: "2 pending approval", icon: GraduationCap, color: "bg-primary/10 text-primary" },
  { label: "Completion Rate", value: "87%", change: "+5% vs last month", icon: TrendingUp, color: "bg-accent/10 text-accent" },
];

const recentActivity = [
  { action: "New student enrolled", detail: "Amina Hassan joined Hifz Beginners", time: "10 min ago", type: "success" },
  { action: "Class rescheduled", detail: "Tajweed Advanced moved to 4 PM", time: "1 hour ago", type: "info" },
  { action: "Tutor flagged", detail: "Ustadh Omar reported attendance issue", time: "3 hours ago", type: "warning" },
  { action: "Payment received", detail: "$2,400 from 24 student subscriptions", time: "5 hours ago", type: "success" },
  { action: "New tutor application", detail: "Ustadha Khadijah applied for Tajweed", time: "Yesterday", type: "info" },
];

const pendingActions = [
  { title: "2 tutor applications pending", priority: "high" },
  { title: "5 students awaiting enrollment approval", priority: "medium" },
  { title: "Monthly report ready for review", priority: "low" },
  { title: "3 classes need substitute tutor", priority: "high" },
];

const AcademyAdminOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening at your academy.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            <p className="text-xs text-primary mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  item.type === "success" ? "bg-primary" : item.type === "warning" ? "bg-accent" : "bg-muted-foreground"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">Pending Actions</h3>
          <div className="space-y-3">
            {pendingActions.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${
                  item.priority === "high" ? "text-destructive" : item.priority === "medium" ? "text-accent" : "text-muted-foreground"
                }`} />
                <p className="text-sm text-foreground flex-1">{item.title}</p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  item.priority === "high" ? "bg-destructive/10 text-destructive" :
                  item.priority === "medium" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                }`}>{item.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Schedule Preview */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-display font-semibold text-foreground mb-4">Today's Schedule</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { time: "9:00 AM", class: "Hifz Beginners", tutor: "Ustadh Bilal", students: 5 },
            { time: "11:00 AM", class: "Tajweed Advanced", tutor: "Ustadha Khadijah", students: 3 },
            { time: "2:00 PM", class: "Hifz Circle", tutor: "Ustadh Omar", students: 8 },
            { time: "4:00 PM", class: "Revision Group", tutor: "Ustadh Bilal", students: 6 },
            { time: "6:00 PM", class: "Evening Tajweed", tutor: "Ustadha Fatima", students: 4 },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-1 text-xs text-muted-foreground min-w-[70px]">
                <Clock className="w-3 h-3" />
                {s.time}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{s.class}</p>
                <p className="text-xs text-muted-foreground">{s.tutor} • {s.students} students</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademyAdminOverview;
