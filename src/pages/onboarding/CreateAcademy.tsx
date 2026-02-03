import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Check, Building2, Palette, Settings, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Step = 1 | 2 | 3;

const CreateAcademy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Basic Info
  const [academyName, setAcademyName] = useState("");
  const [academyDescription, setAcademyDescription] = useState("");
  const [academyLocation, setAcademyLocation] = useState("");
  const [academyEmail, setAcademyEmail] = useState("");
  const [academyPhone, setAcademyPhone] = useState("");

  // Step 2: Branding
  const [selectedColor, setSelectedColor] = useState("emerald");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Step 3: Settings
  const [maxStudents, setMaxStudents] = useState("100");
  const [enableEnrollment, setEnableEnrollment] = useState(true);

  const steps = [
    { number: 1, title: "Academy Info", icon: Building2 },
    { number: 2, title: "Branding", icon: Palette },
    { number: 3, title: "Settings", icon: Settings },
  ];

  const colors = [
    { name: "emerald", class: "bg-primary" },
    { name: "gold", class: "bg-accent" },
    { name: "blue", class: "bg-blue-600" },
    { name: "purple", class: "bg-purple-600" },
    { name: "rose", class: "bg-rose-600" },
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      if (!academyName.trim()) {
        toast({ title: "Academy name is required", variant: "destructive" });
        return;
      }
    }
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Academy created successfully!",
      description: `Welcome to ${academyName}. Your academy is ready to go.`,
    });
    
    setIsLoading(false);
    navigate("/");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
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
              Create Academy
            </span>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="px-4 py-8 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= step.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`text-sm mt-2 font-medium ${
                      currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-24 lg:w-32 h-1 mx-4 rounded-full ${
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
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-up">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Tell us about your academy
                </h2>
                <p className="text-muted-foreground">
                  This information will help students find and learn about your academy.
                </p>
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
                    Description
                  </label>
                  <Textarea
                    placeholder="Tell students what makes your academy special..."
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

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Contact Email
                  </label>
                  <Input
                    type="email"
                    placeholder="contact@academy.com"
                    value={academyEmail}
                    onChange={(e) => setAcademyEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Branding */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-up">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Customize your academy's look
                </h2>
                <p className="text-muted-foreground">
                  Add your logo and choose a theme color for your academy.
                </p>
              </div>

              <div className="space-y-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Academy Logo
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-muted rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
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
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Theme Color */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Theme Color
                  </label>
                  <div className="flex gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-12 h-12 rounded-xl ${color.class} transition-all ${
                          selectedColor === color.name
                            ? "ring-4 ring-offset-2 ring-primary scale-110"
                            : "hover:scale-105"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <p className="text-sm text-muted-foreground mb-4">Preview</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      selectedColor === "emerald" ? "bg-primary" :
                      selectedColor === "gold" ? "bg-accent" :
                      selectedColor === "blue" ? "bg-blue-600" :
                      selectedColor === "purple" ? "bg-purple-600" : "bg-rose-600"
                    }`}>
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <span className="text-2xl font-bold text-white">
                          {academyName ? academyName.charAt(0).toUpperCase() : "A"}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {academyName || "Your Academy Name"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {academyLocation || "Location"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Settings */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-up">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Configure your academy
                </h2>
                <p className="text-muted-foreground">
                  Set up enrollment preferences and capacity limits.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Maximum Students
                  </label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={maxStudents}
                    onChange={(e) => setMaxStudents(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    You can change this later in settings
                  </p>
                </div>

                <div className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Open Enrollment</h4>
                      <p className="text-sm text-muted-foreground">
                        Allow students to browse and join your academy
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEnableEnrollment(!enableEnrollment)}
                      className={`w-12 h-7 rounded-full transition-colors relative ${
                        enableEnrollment ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          enableEnrollment ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-secondary/50 rounded-xl p-6">
                  <h4 className="font-medium text-foreground mb-4">Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Academy Name</span>
                      <span className="font-medium text-foreground">{academyName || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium text-foreground">{academyLocation || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Students</span>
                      <span className="font-medium text-foreground">{maxStudents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Open Enrollment</span>
                      <span className="font-medium text-foreground">{enableEnrollment ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

            {currentStep < 3 ? (
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
                {isLoading ? "Creating Academy..." : "Create Academy"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateAcademy;
