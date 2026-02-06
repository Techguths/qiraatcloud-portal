import { BookOpen, Star, TrendingUp } from "lucide-react";

interface StudentProgressProps {
  student: {
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

const juzProgress = Array.from({ length: 30 }, (_, i) => ({
  juz: i + 1,
  status: i < 14 ? "completed" : i === 14 ? "in-progress" : "not-started",
  progress: i < 14 ? 100 : i === 14 ? 35 : 0,
}));

const recentScores = [
  { date: "Feb 4", surah: "Al-Hijr", type: "Revision", score: 94 },
  { date: "Feb 3", surah: "Ibrahim", type: "Test", score: 91 },
  { date: "Feb 1", surah: "Ar-Ra'd", type: "Revision", score: 96 },
  { date: "Jan 30", surah: "Yusuf", type: "Test", score: 88 },
  { date: "Jan 28", surah: "Hud", type: "Revision", score: 92 },
  { date: "Jan 26", surah: "Yunus", type: "Test", score: 90 },
];

const milestones = [
  { juz: 1, date: "Sep 2025", days: "—" },
  { juz: 5, date: "Nov 2025", days: "45" },
  { juz: 10, date: "Jan 2026", days: "52" },
  { juz: 14, date: "Feb 2026", days: "38" },
];

const StudentProgress = ({ student }: StudentProgressProps) => {
  const progressPercent = Math.round((student.progress.pagesMemorized / student.progress.totalPages) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">My Progress</h2>
        <p className="text-sm text-muted-foreground">Track your Qur'an memorization journey</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-5 border border-border text-center">
          <p className="font-display text-3xl font-bold text-primary">{progressPercent}%</p>
          <p className="text-xs text-muted-foreground mt-1">Overall Progress</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border text-center">
          <p className="font-display text-3xl font-bold text-accent">{student.progress.avgScore}%</p>
          <p className="text-xs text-muted-foreground mt-1">Avg. Score</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border text-center">
          <p className="font-display text-3xl font-bold text-foreground">{student.progress.streak}</p>
          <p className="text-xs text-muted-foreground mt-1">Day Streak</p>
        </div>
      </div>

      {/* Juz Grid */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Juz Tracker</h3>
        <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
          {juzProgress.map((juz) => (
            <div
              key={juz.juz}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                juz.status === "completed"
                  ? "bg-primary text-primary-foreground"
                  : juz.status === "in-progress"
                  ? "bg-accent/20 text-accent border-2 border-accent"
                  : "bg-secondary text-muted-foreground"
              }`}
              title={`Juz ${juz.juz} - ${juz.status}`}
            >
              {juz.juz}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-primary" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-accent/20 border border-accent" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-secondary" />
            <span>Not Started</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Scores */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border">
            <h3 className="font-display font-semibold text-foreground">Recent Scores</h3>
          </div>
          <div className="divide-y divide-border">
            {recentScores.map((score, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Surah {score.surah}</p>
                    <p className="text-xs text-muted-foreground">{score.date} • {score.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-accent" />
                  <span className={`text-sm font-bold ${score.score >= 90 ? "text-primary" : "text-accent"}`}>
                    {score.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border">
            <h3 className="font-display font-semibold text-foreground">Milestones</h3>
          </div>
          <div className="p-5 space-y-4">
            {milestones.map((milestone, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-accent-foreground">{milestone.juz}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Juz {milestone.juz} Completed</p>
                  <p className="text-xs text-muted-foreground">{milestone.date}</p>
                </div>
                {milestone.days !== "—" && (
                  <span className="text-xs text-muted-foreground">{milestone.days} days</span>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-primary">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Avg. pace: ~45 days per 5 Juz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
