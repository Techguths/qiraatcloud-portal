import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Built specifically for Qur'an teaching",
  "Supports tutor hierarchies",
  "Simple for tutors, powerful for admins",
  "No technical skills required",
  "Scales from 5 students to 5,000",
  "24/7 customer support",
];

const CTASection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 geometric-pattern opacity-10" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
              <span className="text-primary-foreground/80 ml-2">Trusted by 500+ tutors</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Why Choose <span className="text-accent">QiraatCloud?</span>
            </h2>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-primary-foreground/90 text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-primary-foreground/20">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Start Teaching. We'll Handle the System.
            </h3>
            <p className="text-primary-foreground/80 mb-8">
              Join Qur'an tutors and academies who are moving from spreadsheets and WhatsApp to a professional teaching platform.
            </p>

            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button variant="hero" size="lg" className="w-full">
                Get Early Access — Free
              </Button>
            </form>

            <p className="text-sm text-primary-foreground/60 mt-4 text-center">
              No credit card required. Start free, upgrade anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
