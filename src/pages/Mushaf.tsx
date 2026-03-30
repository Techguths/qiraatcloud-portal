import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, BookOpen, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const surahs = [
  { id: 1, name: "الفاتحة", english: "Al-Fatihah", meaning: "The Opening", verses: 7, type: "Meccan", juz: 1 },
  { id: 2, name: "البقرة", english: "Al-Baqarah", meaning: "The Cow", verses: 286, type: "Medinan", juz: 1 },
  { id: 3, name: "آل عمران", english: "Ali 'Imran", meaning: "Family of Imran", verses: 200, type: "Medinan", juz: 3 },
  { id: 4, name: "النساء", english: "An-Nisa", meaning: "The Women", verses: 176, type: "Medinan", juz: 4 },
  { id: 5, name: "المائدة", english: "Al-Ma'idah", meaning: "The Table Spread", verses: 120, type: "Medinan", juz: 6 },
  { id: 6, name: "الأنعام", english: "Al-An'am", meaning: "The Cattle", verses: 165, type: "Meccan", juz: 7 },
  { id: 7, name: "الأعراف", english: "Al-A'raf", meaning: "The Heights", verses: 206, type: "Meccan", juz: 8 },
  { id: 8, name: "الأنفال", english: "Al-Anfal", meaning: "The Spoils of War", verses: 75, type: "Medinan", juz: 9 },
  { id: 9, name: "التوبة", english: "At-Tawbah", meaning: "The Repentance", verses: 129, type: "Medinan", juz: 10 },
  { id: 10, name: "يونس", english: "Yunus", meaning: "Jonah", verses: 109, type: "Meccan", juz: 11 },
  { id: 11, name: "هود", english: "Hud", meaning: "Hud", verses: 123, type: "Meccan", juz: 11 },
  { id: 12, name: "يوسف", english: "Yusuf", meaning: "Joseph", verses: 111, type: "Meccan", juz: 12 },
  { id: 13, name: "الرعد", english: "Ar-Ra'd", meaning: "The Thunder", verses: 43, type: "Medinan", juz: 13 },
  { id: 14, name: "إبراهيم", english: "Ibrahim", meaning: "Abraham", verses: 52, type: "Meccan", juz: 13 },
  { id: 15, name: "الحجر", english: "Al-Hijr", meaning: "The Rocky Tract", verses: 99, type: "Meccan", juz: 14 },
  { id: 16, name: "النحل", english: "An-Nahl", meaning: "The Bee", verses: 128, type: "Meccan", juz: 14 },
  { id: 17, name: "الإسراء", english: "Al-Isra", meaning: "The Night Journey", verses: 111, type: "Meccan", juz: 15 },
  { id: 18, name: "الكهف", english: "Al-Kahf", meaning: "The Cave", verses: 110, type: "Meccan", juz: 15 },
  { id: 19, name: "مريم", english: "Maryam", meaning: "Mary", verses: 98, type: "Meccan", juz: 16 },
  { id: 20, name: "طه", english: "Taha", meaning: "Ta-Ha", verses: 135, type: "Meccan", juz: 16 },
  { id: 21, name: "الأنبياء", english: "Al-Anbiya", meaning: "The Prophets", verses: 112, type: "Meccan", juz: 17 },
  { id: 22, name: "الحج", english: "Al-Hajj", meaning: "The Pilgrimage", verses: 78, type: "Medinan", juz: 17 },
  { id: 23, name: "المؤمنون", english: "Al-Mu'minun", meaning: "The Believers", verses: 118, type: "Meccan", juz: 18 },
  { id: 24, name: "النور", english: "An-Nur", meaning: "The Light", verses: 64, type: "Medinan", juz: 18 },
  { id: 25, name: "الفرقان", english: "Al-Furqan", meaning: "The Criterion", verses: 77, type: "Meccan", juz: 18 },
  { id: 26, name: "الشعراء", english: "Ash-Shu'ara", meaning: "The Poets", verses: 227, type: "Meccan", juz: 19 },
  { id: 27, name: "النمل", english: "An-Naml", meaning: "The Ant", verses: 93, type: "Meccan", juz: 19 },
  { id: 28, name: "القصص", english: "Al-Qasas", meaning: "The Stories", verses: 88, type: "Meccan", juz: 20 },
  { id: 29, name: "العنكبوت", english: "Al-Ankabut", meaning: "The Spider", verses: 69, type: "Meccan", juz: 20 },
  { id: 30, name: "الروم", english: "Ar-Rum", meaning: "The Romans", verses: 60, type: "Meccan", juz: 21 },
  { id: 31, name: "لقمان", english: "Luqman", meaning: "Luqman", verses: 34, type: "Meccan", juz: 21 },
  { id: 32, name: "السجدة", english: "As-Sajdah", meaning: "The Prostration", verses: 30, type: "Meccan", juz: 21 },
  { id: 33, name: "الأحزاب", english: "Al-Ahzab", meaning: "The Combined Forces", verses: 73, type: "Medinan", juz: 21 },
  { id: 34, name: "سبأ", english: "Saba", meaning: "Sheba", verses: 54, type: "Meccan", juz: 22 },
  { id: 35, name: "فاطر", english: "Fatir", meaning: "Originator", verses: 45, type: "Meccan", juz: 22 },
  { id: 36, name: "يس", english: "Ya-Sin", meaning: "Ya Sin", verses: 83, type: "Meccan", juz: 22 },
  { id: 37, name: "الصافات", english: "As-Saffat", meaning: "Those Ranged in Ranks", verses: 182, type: "Meccan", juz: 23 },
  { id: 38, name: "ص", english: "Sad", meaning: "The Letter Sad", verses: 88, type: "Meccan", juz: 23 },
  { id: 39, name: "الزمر", english: "Az-Zumar", meaning: "The Troops", verses: 75, type: "Meccan", juz: 23 },
  { id: 40, name: "غافر", english: "Ghafir", meaning: "The Forgiver", verses: 85, type: "Meccan", juz: 24 },
  { id: 41, name: "فصلت", english: "Fussilat", meaning: "Explained in Detail", verses: 54, type: "Meccan", juz: 24 },
  { id: 42, name: "الشورى", english: "Ash-Shura", meaning: "The Consultation", verses: 53, type: "Meccan", juz: 25 },
  { id: 43, name: "الزخرف", english: "Az-Zukhruf", meaning: "The Ornaments of Gold", verses: 89, type: "Meccan", juz: 25 },
  { id: 44, name: "الدخان", english: "Ad-Dukhan", meaning: "The Smoke", verses: 59, type: "Meccan", juz: 25 },
  { id: 45, name: "الجاثية", english: "Al-Jathiyah", meaning: "The Crouching", verses: 37, type: "Meccan", juz: 25 },
  { id: 46, name: "الأحقاف", english: "Al-Ahqaf", meaning: "The Wind-Curved Sandhills", verses: 35, type: "Meccan", juz: 26 },
  { id: 47, name: "محمد", english: "Muhammad", meaning: "Muhammad", verses: 38, type: "Medinan", juz: 26 },
  { id: 48, name: "الفتح", english: "Al-Fath", meaning: "The Victory", verses: 29, type: "Medinan", juz: 26 },
  { id: 49, name: "الحجرات", english: "Al-Hujurat", meaning: "The Rooms", verses: 18, type: "Medinan", juz: 26 },
  { id: 50, name: "ق", english: "Qaf", meaning: "The Letter Qaf", verses: 45, type: "Meccan", juz: 26 },
  { id: 51, name: "الذاريات", english: "Adh-Dhariyat", meaning: "The Winnowing Winds", verses: 60, type: "Meccan", juz: 26 },
  { id: 52, name: "الطور", english: "At-Tur", meaning: "The Mount", verses: 49, type: "Meccan", juz: 27 },
  { id: 53, name: "النجم", english: "An-Najm", meaning: "The Star", verses: 62, type: "Meccan", juz: 27 },
  { id: 54, name: "القمر", english: "Al-Qamar", meaning: "The Moon", verses: 55, type: "Meccan", juz: 27 },
  { id: 55, name: "الرحمن", english: "Ar-Rahman", meaning: "The Beneficent", verses: 78, type: "Medinan", juz: 27 },
  { id: 56, name: "الواقعة", english: "Al-Waqi'ah", meaning: "The Inevitable", verses: 96, type: "Meccan", juz: 27 },
  { id: 57, name: "الحديد", english: "Al-Hadid", meaning: "The Iron", verses: 29, type: "Medinan", juz: 27 },
  { id: 58, name: "المجادلة", english: "Al-Mujadila", meaning: "The Pleading Woman", verses: 22, type: "Medinan", juz: 28 },
  { id: 59, name: "الحشر", english: "Al-Hashr", meaning: "The Exile", verses: 24, type: "Medinan", juz: 28 },
  { id: 60, name: "الممتحنة", english: "Al-Mumtahanah", meaning: "She That is Examined", verses: 13, type: "Medinan", juz: 28 },
  { id: 61, name: "الصف", english: "As-Saf", meaning: "The Ranks", verses: 14, type: "Medinan", juz: 28 },
  { id: 62, name: "الجمعة", english: "Al-Jumu'ah", meaning: "The Congregation", verses: 11, type: "Medinan", juz: 28 },
  { id: 63, name: "المنافقون", english: "Al-Munafiqun", meaning: "The Hypocrites", verses: 11, type: "Medinan", juz: 28 },
  { id: 64, name: "التغابن", english: "At-Taghabun", meaning: "The Mutual Disillusion", verses: 18, type: "Medinan", juz: 28 },
  { id: 65, name: "الطلاق", english: "At-Talaq", meaning: "The Divorce", verses: 12, type: "Medinan", juz: 28 },
  { id: 66, name: "التحريم", english: "At-Tahrim", meaning: "The Prohibition", verses: 12, type: "Medinan", juz: 28 },
  { id: 67, name: "الملك", english: "Al-Mulk", meaning: "The Sovereignty", verses: 30, type: "Meccan", juz: 29 },
  { id: 68, name: "القلم", english: "Al-Qalam", meaning: "The Pen", verses: 52, type: "Meccan", juz: 29 },
  { id: 69, name: "الحاقة", english: "Al-Haqqah", meaning: "The Reality", verses: 52, type: "Meccan", juz: 29 },
  { id: 70, name: "المعارج", english: "Al-Ma'arij", meaning: "The Ascending Stairways", verses: 44, type: "Meccan", juz: 29 },
  { id: 71, name: "نوح", english: "Nuh", meaning: "Noah", verses: 28, type: "Meccan", juz: 29 },
  { id: 72, name: "الجن", english: "Al-Jinn", meaning: "The Jinn", verses: 28, type: "Meccan", juz: 29 },
  { id: 73, name: "المزمل", english: "Al-Muzzammil", meaning: "The Enshrouded One", verses: 20, type: "Meccan", juz: 29 },
  { id: 74, name: "المدثر", english: "Al-Muddaththir", meaning: "The Cloaked One", verses: 56, type: "Meccan", juz: 29 },
  { id: 75, name: "القيامة", english: "Al-Qiyamah", meaning: "The Resurrection", verses: 40, type: "Meccan", juz: 29 },
  { id: 76, name: "الإنسان", english: "Al-Insan", meaning: "The Man", verses: 31, type: "Medinan", juz: 29 },
  { id: 77, name: "المرسلات", english: "Al-Mursalat", meaning: "The Emissaries", verses: 50, type: "Meccan", juz: 29 },
  { id: 78, name: "النبأ", english: "An-Naba", meaning: "The Tidings", verses: 40, type: "Meccan", juz: 30 },
  { id: 79, name: "النازعات", english: "An-Nazi'at", meaning: "Those Who Drag Forth", verses: 46, type: "Meccan", juz: 30 },
  { id: 80, name: "عبس", english: "Abasa", meaning: "He Frowned", verses: 42, type: "Meccan", juz: 30 },
  { id: 81, name: "التكوير", english: "At-Takwir", meaning: "The Overthrowing", verses: 29, type: "Meccan", juz: 30 },
  { id: 82, name: "الانفطار", english: "Al-Infitar", meaning: "The Cleaving", verses: 19, type: "Meccan", juz: 30 },
  { id: 83, name: "المطففين", english: "Al-Mutaffifin", meaning: "The Defrauding", verses: 36, type: "Meccan", juz: 30 },
  { id: 84, name: "الانشقاق", english: "Al-Inshiqaq", meaning: "The Sundering", verses: 25, type: "Meccan", juz: 30 },
  { id: 85, name: "البروج", english: "Al-Buruj", meaning: "The Mansions of the Stars", verses: 22, type: "Meccan", juz: 30 },
  { id: 86, name: "الطارق", english: "At-Tariq", meaning: "The Morning Star", verses: 17, type: "Meccan", juz: 30 },
  { id: 87, name: "الأعلى", english: "Al-A'la", meaning: "The Most High", verses: 19, type: "Meccan", juz: 30 },
  { id: 88, name: "الغاشية", english: "Al-Ghashiyah", meaning: "The Overwhelming", verses: 26, type: "Meccan", juz: 30 },
  { id: 89, name: "الفجر", english: "Al-Fajr", meaning: "The Dawn", verses: 30, type: "Meccan", juz: 30 },
  { id: 90, name: "البلد", english: "Al-Balad", meaning: "The City", verses: 20, type: "Meccan", juz: 30 },
  { id: 91, name: "الشمس", english: "Ash-Shams", meaning: "The Sun", verses: 15, type: "Meccan", juz: 30 },
  { id: 92, name: "الليل", english: "Al-Layl", meaning: "The Night", verses: 21, type: "Meccan", juz: 30 },
  { id: 93, name: "الضحى", english: "Ad-Duhaa", meaning: "The Morning Hours", verses: 11, type: "Meccan", juz: 30 },
  { id: 94, name: "الشرح", english: "Ash-Sharh", meaning: "The Relief", verses: 8, type: "Meccan", juz: 30 },
  { id: 95, name: "التين", english: "At-Tin", meaning: "The Fig", verses: 8, type: "Meccan", juz: 30 },
  { id: 96, name: "العلق", english: "Al-Alaq", meaning: "The Clot", verses: 19, type: "Meccan", juz: 30 },
  { id: 97, name: "القدر", english: "Al-Qadr", meaning: "The Power", verses: 5, type: "Meccan", juz: 30 },
  { id: 98, name: "البينة", english: "Al-Bayyinah", meaning: "The Clear Proof", verses: 8, type: "Medinan", juz: 30 },
  { id: 99, name: "الزلزلة", english: "Az-Zalzalah", meaning: "The Earthquake", verses: 8, type: "Medinan", juz: 30 },
  { id: 100, name: "العاديات", english: "Al-Adiyat", meaning: "The Courser", verses: 11, type: "Meccan", juz: 30 },
  { id: 101, name: "القارعة", english: "Al-Qari'ah", meaning: "The Calamity", verses: 11, type: "Meccan", juz: 30 },
  { id: 102, name: "التكاثر", english: "At-Takathur", meaning: "The Rivalry in Worldly Increase", verses: 8, type: "Meccan", juz: 30 },
  { id: 103, name: "العصر", english: "Al-Asr", meaning: "The Declining Day", verses: 3, type: "Meccan", juz: 30 },
  { id: 104, name: "الهمزة", english: "Al-Humazah", meaning: "The Traducer", verses: 9, type: "Meccan", juz: 30 },
  { id: 105, name: "الفيل", english: "Al-Fil", meaning: "The Elephant", verses: 5, type: "Meccan", juz: 30 },
  { id: 106, name: "قريش", english: "Quraysh", meaning: "Quraysh", verses: 4, type: "Meccan", juz: 30 },
  { id: 107, name: "الماعون", english: "Al-Ma'un", meaning: "The Small Kindnesses", verses: 7, type: "Meccan", juz: 30 },
  { id: 108, name: "الكوثر", english: "Al-Kawthar", meaning: "The Abundance", verses: 3, type: "Meccan", juz: 30 },
  { id: 109, name: "الكافرون", english: "Al-Kafirun", meaning: "The Disbelievers", verses: 6, type: "Meccan", juz: 30 },
  { id: 110, name: "النصر", english: "An-Nasr", meaning: "The Divine Support", verses: 3, type: "Medinan", juz: 30 },
  { id: 111, name: "المسد", english: "Al-Masad", meaning: "The Palm Fibre", verses: 5, type: "Meccan", juz: 30 },
  { id: 112, name: "الإخلاص", english: "Al-Ikhlas", meaning: "The Sincerity", verses: 4, type: "Meccan", juz: 30 },
  { id: 113, name: "الفلق", english: "Al-Falaq", meaning: "The Daybreak", verses: 5, type: "Meccan", juz: 30 },
  { id: 114, name: "الناس", english: "An-Nas", meaning: "Mankind", verses: 6, type: "Meccan", juz: 30 },
];

