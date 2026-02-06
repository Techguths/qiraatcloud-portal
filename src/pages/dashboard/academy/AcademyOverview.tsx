import { Users, BookOpen, Calendar, TrendingUp, Clock, Star, ArrowUpRight, CreditCard } from "lucide-react";

interface AcademyOverviewProps {
  academy: {
    name: string;
    owner: { name: string; title: string };
    subscription: { plan: string; studentPlans: any[] };
    settings: { maxStudents: string; enableEnrollment: boolean };
  };
}

const stats = [
  { label: "Total Students", value: "87", change: "+12%", icon: Users, color: "bg-primary/10 text-primary" },
  { label: "Active Tutors", value: "6", change: "+2", icon: BookOpen, color: "bg-accent/10 text-accent" },
  { label: "Sessions Today", value: "14", change: "3 upcoming", icon: Calendar, color: "bg-primary/10 text-primary" },
  { label: "Revenue (MTD)", value: "$4,280", change: "+18%", icon: CreditCard, color: "bg-accent/10 text-accent" },
];

const recentActivities = [
  { student: "Ahmed Malik", action: "Completed Surah Al-Baqarah review", time: "10 min ago", type: "progress" },
  { student: "Fatima Yusuf", action: "Enrolled in Premium plan", time: "1 hour ago", type: "enrollment" },
  { student: "Omar Hassan", action: "Memorized Juz 5, Page 82-84", time: "2 hours ago", type: "progress" },
  { student: "Aisha Rahman", action: "Scheduled makeup session", time: "3 hours ago", type: "schedule" },
  { student: "Ibrahim Ali", action: "Submitted Tajweed assessment", time: "5 hours ago", type: "assessment" },
];

const upcomingSessions = [
  { student: "Ahmed Malik", time: "2:00 PM", duration: "45 min", type: "Hifz Review", tutor: "Ustadh Bilal" },
  { student: "Fatima Yusuf", time: "3:00 PM", duration: "30 min", type: "Tajweed", tutor: "Ustadha Mariam" },
  { student: "Omar Hassan", time: "4:30 PM", duration: "45 min", type: "New Lesson", tutor: "Sheikh Ahmad" },
];

const topStudents = [
  { name: "Ahmed Malik", progress: 92, level: "Advanced", juz: "Juz 15" },
  { name: "Fatima Yusuf", progress: 88, level: "Intermediate", juz: "Juz 8" },
  { name: "Aisha Rahman", progress: 85, level: "Advanced", juz: "Juz 12" },
  { name: "Ibrahim Ali", progress: 78, level: "Intermediate", juz: "Juz 6" },
];

const AcademyOverview = ({ academy }: AcademyOverviewProps) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-hero rounded-2xl p-6 lg:p-8 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-10" />
        <div className="relative z-10">
          <p className="text-primary-foreground/70 text-sm mb-1">Welcome back,</p>
          <h2 className="font-display text-2xl lg:text-3xl font-bold mb-2">{academy.owner.name}</h2>
          <p className="text-primary-foreground/80 text-sm max-w-lg">
            Your academy has <span className="font-semibold text-primary-foreground">87 active students</span> across{" "}
            <span className="font-semibold text-primary-foreground">6 tutors</span>. You have 3 sessions coming up today.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium">
              {academy.subscription.plan.charAt(0).toUpperCase() + academy.subscription.plan.slice(1)} Plan
            </span>
            <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium flex items-center gap-1">
              <Star className="w-3 h-3" />
              4.9 Rating
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-5 border border-border hover:shadow-soft transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-primary flex items-center gap-1">
                {stat.change}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-display font-semibold text-foreground">Upcoming Sessions</h3>
            <button className="text-xs text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-border">
            {upcomingSessions.map((session, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{session.student.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{session.student}</p>
                    <p className="text-xs text-muted-foreground">{session.type} • {session.tutor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{session.time}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {session.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Students */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border">
            <h3 className="font-display font-semibold text-foreground">Top Students</h3>
          </div>
          <div className="p-4 space-y-4">
            {topStudents.map((student, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
                      <span className="text-xs font-bold text-accent-foreground">{student.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.juz}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-primary">{student.progress}%</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-gold rounded-full transition-all duration-500"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground">Recent Activity</h3>
          <button className="text-xs text-primary font-medium hover:underline">View All</button>
        </div>
        <div className="divide-y divide-border">
          {recentActivities.map((activity, i) => (
            <div key={i} className="p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                activity.type === "progress" ? "bg-primary" :
                activity.type === "enrollment" ? "bg-accent" :
                activity.type === "schedule" ? "bg-primary" : "bg-muted-foreground"
              }`} />
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.student}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademyOverview;
