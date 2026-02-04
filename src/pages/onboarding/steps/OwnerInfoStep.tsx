import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, User, Award, FileText, PenTool } from "lucide-react";

interface OwnerInfoStepProps {
  ownerName: string;
  setOwnerName: (value: string) => void;
  ownerTitle: string;
  setOwnerTitle: (value: string) => void;
  ownerBio: string;
  setOwnerBio: (value: string) => void;
  ownerEmail: string;
  setOwnerEmail: (value: string) => void;
  ownerPhone: string;
  setOwnerPhone: (value: string) => void;
  certificationNumber: string;
  setCertificationNumber: (value: string) => void;
  issuingAuthority: string;
  setIssuingAuthority: (value: string) => void;
  ownerPhotoPreview: string | null;
  handleOwnerPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  certificatePreview: string | null;
  handleCertificateUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  signaturePreview: string | null;
  handleSignatureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OwnerInfoStep = ({
  ownerName,
  setOwnerName,
  ownerTitle,
  setOwnerTitle,
  ownerBio,
  setOwnerBio,
  ownerEmail,
  setOwnerEmail,
  ownerPhone,
  setOwnerPhone,
  certificationNumber,
  setCertificationNumber,
  issuingAuthority,
  setIssuingAuthority,
  ownerPhotoPreview,
  handleOwnerPhotoUpload,
  certificatePreview,
  handleCertificateUpload,
  signaturePreview,
  handleSignatureUpload,
}: OwnerInfoStepProps) => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Owner & Verification
        </h2>
        <p className="text-muted-foreground">
          Verify your credentials to build trust with students and parents.
        </p>
      </div>

      {/* Profile Photo & Basic Info */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Personal Information
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 bg-muted rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-border mx-auto sm:mx-0">
              {ownerPhotoPreview ? (
                <img
                  src={ownerPhotoPreview}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-muted-foreground" />
              )}
            </div>
            <label className="cursor-pointer mt-3 block text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-xs font-medium">
                <Upload className="w-3 h-3" />
                Upload Photo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleOwnerPhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Basic Info Fields */}
          <div className="flex-1 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="Sheikh Ahmad Hassan"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title / Position
                </label>
                <Input
                  placeholder="Founder & Head Teacher"
                  value={ownerTitle}
                  onChange={(e) => setOwnerTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="owner@academy.com"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  placeholder="+1 234 567 8900"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Short Bio
          </label>
          <Textarea
            placeholder="Share your background, qualifications, years of experience teaching Qur'an..."
            value={ownerBio}
            onChange={(e) => setOwnerBio(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* Certification */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Certification & Credentials
        </h3>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Certification/Ijazah Number
              </label>
              <Input
                placeholder="e.g., IJZ-2024-001234"
                value={certificationNumber}
                onChange={(e) => setCertificationNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Issuing Authority/Sheikh
              </label>
              <Input
                placeholder="e.g., Al-Azhar University"
                value={issuingAuthority}
                onChange={(e) => setIssuingAuthority(e.target.value)}
              />
            </div>
          </div>

          {/* Certificate Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Certificate/Ijazah Document
            </label>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
              {certificatePreview ? (
                <div className="space-y-3">
                  <img
                    src={certificatePreview}
                    alt="Certificate preview"
                    className="max-h-40 mx-auto rounded-lg"
                  />
                  <label className="cursor-pointer">
                    <span className="text-sm text-primary hover:underline">
                      Replace document
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleCertificateUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload your certificate or Ijazah
                  </p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium">
                    <Upload className="w-4 h-4" />
                    Choose File
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleCertificateUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF, PNG, JPG up to 5MB
                  </p>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <PenTool className="w-5 h-5 text-primary" />
          Digital Signature
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your signature will be used on official certificates issued to students.
        </p>

        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors bg-background">
          {signaturePreview ? (
            <div className="space-y-3">
              <img
                src={signaturePreview}
                alt="Signature preview"
                className="max-h-24 mx-auto"
              />
              <label className="cursor-pointer">
                <span className="text-sm text-primary hover:underline">
                  Replace signature
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <label className="cursor-pointer">
              <PenTool className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload your signature image
              </p>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium">
                <Upload className="w-4 h-4" />
                Upload Signature
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleSignatureUpload}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground mt-2">
                PNG with transparent background recommended
              </p>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerInfoStep;
