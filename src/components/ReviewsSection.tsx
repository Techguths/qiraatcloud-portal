import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewFormModal from "./ReviewFormModal";

const reviews = [
  {
    name: "Sheikh Ahmad Al-Farsi",
    role: "Director, Al-Noor Academy",
    image: "A",
    rating: 5,
    review: "QiraatCloud transformed how we manage our academy. With 200+ students and 15 tutors, we needed a system that could handle complexity. This platform delivers exactly that.",
  },
  {
    name: "Ustadha Fatima Hassan",
    role: "Independent Tutor",
    image: "F",
    rating: 5,
    review: "As a solo tutor, I was drowning in spreadsheets. QiraatCloud simplified everything - scheduling, progress tracking, parent communication. I can focus on teaching now.",
  },
  {
    name: "Dr. Omar Ibrahim",
    role: "Founder, Tajweed Institute",
    image: "O",
    rating: 5,
    review: "The Hifz tracking feature is exceptional. Parents love seeing their children's memorization progress in real-time. It's increased retention in our program significantly.",
  },
  {
    name: "Ustadh Yusuf Malik",
    role: "Head Tutor, Barakah Learning",
    image: "Y",
    rating: 5,
    review: "We switched from a generic LMS to QiraatCloud. The difference is night and day. Everything is designed with Qur'an teaching in mind. Highly recommended!",
  },
  {
    name: "Sister Aisha Rahman",
    role: "Online Qur'an Teacher",
    image: "A",
    rating: 5,
    review: "Teaching students across different time zones was a nightmare. The smart scheduling feature handles it perfectly. My students never miss a class anymore.",
  },
  {
    name: "Sheikh Mohammed Ali",
    role: "Principal, Furqan Academy",
    image: "M",
    rating: 5,
    review: "The reporting features help us show parents exactly where their children are in their Qur'an journey. It's professional and builds trust with families.",
  },
];

const ReviewsSection = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <section id="reviews" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
            <span className="text-sm font-medium text-accent">User Reviews</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Our{" "}
            <span className="text-gradient-gold">Community Says</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join hundreds of Qur'an educators who trust QiraatCloud for their teaching needs.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-elevated transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-accent/30 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                "{review.review}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-foreground">
                    {review.image}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-hero hover:opacity-90"
            onClick={() => setIsReviewModalOpen(true)}
          >
            Write a Review
          </Button>
        </div>
      </div>

      {/* Review Form Modal */}
      <ReviewFormModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
      />
    </section>
  );
};

export default ReviewsSection;
