import { UserPlus, Settings, BookOpen, BarChart3 } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Portal",
    description: "Sign up and set up your Qur'an academy portal in minutes. Add your branding and customize settings.",
  },
  {
    step: "02",
    icon: Settings,
    title: "Add Your Team",
    description: "Invite tutors to your academy. Assign permissions and let them manage their own students.",
  },
  {
    step: "03",
    icon: BookOpen,
    title: "Start Teaching",
    description: "Schedule sessions, track attendance, and monitor progress. Everything in one dashboard.",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Track & Grow",
    description: "View detailed analytics, generate reports, and scale your academy with confidence.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Simple Setup
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How <span className="text-gradient-gold">QiraatCloud</span> Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get started in minutes. No technical skills required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="relative group">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full bg-card border border-border flex items-center justify-center group-hover:border-primary/30 transition-all duration-300 group-hover:shadow-elevated">
                    <item.icon className="w-12 h-12 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                    <span className="text-foreground font-bold text-sm">{item.step}</span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
