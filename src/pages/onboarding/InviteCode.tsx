import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  Key,
  Loader2,
  Check,
  Building2,
  GraduationCap,
  User,
  Shield,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Award,
  FileText,
  Settings,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type InviteRole = "student" | "tutor" | "admin";

interface AcademyDetails {
  name: string;
  logo: string;
  location: string;
  students: number;
  tutors: number;
  description: string;
  subjects: string[];
}

interface InviteData {
  academy: AcademyDetails;
  role: InviteRole;
  invitedBy: string;
  expiresAt: string;
}

// Mock invite code database
const mockInviteCodes: Record<string, InviteData> = {
  STU123: {
    academy: {
      name: "Al-Furqan Qur'an Academy",
      logo: "🕌",
      location: "London, UK",
      students: 245,
      tutors: 18,
      description: "A leading online Qur'an academy specializing in Hifz, Tajweed, and Qira'at studies with certified scholars.",
      subjects: ["Hifz", "Tajweed", "Qira'at", "Arabic"],
    },
    role: "student",
    invitedBy: "Sheikh Ahmad",
    expiresAt: "2026-03-30",
  },
  TUT456: {
    academy: {
      name: "Noor ul Quran Institute",
      logo: "📖",
      location: "Toronto, Canada",
      students: 180,
      tutors: 12,
      description: "An established institute focused on personalized Qur'an education with flexible scheduling.",
      subjects: ["Hifz", "Tajweed", "Islamic Studies"],
    },
    role: "tutor",
    invitedBy: "Dr. Fatimah Ali",
    expiresAt: "2026-03-25",
  },
  ADM789: {
    academy: {
      name: "Bayyinah Academy Online",
      logo: "🌙",
      location: "Dallas, USA",
      students: 520,
      tutors: 35,
      description: "A comprehensive Qur'anic education platform with advanced analytics and student tracking.",
      subjects: ["Hifz", "Tajweed", "Qira'at", "Tafseer", "Arabic Grammar"],
    },
    role: "admin",
    invitedBy: "Ustadh Ibrahim",
    expiresAt: "2026-03-20",
  },
};

