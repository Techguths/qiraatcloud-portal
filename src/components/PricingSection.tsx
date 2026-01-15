import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individual tutors",
    price: "$19",
    period: "/month",
    features: [
      "Up to 20 students",
      "1 tutor account",
      "Class scheduling",
      "Basic progress tracking",
      "Email support",
    ],
    popular: false,
    buttonVariant: "outline" as const,
  },
  {
    name: "Academy",
    description: "For growing Qur'an academies",
    price: "$49",
    period: "/month",
    features: [
      "Up to 100 students",
      "5 tutor accounts",
      "Advanced scheduling",
      "Detailed progress reports",
      "Priority support",
      "Custom branding",
    ],
    popular: true,
    buttonVariant: "hero" as const,
  },
  {
    name: "Enterprise",
    description: "For large institutions",
    price: "$149",
    period: "/month",
    features: [
      "Unlimited students",
      "Unlimited tutors",
      "Multi-academy support",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    popular: false,
    buttonVariant: "outline" as const,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 relative geometric-pattern">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Simple Pricing
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose Your <span className="text-gradient-gold">Plan</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Transparent pricing that scales with your academy. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? "bg-gradient-hero text-primary-foreground shadow-elevated scale-105 lg:scale-110"
                  : "bg-card border border-border hover:border-primary/30 hover:shadow-elevated"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-gold text-foreground text-sm font-semibold px-4 py-1 rounded-full shadow-gold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`font-display text-2xl font-bold mb-2 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-5xl font-bold font-display ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  <span className={plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? "bg-primary-foreground/20" : "bg-primary/10"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <span className={plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "outline"}
                size="lg"
                className={`w-full ${plan.popular ? "" : "hover:bg-primary hover:text-primary-foreground"}`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
