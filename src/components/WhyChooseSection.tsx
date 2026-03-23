import { useState } from "react";
import { Check, PenLine, Rocket, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReviewFormModal from "./ReviewFormModal";
import { toast } from "sonner";

const reasons = [
  "Built specifically for Qur'an teaching",
  "Supports tutor hierarchies",
  "Simple for tutors, powerful for admins",
  "No technical skills required",
  "Scales from 5 students to 5,000",
  "Secure and GDPR compliant",
];

const WhyChooseSection = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistForm, setWaitlistForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistForm.name || !waitlistForm.email || !waitlistForm.role) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSubmitted(true);
    toast.success("You've been added to the waitlist!");
  };

  const resetWaitlist = () => {
    setIsWaitlistOpen(false);
    setIsSubmitted(false);
    setWaitlistForm({ name: "", email: "", phone: "", role: "" });
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 geometric-pattern opacity-10" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full mb-6">
              <span className="text-sm font-medium text-primary-foreground">Why Choose Us</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Why Choose{" "}
              <span className="text-accent">QiraatCloud?</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join Qur'an tutors and academies who are moving from spreadsheets and WhatsApp 
              to a professional Qur'an teaching platform.
            </p>

            {/* Reasons Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <span className="text-primary-foreground font-medium">{reason}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => setIsWaitlistOpen(true)}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Join the Waitlist
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setIsReviewModalOpen(true)}
              >
                <PenLine className="w-5 h-5 mr-2" />
                Write a Review
              </Button>
            </div>
          </div>

          {/* Right Content - Testimonial */}
          <div className="relative">
            <div className="bg-primary-foreground rounded-2xl p-8 shadow-elevated">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-accent-foreground">S</span>
                </div>
                <div>
                  <div className="font-display text-xl font-semibold text-foreground">
                    Sheikh Abdullah Yusuf
                  </div>
                  <div className="text-muted-foreground">Founder, Global Hifz Institute</div>
                </div>
              </div>
              <blockquote className="text-lg text-foreground leading-relaxed italic">
                "We went from managing 50 students with chaos to 500 students with complete control. 
                QiraatCloud didn't just solve our problems—it transformed how we think about 
                Qur'an education delivery."
              </blockquote>
              <div className="mt-6 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-accent rounded-full" />
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Waitlist Dialog */}
      <Dialog open={isWaitlistOpen} onOpenChange={resetWaitlist}>
        <DialogContent className="sm:max-w-md">
          {!isSubmitted ? (
            <>
              <DialogHeader>
                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <DialogTitle className="text-center text-xl">Join the QiraatCloud Waitlist</DialogTitle>
                <DialogDescription className="text-center">
                  Be the first to know when we launch. Get early access and exclusive updates.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleWaitlistSubmit} className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="waitlist-name">Full Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="waitlist-name"
                    placeholder="Enter your full name"
                    value={waitlistForm.name}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waitlist-email">Email Address <span className="text-destructive">*</span></Label>
                  <Input
                    id="waitlist-email"
                    type="email"
                    placeholder="you@example.com"
                    value={waitlistForm.email}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waitlist-phone">Phone Number</Label>
                  <Input
                    id="waitlist-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={waitlistForm.phone}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waitlist-role">I am a... <span className="text-destructive">*</span></Label>
                  <Select
                    value={waitlistForm.role}
                    onValueChange={(value) => setWaitlistForm({ ...waitlistForm, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="tutor">Tutor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter className="pt-2">
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Rocket className="w-4 h-4 mr-2" />
                    Join Waitlist
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-accent" />
              </div>
              <DialogTitle className="text-xl">You're on the list! 🎉</DialogTitle>
              <DialogDescription>
                Thanks, <span className="font-semibold text-foreground">{waitlistForm.name}</span>! 
                We'll notify you at <span className="font-semibold text-foreground">{waitlistForm.email}</span> when QiraatCloud is ready.
              </DialogDescription>
              <Button onClick={resetWaitlist} variant="outline" className="mt-2">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Form Modal */}
      <ReviewFormModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
      />
    </section>
  );
};

export default WhyChooseSection;