const InviteCode = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inviteCode, setInviteCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [currentStep, setCurrentStep] = useState(0); // 0 = code entry, 1 = academy preview, 2+ = role steps

  // Role-specific form data
  const [studentData, setStudentData] = useState({
    fullName: "", email: "", phone: "", dateOfBirth: "", gender: "", country: "", city: "",
    currentLevel: "", learningGoal: "", timezone: "", language: "en",
    emailNotifications: true, classReminders: true,
  });

  const [tutorData, setTutorData] = useState({
    fullName: "", email: "", phone: "", country: "", city: "",
    qualifications: "", specialization: "", yearsExperience: "",
    ijazahCertification: "", bio: "", availableDays: [] as string[],
    preferredHours: "", maxStudents: "", teachingStyle: "",
  });

  const [adminData, setAdminData] = useState({
    fullName: "", email: "", phone: "", position: "",
    department: "", previousExperience: "", bio: "",
    permissions: [] as string[],
  });

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) {
      toast({ title: "Please enter an invite code", variant: "destructive" });
      return;
    }

    setIsVerifying(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const data = mockInviteCodes[inviteCode.toUpperCase()];
    if (data) {
      setInviteData(data);
      setCurrentStep(1);
      toast({ title: "Code verified!", description: `You've been invited as a ${data.role}.` });
    } else {
      toast({ title: "Invalid invite code", description: "Please check your code and try again.", variant: "destructive" });
    }
    setIsVerifying(false);
  };

  const getRoleSteps = () => {
    if (!inviteData) return [];
    switch (inviteData.role) {
      case "student":
        return [
          { id: "personal", title: "Personal Info", icon: User },
          { id: "learning", title: "Learning Preferences", icon: BookOpen },
          { id: "setup", title: "Account Setup", icon: Settings },
        ];
      case "tutor":
        return [
          { id: "personal", title: "Personal Info", icon: User },
          { id: "qualifications", title: "Qualifications", icon: Award },
          { id: "availability", title: "Availability", icon: Clock },
          { id: "setup", title: "Account Setup", icon: Settings },
        ];
      case "admin":
        return [
          { id: "personal", title: "Personal Info", icon: User },
          { id: "role-details", title: "Role Details", icon: Shield },
          { id: "setup", title: "Account Setup", icon: Settings },
        ];
    }
  };

  const roleSteps = getRoleSteps();
  const roleStepIndex = currentStep - 2; // steps after academy preview

  const getRoleIcon = (role: InviteRole) => {
    switch (role) {
      case "student": return <GraduationCap className="w-5 h-5" />;
      case "tutor": return <BookOpen className="w-5 h-5" />;
      case "admin": return <Shield className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role: InviteRole) => {
    switch (role) {
      case "student": return "bg-primary text-primary-foreground";
      case "tutor": return "bg-accent text-accent-foreground";
      case "admin": return "bg-secondary text-secondary-foreground";
    }
  };

  const handleComplete = async () => {
    toast({ title: "Welcome! 🎉", description: `You've successfully joined ${inviteData?.academy.name} as a ${inviteData?.role}.` });
    if (inviteData?.role === "student") navigate("/dashboard/student");
    else if (inviteData?.role === "admin") navigate("/dashboard/admin");
    else navigate("/dashboard/academy");
  };

  const canProceed = () => {
    if (currentStep <= 1) return true;
    const step = roleSteps[roleStepIndex];
    if (!step) return false;

    if (inviteData?.role === "student") {
      if (step.id === "personal") return studentData.fullName.trim() !== "" && studentData.email.trim() !== "";
      return true;
    }
    if (inviteData?.role === "tutor") {
      if (step.id === "personal") return tutorData.fullName.trim() !== "" && tutorData.email.trim() !== "";
      if (step.id === "qualifications") return tutorData.specialization.trim() !== "";
      return true;
    }
    if (inviteData?.role === "admin") {
      if (step.id === "personal") return adminData.fullName.trim() !== "" && adminData.email.trim() !== "";
      return true;
    }
    return true;
  };

  // ========== STEP 0: Code Entry ==========
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-background flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm">
            {/* Back Link */}
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">Q</span>
              </div>
              <span className="font-display font-semibold text-xl text-foreground">
                Qiraat<span className="text-primary">Cloud</span>
              </span>
            </Link>

            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                  Enter your invite code
                </h1>
                <p className="text-muted-foreground">
                  You should have received an invite code from your academy administrator or teacher.
                </p>
              </div>

              <div>
                <label htmlFor="invite-code" className="block text-sm font-medium text-foreground mb-2">
                  Invite Code
                </label>
                <Input
                  id="invite-code"
                  type="text"
                  placeholder="e.g., STU123"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  className="text-center text-lg tracking-widest font-mono"
                  maxLength={12}
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Try: STU123 (student), TUT456 (tutor), ADM789 (admin)
                </p>
              </div>

              <Button type="submit" className="w-full bg-gradient-hero hover:opacity-90" size="lg" disabled={isVerifying}>
                {isVerifying ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Verifying...</>
                ) : (
                  "Verify Code"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">or</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Don't have an invite code?{" "}
              <Link to="/onboarding/student" className="text-primary hover:underline font-medium">Browse academies</Link>{" "}or{" "}
              <Link to="/onboarding/create-academy" className="text-primary hover:underline font-medium">create your own</Link>
            </p>
          </div>
        </div>

        {/* Right Side - Decorative */}
        <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 geometric-pattern opacity-10" />
          <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-md text-center">
            <div className="w-24 h-24 bg-primary-foreground/10 backdrop-blur rounded-3xl flex items-center justify-center mx-auto mb-8 border border-primary-foreground/20">
              <Building2 className="w-12 h-12 text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-6">
              Join Your Academy
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Your academy has invited you to join their platform. Enter the invite code shared by your academy to access your personalized dashboard.
            </p>

            {/* Role cards */}
            <div className="space-y-3 mb-6">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-primary-foreground font-medium text-sm">Students</p>
                  <p className="text-primary-foreground/70 text-xs">Access classes, track progress & join live sessions</p>
                </div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-primary-foreground font-medium text-sm">Tutors</p>
                  <p className="text-primary-foreground/70 text-xs">Manage classes, schedule sessions & track students</p>
                </div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-primary-foreground font-medium text-sm">Administrators</p>
                  <p className="text-primary-foreground/70 text-xs">Full academy oversight, analytics & team management</p>
                </div>
              </div>
            </div>

            <p className="text-primary-foreground/60 text-xs text-center">
              Your role is determined by the invite code provided by your academy
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ========== STEP 1: Academy Preview ==========
  if (currentStep === 1 && inviteData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="px-4 py-6 sm:px-6 lg:px-8 border-b border-border">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button onClick={() => { setCurrentStep(0); setInviteData(null); }} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">Q</span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Success banner */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Invite code verified!</p>
                <p className="text-sm text-muted-foreground">You've been invited by <span className="font-medium text-foreground">{inviteData.invitedBy}</span></p>
              </div>
            </div>

            {/* Academy Card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
              <div className="bg-gradient-hero p-6 text-center">
                <div className="w-20 h-20 bg-background/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl">
                  {inviteData.academy.logo}
                </div>
                <h2 className="font-display text-xl font-bold text-primary-foreground">{inviteData.academy.name}</h2>
                <p className="text-primary-foreground/80 text-sm flex items-center justify-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" /> {inviteData.academy.location}
                </p>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground text-sm mb-4">{inviteData.academy.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">{inviteData.academy.students}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">{inviteData.academy.tutors}</p>
                    <p className="text-xs text-muted-foreground">Tutors</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {inviteData.academy.subjects.map((s) => (
                    <span key={s} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Role Badge */}
            <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 mb-8">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getRoleColor(inviteData.role)}`}>
                {getRoleIcon(inviteData.role)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Your assigned role</p>
                <p className="font-display font-semibold text-foreground capitalize">{inviteData.role}</p>
              </div>
              <span className="text-xs text-muted-foreground">Expires {inviteData.expiresAt}</span>
            </div>

            <Button onClick={() => setCurrentStep(2)} className="w-full bg-gradient-hero hover:opacity-90" size="lg">
              Continue as {inviteData.role} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // ========== STEP 2+: Role-specific onboarding ==========
  if (!inviteData || roleSteps.length === 0) return null;
  const currentRoleStep = roleSteps[roleStepIndex];
  if (!currentRoleStep) return null;

  const renderStepContent = () => {
    const { role } = inviteData;

    // ---- Student Steps ----
    if (role === "student") {
      if (currentRoleStep.id === "personal") return (
        <div className="space-y-5">
          <div><h2 className="font-display text-xl font-bold text-foreground mb-1">Personal Information</h2><p className="text-sm text-muted-foreground">Tell us about yourself</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="block text-sm font-medium text-foreground mb-1">Full Name *</label><Input value={studentData.fullName} onChange={(e) => setStudentData(p => ({...p, fullName: e.target.value}))} placeholder="Your full name" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Email *</label><Input type="email" value={studentData.email} onChange={(e) => setStudentData(p => ({...p, email: e.target.value}))} placeholder="your@email.com" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Phone</label><Input value={studentData.phone} onChange={(e) => setStudentData(p => ({...p, phone: e.target.value}))} placeholder="+1 234 567 890" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Date of Birth</label><Input type="date" value={studentData.dateOfBirth} onChange={(e) => setStudentData(p => ({...p, dateOfBirth: e.target.value}))} /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Gender</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={studentData.gender} onChange={(e) => setStudentData(p => ({...p, gender: e.target.value}))}>
                <option value="">Select</option><option value="male">Male</option><option value="female">Female</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Country</label><Input value={studentData.country} onChange={(e) => setStudentData(p => ({...p, country: e.target.value}))} placeholder="Country" /></div>
          </div>
        </div>
      );
      if (currentRoleStep.id === "learning") return (
        <div className="space-y-5">
          <div><h2 className="font-display text-xl font-bold text-foreground mb-1">Learning Preferences</h2><p className="text-sm text-muted-foreground">Help us customize your learning path</p></div>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-foreground mb-1">Current Level</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={studentData.currentLevel} onChange={(e) => setStudentData(p => ({...p, currentLevel: e.target.value}))}>
                <option value="">Select level</option><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option><option value="hafiz">Hafiz</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Learning Goal</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={studentData.learningGoal} onChange={(e) => setStudentData(p => ({...p, learningGoal: e.target.value}))}>
                <option value="">Select goal</option><option value="hifz">Complete Hifz</option><option value="tajweed">Master Tajweed</option><option value="qiraat">Learn Qira'at</option><option value="revision">Revision & Murajaah</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Timezone</label><Input value={studentData.timezone} onChange={(e) => setStudentData(p => ({...p, timezone: e.target.value}))} placeholder="e.g., GMT+0, EST" /></div>
          </div>
        </div>
      );
      if (currentRoleStep.id === "setup") return (
        <div className="space-y-5">
          <div><h2 className="font-display text-xl font-bold text-foreground mb-1">Account Setup</h2><p className="text-sm text-muted-foreground">Configure your notifications and preferences</p></div>
          <div className="space-y-4">
            {[
              { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
              { key: "classReminders", label: "Class Reminders", desc: "Get reminded before scheduled classes" },
            ].map(item => (
              <label key={item.key} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl cursor-pointer">
                <div><p className="font-medium text-foreground text-sm">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                <input type="checkbox" className="w-5 h-5 accent-primary" checked={(studentData as any)[item.key]} onChange={(e) => setStudentData(p => ({...p, [item.key]: e.target.checked}))} />
              </label>
            ))}
          </div>
        </div>
      );
    }

    // ---- Tutor Steps ----
    if (role === "tutor") {
      if (currentRoleStep.id === "personal") return (
        <div className="space-y-5">
          <div><h2 className="font-display text-xl font-bold text-foreground mb-1">Personal Information</h2><p className="text-sm text-muted-foreground">Tell us about yourself</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="block text-sm font-medium text-foreground mb-1">Full Name *</label><Input value={tutorData.fullName} onChange={(e) => setTutorData(p => ({...p, fullName: e.target.value}))} placeholder="Your full name" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Email *</label><Input type="email" value={tutorData.email} onChange={(e) => setTutorData(p => ({...p, email: e.target.value}))} placeholder="your@email.com" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Phone</label><Input value={tutorData.phone} onChange={(e) => setTutorData(p => ({...p, phone: e.target.value}))} placeholder="+1 234 567 890" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Country</label><Input value={tutorData.country} onChange={(e) => setTutorData(p => ({...p, country: e.target.value}))} placeholder="Country" /></div>
            <div className="sm:col-span-2"><label className="block text-sm font-medium text-foreground mb-1">Bio</label><textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]" value={tutorData.bio} onChange={(e) => setTutorData(p => ({...p, bio: e.target.value}))} placeholder="Brief introduction..." /></div>
          </div>
        </div>
      );
      if (currentRoleStep.id === "qualifications") return (
        <div className="space-y-5">
          <div><h2 className="font-display text-xl font-bold text-foreground mb-1">Qualifications</h2><p className="text-sm text-muted-foreground">Share your teaching credentials</p></div>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-foreground mb-1">Specialization *</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={tutorData.specialization} onChange={(e) => setTutorData(p => ({...p, specialization: e.target.value}))}>
                <option value="">Select</option><option value="hifz">Hifz</option><option value="tajweed">Tajweed</option><option value="qiraat">Qira'at</option><option value="arabic">Arabic Language</option><option value="islamic-studies">Islamic Studies</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Years of Experience</label><Input type="number" value={tutorData.yearsExperience} onChange={(e) => setTutorData(p => ({...p, yearsExperience: e.target.value}))} placeholder="e.g., 5" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Ijazah / Certification</label><Input value={tutorData.ijazahCertification} onChange={(e) => setTutorData(p => ({...p, ijazahCertification: e.target.value}))} placeholder="Certification details" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Teaching Style</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={tutorData.teachingStyle} onChange={(e) => setTutorData(p => ({...p, teachingStyle: e.target.value}))}>
                <option value="">Select</option><option value="one-on-one">One-on-One</option><option value="group">Group Sessions</option><option value="both">Both</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Max Students</label><Input type="number" value={tutorData.maxStudents} onChange={(e) => setTutorData(p => ({...p, maxStudents: e.target.value}))} placeholder="e.g., 20" /></div>
          </div>
        </div>
      );
      if (currentRoleStep.id === "availability") return (
        <div className="space-y-5">
          <div><h2 className="font-display text-xl font-bold text-foreground mb-1">Availability</h2><p className="text-sm text-muted-foreground">Set your teaching schedule preferences</p></div>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-foreground mb-2">Available Days</label>
              <div className="grid grid-cols-4 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <button key={day} type="button" onClick={() => setTutorData(p => ({...p, availableDays: p.availableDays.includes(day) ? p.availableDays.filter(d => d !== day) : [...p.availableDays, day]}))}
                    className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${tutorData.availableDays.includes(day) ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/50"}`}>
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Preferred Hours</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={tutorData.preferredHours} onChange={(e) => setTutorData(p => ({...p, preferredHours: e.target.value}))}>
                <option value="">Select</option><option value="morning">Morning (6AM-12PM)</option><option value="afternoon">Afternoon (12PM-6PM)</option><option value="evening">Evening (6PM-11PM)</option><option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        </div>
      );
      if (currentRoleStep.id === "setup") return (
        <div className="space-y-5">
          <div><h2 className="font-display text-xl font-bold text-foreground mb-1">Final Setup</h2><p className="text-sm text-muted-foreground">Review and confirm your details</p></div>
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Academy</span><span className="text-sm font-medium text-foreground">{inviteData.academy.name}</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Role</span><span className="text-sm font-medium text-foreground capitalize">Tutor</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Specialization</span><span className="text-sm font-medium text-foreground capitalize">{tutorData.specialization || "—"}</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Available Days</span><span className="text-sm font-medium text-foreground">{tutorData.availableDays.join(", ") || "—"}</span></div>
          </div>
        </div>
      );
    }

    // ---- Admin Steps ----
    if (role === "admin") {
      if (currentRoleStep.id === "personal") return (
        <div className="space-y-5">
          <div><h2 className="font-display text-xl font-bold text-foreground mb-1">Personal Information</h2><p className="text-sm text-muted-foreground">Tell us about yourself</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="block text-sm font-medium text-foreground mb-1">Full Name *</label><Input value={adminData.fullName} onChange={(e) => setAdminData(p => ({...p, fullName: e.target.value}))} placeholder="Your full name" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Email *</label><Input type="email" value={adminData.email} onChange={(e) => setAdminData(p => ({...p, email: e.target.value}))} placeholder="your@email.com" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Phone</label><Input value={adminData.phone} onChange={(e) => setAdminData(p => ({...p, phone: e.target.value}))} placeholder="+1 234 567 890" /></div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Position</label><Input value={adminData.position} onChange={(e) => setAdminData(p => ({...p, position: e.target.value}))} placeholder="e.g., Vice Principal" /></div>
          </div>
        </div>
      );
      if (currentRoleStep.id === "role-details") return (
        <div className="space-y-5">
          <div><h2 className="font-display text-xl font-bold text-foreground mb-1">Role Details</h2><p className="text-sm text-muted-foreground">Configure your administrative access</p></div>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-foreground mb-1">Department</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={adminData.department} onChange={(e) => setAdminData(p => ({...p, department: e.target.value}))}>
                <option value="">Select</option><option value="operations">Operations</option><option value="curriculum">Curriculum</option><option value="student-affairs">Student Affairs</option><option value="finance">Finance</option><option value="general">General Administration</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium text-foreground mb-1">Previous Experience</label><textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]" value={adminData.previousExperience} onChange={(e) => setAdminData(p => ({...p, previousExperience: e.target.value}))} placeholder="Describe your admin experience..." /></div>
            <div><label className="block text-sm font-medium text-foreground mb-2">Requested Permissions</label>
              <div className="space-y-2">
                {["Manage Students", "Manage Tutors", "View Analytics", "Manage Billing", "Edit Settings"].map(perm => (
                  <label key={perm} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg cursor-pointer hover:border-primary/30 transition-colors">
                    <input type="checkbox" className="w-4 h-4 accent-primary" checked={adminData.permissions.includes(perm)} onChange={(e) => setAdminData(p => ({...p, permissions: e.target.checked ? [...p.permissions, perm] : p.permissions.filter(pp => pp !== perm)}))} />
                    <span className="text-sm text-foreground">{perm}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
      if (currentRoleStep.id === "setup") return (
        <div className="space-y-5">
          <div><h2 className="font-display text-xl font-bold text-foreground mb-1">Final Setup</h2><p className="text-sm text-muted-foreground">Review and confirm your details</p></div>
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Academy</span><span className="text-sm font-medium text-foreground">{inviteData.academy.name}</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Role</span><span className="text-sm font-medium text-foreground capitalize">Admin</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Department</span><span className="text-sm font-medium text-foreground capitalize">{adminData.department || "—"}</span></div>
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Permissions</span><span className="text-sm font-medium text-foreground">{adminData.permissions.length} selected</span></div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => setCurrentStep(currentStep > 2 ? currentStep - 1 : 1)} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(inviteData.role)}`}>
              {inviteData.role} onboarding
            </span>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 py-4 sm:px-6 lg:px-8 border-b border-border bg-muted/30">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {roleSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < roleStepIndex;
            const isCurrent = index === roleStepIndex;
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isCompleted ? "bg-primary text-primary-foreground" : isCurrent ? "bg-primary/20 text-primary border-2 border-primary" : "bg-muted text-muted-foreground"}`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`mt-1 text-xs font-medium hidden sm:block ${isCurrent ? "text-foreground" : "text-muted-foreground"}`}>{step.title}</span>
                </div>
                {index < roleSteps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${index < roleStepIndex ? "bg-primary" : "bg-border"}`} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">{renderStepContent()}</div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-4 sm:px-6 lg:px-8 border-t border-border bg-background">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Step {roleStepIndex + 1} of {roleSteps.length}</span>
          <Button onClick={() => { if (roleStepIndex < roleSteps.length - 1) setCurrentStep(currentStep + 1); else handleComplete(); }} disabled={!canProceed()} className="bg-gradient-hero hover:opacity-90">
            {roleStepIndex === roleSteps.length - 1 ? "Complete & Join" : "Continue"} {roleStepIndex < roleSteps.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default InviteCode;
