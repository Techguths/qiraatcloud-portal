import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, MapPin, Users, Star, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Academy {
  id: string;
  name: string;
  location: string;
  students: number;
  rating: number;
  description: string;
  color: string;
}

const mockAcademies: Academy[] = [
  {
    id: "1",
    name: "Al-Noor Qur'an Academy",
    location: "London, UK",
    students: 245,
    rating: 4.9,
    description: "Premier Qur'an education with certified instructors specializing in Tajweed and Hifz.",
    color: "bg-primary",
  },
  {
    id: "2",
    name: "Bayyinah Institute",
    location: "Dallas, USA",
    students: 1200,
    rating: 4.8,
    description: "Learn Arabic and understand the Qur'an with our comprehensive curriculum.",
    color: "bg-accent",
  },
  {
    id: "3",
    name: "Madrasah Al-Hikmah",
    location: "Dubai, UAE",
    students: 430,
    rating: 4.7,
    description: "Traditional Islamic education blended with modern teaching methods.",
    color: "bg-blue-600",
  },
  {
    id: "4",
    name: "Qur'an Academy Online",
    location: "Online",
    students: 3500,
    rating: 4.6,
    description: "Flexible online Qur'an classes with one-on-one sessions available 24/7.",
    color: "bg-purple-600",
  },
  {
    id: "5",
    name: "Madinah Qur'an Institute",
    location: "Cairo, Egypt",
    students: 890,
    rating: 4.9,
    description: "Authentic Qur'anic studies with scholars trained in Madinah methodology.",
    color: "bg-rose-600",
  },
];

const StudentRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAcademy, setSelectedAcademy] = useState<Academy | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  const filteredAcademies = mockAcademies.filter(
    (academy) =>
      academy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      academy.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinAcademy = async () => {
    if (!selectedAcademy) return;
    
    setIsJoining(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Request sent!",
      description: `Your enrollment request has been sent to ${selectedAcademy.name}.`,
    });
    
    setIsJoining(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">Q</span>
            </div>
            <span className="font-display font-semibold text-foreground hidden sm:block">
              Find an Academy
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Title & Search */}
          <div className="mb-8">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Find your academy
            </h1>
            <p className="text-muted-foreground mb-6">
              Browse and join an academy to start your Qur'an learning journey
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Academies Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAcademies.map((academy) => (
              <button
                key={academy.id}
                onClick={() => setSelectedAcademy(academy)}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 ${
                  selectedAcademy?.id === academy.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-soft"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${academy.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <span className="text-lg font-bold text-white">
                      {academy.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-foreground truncate">
                      {academy.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{academy.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                  {academy.description}
                </p>

                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{academy.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">{academy.rating}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredAcademies.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No academies found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search query or browse all academies
              </p>
            </div>
          )}

          {/* Selected Academy Action */}
          {selectedAcademy && (
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 sm:p-6">
              <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 ${selectedAcademy.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <span className="text-sm font-bold text-white">
                      {selectedAcademy.name.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {selectedAcademy.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedAcademy.students.toLocaleString()} students
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleJoinAcademy}
                  disabled={isJoining}
                  className="bg-gradient-hero hover:opacity-90 flex-shrink-0"
                >
                  {isJoining ? "Sending Request..." : "Request to Join"}
                </Button>
              </div>
            </div>
          )}

          {/* Spacer for fixed bottom bar */}
          {selectedAcademy && <div className="h-24" />}
        </div>
      </main>
    </div>
  );
};

export default StudentRegistration;
