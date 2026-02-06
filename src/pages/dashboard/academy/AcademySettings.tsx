import { useState } from "react";
import { Building2, User, Palette, CreditCard, Bell, Shield, Globe, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface AcademySettingsProps {
  academy: {
    name: string;
    description: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    owner: { name: string; title: string; email: string; certificationNumber: string; issuingAuthority: string };
    branding: { primaryColor: string; secondaryColor: string; accentColor: string; fontStyle: string };
    subscription: { plan: string; studentPlans: any[] };
    settings: {
      maxStudents: string;
      enableEnrollment: boolean;
      requireApproval: boolean;
      allowPublicProfile: boolean;
      enableNotifications: boolean;
      timezone: string;
    };
  };
}

const AcademySettings = ({ academy }: AcademySettingsProps) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("general");

  const sections = [
    { id: "general", label: "General", icon: Building2 },
    { id: "owner", label: "Owner Profile", icon: User },
    { id: "branding", label: "Branding", icon: Palette },
    { id: "billing", label: "Billing & Plans", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
  ];

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your changes have been saved successfully." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your academy configuration</p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-hero hover:opacity-90 gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1 bg-card rounded-xl border border-border p-2">
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
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === "general" && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Academy Information</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Academy Name</label>
                      <Input defaultValue={academy.name} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
                      <Input defaultValue={academy.location} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                    <Textarea defaultValue={academy.description} rows={3} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Contact Email</label>
                      <Input defaultValue={academy.email} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                      <Input defaultValue={academy.phone} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Website</label>
                    <Input defaultValue={academy.website} />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Enrollment Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Max Student Capacity</label>
                    <Input defaultValue={academy.settings.maxStudents} type="number" className="max-w-xs" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">Open Enrollment</p>
                      <p className="text-xs text-muted-foreground">Allow students to request enrollment</p>
                    </div>
                    <Switch defaultChecked={academy.settings.enableEnrollment} />
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">Require Approval</p>
                      <p className="text-xs text-muted-foreground">Manually approve enrollment requests</p>
                    </div>
                    <Switch defaultChecked={academy.settings.requireApproval} />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Timezone
                </h3>
                <select
                  defaultValue={academy.settings.timezone}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground"
                >
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="Asia/Dubai">Dubai (GST)</option>
                  <option value="Asia/Riyadh">Riyadh (AST)</option>
                </select>
              </div>
            </div>
          )}

          {activeSection === "owner" && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Owner Profile</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center">
                  <span className="text-xl font-bold text-accent-foreground">SA</span>
                </div>
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                    <Input defaultValue={academy.owner.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
                    <Input defaultValue={academy.owner.title} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <Input defaultValue={academy.owner.email} />
                </div>
                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-3">Credentials</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">Certification Number</label>
                      <Input defaultValue={academy.owner.certificationNumber} readOnly className="bg-secondary/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">Issuing Authority</label>
                      <Input defaultValue={academy.owner.issuingAuthority} readOnly className="bg-secondary/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "branding" && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Branding</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Your current branding configuration from setup
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="p-4 bg-secondary/30 rounded-xl text-center">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(158,45%,22%)] mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Primary</p>
                  <p className="text-xs text-muted-foreground capitalize">{academy.branding.primaryColor}</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-xl text-center">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(45,30%,95%)] border border-border mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Background</p>
                  <p className="text-xs text-muted-foreground capitalize">{academy.branding.secondaryColor}</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-xl text-center">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(38,75%,55%)] mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Accent</p>
                  <p className="text-xs text-muted-foreground capitalize">{academy.branding.accentColor}</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-secondary/30 rounded-xl">
                <p className="text-sm font-medium text-foreground">Typography</p>
                <p className="text-xs text-muted-foreground capitalize">{academy.branding.fontStyle} style</p>
              </div>
              <Button variant="outline" className="mt-4">Customize Branding</Button>
            </div>
          )}

          {activeSection === "billing" && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Current Plan</h3>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg font-bold text-foreground capitalize">{academy.subscription.plan}</p>
                    <p className="text-sm text-muted-foreground">$29/month • Renews Feb 15, 2026</p>
                  </div>
                  <Button variant="outline" size="sm">Upgrade Plan</Button>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Student Subscription Plans</h3>
                <div className="space-y-3">
                  {academy.subscription.studentPlans.map((plan) => (
                    <div key={plan.id} className="p-4 bg-secondary/30 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{plan.name}</p>
                        <p className="text-sm text-muted-foreground">${plan.price}/{plan.duration} • {plan.features.length} features</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">Add New Student Plan</Button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: "New Enrollment Requests", description: "Get notified when students request enrollment", defaultOn: true },
                  { label: "Session Reminders", description: "Reminders before upcoming sessions", defaultOn: true },
                  { label: "Student Progress Alerts", description: "When students reach milestones", defaultOn: true },
                  { label: "Payment Notifications", description: "Subscription renewals and payments", defaultOn: true },
                  { label: "Weekly Digest", description: "Summary of weekly academy activity", defaultOn: false },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{pref.label}</p>
                      <p className="text-xs text-muted-foreground">{pref.description}</p>
                    </div>
                    <Switch defaultChecked={pref.defaultOn} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "privacy" && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">Public Academy Profile</p>
                      <p className="text-xs text-muted-foreground">Visible in the academy directory</p>
                    </div>
                    <Switch defaultChecked={academy.settings.allowPublicProfile} />
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">Show Student Count</p>
                      <p className="text-xs text-muted-foreground">Display number of enrolled students publicly</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Security</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">Change Password</Button>
                  <Button variant="outline" className="w-full justify-start">Enable Two-Factor Authentication</Button>
                  <Button variant="outline" className="w-full justify-start text-destructive border-destructive/30 hover:bg-destructive/10">
                    Delete Academy
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademySettings;
