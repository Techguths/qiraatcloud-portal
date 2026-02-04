import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ImageIcon } from "lucide-react";

interface AcademyInfoStepProps {
  academyName: string;
  setAcademyName: (value: string) => void;
  academyDescription: string;
  setAcademyDescription: (value: string) => void;
  academyLocation: string;
  setAcademyLocation: (value: string) => void;
  academyEmail: string;
  setAcademyEmail: (value: string) => void;
  academyPhone: string;
  setAcademyPhone: (value: string) => void;
  academyWebsite: string;
  setAcademyWebsite: (value: string) => void;
  logoPreview: string | null;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  coverPreview: string | null;
  handleCoverUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AcademyInfoStep = ({
  academyName,
  setAcademyName,
  academyDescription,
  setAcademyDescription,
  academyLocation,
  setAcademyLocation,
  academyEmail,
  setAcademyEmail,
  academyPhone,
  setAcademyPhone,
  academyWebsite,
  setAcademyWebsite,
  logoPreview,
  handleLogoUpload,
  coverPreview,
  handleCoverUpload,
}: AcademyInfoStepProps) => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Academy Information
        </h2>
        <p className="text-muted-foreground">
          Provide your academy's basic details and visual identity.
        </p>
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Cover Image
        </label>
        <div className="relative">
          <div className="w-full h-40 bg-muted rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Recommended: 1200 x 400 pixels
                </p>
              </div>
            )}
          </div>
          <label className="absolute bottom-3 right-3 cursor-pointer">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-background/90 backdrop-blur-sm text-foreground rounded-lg hover:bg-background transition-colors text-sm font-medium border border-border">
              <Upload className="w-4 h-4" />
              Upload Cover
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Academy Logo <span className="text-destructive">*</span>
        </label>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-muted rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Upload className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div>
            <label className="cursor-pointer">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium">
                <Upload className="w-4 h-4" />
                Upload Logo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
            <p className="text-xs text-muted-foreground mt-2">
              PNG, JPG up to 2MB (Square recommended)
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Academy Name <span className="text-destructive">*</span>
          </label>
          <Input
            placeholder="e.g., Al-Noor Qur'an Academy"
            value={academyName}
            onChange={(e) => setAcademyName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            About Your Academy <span className="text-destructive">*</span>
          </label>
          <Textarea
            placeholder="Tell students what makes your academy special, your teaching methodology, and experience..."
            value={academyDescription}
            onChange={(e) => setAcademyDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <Input
              placeholder="City, Country"
              value={academyLocation}
              onChange={(e) => setAcademyLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            <Input
              placeholder="+1 234 567 8900"
              value={academyPhone}
              onChange={(e) => setAcademyPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Contact Email <span className="text-destructive">*</span>
            </label>
            <Input
              type="email"
              placeholder="contact@academy.com"
              value={academyEmail}
              onChange={(e) => setAcademyEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Website
            </label>
            <Input
              type="url"
              placeholder="https://www.youracademy.com"
              value={academyWebsite}
              onChange={(e) => setAcademyWebsite(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyInfoStep;
