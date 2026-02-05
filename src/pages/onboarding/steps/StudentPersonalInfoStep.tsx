import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Calendar, Phone, MapPin } from "lucide-react";

interface StudentPersonalInfoStepProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    country: string;
    city: string;
    bio: string;
    profilePhoto: string | null;
  };
  onChange: (data: Partial<StudentPersonalInfoStepProps["data"]>) => void;
}

const StudentPersonalInfoStep = ({ data, onChange }: StudentPersonalInfoStepProps) => {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ profilePhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-display text-xl font-semibold text-foreground mb-2">
          Personal Information
        </h2>
        <p className="text-muted-foreground text-sm">
          Tell us about yourself to personalize your learning experience
        </p>
      </div>

      {/* Profile Photo */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
            {data.profilePhoto ? (
              <img src={data.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
            <span className="text-primary-foreground text-lg">+</span>
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </label>
        </div>
        <span className="text-sm text-muted-foreground">Upload profile photo</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="Enter your full name"
            className="mt-1.5"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="your@email.com"
            className="mt-1.5"
          />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative mt-1.5">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+1 234 567 8900"
              className="pl-10"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <Label htmlFor="dob">Date of Birth</Label>
          <div className="relative mt-1.5">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="dob"
              type="date"
              value={data.dateOfBirth}
              onChange={(e) => onChange({ dateOfBirth: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <Label>Gender</Label>
          <Select value={data.gender} onValueChange={(value) => onChange({ gender: value })}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country">Country</Label>
          <div className="relative mt-1.5">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="country"
              value={data.country}
              onChange={(e) => onChange({ country: e.target.value })}
              placeholder="Your country"
              className="pl-10"
            />
          </div>
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="Your city"
            className="mt-1.5"
          />
        </div>

        {/* Bio */}
        <div className="sm:col-span-2">
          <Label htmlFor="bio">About You</Label>
          <Textarea
            id="bio"
            value={data.bio}
            onChange={(e) => onChange({ bio: e.target.value })}
            placeholder="Share a bit about your Qur'an learning goals and background..."
            className="mt-1.5 min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentPersonalInfoStep;
