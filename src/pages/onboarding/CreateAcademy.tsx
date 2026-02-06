import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Building2, User, Palette, CreditCard, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AcademyInfoStep from "./steps/AcademyInfoStep";
import OwnerInfoStep from "./steps/OwnerInfoStep";
import BrandingStep from "./steps/BrandingStep";
import SubscriptionStep from "./steps/SubscriptionStep";
import SettingsStep from "./steps/SettingsStep";

type Step = 1 | 2 | 3 | 4 | 5;

interface StudentPlan {
  id: string;
  name: string;
  price: string;
  duration: string;
  features: string[];
}

const CreateAcademy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Academy Info
  const [academyName, setAcademyName] = useState("");
  const [academyDescription, setAcademyDescription] = useState("");
  const [academyLocation, setAcademyLocation] = useState("");
  const [academyEmail, setAcademyEmail] = useState("");
  const [academyPhone, setAcademyPhone] = useState("");
  const [academyWebsite, setAcademyWebsite] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  // Step 2: Owner Info
  const [ownerName, setOwnerName] = useState("");
  const [ownerTitle, setOwnerTitle] = useState("");
  const [ownerBio, setOwnerBio] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [certificationNumber, setCertificationNumber] = useState("");
  const [issuingAuthority, setIssuingAuthority] = useState("");
  const [ownerPhotoPreview, setOwnerPhotoPreview] = useState<string | null>(null);
  const [certificatePreview, setCertificatePreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);

  // Step 3: Branding
  const [primaryColor, setPrimaryColor] = useState("emerald");
  const [secondaryColor, setSecondaryColor] = useState("cream");
  const [accentColor, setAccentColor] = useState("gold");
  const [fontStyle, setFontStyle] = useState("classic");

  // Step 4: Subscription
  const [platformPlan, setPlatformPlan] = useState("starter");
  const [studentPlans, setStudentPlans] = useState<StudentPlan[]>([
    {
      id: "default-basic",
      name: "Basic",
      price: "49",
      duration: "month",
      features: ["Weekly group sessions", "Progress tracking", "Basic support"],
    },
    {
      id: "default-premium",
      name: "Premium",
      price: "99",
      duration: "month",
      features: ["1-on-1 sessions twice weekly", "Priority scheduling", "Detailed progress reports", "Certificate upon completion"],
    },
  ]);

  // Step 5: Settings
  const [maxStudents, setMaxStudents] = useState("100");
  const [enableEnrollment, setEnableEnrollment] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [requireApproval, setRequireApproval] = useState(true);
  const [allowPublicProfile, setAllowPublicProfile] = useState(true);
  const [timezone, setTimezone] = useState("UTC");

  const steps = [
    { number: 1, title: "Academy", icon: Building2 },
    { number: 2, title: "Owner", icon: User },
    { number: 3, title: "Branding", icon: Palette },
    { number: 4, title: "Plans", icon: CreditCard },
    { number: 5, title: "Settings", icon: Settings },
  ];

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: (value: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: Step): boolean => {
    switch (step) {
      case 1:
        if (!academyName.trim()) {
          toast({ title: "Academy name is required", variant: "destructive" });
          return false;
        }
        if (!academyEmail.trim()) {
          toast({ title: "Contact email is required", variant: "destructive" });
          return false;
        }
        return true;
      case 2:
        if (!ownerName.trim()) {
          toast({ title: "Owner name is required", variant: "destructive" });
          return false;
        }
        if (!ownerEmail.trim()) {
          toast({ title: "Owner email is required", variant: "destructive" });
          return false;
        }
        return true;
      case 3:
      case 4:
      case 5:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as Step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Academy created successfully!",
      description: `Welcome to ${academyName}. Your academy is ready to accept students.`,
    });

    setIsLoading(false);
    navigate("/dashboard/academy");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8 border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">Q</span>
            </div>
            <span className="font-display font-semibold text-foreground hidden sm:block">
              Create Academy
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of 5
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="px-4 py-6 sm:px-6 lg:px-8 bg-secondary/30 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= step.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs sm:text-sm mt-2 font-medium text-center ${
                      currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 sm:mx-4 rounded-full ${
                      currentStep > step.number ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {currentStep === 1 && (
            <AcademyInfoStep
              academyName={academyName}
              setAcademyName={setAcademyName}
              academyDescription={academyDescription}
              setAcademyDescription={setAcademyDescription}
              academyLocation={academyLocation}
              setAcademyLocation={setAcademyLocation}
              academyEmail={academyEmail}
              setAcademyEmail={setAcademyEmail}
              academyPhone={academyPhone}
              setAcademyPhone={setAcademyPhone}
              academyWebsite={academyWebsite}
              setAcademyWebsite={setAcademyWebsite}
              logoPreview={logoPreview}
              handleLogoUpload={(e) => handleFileUpload(e, setLogoPreview)}
              coverPreview={coverPreview}
              handleCoverUpload={(e) => handleFileUpload(e, setCoverPreview)}
            />
          )}

          {currentStep === 2 && (
            <OwnerInfoStep
              ownerName={ownerName}
              setOwnerName={setOwnerName}
              ownerTitle={ownerTitle}
              setOwnerTitle={setOwnerTitle}
              ownerBio={ownerBio}
              setOwnerBio={setOwnerBio}
              ownerEmail={ownerEmail}
              setOwnerEmail={setOwnerEmail}
              ownerPhone={ownerPhone}
              setOwnerPhone={setOwnerPhone}
              certificationNumber={certificationNumber}
              setCertificationNumber={setCertificationNumber}
              issuingAuthority={issuingAuthority}
              setIssuingAuthority={setIssuingAuthority}
              ownerPhotoPreview={ownerPhotoPreview}
              handleOwnerPhotoUpload={(e) => handleFileUpload(e, setOwnerPhotoPreview)}
              certificatePreview={certificatePreview}
              handleCertificateUpload={(e) => handleFileUpload(e, setCertificatePreview)}
              signaturePreview={signaturePreview}
              handleSignatureUpload={(e) => handleFileUpload(e, setSignaturePreview)}
            />
          )}

          {currentStep === 3 && (
            <BrandingStep
              primaryColor={primaryColor}
              setPrimaryColor={setPrimaryColor}
              secondaryColor={secondaryColor}
              setSecondaryColor={setSecondaryColor}
              accentColor={accentColor}
              setAccentColor={setAccentColor}
              fontStyle={fontStyle}
              setFontStyle={setFontStyle}
              logoPreview={logoPreview}
              academyName={academyName}
              academyLocation={academyLocation}
            />
          )}

          {currentStep === 4 && (
            <SubscriptionStep
              platformPlan={platformPlan}
              setPlatformPlan={setPlatformPlan}
              studentPlans={studentPlans}
              setStudentPlans={setStudentPlans}
            />
          )}

          {currentStep === 5 && (
            <SettingsStep
              maxStudents={maxStudents}
              setMaxStudents={setMaxStudents}
              enableEnrollment={enableEnrollment}
              setEnableEnrollment={setEnableEnrollment}
              enableNotifications={enableNotifications}
              setEnableNotifications={setEnableNotifications}
              requireApproval={requireApproval}
              setRequireApproval={setRequireApproval}
              allowPublicProfile={allowPublicProfile}
              setAllowPublicProfile={setAllowPublicProfile}
              timezone={timezone}
              setTimezone={setTimezone}
              academyName={academyName}
              academyLocation={academyLocation}
              ownerName={ownerName}
              platformPlan={platformPlan}
              studentPlansCount={studentPlans.length}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-gradient-hero hover:opacity-90"
              >
                {isLoading ? "Creating Academy..." : "Launch Academy"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateAcademy;
