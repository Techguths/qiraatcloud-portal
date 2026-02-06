import { TrendingUp, Users, BookOpen, Clock, Calendar } from "lucide-react";

const monthlyStats = [
  { label: "Enrollment Rate", value: "94%", trend: "+5%", icon: Users },
  { label: "Avg. Progress", value: "76%", trend: "+8%", icon: TrendingUp },
  { label: "Total Sessions", value: "342", trend: "+22", icon: Calendar },
  { label: "Avg. Session Duration", value: "38 min", trend: "+3 min", icon: Clock },
];

const progressByLevel = [
  { level: "Beginner", students: 15, avgProgress: 42, color: "bg-accent" },
  { level: "Elementary", students: 22, avgProgress: 58, color: "bg-accent" },
  { level: "Intermediate", students: 28, avgProgress: 71, color: "bg-primary" },
  { level: "Advanced", students: 18, avgProgress: 85, color: "bg-primary" },
  { level: "Hafiz Track", students: 4, avgProgress: 92, color: "bg-primary" },
];

const tutorPerformance = [
  { name: "Sheikh Ahmad", students: 28, sessions: 120, rating: 4.9, avgProgress: 82 },
  { name: "Ustadha Mariam", students: 24, sessions: 98, rating: 4.8, avgProgress: 79 },
  { name: "Ustadh Bilal", students: 20, sessions: 85, rating: 4.7, avgProgress: 76 },
  { name: "Ustadha Fatima", students: 15, sessions: 60, rating: 4.9, avgProgress: 84 },
];

const revenueBreakdown = [
  { plan: "Basic ($49/mo)", students: 35, revenue: "$1,715" },
  { plan: "Premium ($99/mo)", students: 32, revenue: "$3,168" },
  { plan: "Intensive ($149/mo)", students: 20, revenue: "$2,980" },
];

const AcademyAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Analytics</h2>
        <p className="text-sm text-muted-foreground">Performance overview for the current month</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {monthlyStats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-primary font-medium mt-1">{stat.trend} from last month</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Progress by Level */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border">
            <h3 className="font-display font-semibold text-foreground">Progress by Level</h3>
          </div>
          <div className="p-5 space-y-4">
            {progressByLevel.map((level) => (
              <div key={level.level} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">{level.level}</span>
                  <span className="text-muted-foreground">{level.students} students • {level.avgProgress}%</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div className={`h-full ${level.color} rounded-full transition-all`} style={{ width: `${level.avgProgress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border">
            <h3 className="font-display font-semibold text-foreground">Revenue Breakdown</h3>
          </div>
          <div className="p-5 space-y-4">
            {revenueBreakdown.map((item) => (
              <div key={item.plan} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.plan}</p>
                  <p className="text-xs text-muted-foreground">{item.students} students</p>
                </div>
                <p className="font-display text-lg font-bold text-foreground">{item.revenue}</p>
              </div>
            ))}
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Total Monthly Revenue</span>
              <span className="font-display text-xl font-bold text-primary">$7,863</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tutor Performance */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-5 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">Tutor Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Tutor</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Students</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Sessions</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Rating</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase">Avg. Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tutorPerformance.map((tutor) => (
                <tr key={tutor.name} className="hover:bg-secondary/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">{tutor.name.charAt(0)}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{tutor.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{tutor.students}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{tutor.sessions}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-accent">⭐ {tutor.rating}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${tutor.avgProgress}%` }} />
                      </div>
                      <span className="text-xs font-medium text-foreground">{tutor.avgProgress}%</span>
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

export default AcademyAnalytics;
