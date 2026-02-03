import { Link } from "react-router-dom";
import { ArrowLeft, Building2, GraduationCap, Key } from "lucide-react";

const GetStarted = () => {
  const options = [
    {
      icon: Building2,
      title: "Create Academy",
      description: "Set up your own Qur'an academy and start managing students, teachers, and curriculum.",
      href: "/onboarding/create-academy",
      color: "bg-primary",
      iconColor: "text-primary-foreground",
    },
    {
      icon: GraduationCap,
      title: "Register as Student",
      description: "Browse and join an existing academy to begin your Qur'an learning journey.",
      href: "/onboarding/student",
      color: "bg-accent",
      iconColor: "text-accent-foreground",
    },
    {
      icon: Key,
      title: "Use Invite Code",
      description: "Already have an invite code? Enter it here to join your academy directly.",
      href: "/onboarding/invite",
      color: "bg-secondary",
      iconColor: "text-secondary-foreground",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Logo & Title */}
          <div className="text-center mb-12">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-2xl">Q</span>
              </div>
            </Link>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How would you like to get started?
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Choose the option that best describes your journey with QiraatCloud
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid gap-6 sm:grid-cols-3">
            {options.map((option) => (
              <Link
                key={option.title}
                to={option.href}
                className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-elevated"
              >
                {/* Icon */}
                <div className={`w-14 h-14 ${option.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <option.icon className={`w-7 h-7 ${option.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {option.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {option.description}
                </p>

                {/* Hover Arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <ArrowLeft className="w-4 h-4 text-primary rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer Note */}
          <p className="text-center text-muted-foreground text-sm mt-12">
            Not sure which option to choose?{" "}
            <Link to="/about" className="text-primary hover:underline">
              Learn more about QiraatCloud
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default GetStarted;
