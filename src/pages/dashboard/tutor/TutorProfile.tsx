import { useState } from "react";
import { User, Mail, Phone, MapPin, BookOpen, Clock, Bell, Shield, Save, Globe, GraduationCap, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const sections = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "teaching", label: "Teaching", icon: BookOpen },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

const TutorProfile = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("personal");

  const [profileData, setProfileData] = useState({
    firstName: "Bilal",
    lastName: "Ahmad",
    email: "bilal.ahmad@alnoor.edu",
    phone: "+1 (555) 234-5678",
    location: "Toronto, Canada",
    bio: "Certified Quran tutor with 8+ years of experience in Hifz and Tajweed. Passionate about helping students develop a strong connection with the Quran through proper recitation and memorization techniques.",
    specialization: "hifz-tajweed",
    language: "english",
    timezone: "est",
    yearsExperience: "8",
  });

  const [notifications, setNotifications] = useState({
    classReminders: true,
    studentUpdates: true,
    newAssignments: true,
    weeklyReport: true,
    emailNotifications: true,
    smsNotifications: false,
    scheduleChanges: true,
    parentMessages: true,
  });

  const [preferences, setPreferences] = useState({
    maxStudentsPerSlot: "1",
    defaultClassDuration: "45",
    breakBetweenClasses: "15",
    autoAcceptBookings: false,
    showProfilePublicly: true,
    allowRecordedSessions: false,
  });

  const handleSave = () => {
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Profile & Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your personal information and preferences</p>
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
            <div className="relative group mx-auto w-16 h-16 mb-3">
              <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-xl font-bold text-accent-foreground">BA</span>
              </div>
              <button className="absolute inset-0 rounded-full bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
            <p className="font-display font-semibold text-foreground">Ustadh Bilal Ahmad</p>
            <p className="text-xs text-muted-foreground">Al-Noor Qur'an Academy</p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
                <GraduationCap className="w-3 h-3" /> 8 Yrs Exp
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent/20 rounded-full text-xs font-medium text-accent-foreground">
                <BookOpen className="w-3 h-3" /> 18 Students
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
                    <label className="block text-sm font-medium text-foreground mb-1.5">First Name</label>
                    <Input value={profileData.firstName} onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Last Name</label>
                    <Input value={profileData.lastName} onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-10" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-10" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-10" value={profileData.location} onChange={(e) => setProfileData({ ...profileData, location: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                  <Textarea rows={3} value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} className="resize-none" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Language</label>
                    <Select value={profileData.language} onValueChange={(v) => setProfileData({ ...profileData, language: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="arabic">Arabic</SelectItem>
                        <SelectItem value="urdu">Urdu</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Timezone</label>
                    <Select value={profileData.timezone} onValueChange={(v) => setProfileData({ ...profileData, timezone: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern (EST)</SelectItem>
                        <SelectItem value="cst">Central (CST)</SelectItem>
                        <SelectItem value="mst">Mountain (MST)</SelectItem>
                        <SelectItem value="pst">Pacific (PST)</SelectItem>
                        <SelectItem value="gmt">GMT</SelectItem>
                        <SelectItem value="cet">Central European (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "teaching" && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Teaching Preferences</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Specialization</label>
                      <Select value={profileData.specialization} onValueChange={(v) => setProfileData({ ...profileData, specialization: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hifz-tajweed">Hifz & Tajweed</SelectItem>
                          <SelectItem value="hifz">Hifz Only</SelectItem>
                          <SelectItem value="tajweed">Tajweed Only</SelectItem>
                          <SelectItem value="qiraat">Qira'at</SelectItem>
                          <SelectItem value="arabic">Arabic Language</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Years of Experience</label>
                      <Input type="number" value={profileData.yearsExperience} onChange={(e) => setProfileData({ ...profileData, yearsExperience: e.target.value })} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Class Settings</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Max Students Per Slot</label>
                      <Select value={preferences.maxStudentsPerSlot} onValueChange={(v) => setPreferences({ ...preferences, maxStudentsPerSlot: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 (One-on-One)</SelectItem>
                          <SelectItem value="2">2 Students</SelectItem>
                          <SelectItem value="3">3 Students</SelectItem>
                          <SelectItem value="5">5 Students</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Default Duration</label>
                      <Select value={preferences.defaultClassDuration} onValueChange={(v) => setPreferences({ ...preferences, defaultClassDuration: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 Minutes</SelectItem>
                          <SelectItem value="45">45 Minutes</SelectItem>
                          <SelectItem value="60">60 Minutes</SelectItem>
                          <SelectItem value="90">90 Minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Break Between Classes</label>
                      <Select value={preferences.breakBetweenClasses} onValueChange={(v) => setPreferences({ ...preferences, breakBetweenClasses: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Minutes</SelectItem>
                          <SelectItem value="10">10 Minutes</SelectItem>
                          <SelectItem value="15">15 Minutes</SelectItem>
                          <SelectItem value="30">30 Minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">Auto-Accept Bookings</p>
                      <p className="text-xs text-muted-foreground">Automatically accept new student booking requests</p>
                    </div>
                    <Switch checked={preferences.autoAcceptBookings} onCheckedChange={(v) => setPreferences({ ...preferences, autoAcceptBookings: v })} />
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">Public Profile</p>
                      <p className="text-xs text-muted-foreground">Allow students to find your profile in the academy directory</p>
                    </div>
                    <Switch checked={preferences.showProfilePublicly} onCheckedChange={(v) => setPreferences({ ...preferences, showProfilePublicly: v })} />
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">Allow Session Recording</p>
                      <p className="text-xs text-muted-foreground">Let the academy record sessions for quality assurance</p>
                    </div>
                    <Switch checked={preferences.allowRecordedSessions} onCheckedChange={(v) => setPreferences({ ...preferences, allowRecordedSessions: v })} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { key: "classReminders", label: "Class Reminders", desc: "Get reminders before your scheduled classes" },
                  { key: "studentUpdates", label: "Student Progress Updates", desc: "Receive updates when students complete assignments" },
                  { key: "newAssignments", label: "New Student Assignments", desc: "Notification when new students are assigned to you" },
                  { key: "scheduleChanges", label: "Schedule Changes", desc: "Alerts for any changes to your class schedule" },
                  { key: "parentMessages", label: "Parent/Guardian Messages", desc: "Notifications for messages from parents" },
                  { key: "weeklyReport", label: "Weekly Summary Report", desc: "Receive a weekly teaching performance summary" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(v) => setNotifications({ ...notifications, [item.key]: v })}
                    />
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 mt-4 space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Delivery Channels</h4>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch checked={notifications.emailNotifications} onCheckedChange={(v) => setNotifications({ ...notifications, emailNotifications: v })} />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">SMS Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive notifications via text message</p>
                  </div>
                  <Switch checked={notifications.smsNotifications} onCheckedChange={(v) => setNotifications({ ...notifications, smsNotifications: v })} />
                </div>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Current Password</label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">New Password</label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Confirm New Password</label>
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                  </div>
                  <Button variant="outline">Update Password</Button>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Security Options</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">Enable Two-Factor Authentication</Button>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-destructive/30 p-6">
                <h3 className="font-display font-semibold text-destructive mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">Permanently deactivate your tutor account. This action cannot be undone.</p>
                <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                  Deactivate Account
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