const Mushaf = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "Meccan" | "Medinan">("all");

  const filtered = surahs.filter((s) => {
    const matchesSearch =
      s.name.includes(searchQuery) ||
      s.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toString() === searchQuery;
    const matchesType = filterType === "all" || s.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-gradient-hero text-primary-foreground py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 geometric-pattern opacity-10" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              المصحف الشريف
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              The Noble Quran — Read, Reflect & Connect
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="container mx-auto px-4 -mt-8 relative z-20">
          <div className="bg-card rounded-2xl shadow-elevated p-4 md:p-6 border border-border">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by surah name, number, or meaning..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <div className="flex gap-2">
                {(["all", "Meccan", "Medinan"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filterType === type
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                  >
                    {type === "all" ? "All" : type}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-3">
              Showing {filtered.length} of 114 Surahs
            </p>
          </div>
        </section>

        {/* Surah Grid */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((surah) => (
              <Link
                key={surah.id}
                to={`/mushaf/${surah.id}`}
                className="group bg-card border border-border rounded-xl p-5 hover:shadow-elevated hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  {/* Number */}
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{surah.id}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {surah.english}
                      </h3>
                      <span className="text-xl text-foreground/80 flex-shrink-0" style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}>
                        {surah.name}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{surah.meaning}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {surah.verses} verses
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          surah.type === "Meccan"
                            ? "border-accent/50 text-accent"
                            : "border-primary/50 text-primary"
                        }`}
                      >
                        {surah.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-auto">Juz {surah.juz}</span>
                    </div>
                  </div>

                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Mushaf;
