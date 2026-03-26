import { useState } from "react";
import { Users, Clock, BookOpen, Star, Search, Filter, ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface StudentClassesProps {
  onViewClass: (classId: string) => void;
}

const myClasses = [
  {
    id: "1",
    title: "Advanced Hifz Circle",
    type: "group" as const,
    tutor: "Ustadh Bilal",
    schedule: "Mon, Wed, Fri — 2:00 PM",
    nextSession: "Today, 2:00 PM",
    students: 8,
    maxStudents: 12,
    progress: 65,
    status: "ongoing" as const,
    level: "Advanced",
    image: "📖",
  },
  {
    id: "2",
    title: "Tajweed Masterclass",
    type: "seasonal" as const,
    tutor: "Ustadha Fatima",
    schedule: "Sat — 10:00 AM",
    nextSession: "Saturday, 10:00 AM",
    students: 15,
    maxStudents: 20,
    progress: 40,
    status: "ongoing" as const,
    level: "Intermediate",
    image: "🎯",
  },
  {
    id: "3",
    title: "1-on-1 Hifz Session",
    type: "private" as const,
    tutor: "Ustadh Bilal",
    schedule: "Tue, Thu — 3:00 PM",
    nextSession: "Tomorrow, 3:00 PM",
    students: 1,
    maxStudents: 1,
    progress: 72,
    status: "ongoing" as const,
    level: "Advanced",
    image: "⭐",
  },
];

const availableClasses = [
  {
    id: "4",
    title: "Ramadan Intensive Hifz",
    type: "seasonal" as const,
    tutor: "Ustadh Ibrahim",
    schedule: "Daily — 9:00 AM",
    nextSession: "Starts March 1",
    students: 10,
    maxStudents: 25,
    progress: 0,
    status: "upcoming" as const,
    level: "All Levels",
    image: "🌙",
  },
  {
    id: "5",
    title: "Qur'anic Arabic Foundations",
    type: "group" as const,
    tutor: "Ustadha Maryam",
    schedule: "Sun, Tue — 6:00 PM",
    nextSession: "Starts Next Week",
    students: 5,
    maxStudents: 15,
    progress: 0,
    status: "upcoming" as const,
    level: "Beginner",
    image: "📚",
  },
  {
    id: "6",
    title: "Weekend Tajweed Workshop",
    type: "seasonal" as const,
    tutor: "Ustadh Yusuf",
    schedule: "Sat & Sun — 11:00 AM",
    nextSession: "Starts April 5",
    students: 12,
    maxStudents: 30,
    progress: 0,
    status: "upcoming" as const,
    level: "Intermediate",
    image: "✨",
  },
];

const typeLabels: Record<string, string> = {
  group: "Group Class",
  seasonal: "Seasonal",
  private: "Private",
};

const typeColors: Record<string, string> = {
  group: "bg-primary/10 text-primary",
  seasonal: "bg-accent/10 text-accent",
  private: "bg-secondary text-secondary-foreground",
};

const StudentClasses = ({ onViewClass }: StudentClassesProps) => {
  const [activeTab, setActiveTab] = useState<"my" | "available">("my");
  const [searchQuery, setSearchQuery] = useState("");

  const classes = activeTab === "my" ? myClasses : availableClasses;
  const filtered = classes.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tutor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">My Classes</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your enrolled classes and discover new ones
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "my" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("my")}
          className="rounded-full"
        >
          My Classes ({myClasses.length})
        </Button>
        <Button
          variant={activeTab === "available" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("available")}
          className="rounded-full"
        >
          Available ({availableClasses.length})
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search classes or tutors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Class Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((cls) => (
          <div
            key={cls.id}
            className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
            onClick={() => onViewClass(cls.id)}
          >
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cls.image}</span>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                      {cls.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{cls.tutor}</p>
                  </div>
                </div>
                <Badge variant="secondary" className={`text-[10px] ${typeColors[cls.type]}`}>
                  {typeLabels[cls.type]}
                </Badge>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{cls.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{cls.nextSession}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" />
                  <span>
                    {cls.students}/{cls.maxStudents} students
                  </span>
                </div>
              </div>

              {activeTab === "my" && cls.progress > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-primary">{cls.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${cls.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <Badge variant="outline" className="text-[10px]">
                  {cls.level}
                </Badge>
                {activeTab === "available" ? (
                  <Button size="sm" variant="default" className="h-7 text-xs rounded-full">
                    Enroll
                  </Button>
                ) : (
                  <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:underline">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No classes found</p>
        </div>
      )}
    </div>
  );
};

export default StudentClasses;
