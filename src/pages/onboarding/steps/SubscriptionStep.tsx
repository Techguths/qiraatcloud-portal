import { Check, Crown, Zap, Building2, Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface StudentPlan {
  id: string;
  name: string;
  price: string;
  duration: string;
  features: string[];
}

interface SubscriptionStepProps {
  platformPlan: string;
  setPlatformPlan: (value: string) => void;
  studentPlans: StudentPlan[];
  setStudentPlans: (value: StudentPlan[]) => void;
}

const SubscriptionStep = ({
  platformPlan,
  setPlatformPlan,
  studentPlans,
  setStudentPlans,
}: SubscriptionStepProps) => {
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanPrice, setNewPlanPrice] = useState("");
  const [newPlanDuration, setNewPlanDuration] = useState("month");
  const [newPlanFeatures, setNewPlanFeatures] = useState("");
  const [showAddPlan, setShowAddPlan] = useState(false);

  const platformPlans = [
    {
      id: "starter",
      name: "Starter",
      price: "Free",
      description: "Perfect for individual tutors",
      icon: Zap,
      features: [
        "Up to 10 students",
        "Basic progress tracking",
        "Email support",
        "1 teacher account",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      price: "$29/month",
      description: "For growing academies",
      icon: Crown,
      popular: true,
      features: [
        "Up to 100 students",
        "Advanced analytics",
        "Priority support",
        "5 teacher accounts",
        "Custom branding",
        "Student certificates",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$99/month",
      description: "For large institutions",
      icon: Building2,
      features: [
        "Unlimited students",
        "Full analytics suite",
        "24/7 dedicated support",
        "Unlimited teachers",
        "API access",
        "Custom integrations",
        "White-label option",
      ],
    },
  ];

  const handleAddPlan = () => {
    if (!newPlanName.trim() || !newPlanPrice.trim()) return;

    const newPlan: StudentPlan = {
      id: Date.now().toString(),
      name: newPlanName,
      price: newPlanPrice,
      duration: newPlanDuration,
      features: newPlanFeatures.split("\n").filter((f) => f.trim()),
    };

    setStudentPlans([...studentPlans, newPlan]);
    setNewPlanName("");
    setNewPlanPrice("");
    setNewPlanFeatures("");
    setShowAddPlan(false);
  };

  const handleDeletePlan = (id: string) => {
    setStudentPlans(studentPlans.filter((p) => p.id !== id));
  };

  const handleUpdatePlan = (id: string, updates: Partial<StudentPlan>) => {
    setStudentPlans(
      studentPlans.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Subscription Plans
        </h2>
        <p className="text-muted-foreground">
          Choose your platform plan and set up subscription options for your students.
        </p>
      </div>

      {/* Platform Subscription */}
      <div className="space-y-4">
        <h3 className="font-medium text-foreground flex items-center gap-2">
          <Crown className="w-5 h-5 text-accent" />
          Your Platform Subscription
        </h3>
        <div className="grid gap-4 lg:grid-cols-3">
          {platformPlans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setPlatformPlan(plan.id)}
              className={`relative p-5 rounded-2xl border-2 transition-all text-left ${
                platformPlan === plan.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  platformPlan === plan.id ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                  <plan.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{plan.name}</h4>
                  <p className="text-sm font-bold text-primary">{plan.price}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {plan.description}
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              {platformPlan === plan.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Student Subscription Plans */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">Student Subscription Plans</h3>
            <p className="text-sm text-muted-foreground">
              Create custom pricing plans for your students
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddPlan(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Plan
          </Button>
        </div>

        {/* Existing Plans */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studentPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-card rounded-xl border border-border p-4 relative group"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                  type="button"
                  onClick={() => setEditingPlan(plan.id)}
                  className="p-1.5 bg-secondary rounded-lg hover:bg-secondary/80"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePlan(plan.id)}
                  className="p-1.5 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {editingPlan === plan.id ? (
                <div className="space-y-3">
                  <Input
                    value={plan.name}
                    onChange={(e) =>
                      handleUpdatePlan(plan.id, { name: e.target.value })
                    }
                    placeholder="Plan name"
                    className="text-sm"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={plan.price}
                      onChange={(e) =>
                        handleUpdatePlan(plan.id, { price: e.target.value })
                      }
                      placeholder="Price"
                      className="text-sm"
                    />
                    <select
                      value={plan.duration}
                      onChange={(e) =>
                        handleUpdatePlan(plan.id, { duration: e.target.value })
                      }
                      className="px-3 py-2 bg-background border border-input rounded-md text-sm"
                    >
                      <option value="month">/ month</option>
                      <option value="year">/ year</option>
                      <option value="one-time">one-time</option>
                    </select>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setEditingPlan(null)}
                    className="w-full"
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <>
                  <h4 className="font-semibold text-foreground">{plan.name}</h4>
                  <p className="text-xl font-bold text-primary mt-1">
                    ${plan.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{plan.duration}
                    </span>
                  </p>
                  {plan.features.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="w-3 h-3 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          ))}

          {/* Add Plan Card */}
          {showAddPlan && (
            <div className="bg-card rounded-xl border-2 border-dashed border-primary/50 p-4">
              <div className="space-y-3">
                <Input
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  placeholder="Plan name (e.g., Basic, Premium)"
                  className="text-sm"
                />
                <div className="flex gap-2">
                  <Input
                    value={newPlanPrice}
                    onChange={(e) => setNewPlanPrice(e.target.value)}
                    placeholder="Price"
                    className="text-sm"
                  />
                  <select
                    value={newPlanDuration}
                    onChange={(e) => setNewPlanDuration(e.target.value)}
                    className="px-3 py-2 bg-background border border-input rounded-md text-sm"
                  >
                    <option value="month">/ month</option>
                    <option value="year">/ year</option>
                    <option value="one-time">one-time</option>
                  </select>
                </div>
                <textarea
                  value={newPlanFeatures}
                  onChange={(e) => setNewPlanFeatures(e.target.value)}
                  placeholder="Features (one per line)&#10;e.g., Weekly 1-on-1 sessions&#10;Progress reports"
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm resize-none"
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowAddPlan(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleAddPlan} className="flex-1">
                    Add Plan
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {studentPlans.length === 0 && !showAddPlan && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No student plans created yet.</p>
            <p className="text-xs mt-1">
              Create subscription plans for your students to enroll.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionStep;
