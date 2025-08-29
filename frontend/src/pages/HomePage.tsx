import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated, useTrail } from 'react-spring';
import { ReactTyped } from 'react-typed';
import { 
  Shield, 
  Lock, 
  Zap, 
  Trophy, 
  Users, 
  Target,
  ChevronRight,
  Globe,
  Cloud,
  Eye,
  Key,
  Network,
  BarChart3,
  BookOpen,
  Award,
  Clock,
  Star
} from 'lucide-react';

import { Button } from '../../@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../@/components/ui/card';
import { Badge } from '../../@/components/ui/badge';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection observers for animations
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [categoriesRef, categoriesInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [leaderboardRef, leaderboardInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [resourcesRef, resourcesInView] = useInView({ threshold: 0.2, triggerOnce: true });

  // Hero section animation
  const heroAnimation = useSpring({
    opacity: heroInView ? 1 : 0,
    transform: heroInView ? 'translateY(0px)' : 'translateY(50px)',
    config: { tension: 120, friction: 25 }
  });

  // Section animations
  const howItWorksAnimation = useSpring({
    opacity: howItWorksInView ? 1 : 0,
    transform: howItWorksInView ? 'translateY(0px)' : 'translateY(50px)',
    config: { tension: 120, friction: 25 }
  });

  const categoriesAnimation = useSpring({
    opacity: categoriesInView ? 1 : 0,
    transform: categoriesInView ? 'translateY(0px)' : 'translateY(50px)',
    config: { tension: 120, friction: 25 }
  });

  // Benefits cards trail animation
  const benefitsData = [
    {
      icon: Zap,
      title: 'Learn Cybersecurity the Fun Way',
      description: 'Interactive quizzes make learning engaging and memorable'
    },
    {
      icon: BarChart3,
      title: 'AI-Driven Quiz Feedback',
      description: 'Get personalized insights and improvement recommendations'
    },
    {
      icon: Trophy,
      title: 'Climb the Leaderboard & Compete',
      description: 'Compete with professionals and track your progress'
    }
  ];

  const benefitsTrail = useTrail(benefitsData.length, {
    opacity: benefitsInView ? 1 : 0,
    transform: benefitsInView ? 'translateY(0px)' : 'translateY(50px)',
    config: { tension: 120, friction: 25 }
  });

  // Categories data
  const categories = [
    {
      icon: Shield,
      title: 'Network Security',
      description: 'Protect networks from cyber threats and vulnerabilities',
      slug: 'network-security'
    },
    {
      icon: Key,
      title: 'Cryptography',
      description: 'Master encryption, decryption, and secure communications',
      slug: 'cryptography'
    },
    {
      icon: Eye,
      title: 'Ethical Hacking',
      description: 'Learn penetration testing and vulnerability assessment',
      slug: 'ethical-hacking'
    },
    {
      icon: Globe,
      title: 'Web Security',
      description: 'Secure web applications and prevent common attacks',
      slug: 'web-security'
    },
    {
      icon: Cloud,
      title: 'Cloud Security',
      description: 'Protect cloud infrastructure and services',
      slug: 'cloud-security'
    }
  ];

  // How it works steps
  const steps = [
    {
      number: '01',
      title: 'Choose Your Category',
      description: 'Select from Network Security, Ethical Hacking, Cryptography, and more specialized areas'
    },
    {
      number: '02',
      title: 'Select Difficulty & Start',
      description: 'Choose your skill level and begin your interactive cybersecurity quiz journey'
    },
    {
      number: '03',
      title: 'Track Progress & Compete',
      description: 'Learn from mistakes, track your improvement, and climb the global leaderboard'
    }
  ];

  // Mock leaderboard data
  const leaderboardData = [
    { name: 'Alex Chen', score: 2840, rank: 1 },
    { name: 'Sarah Johnson', score: 2735, rank: 2 },
    { name: 'Mike Rodriguez', score: 2690, rank: 3 },
    { name: 'Emma Davis', score: 2645, rank: 4 },
    { name: 'David Kim', score: 2580, rank: 5 }
  ];

  // Mock resources data
  const resources = [
    {
      title: 'Spotting Phishing Emails in 60 Seconds',
      description: 'Learn to identify malicious emails and protect yourself',
      readTime: '3 min read'
    },
    {
      title: 'Strong Passwords: A 5-Step Playbook',
      description: 'Create unbreakable passwords that keep you secure',
      readTime: '5 min read'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 0)`
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
          <div 
            className="absolute inset-0 circuit-bg opacity-10"
            style={{
              transform: `translate3d(${mousePosition.x * -20}px, ${mousePosition.y * -20}px, 0)`
            }}
          />
        </div>

        {/* Floating Elements */}
        <div 
          className="absolute top-1/4 left-1/4 text-cyber-neon/20 animate-glow"
          style={{
            transform: `translate3d(${mousePosition.x * -30}px, ${mousePosition.y * -30}px, 0)`
          }}
        >
          <Shield size={80} />
        </div>
        <div 
          className="absolute bottom-1/3 right-1/4 text-cyber-purple/20 animate-glow"
          style={{
            transform: `translate3d(${mousePosition.x * 25}px, ${mousePosition.y * 25}px, 0)`
          }}
        >
          <Lock size={60} />
        </div>

        <animated.div 
          style={heroAnimation}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-foreground mb-2">Level Up Your</span>
            <span className="text-transparent bg-gradient-cyber bg-clip-text">
              <ReactTyped
                strings={[
                  'Cybersecurity Knowledge',
                  'Hacking Skills',
                  'Online Safety',
                  'Digital Defenses'
                ]}
                typeSpeed={50}
                backSpeed={30}
                backDelay={2000}
                loop
              />
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Interactive quizzes, curated resources, and real-time challenges to strengthen your cybersecurity knowledge and skills.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/quiz">
              <Button size="lg" className="bg-gradient-cyber hover:shadow-glow text-lg px-8 py-4">
                Take a Free Quiz
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <a href="#categories">
              <Button variant="outline" size="lg" className="border-cyber-neon/30 hover:border-primary text-lg px-8 py-4">
                Explore Categories
              </Button>
            </a>
          </div>
        </animated.div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-card/20 to-background" />
        
        <animated.div style={howItWorksAnimation} className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with CyberVeer in three simple steps and begin your journey to cybersecurity mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <Card key={index} className="relative group hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-cyber flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {step.number}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/quiz">
              <Button size="lg" className="bg-gradient-cyber hover:shadow-glow">
                Start Your First Quiz
                <Target className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </animated.div>
      </section>

      {/* Quiz Categories Section */}
      <section id="categories" ref={categoriesRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <animated.div style={categoriesAnimation} className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quiz Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master cybersecurity across multiple domains with our comprehensive quiz categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-cyber/10 group-hover:bg-gradient-cyber/20 transition-colors">
                      <category.icon className="w-6 h-6 text-cyber-neon" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/quiz?category=${category.slug}`}>
                    <Button className="w-full group-hover:shadow-glow">
                      Take Quiz
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/categories">
              <Button variant="outline" size="lg" className="border-cyber-neon/30 hover:border-primary">
                View All Categories
              </Button>
            </Link>
          </div>
        </animated.div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-card/20 to-background" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CyberVeer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the most effective way to learn cybersecurity with our innovative platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefitsTrail.map((style, index) => (
              <animated.div key={index} style={style}>
                <Card className="h-full text-center hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-cyber/10 flex items-center justify-center mx-auto mb-4">
                      {(() => {
                        const IconComponent = benefitsData[index].icon;
                        return <IconComponent className="w-8 h-8 text-cyber-neon" />;
                      })()}
                    </div>
                    <CardTitle className="text-xl">{benefitsData[index].title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefitsData[index].description}</p>
                  </CardContent>
                </Card>
              </animated.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-cyber hover:shadow-glow">
                Create Free Account
                <Users className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section ref={leaderboardRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Performers This Week</h2>
            <p className="text-lg text-muted-foreground">
              See how you stack up against cybersecurity experts worldwide.
            </p>
          </div>

          <Card className="hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center">
                <Trophy className="w-6 h-6 text-cyber-neon mr-2" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.map((player, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 rounded-lg bg-card/50 hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Badge 
                        variant={index < 3 ? "default" : "secondary"}
                        className={index < 3 ? "bg-gradient-cyber" : ""}
                      >
                        #{player.rank}
                      </Badge>
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-cyber-neon" />
                      <span className="font-bold">{player.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Link to="/leaderboard">
                  <Button variant="outline" className="border-cyber-neon/30 hover:border-primary">
                    View Full Leaderboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resources Section */}
      <section ref={resourcesRef} className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-card/20 to-background" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learning Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expand your knowledge with our curated cybersecurity resources and guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-2">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </div>
                    <BookOpen className="w-6 h-6 text-cyber-neon flex-shrink-0 ml-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {resource.readTime}
                    </div>
                    <Button size="sm" variant="outline" className="border-cyber-neon/30 hover:border-primary">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/resources">
              <Button size="lg" variant="outline" className="border-cyber-neon/30 hover:border-primary">
                Explore More Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;