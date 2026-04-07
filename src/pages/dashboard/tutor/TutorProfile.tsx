import { useState } from "react";
import { User, Mail, Phone, MapPin, BookOpen, Clock, Bell, Shield, Camera, Save, Globe, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const TutorProfile = () => {
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
    toast.success("Profile updated successfully");
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-hero rounded-2xl p-6 lg:p-8 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-10" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative group">
            <Avatar className="w-20 h-20 border-4 border-primary-foreground/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-2xl font-bold">BA</AvatarFallback>
            </Avatar>
            <button className="absolute inset-0 rounded-full bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold">Ustadh Bilal Ahmad</h1>
            <p className="text-primary-foreground/70 text-sm mt-1">Hifz & Tajweed Tutor • Al-Noor Qur'an Academy</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-foreground/15 text-xs font-medium backdrop-blur-sm">
                <GraduationCap className="w-3.5 h-3.5" /> 8 Years Experience
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-foreground/15 text-xs font-medium backdrop-blur-sm">
                <BookOpen className="w-3.5 h-3.5" /> 18 Active Students
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-foreground/15 text-xs font-medium backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5" /> 142 Hours This Month
              </span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1 rounded-xl">
          <TabsTrigger value="personal" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm gap-2">
            <User className="w-4 h-4" /> Personal Info
          </TabsTrigger>
          <TabsTrigger value="teaching" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm gap-2">
            <BookOpen className="w-4 h-4" /> Teaching
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm gap-2">
            <Bell className="w-4 h-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm gap-2">
            <Shield className="w-4 h-4" /> Security
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card className="border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={profileData.firstName} onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={profileData.lastName} onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="email" className="pl-10" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="phone" className="pl-10" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="location" className="pl-10" value={profileData.location} onChange={(e) => setProfileData({ ...profileData, location: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" rows={4} value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} className="resize-none" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language</Label>
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
                <div className="space-y-2">
                  <Label>Timezone</Label>
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
              <div className="flex justify-end pt-2">
                <Button onClick={handleSave} className="gap-2"><Save className="w-4 h-4" /> Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teaching Tab */}
        <TabsContent value="teaching" className="space-y-6">
          <Card className="border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Teaching Preferences</CardTitle>
              <CardDescription>Customize your class settings and availability preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Specialization</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" value={profileData.yearsExperience} onChange={(e) => setProfileData({ ...profileData, yearsExperience: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Max Students Per Slot</Label>
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
                <div className="space-y-2">
                  <Label>Default Class Duration</Label>
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
                <div className="space-y-2">
                  <Label>Break Between Classes</Label>
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
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto-Accept Bookings</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Automatically accept new student booking requests</p>
                  </div>
                  <Switch checked={preferences.autoAcceptBookings} onCheckedChange={(v) => setPreferences({ ...preferences, autoAcceptBookings: v })} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">Public Profile</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Allow students to find your profile in the academy directory</p>
                  </div>
                  <Switch checked={preferences.showProfilePublicly} onCheckedChange={(v) => setPreferences({ ...preferences, showProfilePublicly: v })} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">Allow Session Recording</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Let the academy record sessions for quality assurance</p>
                  </div>
                  <Switch checked={preferences.allowRecordedSessions} onCheckedChange={(v) => setPreferences({ ...preferences, allowRecordedSessions: v })} />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleSave} className="gap-2"><Save className="w-4 h-4" /> Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Notification Settings</CardTitle>
              <CardDescription>Choose how and when you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "classReminders", label: "Class Reminders", desc: "Get reminders before your scheduled classes" },
                { key: "studentUpdates", label: "Student Progress Updates", desc: "Receive updates when students complete assignments" },
                { key: "newAssignments", label: "New Student Assignments", desc: "Notification when new students are assigned to you" },
                { key: "scheduleChanges", label: "Schedule Changes", desc: "Alerts for any changes to your class schedule" },
                { key: "parentMessages", label: "Parent/Guardian Messages", desc: "Notifications for messages from parents" },
                { key: "weeklyReport", label: "Weekly Summary Report", desc: "Receive a weekly teaching performance summary" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(v) => setNotifications({ ...notifications, [item.key]: v })}
                  />
                </div>
              ))}
              <div className="border-t border-border pt-4 mt-4 space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Delivery Channels</h4>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Notifications</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Receive notifications via email</p>
                  </div>
                  <Switch checked={notifications.emailNotifications} onCheckedChange={(v) => setNotifications({ ...notifications, emailNotifications: v })} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">SMS Notifications</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Receive notifications via text message</p>
                  </div>
                  <Switch checked={notifications.smsNotifications} onCheckedChange={(v) => setNotifications({ ...notifications, smsNotifications: v })} />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleSave} className="gap-2"><Save className="w-4 h-4" /> Save Notifications</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Password & Security</CardTitle>
              <CardDescription>Manage your password and account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="Enter current password" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={() => toast.success("Password updated successfully")} className="gap-2"><Shield className="w-4 h-4" /> Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions related to your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5">
                <div>
                  <p className="text-sm font-medium text-foreground">Deactivate Account</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Temporarily disable your tutor account</p>
                </div>
                <Button variant="destructive" size="sm">Deactivate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TutorProfile;
