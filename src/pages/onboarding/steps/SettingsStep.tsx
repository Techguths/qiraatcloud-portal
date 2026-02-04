import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Settings, Users, Bell, Shield, Calendar, Globe } from "lucide-react";

interface SettingsStepProps {
  maxStudents: string;
  setMaxStudents: (value: string) => void;
  enableEnrollment: boolean;
  setEnableEnrollment: (value: boolean) => void;
  enableNotifications: boolean;
  setEnableNotifications: (value: boolean) => void;
  requireApproval: boolean;
  setRequireApproval: (value: boolean) => void;
  allowPublicProfile: boolean;
  setAllowPublicProfile: (value: boolean) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  // Summary data
  academyName: string;
  academyLocation: string;
  ownerName: string;
  platformPlan: string;
  studentPlansCount: number;
}

const SettingsStep = ({
  maxStudents,
  setMaxStudents,
  enableEnrollment,
  setEnableEnrollment,
  enableNotifications,
  setEnableNotifications,
  requireApproval,
  setRequireApproval,
  allowPublicProfile,
  setAllowPublicProfile,
  timezone,
  setTimezone,
  academyName,
  academyLocation,
  ownerName,
  platformPlan,
  studentPlansCount,
}: SettingsStepProps) => {
  const timezones = [
    { value: "UTC", label: "UTC (Coordinated Universal Time)" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Dubai", label: "Gulf Standard Time (GST)" },
    { value: "Asia/Karachi", label: "Pakistan Standard Time (PKT)" },
    { value: "Asia/Kolkata", label: "India Standard Time (IST)" },
    { value: "Asia/Riyadh", label: "Arabia Standard Time (AST)" },
    { value: "Asia/Jakarta", label: "Western Indonesia Time (WIB)" },
    { value: "Asia/Kuala_Lumpur", label: "Malaysia Time (MYT)" },
    { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
  ];

  const getPlanLabel = (planId: string) => {
    const labels: Record<string, string> = {
      starter: "Starter (Free)",
      professional: "Professional ($29/mo)",
      enterprise: "Enterprise ($99/mo)",
    };
    return labels[planId] || planId;
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Final Settings
        </h2>
        <p className="text-muted-foreground">
          Configure your academy preferences and review your setup.
        </p>
      </div>

      {/* Enrollment Settings */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Enrollment Settings
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Maximum Students Capacity
            </label>
            <Input
              type="number"
              placeholder="100"
              value={maxStudents}
              onChange={(e) => setMaxStudents(e.target.value)}
              className="max-w-xs"
            />
            <p className="text-xs text-muted-foreground mt-1">
              You can change this later in settings
            </p>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-border">
            <div>
              <h4 className="font-medium text-foreground">Open Enrollment</h4>
              <p className="text-sm text-muted-foreground">
                Allow students to browse and request to join your academy
              </p>
            </div>
            <Switch
              checked={enableEnrollment}
              onCheckedChange={setEnableEnrollment}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-t border-border">
            <div>
              <h4 className="font-medium text-foreground">Require Approval</h4>
              <p className="text-sm text-muted-foreground">
                Manually approve each student enrollment request
              </p>
            </div>
            <Switch
              checked={requireApproval}
              onCheckedChange={setRequireApproval}
            />
          </div>
        </div>
      </div>

      {/* Visibility & Notifications */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Visibility & Notifications
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-foreground">Public Profile</h4>
              <p className="text-sm text-muted-foreground">
                Show your academy in the public directory
              </p>
            </div>
            <Switch
              checked={allowPublicProfile}
              onCheckedChange={setAllowPublicProfile}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-t border-border">
            <div>
              <h4 className="font-medium text-foreground">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Receive notifications for new enrollments and messages
              </p>
            </div>
            <Switch
              checked={enableNotifications}
              onCheckedChange={setEnableNotifications}
            />
          </div>
        </div>
      </div>

      {/* Timezone */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Timezone
        </h3>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground"
        >
          {timezones.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground mt-2">
          Used for scheduling classes and sending notifications
        </p>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/20">
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Setup Summary
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Academy Name</span>
              <span className="font-medium text-foreground">{academyName || "—"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium text-foreground">{academyLocation || "—"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Owner</span>
              <span className="font-medium text-foreground">{ownerName || "—"}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Platform Plan</span>
              <span className="font-medium text-foreground">{getPlanLabel(platformPlan)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Student Plans</span>
              <span className="font-medium text-foreground">{studentPlansCount} created</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Max Students</span>
              <span className="font-medium text-foreground">{maxStudents}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-primary/20">
          <div className="flex flex-wrap gap-2">
            {enableEnrollment && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Open Enrollment
              </span>
            )}
            {requireApproval && (
              <span className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs rounded-full">
                Approval Required
              </span>
            )}
            {allowPublicProfile && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Public Profile
              </span>
            )}
            {enableNotifications && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Notifications On
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsStep;
