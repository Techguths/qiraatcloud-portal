import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HelpCenter = () => {
  const faqs = [
    { q: "How do I create an academy?", a: "Click 'Get Started' and follow the academy creation flow. You'll set up your profile, branding, and subscription in just a few steps." },
    { q: "How do students join my academy?", a: "Share your unique invite code with students. They can enter it on the registration page to join your academy instantly." },
    { q: "What payment methods are supported?", a: "We support all major credit and debit cards through our secure payment processor." },
    { q: "Can I manage multiple classes?", a: "Yes! Academy admins and tutors can create and manage multiple classes with different schedules and student groups." },
    { q: "How do I track student progress?", a: "Each dashboard provides detailed analytics on student attendance, Surah progress, and performance metrics." },
    { q: "Is there a mobile app?", a: "QiraatCloud is fully responsive and works great on mobile browsers. A dedicated app is on our roadmap." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-20">
        <h1 className="font-display text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-muted-foreground mb-12 max-w-2xl">Find answers to common questions and learn how to get the most out of QiraatCloud.</p>

        <div className="grid gap-6 max-w-3xl">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-xl border bg-card">
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-xl bg-muted text-center max-w-3xl">
          <h2 className="font-display text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-muted-foreground mb-4">Our support team is here for you.</p>
          <a href="mailto:hello@qiraatcloud.com" className="text-primary font-semibold hover:underline">Contact Support →</a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
