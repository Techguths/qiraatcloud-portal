import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

const AcademyAdminSettings = () => {
  const [academyName, setAcademyName] = useState("Al-Noor Qur'an Academy");
  const [academyEmail, setAcademyEmail] = useState("contact@alnoor-academy.com");
  const [timezone, setTimezone] = useState("Europe/London");
  const [maxStudents, setMaxStudents] = useState("200");
  const [requireApproval, setRequireApproval] = useState(true);
  const [enableEnrollment, setEnableEnrollment] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Academy Settings</h2>
        <p className="text-sm text-muted-foreground">Manage academy profile and configurations</p>
      </div>

      {/* General Info */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-4">
        <h3 className="font-display font-semibold text-foreground">General Information</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Academy Name</label>
            <Input value={academyName} onChange={(e) => setAcademyName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Contact Email</label>
            <Input value={academyEmail} onChange={(e) => setAcademyEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Timezone</label>
            <Input value={timezone} onChange={(e) => setTimezone(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Max Students</label>
            <Input type="number" value={maxStudents} onChange={(e) => setMaxStudents(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Enrollment Settings */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-4">
        <h3 className="font-display font-semibold text-foreground">Enrollment & Approvals</h3>
        <div className="space-y-3">
          {[
            { label: "Open Enrollment", desc: "Allow new students to enroll", value: enableEnrollment, setter: setEnableEnrollment },
            { label: "Require Approval", desc: "New enrollments require admin approval", value: requireApproval, setter: setRequireApproval },
            { label: "Email Notifications", desc: "Receive alerts for new enrollments and flags", value: enableNotifications, setter: setEnableNotifications },
          ].map((setting) => (
            <div key={setting.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div>
                <p className="text-sm font-medium text-foreground">{setting.label}</p>
                <p className="text-xs text-muted-foreground">{setting.desc}</p>
              </div>
              <button
                onClick={() => setting.setter(!setting.value)}
                className={`w-11 h-6 rounded-full transition-colors relative ${setting.value ? "bg-primary" : "bg-border"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary-foreground transition-transform ${setting.value ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-xl border border-destructive/30 p-5 space-y-4">
        <h3 className="font-display font-semibold text-destructive">Danger Zone</h3>
        <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/5">
          <div>
            <p className="text-sm font-medium text-foreground">Disable Academy</p>
            <p className="text-xs text-muted-foreground">Temporarily disable all academy operations</p>
          </div>
          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive border-destructive/30">Disable</Button>
        </div>
      </div>

      <Button className="gap-2"><Save className="w-4 h-4" /> Save Changes</Button>
    </div>
  );
};

export default AcademyAdminSettings;
