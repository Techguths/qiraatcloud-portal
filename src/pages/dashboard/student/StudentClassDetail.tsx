import { useState } from "react";
import { ArrowLeft, Users, Clock, Calendar, BookOpen, Star, Video, FileText, Download, Play, CheckCircle2, Circle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StudentClassDetailProps {
  classId: string;
  onBack: () => void;
}

const classData: Record<string, any> = {
  "1": {
    title: "Advanced Hifz Circle",
    type: "Group Class",
    tutor: "Ustadh Bilal",
    tutorBio: "10+ years of experience in Qur'an teaching. Certified in the 10 Qira'at.",
    schedule: "Mon, Wed, Fri — 2:00 PM GMT",
    duration: "45 min per session",
    students: 8,
    maxStudents: 12,
    level: "Advanced",
    startDate: "Sep 15, 2025",
    endDate: "Jun 30, 2026",
    description:
      "An intensive group Hifz circle focusing on memorizing 1-2 pages per week. Includes daily revision and weekly assessments with personalized feedback.",
    objectives: [
      "Memorize Juz 15-20 by end of term",
      "Strengthen retention through peer revision",
      "Weekly Tajweed integration exercises",
      "Monthly mock assessments",
    ],
    image: "📖",
    meetingLink: "https://meet.example.com/hifz-circle",
  },
  "2": {
    title: "Tajweed Masterclass",
    type: "Seasonal",
    tutor: "Ustadha Fatima",
    tutorBio: "Specialist in Tajweed with Ijazah in Hafs 'an 'Asim.",
    schedule: "Sat — 10:00 AM GMT",
    duration: "60 min per session",
    students: 15,
    maxStudents: 20,
    level: "Intermediate",
    startDate: "Oct 1, 2025",
    endDate: "Dec 20, 2025",
    description:
      "A seasonal deep-dive into the rules of Tajweed, covering Noon Sakinah, Meem Sakinah, Madd rules, and more with practical recitation exercises.",
    objectives: [
      "Master all Noon & Meem Sakinah rules",
      "Understand and apply Madd rules",
      "Improve recitation fluency",
      "Pass end-of-course Tajweed assessment",
    ],
    image: "🎯",
    meetingLink: "https://meet.example.com/tajweed",
  },
  "3": {
    title: "1-on-1 Hifz Session",
    type: "Private",
    tutor: "Ustadh Bilal",
    tutorBio: "10+ years of experience in Qur'an teaching.",
    schedule: "Tue, Thu — 3:00 PM GMT",
    duration: "30 min per session",
    students: 1,
    maxStudents: 1,
    level: "Advanced",
    startDate: "Sep 1, 2025",
    endDate: "Ongoing",
    description: "Personalized 1-on-1 Hifz sessions tailored to your pace and goals with direct tutor feedback every session.",
    objectives: [
      "Personalized memorization plan",
      "Daily revision accountability",
      "Instant feedback on recitation",
      "Flexible pacing",
    ],
    image: "⭐",
    meetingLink: "https://meet.example.com/private",
  },
};

const progressData = {
  completedSessions: 24,
  totalSessions: 40,
  avgScore: 88,
  currentStreak: 12,
  milestones: [
    { label: "Enrolled", done: true },
    { label: "First Session", done: true },
    { label: "25% Complete", done: true },
    { label: "50% Complete", done: true },
    { label: "75% Complete", done: false },
    { label: "Completed", done: false },
  ],
};

const sessions = [
  { id: 1, date: "Mar 24, 2026", time: "2:00 PM", topic: "Surah Al-Isra, Page 282", status: "completed" as const, score: 92 },
  { id: 2, date: "Mar 26, 2026", time: "2:00 PM", topic: "Surah Al-Isra, Page 283", status: "upcoming" as const, score: null },
  { id: 3, date: "Mar 28, 2026", time: "2:00 PM", topic: "Revision: Pages 280-283", status: "upcoming" as const, score: null },
  { id: 4, date: "Mar 21, 2026", time: "2:00 PM", topic: "Surah Al-Isra, Page 281", status: "completed" as const, score: 90 },
  { id: 5, date: "Mar 19, 2026", time: "2:00 PM", topic: "Surah Al-Nahl, Page 280", status: "completed" as const, score: 85 },
];

const resources = [
  { name: "Tajweed Rules Cheat Sheet", type: "PDF", size: "1.2 MB", icon: FileText },
  { name: "Session 24 Recording", type: "Video", size: "45 min", icon: Video },
  { name: "Memorization Tracker Template", type: "PDF", size: "0.5 MB", icon: FileText },
  { name: "Pronunciation Guide — Makharij", type: "PDF", size: "2.1 MB", icon: FileText },
  { name: "Session 23 Recording", type: "Video", size: "42 min", icon: Video },
];

const tabs = ["Overview", "Details", "My Progress", "Sessions", "Resources"];

const StudentClassDetail = ({ classId, onBack }: StudentClassDetailProps) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const cls = classData[classId] || classData["1"];
  const pct = Math.round((progressData.completedSessions / progressData.totalSessions) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{cls.image}</span>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{cls.title}</h2>
              <p className="text-sm text-muted-foreground">{cls.tutor} • {cls.type}</p>
            </div>
          </div>
        </div>
        <Button size="sm" className="rounded-full gap-2">
          <Video className="w-4 h-4" /> Join Session
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary/50 p-1 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Overview" && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <Users className="w-4 h-4 text-primary mb-1.5" />
              <p className="font-display text-xl font-bold text-foreground">{cls.students}/{cls.maxStudents}</p>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <Calendar className="w-4 h-4 text-primary mb-1.5" />
              <p className="font-display text-xl font-bold text-foreground">{progressData.completedSessions}</p>
              <p className="text-xs text-muted-foreground">Sessions Done</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <Star className="w-4 h-4 text-accent mb-1.5" />
              <p className="font-display text-xl font-bold text-foreground">{progressData.avgScore}%</p>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <Clock className="w-4 h-4 text-primary mb-1.5" />
              <p className="font-display text-xl font-bold text-foreground">{cls.duration}</p>
              <p className="text-xs text-muted-foreground">Per Session</p>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-card rounded-xl p-5 border border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-semibold text-foreground text-sm">Course Progress</h3>
              <span className="text-sm font-bold text-primary">{pct}%</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">{progressData.completedSessions} of {progressData.totalSessions} sessions</p>
          </div>

          {/* Description */}
          <div className="bg-card rounded-xl p-5 border border-border">
            <h3 className="font-display font-semibold text-foreground text-sm mb-2">About This Class</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{cls.description}</p>
          </div>

          {/* Upcoming */}
          <div className="bg-card rounded-xl border border-border">
            <div className="p-5 border-b border-border">
              <h3 className="font-display font-semibold text-foreground text-sm">Next Sessions</h3>
            </div>
            <div className="divide-y divide-border">
              {sessions.filter(s => s.status === "upcoming").map((s) => (
                <div key={s.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-center w-14">
                      <p className="text-xs text-muted-foreground">{s.date.split(",")[0]}</p>
                      <p className="text-sm font-medium text-foreground">{s.time}</p>
                    </div>
                    <p className="text-sm text-foreground">{s.topic}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Upcoming</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Details" && (
        <div className="space-y-6">
          <div className="bg-card rounded-xl p-5 border border-border space-y-4">
            <h3 className="font-display font-semibold text-foreground">Class Information</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Schedule", cls.schedule],
                ["Duration", cls.duration],
                ["Level", cls.level],
                ["Start Date", cls.startDate],
                ["End Date", cls.endDate],
                ["Capacity", `${cls.students}/${cls.maxStudents}`],
                ["Type", cls.type],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border">
            <h3 className="font-display font-semibold text-foreground mb-3">Learning Objectives</h3>
            <div className="space-y-2">
              {cls.objectives.map((obj: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border">
            <h3 className="font-display font-semibold text-foreground mb-3">Tutor</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{cls.tutor.split(" ").map((n: string) => n[0]).join("")}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{cls.tutor}</p>
                <p className="text-xs text-muted-foreground">{cls.tutorBio}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "My Progress" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <p className="font-display text-2xl font-bold text-foreground">{pct}%</p>
              <p className="text-xs text-muted-foreground">Completion</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <p className="font-display text-2xl font-bold text-foreground">{progressData.avgScore}%</p>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <p className="font-display text-2xl font-bold text-foreground">{progressData.currentStreak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <p className="font-display text-2xl font-bold text-foreground">{progressData.completedSessions}</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-card rounded-xl p-5 border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Milestones</h3>
            <div className="space-y-3">
              {progressData.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  {m.done ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <Circle className="w-5 h-5 text-border" />
                  )}
                  <span className={`text-sm ${m.done ? "text-foreground" : "text-muted-foreground"}`}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Scores */}
          <div className="bg-card rounded-xl border border-border">
            <div className="p-5 border-b border-border">
              <h3 className="font-display font-semibold text-foreground text-sm">Recent Session Scores</h3>
            </div>
            <div className="divide-y divide-border">
              {sessions.filter(s => s.status === "completed").map((s) => (
                <div key={s.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.topic}</p>
                    <p className="text-xs text-muted-foreground">{s.date}</p>
                  </div>
                  <Badge variant="secondary" className="font-bold">{s.score}%</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Sessions" && (
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="font-display font-semibold text-foreground">All Sessions</h3>
              <Badge variant="outline">{sessions.length} total</Badge>
            </div>
            <div className="divide-y divide-border">
              {sessions.map((s) => (
                <div key={s.id} className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      s.status === "completed" ? "bg-primary/10" : "bg-secondary"
                    }`}>
                      {s.status === "completed" ? (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.topic}</p>
                      <p className="text-xs text-muted-foreground">{s.date} at {s.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {s.score && <Badge variant="secondary">{s.score}%</Badge>}
                    <Badge variant={s.status === "completed" ? "default" : "outline"} className="text-[10px]">
                      {s.status === "completed" ? "Done" : "Upcoming"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Resources" && (
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border">
            <div className="p-5 border-b border-border">
              <h3 className="font-display font-semibold text-foreground">Class Resources</h3>
            </div>
            <div className="divide-y divide-border">
              {resources.map((r, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <r.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.type} • {r.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    {r.type === "Video" ? <Play className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentClassDetail;
