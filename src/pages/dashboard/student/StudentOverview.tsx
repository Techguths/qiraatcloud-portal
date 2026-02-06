import { BookOpen, Calendar, Flame, Target, Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentOverviewProps {
  student: {
    name: string;
    displayName: string;
    academy: { name: string; plan: string; tutor: string };
    progress: {
      totalJuz: number;
      completedJuz: number;
      currentJuz: string;
      currentSurah: string;
      pagesMemorized: number;
      totalPages: number;
      streak: number;
      totalSessions: number;
      avgScore: number;
    };
  };
}

const upcomingSessions = [
  { time: "2:00 PM", date: "Today", type: "Hifz - Juz 15", tutor: "Ustadh Bilal", duration: "45 min" },
  { time: "10:00 AM", date: "Tomorrow", type: "Tajweed Review", tutor: "Ustadh Bilal", duration: "30 min" },
  { time: "2:00 PM", date: "Tomorrow", type: "New Memorization", tutor: "Ustadh Bilal", duration: "45 min" },
];

const recentAchievements = [
  { title: "Completed Surah Al-Nahl", date: "2 days ago", icon: "📖" },
  { title: "45-Day Streak!", date: "Today", icon: "🔥" },
  { title: "Tajweed Score 95%", date: "1 week ago", icon: "⭐" },
  { title: "150 Sessions Milestone", date: "2 weeks ago", icon: "🎯" },
];

const dailyTasks = [
  { task: "Review Surah Al-Hijr (Pages 262-267)", completed: true },
  { task: "New memorization: Surah Al-Isra, Page 282-283", completed: false },
  { task: "Listen to recitation of Juz 15", completed: false },
  { task: "Practice Tajweed rules: Idgham & Ikhfa", completed: true },
];

const StudentOverview = ({ student }: StudentOverviewProps) => {
  const progressPercent = Math.round((student.progress.pagesMemorized / student.progress.totalPages) * 100);

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-hero rounded-2xl p-6 lg:p-8 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-10" />
        <div className="relative z-10">
          <p className="text-primary-foreground/70 text-sm">Assalamu Alaikum,</p>
          <h2 className="font-display text-2xl lg:text-3xl font-bold mb-2">{student.displayName} 👋</h2>
          <p className="text-primary-foreground/80 text-sm mb-4">
            You're currently on <span className="font-semibold text-primary-foreground">{student.progress.currentJuz}</span>
            {" "}— {student.progress.currentSurah}. Keep going!
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {student.progress.streak} day streak
            </span>
            <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium flex items-center gap-1">
              <Star className="w-3 h-3" />
              {student.progress.avgScore}% avg score
            </span>
            <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-medium">
              {student.academy.plan} Plan
            </span>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-5 border border-border">
          <BookOpen className="w-5 h-5 text-primary mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{student.progress.completedJuz}/{student.progress.totalJuz}</p>
          <p className="text-xs text-muted-foreground">Juz Completed</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border">
          <Target className="w-5 h-5 text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{student.progress.pagesMemorized}</p>
          <p className="text-xs text-muted-foreground">Pages Memorized</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border">
          <Calendar className="w-5 h-5 text-primary mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{student.progress.totalSessions}</p>
          <p className="text-xs text-muted-foreground">Total Sessions</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border">
          <Flame className="w-5 h-5 text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{student.progress.streak}</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-foreground">Overall Hifz Progress</h3>
          <span className="text-sm font-bold text-primary">{progressPercent}%</span>
        </div>
        <div className="h-3 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-gradient-gold rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{student.progress.pagesMemorized} of {student.progress.totalPages} pages</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border">
            <h3 className="font-display font-semibold text-foreground">Today's Tasks</h3>
          </div>
          <div className="p-4 space-y-3">
            {dailyTasks.map((task, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  task.completed ? "bg-primary border-primary" : "border-border"
                }`}>
                  {task.completed && <span className="text-primary-foreground text-xs">✓</span>}
                </div>
                <span className={`text-sm ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {task.task}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-display font-semibold text-foreground">Upcoming Sessions</h3>
            <button className="text-xs text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-border">
            {upcomingSessions.map((session, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-center w-14">
                    <p className="text-xs text-muted-foreground">{session.date}</p>
                    <p className="text-sm font-medium text-foreground">{session.time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{session.type}</p>
                    <p className="text-xs text-muted-foreground">{session.tutor} • {session.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-5 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">Recent Achievements</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {recentAchievements.map((achievement, i) => (
            <div key={i} className="p-4 bg-secondary/30 rounded-xl text-center">
              <span className="text-2xl mb-2 block">{achievement.icon}</span>
              <p className="text-sm font-medium text-foreground">{achievement.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;
