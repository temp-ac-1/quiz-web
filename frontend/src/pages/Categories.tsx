
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, Clock, Users, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Skeleton } from '../components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  totalQuizzes: number;
  completedQuizzes: number;
  estimatedTime: string;
  participants: number;
  rating: number;
  slug: string;
}

const Categories: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [isLoading, setIsLoading] = useState(false);

  // Mock categories data
  const categories: Category[] = [
    {
      id: '1',
      title: 'Network Security',
      description: 'Learn to protect networks from cyber threats, configure firewalls, and implement security protocols.',
      icon: '🛡️',
      difficulty: 'Intermediate',
      progress: 65,
      totalQuizzes: 15,
      completedQuizzes: 8,
      estimatedTime: '6 hours',
      participants: 2847,
      rating: 4.8,
      slug: 'network-security'
    },
    {
      id: '2',
      title: 'Cryptography',
      description: 'Master encryption, decryption, digital signatures, and secure communication protocols.',
      icon: '🔐',
      difficulty: 'Advanced',
      progress: 30,
      totalQuizzes: 20,
      completedQuizzes: 4,
      estimatedTime: '8 hours',
      participants: 1924,
      rating: 4.9,
      slug: 'cryptography'
    },
    {
      id: '3',
      title: 'Ethical Hacking',
      description: 'Learn penetration testing, vulnerability assessment, and responsible disclosure practices.',
      icon: '🕵️',
      difficulty: 'Advanced',
      progress: 15,
      totalQuizzes: 25,
      completedQuizzes: 2,
      estimatedTime: '12 hours',
      participants: 3521,
      rating: 4.7,
      slug: 'ethical-hacking'
    },
    {
      id: '4',
      title: 'Web Security',
      description: 'Secure web applications against OWASP top 10 vulnerabilities and common attacks.',
      icon: '🌐',
      difficulty: 'Intermediate',
      progress: 80,
      totalQuizzes: 18,
      completedQuizzes: 14,
      estimatedTime: '7 hours',
      participants: 2156,
      rating: 4.6,
      slug: 'web-security'
    },
    {
      id: '5',
      title: 'Cloud Security',
      description: 'Protect cloud infrastructure, implement IAM policies, and secure cloud-native applications.',
      icon: '☁️',
      difficulty: 'Advanced',
      progress: 45,
      totalQuizzes: 22,
      completedQuizzes: 9,
      estimatedTime: '10 hours',
      participants: 1678,
      rating: 4.5,
      slug: 'cloud-security'
    },
    {
      id: '6',
      title: 'Malware Analysis',
      description: 'Analyze malicious software, understand attack vectors, and develop detection strategies.',
      icon: '🦠',
      difficulty: 'Advanced',
      progress: 0,
      totalQuizzes: 16,
      completedQuizzes: 0,
      estimatedTime: '9 hours',
      participants: 987,
      rating: 4.4,
      slug: 'malware-analysis'
    },
    {
      id: '7',
      title: 'Digital Forensics',
      description: 'Investigate cyber incidents, collect digital evidence, and perform forensic analysis.',
      icon: '🔍',
      difficulty: 'Intermediate',
      progress: 25,
      totalQuizzes: 14,
      completedQuizzes: 3,
      estimatedTime: '8 hours',
      participants: 1245,
      rating: 4.3,
      slug: 'digital-forensics'
    },
    {
      id: '8',
      title: 'Social Engineering',
      description: 'Understand psychological manipulation tactics and defend against human-based attacks.',
      icon: '🎭',
      difficulty: 'Beginner',
      progress: 90,
      totalQuizzes: 12,
      completedQuizzes: 11,
      estimatedTime: '4 hours',
      participants: 3892,
      rating: 4.2,
      slug: 'social-engineering'
    }
  ];

  // Filtered and sorted categories
  const filteredCategories = useMemo(() => {
    let filtered = categories.filter(category => {
      const matchesSearch = category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           category.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'all' || category.difficulty === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
    });

    // Sort categories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.participants - a.participants;
        case 'rating':
          return b.rating - a.rating;
        case 'progress':
          return b.progress - a.progress;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, difficultyFilter, sortBy]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Intermediate':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Advanced':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const CategorySkeleton = () => (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-2 w-full mb-4" />
        <div className="flex items-center justify-between text-sm mb-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-gradient-cyber bg-clip-text">
                Explore Categories
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master cybersecurity across multiple domains with our comprehensive learning paths and interactive quizzes.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 input-cyber"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4 items-center">
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="progress">Your Progress</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredCategories.length} of {categories.length} categories
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <CategorySkeleton key={index} />
                ))
              : filteredCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="group h-full hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30 hover:scale-105"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-3xl">{category.icon}</div>
                        <Badge className={getDifficultyColor(category.difficulty)}>
                          {category.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{category.progress}%</span>
                        </div>
                        <Progress value={category.progress} className="h-2" />
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {category.estimatedTime}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {category.participants.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                          {category.rating}
                        </div>
                      </div>

                      {/* Quiz info */}
                      <div className="text-sm text-muted-foreground">
                        {category.completedQuizzes}/{category.totalQuizzes} quizzes completed
                      </div>

                      {/* CTA Button */}
                      <Link to={`/category/${category.slug}`} className="block">
                        <Button className="w-full group-hover:shadow-glow">
                          Explore Now
                          <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
          </div>

          {/* Empty state */}
          {!isLoading && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No categories found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setDifficultyFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;