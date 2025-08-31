import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, PenTool, Star, TrendingUp, Clock, User, Eye, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Dummy data for blog articles
const blogArticles = [
  {
    id: 1,
    title: "Advanced Network Security: Zero Trust Architecture",
    slug: "zero-trust-architecture-guide",
    excerpt: "Learn how to implement Zero Trust security model in modern enterprise environments...",
    author: { name: "Sarah Chen", avatar: "/api/placeholder/40/40" },
    category: "Network Security",
    skillLevel: "Advanced",
    readTime: "12 min",
    tags: ["Zero Trust", "Enterprise", "Architecture"],
    trending: true,
    views: 2341,
    publishedAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Malware Analysis with Wireshark: A Beginner's Guide",
    slug: "malware-analysis-wireshark-guide",
    excerpt: "Step-by-step tutorial on analyzing network traffic to detect malicious activities...",
    author: { name: "Mike Rodriguez", avatar: "/api/placeholder/40/40" },
    category: "Malware Analysis",
    skillLevel: "Beginner",
    readTime: "8 min",
    tags: ["Wireshark", "Network Analysis", "Detection"],
    featured: true,
    views: 1892,
    publishedAt: "2024-01-14"
  },
  {
    id: 3,
    title: "Cryptography Fundamentals: RSA vs ECC",
    slug: "cryptography-rsa-vs-ecc",
    excerpt: "Deep dive into the mathematical foundations and practical applications of RSA and ECC...",
    author: { name: "Dr. Emily Watson", avatar: "/api/placeholder/40/40" },
    category: "Cryptography",
    skillLevel: "Intermediate",
    readTime: "15 min",
    tags: ["RSA", "ECC", "Mathematics", "Encryption"],
    views: 3401,
    publishedAt: "2024-01-13"
  },
  {
    id: 4,
    title: "Secure Coding Practices for Node.js Applications",
    slug: "secure-coding-nodejs",
    excerpt: "Essential security patterns and common vulnerabilities to avoid in Node.js development...",
    author: { name: "Alex Thompson", avatar: "/api/placeholder/40/40" },
    category: "Secure Coding",
    skillLevel: "Intermediate",
    readTime: "10 min",
    tags: ["Node.js", "OWASP", "Web Security"],
    views: 1567,
    publishedAt: "2024-01-12"
  },
  {
    id: 5,
    title: "Linux Threat Hunting: Advanced Techniques",
    slug: "linux-threat-hunting-techniques",
    excerpt: "Master advanced threat hunting methodologies using Linux command line tools...",
    author: { name: "Jordan Kim", avatar: "/api/placeholder/40/40" },
    category: "Threat Hunting",
    skillLevel: "Advanced",
    readTime: "18 min",
    tags: ["Linux", "Threat Hunting", "CLI", "Forensics"],
    featured: true,
    views: 2876,
    publishedAt: "2024-01-11"
  },
  {
    id: 6,
    title: "Introduction to Penetration Testing",
    slug: "penetration-testing-introduction",
    excerpt: "Your first steps into ethical hacking and penetration testing methodologies...",
    author: { name: "Lisa Chang", avatar: "/api/placeholder/40/40" },
    category: "Penetration Testing",
    skillLevel: "Beginner",
    readTime: "6 min",
    tags: ["Pentesting", "Ethical Hacking", "Methodology"],
    views: 4231,
    publishedAt: "2024-01-10"
  }
];

const categories = ["All", "Network Security", "Malware Analysis", "Cryptography", "Secure Coding", "Threat Hunting", "Penetration Testing"];
const skillLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const tags = ["Wireshark", "OWASP", "Linux", "Threat Hunting", "Zero Trust", "RSA", "Node.js", "Pentesting"];
const sortOptions = ["Most Recent", "Trending", "Most Viewed"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("All Levels");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Most Recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSkillLevel = selectedSkillLevel === "All Levels" || article.skillLevel === selectedSkillLevel;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => article.tags.includes(tag));
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSkillLevel && matchesTags && matchesSearch;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "Most Viewed": return b.views - a.views;
      case "Trending": return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      default: return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const currentArticles = sortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const featuredArticles = blogArticles.filter(article => article.featured || article.trending);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-background via-background to-primary/5">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            Share Knowledge. Learn More. Stay Ahead.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore cybersecurity insights, tutorials, and guides written by the community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="bg-gradient-cyber text-white hover:opacity-90">
              <PenTool className="w-5 h-5 mr-2" />
              ✍️ Write a Blog
            </Button>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Discover Section */}
      <section className="py-8 px-4 border-b border-border/50">
        <div className="container mx-auto max-w-7xl">
          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Skill Levels */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Skill Level</h3>
            <div className="flex flex-wrap gap-2">
              {skillLevels.map((level) => (
                <Button
                  key={level}
                  variant={selectedSkillLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSkillLevel(level)}
                  className="rounded-full"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTag(tag)}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex justify-between items-center">
            <div className="text-muted-foreground">
              Showing {currentArticles.length} of {sortedArticles.length} articles
            </div>
            <div className="flex gap-2">
              {sortOptions.map((option) => (
                <Button
                  key={option}
                  variant={sortBy === option ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Star className="w-8 h-8 text-yellow-500" />
              Featured & Trending
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredArticles.slice(0, 3).map((article) => (
                <Link key={article.id} to={`/blog/${article.slug}`}>
                  <Card className="group hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30 relative overflow-hidden">
                    {article.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          ⭐ Editor's Pick
                        </Badge>
                      </div>
                    )}
                    {article.trending && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          🔥 Trending
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full bg-muted" />
                        <div>
                          <p className="font-medium">{article.author.name}</p>
                          <p className="text-sm text-muted-foreground">{article.category}</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={getSkillLevelColor(article.skillLevel)}>
                          {article.skillLevel}
                        </Badge>
                        {article.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {article.views}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Articles Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArticles.map((article) => (
              <Link key={article.id} to={`/blog/${article.slug}`}>
                <Card className="group hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={article.author.avatar} alt={article.author.name} className="w-10 h-10 rounded-full bg-muted" />
                      <div>
                        <p className="font-medium">{article.author.name}</p>
                        <p className="text-sm text-muted-foreground">{article.category}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={getSkillLevelColor(article.skillLevel)}>
                        {article.skillLevel}
                      </Badge>
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-10 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Community Engagement Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Want to share your knowledge with the cybersecurity community?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of cybersecurity professionals sharing insights and learning together.
          </p>
          <Button size="lg" className="bg-gradient-cyber text-white hover:opacity-90 mb-6">
            <PenTool className="w-5 h-5 mr-2" />
            ✍️ Start Writing
          </Button>
          <p className="text-muted-foreground">
            <strong>1,200+</strong> articles shared by cybersecurity enthusiasts
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest cybersecurity articles and insights delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              type="email"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;