import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Settings, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

// Sample verses data for demonstration (Al-Fatihah + partial Al-Baqarah)
const surahVerses: Record<number, { bismillah: boolean; verses: { id: number; arabic: string; translation: string }[] }> = {
  1: {
    bismillah: false,
    verses: [
      { id: 1, arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", translation: "In the name of Allah, the Most Gracious, the Most Merciful." },
      { id: 2, arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ", translation: "All praise is due to Allah, Lord of all worlds." },
      { id: 3, arabic: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ", translation: "The Most Gracious, the Most Merciful." },
      { id: 4, arabic: "مَـٰلِكِ يَوْمِ ٱلدِّينِ", translation: "Master of the Day of Judgment." },
      { id: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "You alone we worship, and You alone we ask for help." },
      { id: 6, arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", translation: "Guide us on the Straight Path." },
      { id: 7, arabic: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", translation: "The path of those You have blessed—not those who earned Your anger, nor those who went astray." },
    ],
  },
  112: {
    bismillah: true,
    verses: [
      { id: 1, arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ", translation: "Say, 'He is Allah, the One.'" },
      { id: 2, arabic: "ٱللَّهُ ٱلصَّمَدُ", translation: "Allah, the Eternal Refuge." },
      { id: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "He neither begets nor is born." },
      { id: 4, arabic: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", translation: "Nor is there to Him any equivalent." },
    ],
  },
  113: {
    bismillah: true,
    verses: [
      { id: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ", translation: "Say, 'I seek refuge in the Lord of daybreak.'" },
      { id: 2, arabic: "مِن شَرِّ مَا خَلَقَ", translation: "From the evil of that which He created." },
      { id: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", translation: "And from the evil of darkness when it settles." },
      { id: 4, arabic: "وَمِن شَرِّ ٱلنَّفَّـٰثَـٰتِ فِى ٱلْعُقَدِ", translation: "And from the evil of the blowers in knots." },
      { id: 5, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", translation: "And from the evil of an envier when he envies." },
    ],
  },
  114: {
    bismillah: true,
    verses: [
      { id: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ", translation: "Say, 'I seek refuge in the Lord of mankind.'" },
      { id: 2, arabic: "مَلِكِ ٱلنَّاسِ", translation: "The Sovereign of mankind." },
      { id: 3, arabic: "إِلَـٰهِ ٱلنَّاسِ", translation: "The God of mankind." },
      { id: 4, arabic: "مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ", translation: "From the evil of the retreating whisperer." },
      { id: 5, arabic: "ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ", translation: "Who whispers in the breasts of mankind." },
      { id: 6, arabic: "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ", translation: "From among the jinn and mankind." },
    ],
  },
};

// Generate placeholder verses for surahs without data
const getVerses = (id: number) => {
  if (surahVerses[id]) return surahVerses[id];
  const surahInfo = surahNames[id];
  const count = surahInfo?.verses || 7;
  return {
    bismillah: id !== 9,
    verses: Array.from({ length: Math.min(count, 10) }, (_, i) => ({
      id: i + 1,
      arabic: `﴿ آية ${i + 1} من سورة ${surahInfo?.name || ""} ﴾`,
      translation: `Verse ${i + 1} of Surah ${surahInfo?.english || id} — Full text available in the complete Mushaf.`,
    })),
  };
};

const surahNames: Record<number, { name: string; english: string; meaning: string; verses: number; type: string }> = {
  1: { name: "الفاتحة", english: "Al-Fatihah", meaning: "The Opening", verses: 7, type: "Meccan" },
  2: { name: "البقرة", english: "Al-Baqarah", meaning: "The Cow", verses: 286, type: "Medinan" },
  3: { name: "آل عمران", english: "Ali 'Imran", meaning: "Family of Imran", verses: 200, type: "Medinan" },
  36: { name: "يس", english: "Ya-Sin", meaning: "Ya Sin", verses: 83, type: "Meccan" },
  55: { name: "الرحمن", english: "Ar-Rahman", meaning: "The Beneficent", verses: 78, type: "Medinan" },
  67: { name: "الملك", english: "Al-Mulk", meaning: "The Sovereignty", verses: 30, type: "Meccan" },
  112: { name: "الإخلاص", english: "Al-Ikhlas", meaning: "The Sincerity", verses: 4, type: "Meccan" },
  113: { name: "الفلق", english: "Al-Falaq", meaning: "The Daybreak", verses: 5, type: "Meccan" },
  114: { name: "الناس", english: "An-Nas", meaning: "Mankind", verses: 6, type: "Meccan" },
};

const MushafReader = () => {
  const { surahId } = useParams<{ surahId: string }>();
  const id = parseInt(surahId || "1", 10);
  const [fontSize, setFontSize] = useState(32);
  const [showTranslation, setShowTranslation] = useState(true);

  const surah = surahNames[id] || {
    name: `سورة ${id}`,
    english: `Surah ${id}`,
    meaning: "",
    verses: 7,
    type: "Meccan",
  };
  const data = getVerses(id);

  const prevId = id > 1 ? id - 1 : null;
  const nextId = id < 114 ? id + 1 : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/mushaf"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">All Surahs</span>
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-base md:text-lg font-bold text-foreground leading-tight">
              {surah.english}
            </h1>
            <p className="text-xs text-muted-foreground">{surah.meaning}</p>
          </div>

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Settings className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72" align="end">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Arabic Font Size: {fontSize}px
                    </label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setFontSize(Math.max(20, fontSize - 2))}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Slider
                        value={[fontSize]}
                        onValueChange={([v]) => setFontSize(v)}
                        min={20}
                        max={56}
                        step={2}
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setFontSize(Math.min(56, fontSize + 2))}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Show Translation</label>
                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className={`w-10 h-6 rounded-full transition-colors ${showTranslation ? "bg-primary" : "bg-muted"}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-primary-foreground mx-1 transition-transform ${showTranslation ? "translate-x-4" : ""}`} />
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      {/* Reader Content */}
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-6 md:py-10 max-w-4xl flex-1">
          {/* Surah Header Ornament */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block bg-primary/5 border border-primary/15 rounded-2xl px-8 py-5 md:px-12 md:py-7">
              <p
                className="text-3xl md:text-5xl text-foreground mb-2 leading-relaxed"
                style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
              >
                {surah.name}
              </p>
              <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                <span>{surah.type}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{surah.verses} Verses</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>Surah {id}</span>
              </div>
            </div>
          </div>

          {/* Bismillah */}
          {data.bismillah && (
            <div className="text-center mb-8">
              <p
                className="text-2xl md:text-3xl text-primary/80"
                style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif", fontSize: fontSize * 0.85 }}
              >
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
            </div>
          )}

          {/* Verses */}
          <div className="space-y-6 md:space-y-8">
            {data.verses.map((verse) => (
              <div
                key={verse.id}
                className="group rounded-xl border border-transparent hover:border-border hover:bg-card/50 p-4 md:p-6 transition-all"
              >
                {/* Verse number */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <span className="text-xs font-bold text-primary">{verse.id}</span>
                  </div>

                  <div className="flex-1 space-y-3">
                    {/* Arabic */}
                    <p
                      className="text-right leading-[2] text-foreground"
                      style={{
                        fontFamily: "'Amiri', 'Traditional Arabic', 'Arial', serif",
                        fontSize: `${fontSize}px`,
                        lineHeight: 2,
                      }}
                      dir="rtl"
                    >
                      {verse.arabic}
                      <span className="inline-block mx-1 text-primary/60" style={{ fontSize: fontSize * 0.5 }}>
                        ﴿{verse.id}﴾
                      </span>
                    </p>

                    {/* Translation */}
                    {showTranslation && (
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                        {verse.translation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="sticky bottom-0 bg-card/95 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-4xl">
            {prevId ? (
              <Link
                to={`/mushaf/${prevId}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous Surah</span>
                <span className="sm:hidden">Prev</span>
              </Link>
            ) : (
              <div />
            )}

            <Link
              to="/mushaf"
              className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <BookOpen className="h-4 w-4" />
              <span>Index</span>
            </Link>

            {nextId ? (
              <Link
                to={`/mushaf/${nextId}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="hidden sm:inline">Next Surah</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MushafReader;
