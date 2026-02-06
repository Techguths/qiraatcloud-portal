import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, Calendar, BarChart3, Settings, LogOut, Bell, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AcademyOverview from "./academy/AcademyOverview";
import AcademyStudents from "./academy/AcademyStudents";
import AcademySchedule from "./academy/AcademySchedule";
import AcademyAnalytics from "./academy/AcademyAnalytics";
import AcademySettings from "./academy/AcademySettings";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "students", label: "Students", icon: Users },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

// Mock academy data from onboarding
const mockAcademyData = {
  name: "Al-Noor Qur'an Academy",
  description: "A premier online Qur'an academy offering personalized Hifz and Tajweed programs for students worldwide.",
  location: "London, UK",
  email: "contact@alnoor-academy.com",
  phone: "+44 20 1234 5678",
  website: "https://alnoor-academy.com",
  owner: {
    name: "Sheikh Ahmad Al-Farsi",
    title: "Founder & Head Teacher",
    email: "sheikh.ahmad@alnoor-academy.com",
    certificationNumber: "IJZ-2024-001234",
    issuingAuthority: "Al-Azhar University",
  },
  branding: {
    primaryColor: "emerald",
    secondaryColor: "cream",
    accentColor: "gold",
    fontStyle: "classic",
  },
  subscription: {
    plan: "professional",
    studentPlans: [
      { id: "1", name: "Basic", price: "49", duration: "month", features: ["Weekly group sessions", "Progress tracking", "Basic support"] },
      { id: "2", name: "Premium", price: "99", duration: "month", features: ["1-on-1 sessions twice weekly", "Priority scheduling", "Detailed reports", "Certificate"] },
      { id: "3", name: "Intensive", price: "149", duration: "month", features: ["Daily 1-on-1 sessions", "Dedicated tutor", "Full curriculum", "Priority support", "Certificate"] },
    ],
  },
  settings: {
    maxStudents: "100",
    enableEnrollment: true,
    requireApproval: true,
    allowPublicProfile: true,
    enableNotifications: true,
    timezone: "Europe/London",
  },
};

const AcademyDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AcademyOverview academy={mockAcademyData} />;
      case "students":
        return <AcademyStudents />;
      case "schedule":
        return <AcademySchedule />;
      case "analytics":
        return <AcademyAnalytics />;
      case "settings":
        return <AcademySettings academy={mockAcademyData} />;
      default:
        return <AcademyOverview academy={mockAcademyData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display font-bold text-foreground text-sm">QiraatCloud</h2>
              <p className="text-xs text-muted-foreground">Academy Portal</p>
            </div>
          </Link>
        </div>

        {/* Owner Info */}
        <div className="p-4 mx-3 mt-4 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-sm font-bold text-accent-foreground">SA</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{mockAcademyData.owner.name}</p>
              <p className="text-xs text-muted-foreground truncate">{mockAcademyData.owner.title}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setIsMobileSidebarOpen(false)} />
          <aside className="relative w-72 h-full bg-card shadow-elevated flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-sm">QiraatCloud</span>
              </div>
              <button onClick={() => setIsMobileSidebarOpen(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMobileSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-lg border-b border-border px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-secondary"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-display text-lg font-bold text-foreground">{mockAcademyData.name}</h1>
                <p className="text-xs text-muted-foreground">{mockAcademyData.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm outline-none w-32 lg:w-48"
                />
              </div>
              <button className="relative p-2 rounded-lg hover:bg-secondary">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AcademyDashboard;
