import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Globe, Shield, BookOpen } from "lucide-react";

interface AccountSetupData {
  displayName: string;
  timezone: string;
  language: string;
  currentLevel: string;
  learningGoal: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  classReminders: boolean;
  progressReports: boolean;
}

interface StudentAccountSetupStepProps {
  data: AccountSetupData;
  onChange: (data: Partial<AccountSetupData>) => void;
  withAcademy: boolean;
}

const StudentAccountSetupStep = ({ data, onChange, withAcademy }: StudentAccountSetupStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-display text-xl font-semibold text-foreground mb-2">
          Account Setup
        </h2>
        <p className="text-muted-foreground text-sm">
          Configure your preferences to personalize your experience
        </p>
      </div>

      {/* Display Name & Preferences */}
      <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <Globe className="w-4 h-4" />
          <span>General Preferences</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={data.displayName}
              onChange={(e) => onChange({ displayName: e.target.value })}
              placeholder="How should we call you?"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label>Timezone</Label>
            <Select value={data.timezone} onValueChange={(value) => onChange({ timezone: value })}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                <SelectItem value="Asia/Dubai">Dubai (GST)</SelectItem>
                <SelectItem value="Asia/Riyadh">Riyadh (AST)</SelectItem>
                <SelectItem value="Asia/Karachi">Pakistan (PKT)</SelectItem>
                <SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Language</Label>
            <Select value={data.language} onValueChange={(value) => onChange({ language: value })}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية (Arabic)</SelectItem>
                <SelectItem value="ur">اردو (Urdu)</SelectItem>
                <SelectItem value="fr">Français (French)</SelectItem>
                <SelectItem value="ms">Bahasa Melayu (Malay)</SelectItem>
                <SelectItem value="id">Bahasa Indonesia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Learning Profile */}
      <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <BookOpen className="w-4 h-4" />
          <span>Learning Profile</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Current Qur'an Level</Label>
            <Select value={data.currentLevel} onValueChange={(value) => onChange({ currentLevel: value })}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner - Learning Arabic letters</SelectItem>
                <SelectItem value="elementary">Elementary - Reading with difficulty</SelectItem>
                <SelectItem value="intermediate">Intermediate - Reading fluently</SelectItem>
                <SelectItem value="advanced">Advanced - Studying Tajweed</SelectItem>
                <SelectItem value="hafiz">Hafiz - Memorizing Qur'an</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Primary Learning Goal</Label>
            <Select value={data.learningGoal} onValueChange={(value) => onChange({ learningGoal: value })}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reading">Learn to read Qur'an</SelectItem>
                <SelectItem value="tajweed">Master Tajweed rules</SelectItem>
                <SelectItem value="hifz">Memorize Qur'an (Hifz)</SelectItem>
                <SelectItem value="tafsir">Understand Tafsir</SelectItem>
                <SelectItem value="arabic">Learn Qur'anic Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch
              checked={data.emailNotifications}
              onCheckedChange={(checked) => onChange({ emailNotifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Push Notifications</p>
              <p className="text-xs text-muted-foreground">Browser push notifications</p>
            </div>
            <Switch
              checked={data.pushNotifications}
              onCheckedChange={(checked) => onChange({ pushNotifications: checked })}
            />
          </div>

          {withAcademy && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Class Reminders</p>
                <p className="text-xs text-muted-foreground">Get reminded before classes</p>
              </div>
              <Switch
                checked={data.classReminders}
                onCheckedChange={(checked) => onChange({ classReminders: checked })}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Weekly Progress Reports</p>
              <p className="text-xs text-muted-foreground">Receive weekly learning summaries</p>
            </div>
            <Switch
              checked={data.progressReports}
              onCheckedChange={(checked) => onChange({ progressReports: checked })}
            />
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
        <Shield className="w-5 h-5 text-primary mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">Your privacy matters</p>
          <p className="text-xs text-muted-foreground mt-1">
            Your personal information is encrypted and never shared without your consent. You can update these preferences anytime from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentAccountSetupStep;
