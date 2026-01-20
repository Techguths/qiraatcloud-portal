import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Users, Globe, Heart, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const values = [
  {
    icon: BookOpen,
    title: "Qur'an First",
    description: "Every feature we build is designed with authentic Qur'an teaching methodologies in mind.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "We listen to tutors and academies to continuously improve our platform.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Making quality Qur'an education management accessible worldwide.",
  },
  {
    icon: Heart,
    title: "Purpose Led",
    description: "Our mission is to serve the Qur'an teaching community with excellence.",
  },
];

const team = [
  {
    name: "Dr. Ahmad Hassan",
    role: "Founder & CEO",
    bio: "Former Qur'an academy director with 15 years of experience in Islamic education.",
    initial: "A",
  },
  {
    name: "Sarah Rahman",
    role: "Head of Product",
    bio: "EdTech specialist passionate about making technology serve Islamic learning.",
    initial: "S",
  },
  {
    name: "Omar Malik",
    role: "Lead Engineer",
    bio: "Full-stack developer dedicated to building reliable, secure platforms.",
    initial: "O",
  },
  {
    name: "Ustadha Fatima Ali",
    role: "Education Advisor",
    bio: "Certified Qur'an teacher ensuring our platform meets real teaching needs.",
    initial: "F",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-10" />
        <div className="container relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About QiraatCloud
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            We're on a mission to empower Qur'an educators worldwide with modern, 
            purpose-built technology that honors the sacred nature of their work.
          </p>
        </div>
      </header>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-sm font-medium text-primary">Our Story</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Born from Real Teaching Experience
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  QiraatCloud was founded in 2023 by Dr. Ahmad Hassan, a former Qur'an academy 
                  director who experienced firsthand the challenges of managing students, tutors, 
                  and classes using spreadsheets and WhatsApp groups.
                </p>
                <p>
                  After years of struggling with generic learning management systems that didn't 
                  understand the unique needs of Qur'an teaching—Hifz tracking, Tajweed assessments, 
                  revision schedules—he decided to build something better.
                </p>
                <p>
                  Today, QiraatCloud serves hundreds of Qur'an academies and thousands of students 
                  worldwide, from individual tutors to large institutions with multiple campuses.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-card rounded-2xl p-8 shadow-elevated border border-border">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <div className="font-display text-3xl font-bold text-foreground">500+</div>
                    <div className="text-sm text-muted-foreground">Academies</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <div className="font-display text-3xl font-bold text-foreground">10K+</div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <div className="font-display text-3xl font-bold text-foreground">50+</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <div className="font-display text-3xl font-bold text-foreground">1M+</div>
                    <div className="text-sm text-muted-foreground">Sessions</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-gold rounded-xl shadow-gold animate-float opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide Qur'an educators with the most intuitive, purpose-built platform 
                that simplifies administration, enhances teaching effectiveness, and helps 
                academies scale their impact in spreading Qur'anic knowledge.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
              <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where every Qur'an tutor and academy has access to professional-grade 
                tools that honor the sacred nature of their work, enabling them to focus on 
                what matters most—teaching the Qur'an.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <span className="text-sm font-medium text-accent">Our Values</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Guides Us
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border text-center hover:shadow-elevated transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-medium text-primary">Our Team</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Meet the People Behind QiraatCloud
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border text-center"
              >
                <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-2xl font-bold text-primary-foreground">
                    {member.initial}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <div className="text-accent text-sm font-medium mb-3">{member.role}</div>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 geometric-pattern opacity-10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Transform Your Academy?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                Join hundreds of Qur'an educators who trust QiraatCloud to manage their teaching.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => window.location.href = "/login?tab=signup"}
                >
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => window.location.href = "/"}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
