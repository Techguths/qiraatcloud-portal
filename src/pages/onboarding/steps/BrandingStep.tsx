import { Check } from "lucide-react";

interface BrandingStepProps {
  primaryColor: string;
  setPrimaryColor: (value: string) => void;
  secondaryColor: string;
  setSecondaryColor: (value: string) => void;
  accentColor: string;
  setAccentColor: (value: string) => void;
  fontStyle: string;
  setFontStyle: (value: string) => void;
  logoPreview: string | null;
  academyName: string;
  academyLocation: string;
}

const BrandingStep = ({
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  accentColor,
  setAccentColor,
  fontStyle,
  setFontStyle,
  logoPreview,
  academyName,
  academyLocation,
}: BrandingStepProps) => {
  const primaryColors = [
    { name: "emerald", label: "Emerald", class: "bg-[hsl(158,45%,22%)]" },
    { name: "teal", label: "Teal", class: "bg-[hsl(180,45%,25%)]" },
    { name: "blue", label: "Royal Blue", class: "bg-[hsl(220,60%,35%)]" },
    { name: "indigo", label: "Indigo", class: "bg-[hsl(240,50%,40%)]" },
    { name: "purple", label: "Purple", class: "bg-[hsl(280,45%,40%)]" },
    { name: "burgundy", label: "Burgundy", class: "bg-[hsl(340,50%,30%)]" },
  ];

  const secondaryColors = [
    { name: "cream", label: "Cream", class: "bg-[hsl(45,30%,95%)]" },
    { name: "sand", label: "Sand", class: "bg-[hsl(35,40%,90%)]" },
    { name: "pearl", label: "Pearl", class: "bg-[hsl(200,20%,95%)]" },
    { name: "lavender", label: "Lavender", class: "bg-[hsl(260,30%,95%)]" },
    { name: "mint", label: "Mint", class: "bg-[hsl(160,30%,93%)]" },
  ];

  const accentColors = [
    { name: "gold", label: "Islamic Gold", class: "bg-[hsl(38,75%,55%)]" },
    { name: "copper", label: "Copper", class: "bg-[hsl(25,70%,50%)]" },
    { name: "rose-gold", label: "Rose Gold", class: "bg-[hsl(350,60%,70%)]" },
    { name: "bronze", label: "Bronze", class: "bg-[hsl(30,50%,45%)]" },
    { name: "amber", label: "Amber", class: "bg-[hsl(45,85%,50%)]" },
  ];

  const fontStyles = [
    { name: "classic", label: "Classic", preview: "Playfair Display", class: "font-serif" },
    { name: "modern", label: "Modern", preview: "Inter", class: "font-sans" },
    { name: "elegant", label: "Elegant", preview: "Georgia", class: "font-serif italic" },
  ];

  const getPreviewPrimaryColor = () => {
    const color = primaryColors.find(c => c.name === primaryColor);
    return color?.class || primaryColors[0].class;
  };

  const getPreviewSecondaryColor = () => {
    const color = secondaryColors.find(c => c.name === secondaryColor);
    return color?.class || secondaryColors[0].class;
  };

  const getPreviewAccentColor = () => {
    const color = accentColors.find(c => c.name === accentColor);
    return color?.class || accentColors[0].class;
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Brand Your Academy
        </h2>
        <p className="text-muted-foreground">
          Create a unique visual identity that reflects your academy's character.
        </p>
      </div>

      {/* Primary Color */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <label className="block text-sm font-medium text-foreground mb-3">
          Primary Color
        </label>
        <p className="text-xs text-muted-foreground mb-4">
          Used for headers, buttons, and main accents
        </p>
        <div className="flex flex-wrap gap-3">
          {primaryColors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => setPrimaryColor(color.name)}
              className="group relative"
            >
              <div
                className={`w-14 h-14 rounded-xl ${color.class} transition-all ${
                  primaryColor === color.name
                    ? "ring-4 ring-offset-2 ring-primary scale-110"
                    : "hover:scale-105"
                }`}
              >
                {primaryColor === color.name && (
                  <Check className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
              <span className="block text-xs text-muted-foreground mt-1 text-center">
                {color.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Color */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <label className="block text-sm font-medium text-foreground mb-3">
          Background Color
        </label>
        <p className="text-xs text-muted-foreground mb-4">
          Used for backgrounds and cards
        </p>
        <div className="flex flex-wrap gap-3">
          {secondaryColors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => setSecondaryColor(color.name)}
              className="group relative"
            >
              <div
                className={`w-14 h-14 rounded-xl ${color.class} border border-border transition-all ${
                  secondaryColor === color.name
                    ? "ring-4 ring-offset-2 ring-primary scale-110"
                    : "hover:scale-105"
                }`}
              >
                {secondaryColor === color.name && (
                  <Check className="w-5 h-5 text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
              <span className="block text-xs text-muted-foreground mt-1 text-center">
                {color.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <label className="block text-sm font-medium text-foreground mb-3">
          Accent Color
        </label>
        <p className="text-xs text-muted-foreground mb-4">
          Used for highlights and call-to-action elements
        </p>
        <div className="flex flex-wrap gap-3">
          {accentColors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => setAccentColor(color.name)}
              className="group relative"
            >
              <div
                className={`w-14 h-14 rounded-xl ${color.class} transition-all ${
                  accentColor === color.name
                    ? "ring-4 ring-offset-2 ring-primary scale-110"
                    : "hover:scale-105"
                }`}
              >
                {accentColor === color.name && (
                  <Check className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
              <span className="block text-xs text-muted-foreground mt-1 text-center">
                {color.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Style */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <label className="block text-sm font-medium text-foreground mb-3">
          Typography Style
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          {fontStyles.map((font) => (
            <button
              key={font.name}
              type="button"
              onClick={() => setFontStyle(font.name)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                fontStyle === font.name
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <span className={`text-lg ${font.class}`}>{font.preview}</span>
              <span className="block text-xs text-muted-foreground mt-1">
                {font.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <p className="text-sm text-muted-foreground mb-4">Live Preview</p>
        <div className={`rounded-xl overflow-hidden border border-border ${getPreviewSecondaryColor()}`}>
          {/* Header Preview */}
          <div className={`${getPreviewPrimaryColor()} p-4`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg font-bold text-white">
                    {academyName ? academyName.charAt(0).toUpperCase() : "A"}
                  </span>
                )}
              </div>
              <div>
                <h3 className={`text-white font-semibold ${fontStyle === 'classic' ? 'font-serif' : fontStyle === 'elegant' ? 'font-serif italic' : 'font-sans'}`}>
                  {academyName || "Your Academy Name"}
                </h3>
                <p className="text-white/70 text-xs">
                  {academyLocation || "Location"}
                </p>
              </div>
            </div>
          </div>
          {/* Content Preview */}
          <div className="p-4 space-y-3">
            <div className="h-3 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <button className={`${getPreviewAccentColor()} text-white text-sm px-4 py-2 rounded-lg mt-2`}>
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingStep;
