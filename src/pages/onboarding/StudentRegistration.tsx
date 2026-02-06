import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, User, GraduationCap, CreditCard, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StudentPersonalInfoStep from "./steps/StudentPersonalInfoStep";
import StudentAcademySelectionStep, { type Academy } from "./steps/StudentAcademySelectionStep";
import StudentPricingStep from "./steps/StudentPricingStep";
import StudentAccountSetupStep from "./steps/StudentAccountSetupStep";

type RegistrationPath = "with-academy" | "join-later" | null;

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  city: string;
  bio: string;
  profilePhoto: string | null;
}

interface AccountSetup {
  displayName: string;
  timezone: string;
  language: string;
  currentLevel: string;
  learningGoal: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  classReminders: boolean;
  progressReports: boolean;
}

const StudentRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registrationPath, setRegistrationPath] = useState<RegistrationPath>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    city: "",
    bio: "",
    profilePhoto: null,
  });

  const [selectedAcademy, setSelectedAcademy] = useState<Academy | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const [accountSetup, setAccountSetup] = useState<AccountSetup>({
    displayName: "",
    timezone: "",
    language: "en",
    currentLevel: "",
    learningGoal: "",
    emailNotifications: true,
    pushNotifications: true,
    classReminders: true,
    progressReports: true,
  });

  // Steps based on path
  const getSteps = () => {
    if (registrationPath === "with-academy") {
      return [
        { id: "personal", title: "Personal Info", icon: User },
        { id: "academy", title: "Select Academy", icon: GraduationCap },
        { id: "pricing", title: "Choose Plan", icon: CreditCard },
        { id: "setup", title: "Account Setup", icon: Settings },
      ];
    }
    return [
      { id: "personal", title: "Personal Info", icon: User },
      { id: "setup", title: "Account Setup", icon: Settings },
    ];
  };

  const steps = getSteps();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Welcome aboard! 🎉",
      description: registrationPath === "with-academy"
        ? `Your enrollment request has been sent to ${selectedAcademy?.name}.`
        : "Your account has been set up. You can join an academy anytime from your dashboard.",
    });

    setIsSubmitting(false);
    navigate("/dashboard/student");
  };

  const canProceed = () => {
    if (registrationPath === null) return false;

    const stepId = steps[currentStep]?.id;

    if (stepId === "personal") {
      return personalInfo.fullName.trim() !== "" && personalInfo.email.trim() !== "";
    }
    if (stepId === "academy") {
      return selectedAcademy !== null;
    }
    if (stepId === "pricing") {
      return selectedPlan !== null;
    }
    if (stepId === "setup") {
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setRegistrationPath(null);
    }
  };

  // Path selection screen
  if (registrationPath === null) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="px-4 py-6 sm:px-6 lg:px-8 border-b border-border">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
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
                Student Registration
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
              How would you like to get started?
            </h1>
            <p className="text-muted-foreground mb-10">
              Choose your registration path based on your preference
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Join Academy Now */}
              <button
                onClick={() => setRegistrationPath("with-academy")}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-soft transition-all duration-200 text-left"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Join an Academy Now
                </h3>
                <p className="text-sm text-muted-foreground">
                  Browse academies, select a subscription plan, and start learning right away with structured guidance.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-primary font-medium">
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Join Later */}
              <button
                onClick={() => setRegistrationPath("join-later")}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-soft transition-all duration-200 text-left"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <User className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Set Up Profile First
                </h3>
                <p className="text-sm text-muted-foreground">
                  Complete your profile now and explore academies later from your dashboard at your own pace.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-accent font-medium">
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Multi-step wizard
  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">Q</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="px-4 py-6 sm:px-6 lg:px-8 border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : isCurrent
                          ? "bg-primary/20 text-primary border-2 border-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium hidden sm:block ${
                        isCurrent ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        index < currentStep ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {currentStepData.id === "personal" && (
            <StudentPersonalInfoStep
              data={personalInfo}
              onChange={(data) => setPersonalInfo((prev) => ({ ...prev, ...data }))}
            />
          )}

          {currentStepData.id === "academy" && (
            <StudentAcademySelectionStep
              selectedAcademy={selectedAcademy}
              onSelect={setSelectedAcademy}
            />
          )}

          {currentStepData.id === "pricing" && selectedAcademy && (
            <StudentPricingStep
              academy={selectedAcademy}
              selectedPlan={selectedPlan}
              onSelect={setSelectedPlan}
            />
          )}

          {currentStepData.id === "setup" && (
            <StudentAccountSetupStep
              data={accountSetup}
              onChange={(data) => setAccountSetup((prev) => ({ ...prev, ...data }))}
              withAcademy={registrationPath === "with-academy"}
            />
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="px-4 py-4 sm:px-6 lg:px-8 border-t border-border bg-background">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
          <Button
            onClick={handleNext}
            disabled={!canProceed() || isSubmitting}
            className="bg-gradient-hero hover:opacity-90"
          >
            {isSubmitting
              ? "Setting up..."
              : currentStep === steps.length - 1
              ? "Complete Setup"
              : "Continue"}
            {!isSubmitting && currentStep < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 ml-2" />
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default StudentRegistration;
