import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Reset link sent!",
      description: "Check your email for the password reset link.",
    });

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Back Link */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">Q</span>
            </div>
            <span className="font-display font-semibold text-xl text-foreground">
              Qiraat<span className="text-primary">Cloud</span>
            </span>
          </Link>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                  Reset your password
                </h1>
                <p className="text-muted-foreground">
                  Enter the email address associated with your account and we'll send you a link to reset your password.
                </p>
              </div>

              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-hero hover:opacity-90"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Sending reset link..." : "Send Reset Link"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Remember your password?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                  Check your email
                </h1>
                <p className="text-muted-foreground">
                  We've sent a password reset link to{" "}
                  <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>

              <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Didn't receive the email?</p>
                    <p className="text-sm text-muted-foreground">
                      Check your spam folder, or{" "}
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-primary hover:underline font-medium"
                      >
                        try again
                      </button>{" "}
                      with a different email.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Resend Reset Link
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Back to sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-10" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-md text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-6">
            Secure Account Recovery
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Your account security is our priority. We'll help you get back into your account quickly and safely.
          </p>

          <div className="space-y-4">
            {[
              { step: "1", title: "Enter your email", desc: "Provide the email linked to your account" },
              { step: "2", title: "Check your inbox", desc: "We'll send a secure reset link" },
              { step: "3", title: "Set new password", desc: "Choose a strong, unique password" },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20 flex items-center gap-4 text-left"
              >
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shrink-0">
                  <span className="font-bold text-accent-foreground">{item.step}</span>
                </div>
                <div>
                  <div className="font-medium text-primary-foreground">{item.title}</div>
                  <div className="text-sm text-primary-foreground/70">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
