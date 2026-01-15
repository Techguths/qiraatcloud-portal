import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-foreground" />
              </div>
              <span className="font-display text-xl font-bold">QiraatCloud</span>
            </div>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Empowering Qur'an education, digitally. The all-in-one platform for tutors and academies.
            </p>
            <div className="space-y-3">
              <a href="mailto:hello@qiraatcloud.com" className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span>hello@qiraatcloud.com</span>
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="w-4 h-4" />
                <span>Serving tutors worldwide</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2024 QiraatCloud. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
              Twitter
            </a>
            <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
              LinkedIn
            </a>
            <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
