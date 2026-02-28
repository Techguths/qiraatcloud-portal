import { Users, BookOpen, Calendar, Clock, Star, TrendingUp, ArrowRight } from "lucide-react";

const stats = [
  { label: "Active Students", value: "18", icon: Users, change: "+3 this month" },
  { label: "Classes This Week", value: "24", icon: Calendar, change: "4 remaining" },
  { label: "Avg. Student Score", value: "87%", icon: Star, change: "+2% from last month" },
  { label: "Hours Taught", value: "142", icon: Clock, change: "This month" },
];

const upcomingClasses = [
  { time: "2:00 PM", student: "Ahmed Hassan", type: "Hifz - Juz 15", duration: "45 min", status: "upcoming" },
  { time: "3:00 PM", student: "Fatima Ali", type: "Tajweed Review", duration: "30 min", status: "upcoming" },
  { time: "4:00 PM", student: "Omar Khalid", type: "New Memorization", duration: "45 min", status: "upcoming" },
  { time: "5:30 PM", student: "Aisha Bint Yusuf", type: "Revision Session", duration: "30 min", status: "upcoming" },
];

const recentActivity = [
  { text: "Ahmed Hassan completed Surah Al-Nahl review", time: "1 hour ago", icon: "📖" },
  { text: "Fatima Ali scored 95% in Tajweed assessment", time: "3 hours ago", icon: "⭐" },
  { text: "New student Omar Khalid assigned to your class", time: "Yesterday", icon: "👋" },
  { text: "Weekly report generated for Al-Noor Academy", time: "Yesterday", icon: "📊" },
];

const TutorOverview = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-hero rounded-2xl p-6 lg:p-8 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-10" />
        <div className="relative z-10">
          <p className="text-primary-foreground/70 text-sm">Assalamu Alaikum,</p>
          <h2 className="font-display text-2xl lg:text-3xl font-bold mb-2">Ustadh Bilal Ahmad 👋</h2>
          <p className="text-primary-foreground/80 text-sm mb-4">
            You have <span className="font-semibold text-primary-foreground">4 classes</span> scheduled for today. Your next class starts at 2:00 PM.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium">Al-Noor Academy</span>
            <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium">Hifz & Tajweed Specialist</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card rounded-xl p-5 border border-border">
            <stat.icon className="w-5 h-5 text-primary mb-2" />
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-xs text-primary mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-display font-semibold text-foreground">Today's Classes</h3>
            <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
              View Schedule <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-border">
            {upcomingClasses.map((cls, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-center w-14">
                    <p className="text-sm font-medium text-foreground">{cls.time}</p>
                    <p className="text-xs text-muted-foreground">{cls.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{cls.student}</p>
                    <p className="text-xs text-muted-foreground">{cls.type}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">Join</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border">
            <h3 className="font-display font-semibold text-foreground">Recent Activity</h3>
          </div>
          <div className="p-4 space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-lg">{activity.icon}</span>
                <div>
                  <p className="text-sm text-foreground">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorOverview;
