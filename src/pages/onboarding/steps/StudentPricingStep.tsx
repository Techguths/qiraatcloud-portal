import { Check } from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface Academy {
  id: string;
  name: string;
  color: string;
}

// Mock subscription plans that would come from the academy
const mockPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 29,
    period: "month",
    description: "Perfect for beginners starting their Qur'an journey",
    features: [
      "2 classes per week",
      "Group sessions",
      "Progress tracking",
      "Basic support",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 59,
    period: "month",
    description: "Ideal for committed students seeking steady progress",
    features: [
      "4 classes per week",
      "Mix of group & private sessions",
      "Progress tracking",
      "Priority support",
      "Recording access",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 99,
    period: "month",
    description: "Intensive program for serious memorization goals",
    features: [
      "Daily classes",
      "Private one-on-one sessions",
      "Personalized curriculum",
      "24/7 support",
      "Recording access",
      "Certification program",
    ],
  },
];

interface StudentPricingStepProps {
  academy: Academy;
  selectedPlan: string | null;
  onSelect: (planId: string) => void;
}

const StudentPricingStep = ({ academy, selectedPlan, onSelect }: StudentPricingStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className={`w-12 h-12 ${academy.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
          <span className="text-lg font-bold text-white">{academy.name.charAt(0)}</span>
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-2">
          Choose Your Plan
        </h2>
        <p className="text-muted-foreground text-sm">
          Select a subscription plan from {academy.name}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {mockPlans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => onSelect(plan.id)}
            className={`relative text-left p-4 rounded-xl border transition-all duration-200 ${
              selectedPlan === plan.id
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                Popular
              </span>
            )}

            <div className="mb-3">
              <h3 className="font-display font-semibold text-foreground">{plan.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
            </div>

            <div className="mb-4">
              <span className="text-2xl font-bold text-foreground">${plan.price}</span>
              <span className="text-muted-foreground text-sm">/{plan.period}</span>
            </div>

            <ul className="space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div
              className={`mt-4 py-2 rounded-lg text-center text-sm font-medium transition-colors ${
                selectedPlan === plan.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {selectedPlan === plan.id ? "Selected" : "Select Plan"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentPricingStep;
