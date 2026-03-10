import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container py-20 max-w-3xl">
      <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-muted-foreground mb-6">Last updated: March 10, 2026</p>

      {[
        { title: "Acceptance of Terms", content: "By accessing or using QiraatCloud, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform." },
        { title: "Account Responsibilities", content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate information during registration." },
        { title: "Acceptable Use", content: "You agree to use QiraatCloud only for lawful purposes related to Qur'an education. You may not use the platform to distribute harmful content, spam, or infringe on intellectual property rights." },
        { title: "Academy Owner Obligations", content: "Academy owners are responsible for managing their tutors and students, ensuring appropriate content delivery, and complying with applicable laws in their jurisdiction." },
        { title: "Subscription & Payments", content: "Paid features are billed according to the selected plan. You may cancel at any time; access continues until the end of the billing period. Refunds are handled on a case-by-case basis." },
        { title: "Intellectual Property", content: "QiraatCloud and its content, features, and functionality are owned by QiraatCloud and protected by copyright, trademark, and other intellectual property laws." },
        { title: "Limitation of Liability", content: "QiraatCloud is provided 'as is' without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform." },
        { title: "Changes to Terms", content: "We may update these terms from time to time. We will notify users of significant changes via email or in-app notification." },
      ].map((section, i) => (
        <section key={i} className="mb-8">
          <h2 className="font-semibold text-xl mb-3">{section.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{section.content}</p>
        </section>
      ))}
    </main>
    <Footer />
  </div>
);

export default TermsOfService;
