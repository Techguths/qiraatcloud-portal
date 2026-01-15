import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-[0.03]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Now in Beta — Join Free</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Teach the Qur'an.{" "}
              <span className="block text-gradient-gold">We Handle the Management.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              QiraatCloud is an all-in-one platform for Qur'an tutors and academies to manage students, tutors, and classes — all in one secure digital portal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="group">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-primary">{i}</span>
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">500+ Tutors</p>
                <p className="text-sm text-muted-foreground">Already teaching smarter</p>
              </div>
            </div>
          </div>

          {/* Right content - Dashboard mockup */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl shadow-elevated border border-border p-6 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Dashboard header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-accent/50" />
                  <div className="w-3 h-3 rounded-full bg-primary/50" />
                </div>
                <div className="flex-1 h-6 bg-muted rounded-md" />
              </div>

              {/* Dashboard content */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Students", value: "127" },
                    { label: "Tutors", value: "8" },
                    { label: "Sessions", value: "342" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 bg-muted rounded-xl text-center">
                      <p className="text-2xl font-bold text-primary font-display">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-muted rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">Hifz Progress</span>
                    <span className="text-sm text-accent font-semibold">78%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-[78%] bg-gradient-gold rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-hero rounded-xl text-primary-foreground">
                    <p className="text-sm opacity-80">Today's Classes</p>
                    <p className="text-2xl font-bold font-display">12</p>
                  </div>
                  <div className="p-4 bg-muted rounded-xl">
                    <p className="text-sm text-muted-foreground">Pending Reviews</p>
                    <p className="text-2xl font-bold text-foreground font-display">5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-elevated border border-border p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                  <span className="text-foreground font-bold text-sm">A+</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Ahmed completed Surah Al-Baqarah</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
