import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, Calendar, Layout, Settings, LogOut, Bell, Search, Menu, X, GraduationCap, Shield } from "lucide-react";
import AcademyAdminOverview from "./academy-admin/AcademyAdminOverview";
import AcademyAdminClasses from "./academy-admin/AcademyAdminClasses";
import AcademyAdminStudents from "./academy-admin/AcademyAdminStudents";
import AcademyAdminSchedule from "./academy-admin/AcademyAdminSchedule";
import AcademyAdminTutors from "./academy-admin/AcademyAdminTutors";
import AcademyAdminSettings from "./academy-admin/AcademyAdminSettings";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: Layout },
  { id: "classes", label: "Class Management", icon: BookOpen },
  { id: "students", label: "Student Roster", icon: Users },
  { id: "tutors", label: "Tutor Management", icon: GraduationCap },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "settings", label: "Settings", icon: Settings },
];

const AcademyAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <AcademyAdminOverview />;
      case "classes": return <AcademyAdminClasses />;
      case "students": return <AcademyAdminStudents />;
      case "tutors": return <AcademyAdminTutors />;
      case "schedule": return <AcademyAdminSchedule />;
      case "settings": return <AcademyAdminSettings />;
      default: return <AcademyAdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display font-bold text-foreground text-sm">QiraatCloud</h2>
              <p className="text-xs text-muted-foreground">Academy Admin</p>
            </div>
          </Link>
        </div>

        <div className="p-4 mx-3 mt-4 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">Al-Noor Academy</p>
            </div>
          </div>
        </div>

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

        <div className="p-3 border-t border-border">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all">
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
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
        <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-lg border-b border-border px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 rounded-lg hover:bg-secondary" onClick={() => setIsMobileSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-display text-lg font-bold text-foreground">Academy Admin</h1>
                <p className="text-xs text-muted-foreground">Al-Noor Qur'an Academy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none w-32 lg:w-48" />
              </div>
              <button className="relative p-2 rounded-lg hover:bg-secondary">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AcademyAdminDashboard;
