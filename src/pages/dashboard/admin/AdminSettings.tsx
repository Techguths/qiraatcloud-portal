import { useState } from "react";
import { Save, Shield, Bell, Globe, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [platformName, setPlatformName] = useState("QiraatCloud");
  const [supportEmail, setSupportEmail] = useState("support@qiraatcloud.com");
  const [autoApprove, setAutoApprove] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Platform settings have been updated." });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Platform Info */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-display">Platform Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Platform Name</label>
            <Input value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Support Email</label>
            <Input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="text-sm font-medium text-foreground">Maintenance Mode</p>
              <p className="text-xs text-muted-foreground">Temporarily disable platform access</p>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`w-11 h-6 rounded-full transition-colors ${maintenanceMode ? "bg-destructive" : "bg-muted"}`}
            >
              <div className={`w-5 h-5 bg-background rounded-full shadow transition-transform ${maintenanceMode ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Academy Approval */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-display">Approval Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-Approve Academies</p>
              <p className="text-xs text-muted-foreground">New academies will be approved automatically</p>
            </div>
            <button
              onClick={() => setAutoApprove(!autoApprove)}
              className={`w-11 h-6 rounded-full transition-colors ${autoApprove ? "bg-primary" : "bg-muted"}`}
            >
              <div className={`w-5 h-5 bg-background rounded-full shadow transition-transform ${autoApprove ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <p className="text-sm font-medium text-foreground mb-1">Required Documents</p>
            <div className="flex flex-wrap gap-2">
              {["Ijazah Certificate", "Government ID", "Teaching License"].map((doc) => (
                <Badge key={doc} variant="outline">{doc}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-display">Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "New Academy Registration", desc: "Get notified when a new academy registers", enabled: true },
            { label: "Flagged Content", desc: "Alerts for flagged academies or students", enabled: true },
            { label: "Revenue Milestones", desc: "Notifications for revenue achievements", enabled: false },
            { label: "System Alerts", desc: "Critical system notifications", enabled: true },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-medium text-foreground">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <div className={`w-11 h-6 rounded-full ${n.enabled ? "bg-primary" : "bg-muted"}`}>
                <div className={`w-5 h-5 bg-background rounded-full shadow transition-transform ${n.enabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-display">Platform Subscription Plans</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: "Basic", price: "$29/mo", features: ["Up to 50 students", "3 Tutors", "Basic analytics"] },
              { name: "Professional", price: "$79/mo", features: ["Up to 200 students", "10 Tutors", "Advanced analytics", "Custom branding"] },
              { name: "Enterprise", price: "$199/mo", features: ["Unlimited students", "Unlimited Tutors", "Full analytics", "API access", "Priority support"] },
            ].map((plan) => (
              <div key={plan.name} className="p-4 rounded-xl border border-border">
                <h4 className="font-display font-semibold text-foreground">{plan.name}</h4>
                <p className="text-lg font-bold text-primary mb-2">{plan.price}</p>
                <ul className="space-y-1">
                  {plan.features.map((f) => (
                    <li key={f} className="text-xs text-muted-foreground">• {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} size="lg">
        <Save className="w-4 h-4 mr-2" /> Save All Settings
      </Button>
    </div>
  );
};

export default AdminSettings;
