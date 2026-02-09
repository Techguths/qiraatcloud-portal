import {
  Building2,
  GraduationCap,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const monthlyData = [
  { month: "Jul", academies: 8, students: 180, revenue: 28000 },
  { month: "Aug", academies: 12, students: 250, revenue: 32000 },
  { month: "Sep", academies: 15, students: 310, revenue: 35000 },
  { month: "Oct", academies: 18, students: 380, revenue: 38500 },
  { month: "Nov", academies: 22, students: 420, revenue: 41200 },
  { month: "Dec", academies: 25, students: 490, revenue: 45230 },
];

const topAcademies = [
  { name: "Al-Huda International", students: 520, revenue: "$6,100/mo", growth: "+15%" },
  { name: "Al-Noor Academy", students: 245, revenue: "$4,200/mo", growth: "+22%" },
  { name: "Bayyinah Institute", students: 189, revenue: "$2,800/mo", growth: "+8%" },
  { name: "Madinah Quran Center", students: 67, revenue: "$450/mo", growth: "+45%" },
  { name: "Riyad ul Quran", students: 95, revenue: "$1,200/mo", growth: "+12%" },
];

const platformMetrics = [
  { label: "Avg. Session Duration", value: "42 min", change: "+5%", positive: true },
  { label: "Student Retention Rate", value: "87%", change: "+3%", positive: true },
  { label: "Academy Churn Rate", value: "2.1%", change: "-0.5%", positive: true },
  { label: "Avg. Revenue per Academy", value: "$356", change: "+12%", positive: true },
  { label: "Support Tickets", value: "23", change: "+8", positive: false },
  { label: "NPS Score", value: "72", change: "+4", positive: true },
];

const AdminAnalytics = () => {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      {/* Revenue Chart (Simple Bar) */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-display">Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-48">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-foreground">${(d.revenue / 1000).toFixed(0)}k</span>
                <div
                  className="w-full bg-primary/80 rounded-t-md transition-all hover:bg-primary"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {platformMetrics.map((metric) => (
          <Card key={metric.label} className="border border-border">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">{metric.value}</p>
              <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
              <span className={`text-xs font-medium flex items-center justify-center gap-0.5 ${metric.positive ? "text-primary" : "text-destructive"}`}>
                {metric.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {metric.change}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Academies */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-display">Top Performing Academies</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">#</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Academy</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Students</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topAcademies.map((academy, i) => (
                  <tr key={academy.name} className="border-b border-border hover:bg-muted/20">
                    <td className="py-3 px-4 font-medium text-muted-foreground">{i + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-primary/10 rounded-md flex items-center justify-center">
                          <Building2 className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{academy.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{academy.students}</td>
                    <td className="py-3 px-4 text-foreground font-medium">{academy.revenue}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        <ArrowUpRight className="w-3 h-3 mr-0.5" />{academy.growth}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Growth Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10"><Building2 className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Academy Growth</p>
                <p className="text-xl font-display font-bold text-foreground">+38%</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">127 total academies, 25 new this quarter</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent/10"><GraduationCap className="w-5 h-5 text-accent" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Student Growth</p>
                <p className="text-xl font-display font-bold text-foreground">+52%</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">3,458 total students, 490 new this quarter</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10"><DollarSign className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue Growth</p>
                <p className="text-xl font-display font-bold text-foreground">+61%</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">$45,230/mo MRR, $542,760 ARR</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
