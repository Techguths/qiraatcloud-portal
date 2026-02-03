import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Key, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InviteCode = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inviteCode, setInviteCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteCode.trim()) {
      toast({
        title: "Please enter an invite code",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate validation (in real app, this would be an API call)
    const isValid = inviteCode.length >= 6;

    if (isValid) {
      toast({
        title: "Welcome to the academy!",
        description: "Your invite code has been verified successfully.",
      });
      navigate("/");
    } else {
      toast({
        title: "Invalid invite code",
        description: "Please check your code and try again.",
        variant: "destructive",
      });
    }
    
    setIsVerifying(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center">
              <Key className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Enter your invite code
            </h1>
            <p className="text-muted-foreground">
              You should have received an invite code from your academy administrator or teacher.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="invite-code" className="block text-sm font-medium text-foreground mb-2">
                Invite Code
              </label>
              <Input
                id="invite-code"
                type="text"
                placeholder="e.g., ABC123XYZ"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                className="text-center text-lg tracking-widest font-mono"
                maxLength={12}
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                The code is case-insensitive
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-hero hover:opacity-90"
              size="lg"
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Join Academy"
              )}
            </Button>
          </form>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an invite code?{" "}
              <Link to="/onboarding/student" className="text-primary hover:underline">
                Browse academies
              </Link>{" "}
              or{" "}
              <Link to="/onboarding/create-academy" className="text-primary hover:underline">
                create your own
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InviteCode;
