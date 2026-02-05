import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, Star, GraduationCap } from "lucide-react";

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

interface StudentAcademySelectionStepProps {
  selectedAcademy: Academy | null;
  onSelect: (academy: Academy | null) => void;
}

const StudentAcademySelectionStep = ({ selectedAcademy, onSelect }: StudentAcademySelectionStepProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAcademies = mockAcademies.filter(
    (academy) =>
      academy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      academy.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-display text-xl font-semibold text-foreground mb-2">
          Choose Your Academy
        </h2>
        <p className="text-muted-foreground text-sm">
          Select an academy to view their programs and subscription options
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Academies Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredAcademies.map((academy) => (
          <button
            key={academy.id}
            onClick={() => onSelect(selectedAcademy?.id === academy.id ? null : academy)}
            className={`text-left p-4 rounded-xl border transition-all duration-200 ${
              selectedAcademy?.id === academy.id
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-border bg-card hover:border-primary/30 hover:shadow-soft"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 ${academy.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <span className="text-sm font-bold text-white">
                  {academy.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-foreground text-sm truncate">
                  {academy.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{academy.location}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
              {academy.description}
            </p>

            <div className="flex items-center gap-3 mt-3 text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                <span>{academy.students.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-accent">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-medium">{academy.rating}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredAcademies.length === 0 && (
        <div className="text-center py-8">
          <GraduationCap className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-display text-base font-semibold text-foreground mb-1">
            No academies found
          </h3>
          <p className="text-muted-foreground text-sm">
            Try adjusting your search query
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentAcademySelectionStep;
export type { Academy };
