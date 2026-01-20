import { useState } from "react";
import { Check, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewFormModal from "./ReviewFormModal";

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

            {/* Write Review Button */}
            <Button 
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => setIsReviewModalOpen(true)}
            >
              <PenLine className="w-5 h-5 mr-2" />
              Write a Review
            </Button>
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

      {/* Review Form Modal */}
      <ReviewFormModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
      />
    </section>
  );
};

export default WhyChooseSection;
