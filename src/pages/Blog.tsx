import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const featuredPost = {
  title: "The Future of Online Qur'an Education: Trends for 2024",
  excerpt: "Explore how technology is transforming the way we teach and learn the Qur'an, from AI-powered tajweed feedback to global virtual classrooms.",
  author: "Dr. Ahmad Hassan",
  date: "January 15, 2024",
  readTime: "8 min read",
  category: "Industry Insights",
};

const posts = [
  {
    title: "5 Tips for Effective Hifz Progress Tracking",
    excerpt: "Learn how to systematically track your students' memorization journey and keep them motivated.",
    author: "Ustadha Fatima Ali",
    date: "January 10, 2024",
    readTime: "5 min read",
    category: "Teaching Tips",
  },
  {
    title: "Building a Sustainable Online Qur'an Academy",
    excerpt: "From pricing strategies to student retention, here's how to build an academy that thrives.",
    author: "Sarah Rahman",
    date: "January 5, 2024",
    readTime: "7 min read",
    category: "Academy Growth",
  },
  {
    title: "The Importance of Revision in Hifz Programs",
    excerpt: "Why revision is the backbone of successful memorization and how to implement it effectively.",
    author: "Sheikh Omar Ibrahim",
    date: "December 28, 2023",
    readTime: "6 min read",
    category: "Teaching Tips",
  },
  {
    title: "Managing Multiple Tutors: A Guide for Academy Owners",
    excerpt: "Strategies for coordinating tutors, maintaining quality, and scaling your operations.",
    author: "Dr. Ahmad Hassan",
    date: "December 20, 2023",
    readTime: "8 min read",
    category: "Academy Growth",
  },
  {
    title: "Student Engagement in Virtual Qur'an Classes",
    excerpt: "Practical techniques to keep students focused and engaged during online sessions.",
    author: "Ustadha Fatima Ali",
    date: "December 15, 2023",
    readTime: "5 min read",
    category: "Teaching Tips",
  },
  {
    title: "Understanding Tajweed Assessment Methods",
    excerpt: "A comprehensive look at different approaches to evaluating students' recitation quality.",
    author: "Sheikh Yusuf Malik",
    date: "December 10, 2023",
    readTime: "10 min read",
    category: "Teaching Tips",
  },
];

const categories = [
  "All Posts",
  "Teaching Tips",
  "Academy Growth",
  "Industry Insights",
  "Product Updates",
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-10" />
        <div className="container relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            QiraatCloud Blog
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            Insights, tips, and resources for Qur'an educators. Learn how to 
            teach better, grow your academy, and make a greater impact.
          </p>
        </div>
      </header>

      {/* Categories */}
      <section className="py-8 border-b border-border sticky top-0 bg-background z-40">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="bg-card rounded-2xl overflow-hidden shadow-elevated border border-border">
            <div className="grid lg:grid-cols-2">
              <div className="bg-gradient-hero p-8 lg:p-12 flex items-center">
                <div className="text-primary-foreground">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-foreground/20 rounded-full mb-4">
                    <span className="text-xs font-medium">Featured</span>
                  </div>
                  <div className="text-sm text-primary-foreground/70 mb-2">{featuredPost.category}</div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-primary-foreground/80 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
                    <span>{featuredPost.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex items-center justify-center bg-secondary/30">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-gold">
                    <span className="font-display text-4xl font-bold text-accent-foreground">Q</span>
                  </div>
                  <Button className="bg-gradient-hero hover:opacity-90">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <article
                key={index}
                className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border hover:shadow-elevated transition-all duration-300 group cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-background rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="font-display text-2xl font-bold text-primary">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-medium text-accent mb-2">{post.category}</div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest articles, teaching tips, and product updates delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-gradient-hero hover:opacity-90 px-6">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
