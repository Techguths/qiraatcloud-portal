import { BookOpen, Users, Calendar, BarChart3, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Hifz & Tajweed Tracking",
    description: "Track memorization progress, revision consistency, and Tajweed proficiency for every student.",
  },
  {
    icon: Users,
    title: "Tutor & Student Management",
    description: "Create multiple tutor accounts, assign students, and control permissions from one dashboard.",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Schedule recurring or one-time sessions, manage availability, and track attendance automatically.",
  },
  {
    icon: BarChart3,
    title: "Progress Reports",
    description: "Generate detailed reports on pages covered, surahs memorized, and learning milestones.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security. Privacy-first, always.",
  },
  {
    icon: Globe,
    title: "Access Anywhere",
    description: "Fully responsive on mobile, tablet, and desktop. Teach from anywhere in the world.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Powerful Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to <span className="text-gradient-gold">Teach Better</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Designed specifically for Qur'an teaching workflows — from Hifz tracking to session scheduling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-elevated"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
