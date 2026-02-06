import { useState } from "react";
import { User, Mail, Phone, MapPin, BookOpen, Save, Calendar, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface StudentProfileProps {
  student: {
    name: string;
    displayName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    dateOfBirth: string;
    gender: string;
    bio: string;
    currentLevel: string;
    learningGoal: string;
    timezone: string;
    academy: { name: string; plan: string; tutor: string; enrolledDate: string };
    notifications: {
      email: boolean;
      push: boolean;
      classReminders: boolean;
      progressReports: boolean;
    };
  };
}

const StudentProfile = ({ student }: StudentProfileProps) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("personal");

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "learning", label: "Learning Profile", icon: BookOpen },
    { id: "academy", label: "Academy Info", icon: Calendar },
    { id: "notifications", label: "Notifications", icon: Mail },
  ];

  const handleSave = () => {
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  const getLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      beginner: "Beginner - Learning Arabic letters",
      elementary: "Elementary - Reading with difficulty",
      intermediate: "Intermediate - Reading fluently",
      advanced: "Advanced - Studying Tajweed",
      hafiz: "Hafiz - Memorizing Qur'an",
    };
    return labels[level] || level;
  };

  const getGoalLabel = (goal: string) => {
    const labels: Record<string, string> = {
      reading: "Learn to read Qur'an",
      tajweed: "Master Tajweed rules",
      hifz: "Memorize Qur'an (Hifz)",
      tafsir: "Understand Tafsir",
      arabic: "Learn Qur'anic Arabic",
    };
    return labels[goal] || goal;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">My Profile</h2>
          <p className="text-sm text-muted-foreground">Manage your personal information</p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-hero hover:opacity-90 gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-1 bg-card rounded-xl border border-border p-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>

          {/* Profile Card */}
          <div className="bg-card rounded-xl border border-border p-5 mt-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-primary">AM</span>
            </div>
            <p className="font-display font-semibold text-foreground">{student.name}</p>
            <p className="text-xs text-muted-foreground">{student.academy.name}</p>
            <div className="mt-3">
              <span className="px-2 py-1 bg-accent/20 rounded-full text-xs font-medium text-accent">
                {student.academy.plan}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === "personal" && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                    <Input defaultValue={student.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Display Name</label>
                    <Input defaultValue={student.displayName} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                    <Input defaultValue={student.email} type="email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                    <Input defaultValue={student.phone} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Country</label>
                    <Input defaultValue={student.country} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">City</label>
                    <Input defaultValue={student.city} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                  <Textarea defaultValue={student.bio} rows={3} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Date of Birth</label>
                    <Input defaultValue={student.dateOfBirth} type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Timezone</label>
                    <select
                      defaultValue={student.timezone}
                      className="w-full px-4 py-2 bg-background border border-input rounded-lg text-sm"
                    >
                      <option value="Europe/London">London (GMT)</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="Asia/Dubai">Dubai (GST)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "learning" && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Learning Profile</h3>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/30 rounded-xl">
                  <p className="text-sm font-medium text-foreground">Current Level</p>
                  <p className="text-sm text-muted-foreground">{getLevelLabel(student.currentLevel)}</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-xl">
                  <p className="text-sm font-medium text-foreground">Primary Learning Goal</p>
                  <p className="text-sm text-muted-foreground">{getGoalLabel(student.learningGoal)}</p>
                </div>
                <Button variant="outline">Update Learning Profile</Button>
              </div>
            </div>
          )}

          {activeSection === "academy" && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Academy Information</h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-semibold text-foreground">{student.academy.name}</p>
                      <p className="text-sm text-muted-foreground">Enrolled since {student.academy.enrolledDate}</p>
                    </div>
                    <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full">
                      {student.academy.plan}
                    </span>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <p className="text-sm font-medium text-foreground">Assigned Tutor</p>
                    <p className="text-sm text-muted-foreground">{student.academy.tutor}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <p className="text-sm font-medium text-foreground">Subscription Plan</p>
                    <p className="text-sm text-muted-foreground">{student.academy.plan} — Active</p>
                  </div>
                </div>
                <Button variant="outline">Browse Other Academies</Button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: "Email Notifications", desc: "Receive updates via email", key: "email", defaultOn: student.notifications.email },
                  { label: "Push Notifications", desc: "Browser push notifications", key: "push", defaultOn: student.notifications.push },
                  { label: "Class Reminders", desc: "Reminders before scheduled sessions", key: "classReminders", defaultOn: student.notifications.classReminders },
                  { label: "Weekly Progress Reports", desc: "Receive weekly learning summaries", key: "progressReports", defaultOn: student.notifications.progressReports },
                ].map((pref) => (
                  <div key={pref.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{pref.label}</p>
                      <p className="text-xs text-muted-foreground">{pref.desc}</p>
                    </div>
                    <Switch defaultChecked={pref.defaultOn} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
