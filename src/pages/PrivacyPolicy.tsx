import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container py-20 max-w-3xl">
      <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground mb-6">Last updated: March 10, 2026</p>

      {[
        { title: "Information We Collect", content: "We collect information you provide directly, such as your name, email address, and academy details when you create an account. We also collect usage data to improve our services." },
        { title: "How We Use Your Information", content: "We use your information to provide and maintain QiraatCloud services, communicate with you about your account, send important updates, and improve our platform." },
        { title: "Data Sharing", content: "We do not sell your personal information. We may share data with service providers who help us operate the platform, always under strict confidentiality agreements." },
        { title: "Data Security", content: "We implement industry-standard security measures to protect your data, including encryption in transit and at rest, regular security audits, and access controls." },
        { title: "Your Rights", content: "You have the right to access, correct, or delete your personal data at any time. You can also request a copy of your data or opt out of non-essential communications." },
        { title: "Cookies", content: "We use essential cookies to keep you logged in and remember your preferences. See our Cookie Policy for more details." },
        { title: "Contact Us", content: "If you have questions about this Privacy Policy, please contact us at hello@qiraatcloud.com." },
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

export default PrivacyPolicy;
