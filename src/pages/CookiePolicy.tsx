import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container py-20 max-w-3xl">
      <h1 className="font-display text-4xl font-bold mb-8">Cookie Policy</h1>
      <p className="text-muted-foreground mb-6">Last updated: March 10, 2026</p>

      {[
        { title: "What Are Cookies", content: "Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your experience." },
        { title: "Essential Cookies", content: "These cookies are necessary for QiraatCloud to function properly. They handle authentication, security, and session management. You cannot disable these." },
        { title: "Analytics Cookies", content: "We use analytics cookies to understand how visitors interact with QiraatCloud. This helps us improve our platform. These cookies collect anonymized data." },
        { title: "Preference Cookies", content: "These cookies remember your settings and preferences, such as language and theme choices, so you don't have to set them each time you visit." },
        { title: "Managing Cookies", content: "You can control and delete cookies through your browser settings. Note that disabling certain cookies may affect the functionality of QiraatCloud." },
        { title: "Contact Us", content: "If you have questions about our use of cookies, please contact us at hello@qiraatcloud.com." },
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

export default CookiePolicy;
