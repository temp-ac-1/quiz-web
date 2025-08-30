import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Book, 
  Award, 
  Clock, 
  Users, 
  Star,
  Trophy,
  CheckCircle,
  Circle,
  Target,
  BookOpen,
  FileText,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LessonReader from '@/components/LessonReader';
import QuizTypeSelector from '@/components/QuizTypeSelector';

interface Quiz {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: number;
  timeEstimate: string;
  completed: boolean;
  score?: number;
  slug: string;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  completed: boolean;
}

interface LearningSection {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedTime: string;
  quizzes: Quiz[];
  lessons: Lesson[];
  isOpen: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  total?: number;
}

const CategoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showQuizSelector, setShowQuizSelector] = useState(false);
  
  // Mock category data (in real app, fetch based on slug)
  const categoryData = {
    id: '1',
    title: 'Network Security',
    description: 'Master the fundamentals of network security, including firewalls, intrusion detection systems, VPNs, and network protocols. Learn to identify vulnerabilities, implement security measures, and protect against common network attacks.',
    icon: '🛡️',
    difficulty: 'Intermediate',
    overallProgress: 65,
    totalQuizzes: 15,
    completedQuizzes: 8,
    totalLessons: 42,
    completedLessons: 28,
    estimatedTime: '6 hours remaining',
    participants: 2847,
    rating: 4.8,
    pointsEarned: 1250,
    slug: 'network-security'
  };

  const [sections, setSections] = useState<LearningSection[]>([
    {
      id: '1',
      title: 'Network Fundamentals',
      description: 'Learn the basics of network protocols, topologies, and communication models.',
      difficulty: 'Beginner',
      progress: 100,
      totalLessons: 8,
      completedLessons: 8,
      estimatedTime: '2 hours',
      isOpen: false,
      lessons: [
        {
          id: 'l1',
          title: 'Introduction to Computer Networks',
          content: '<h2>What is a Computer Network?</h2><p>A computer network is a collection of interconnected devices that can share resources and communicate with each other. These devices can include computers, servers, printers, routers, switches, and mobile devices.</p><h3>Key Components of Networks:</h3><ul><li><strong>Nodes:</strong> Individual devices connected to the network</li><li><strong>Links:</strong> Physical or wireless connections between nodes</li><li><strong>Protocols:</strong> Rules that govern how data is transmitted</li><li><strong>Network Interface Cards (NICs):</strong> Hardware that enables network connectivity</li></ul><h3>Types of Networks:</h3><p><strong>Local Area Network (LAN):</strong> Covers a small geographic area like a home or office</p><p><strong>Wide Area Network (WAN):</strong> Spans large geographic areas, often connecting multiple LANs</p><p><strong>Metropolitan Area Network (MAN):</strong> Covers a city or metropolitan area</p>',
          difficulty: 'Beginner',
          estimatedTime: '15 min',
          completed: true
        },
        {
          id: 'l2',
          title: 'OSI Model Overview',
          content: '<h2>The OSI Model</h2><p>The Open Systems Interconnection (OSI) model is a conceptual framework that standardizes the functions of a telecommunication or computing system into seven distinct layers.</p><h3>The Seven Layers:</h3><ol><li><strong>Physical Layer:</strong> Handles the physical transmission of raw bits</li><li><strong>Data Link Layer:</strong> Provides error detection and correction</li><li><strong>Network Layer:</strong> Manages routing and logical addressing</li><li><strong>Transport Layer:</strong> Ensures reliable data delivery</li><li><strong>Session Layer:</strong> Manages communication sessions</li><li><strong>Presentation Layer:</strong> Handles data encryption and compression</li><li><strong>Application Layer:</strong> Provides network services to applications</li></ol><h3>Why is the OSI Model Important?</h3><p>The OSI model helps network professionals understand how data flows through a network and troubleshoot connectivity issues by isolating problems to specific layers.</p>',
          difficulty: 'Beginner',
          estimatedTime: '20 min',
          completed: true
        }
      ],
      quizzes: [
        {
          id: 'q1',
          title: 'OSI Model Quiz',
          difficulty: 'Beginner',
          questions: 10,
          timeEstimate: '5 min',
          completed: true,
          score: 85,
          slug: 'osi-model-quiz'
        },
        {
          id: 'q2',
          title: 'TCP/IP Fundamentals',
          difficulty: 'Beginner',
          questions: 15,
          timeEstimate: '8 min',
          completed: true,
          score: 92,
          slug: 'tcp-ip-fundamentals'
        }
      ]
    },
    {
      id: '2',
      title: 'Firewall Configuration',
      description: 'Master firewall rules, policies, and advanced configuration techniques.',
      difficulty: 'Intermediate',
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      estimatedTime: '3 hours',
      isOpen: true,
      lessons: [
        {
          id: 'l3',
          title: 'Introduction to Firewalls',
          content: '<h2>What is a Firewall?</h2><p>A firewall is a network security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between a trusted internal network and untrusted external networks.</p><h3>Types of Firewalls:</h3><ul><li><strong>Packet Filtering Firewalls:</strong> Examine packets at the network layer</li><li><strong>Stateful Inspection Firewalls:</strong> Track connection states</li><li><strong>Application Layer Firewalls:</strong> Inspect application-specific data</li><li><strong>Next-Generation Firewalls (NGFW):</strong> Combine traditional firewall features with additional security functions</li></ul><h3>Firewall Rules:</h3><p>Firewall rules define what traffic is allowed or denied. They typically include:</p><ul><li>Source and destination IP addresses</li><li>Port numbers</li><li>Protocol types (TCP, UDP, ICMP)</li><li>Action (allow, deny, drop)</li></ul>',
          difficulty: 'Intermediate',
          estimatedTime: '18 min',
          completed: true
        },
        {
          id: 'l4',
          title: 'Configuring Firewall Rules',
          content: '<h2>Creating Effective Firewall Rules</h2><p>Proper firewall configuration is crucial for network security. Rules should be carefully planned and regularly reviewed.</p><h3>Best Practices:</h3><ul><li><strong>Principle of Least Privilege:</strong> Only allow necessary traffic</li><li><strong>Default Deny:</strong> Block all traffic by default, then allow specific exceptions</li><li><strong>Log Everything:</strong> Enable logging for monitoring and troubleshooting</li><li><strong>Regular Reviews:</strong> Periodically audit and update rules</li></ul><h3>Common Rule Types:</h3><p><strong>Inbound Rules:</strong> Control traffic coming into the network</p><p><strong>Outbound Rules:</strong> Control traffic leaving the network</p><p><strong>Internal Rules:</strong> Control traffic between internal network segments</p><h3>Testing Firewall Rules:</h3><p>Always test new rules in a controlled environment before deploying to production systems.</p>',
          difficulty: 'Intermediate',
          estimatedTime: '22 min',
          completed: false
        }
      ],
      quizzes: [
        {
          id: 'q3',
          title: 'Firewall Rules Quiz',
          difficulty: 'Intermediate',
          questions: 20,
          timeEstimate: '12 min',
          completed: true,
          score: 78,
          slug: 'firewall-rules-quiz'
        },
        {
          id: 'q4',
          title: 'Advanced Firewall Config',
          difficulty: 'Intermediate',
          questions: 18,
          timeEstimate: '10 min',
          completed: false,
          slug: 'advanced-firewall-config'
        }
      ]
    },
    {
      id: '3',
      title: 'Intrusion Detection Systems',
      description: 'Implement and configure IDS/IPS solutions for network monitoring.',
      difficulty: 'Advanced',
      progress: 25,
      totalLessons: 15,
      completedLessons: 4,
      estimatedTime: '4 hours',
      isOpen: false,
      lessons: [
        {
          id: 'l5',
          title: 'Introduction to IDS/IPS',
          content: '<h2>Intrusion Detection and Prevention Systems</h2><p>Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS) are critical security tools that monitor network traffic for malicious activities and policy violations.</p><h3>IDS vs IPS:</h3><p><strong>IDS (Intrusion Detection System):</strong></p><ul><li>Monitors and alerts on suspicious activities</li><li>Passive monitoring - does not block traffic</li><li>Provides detailed logs and forensic information</li></ul><p><strong>IPS (Intrusion Prevention System):</strong></p><ul><li>Actively blocks detected threats</li><li>Inline deployment - can stop attacks in real-time</li><li>May impact network performance due to inline processing</li></ul><h3>Detection Methods:</h3><ul><li><strong>Signature-based:</strong> Matches known attack patterns</li><li><strong>Anomaly-based:</strong> Detects deviations from normal behavior</li><li><strong>Hybrid:</strong> Combines both methods for comprehensive coverage</li></ul>',
          difficulty: 'Advanced',
          estimatedTime: '25 min',
          completed: false
        }
      ],
      quizzes: [
        {
          id: 'q5',
          title: 'IDS Fundamentals',
          difficulty: 'Intermediate',
          questions: 16,
          timeEstimate: '9 min',
          completed: false,
          slug: 'ids-fundamentals'
        },
        {
          id: 'q6',
          title: 'Snort Configuration',
          difficulty: 'Advanced',
          questions: 25,
          timeEstimate: '15 min',
          completed: false,
          slug: 'snort-configuration'
        }
      ]
    }
  ]);

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Network Novice',
      description: 'Completed your first network security lesson',
      icon: '🎯',
      earned: true
    },
    {
      id: '2',
      title: 'Firewall Master',
      description: 'Scored 90%+ on all firewall quizzes',
      icon: '🔥',
      earned: true
    },
    {
      id: '3',
      title: 'Quiz Streak',
      description: 'Complete 5 quizzes in a row with 80%+ score',
      icon: '⚡',
      earned: false,
      progress: 3,
      total: 5
    },
    {
      id: '4',
      title: 'Network Expert',
      description: 'Complete all network security sections',
      icon: '👑',
      earned: false,
      progress: 2,
      total: 3
    }
  ];

  const toggleSection = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    );
  };

  const handleLessonComplete = (lessonId: string) => {
    setSections(prev => 
      prev.map(section => ({
        ...section,
        lessons: section.lessons.map(lesson => 
          lesson.id === lessonId 
            ? { ...lesson, completed: true }
            : lesson
        ),
        completedLessons: section.lessons.filter(l => 
          l.completed || l.id === lessonId
        ).length,
        progress: Math.round((section.lessons.filter(l => 
          l.completed || l.id === lessonId
        ).length / section.lessons.length) * 100)
      }))
    );
  };

  const openLessonReader = (sectionId: string) => {
    setSelectedSection(sectionId);
  };

  const closeLessonReader = () => {
    setSelectedSection(null);
  };

  const openQuizSelector = () => {
    setShowQuizSelector(true);
  };

  const closeQuizSelector = () => {
    setShowQuizSelector(false);
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link 
              to="/categories" 
              className="flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Categories
            </Link>
          </div>

          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{categoryData.icon}</div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {categoryData.title}
                    </h1>
                    <Badge className={getDifficultyColor(categoryData.difficulty)}>
                      {categoryData.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {categoryData.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-primary">{categoryData.overallProgress}%</div>
                    <div className="text-sm text-muted-foreground">Progress</div>
                  </div>
                  <div className="text-center p-3 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-primary">{categoryData.pointsEarned}</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center p-3 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-primary">{categoryData.completedQuizzes}/{categoryData.totalQuizzes}</div>
                    <div className="text-sm text-muted-foreground">Quizzes</div>
                  </div>
                  <div className="text-center p-3 bg-card rounded-lg border">
                    <div className="text-2xl font-bold text-primary">{categoryData.completedLessons}/{categoryData.totalLessons}</div>
                    <div className="text-sm text-muted-foreground">Lessons</div>
                  </div>
                </div>

                <Progress value={categoryData.overallProgress} className="h-3 mb-2" />
                <div className="text-sm text-muted-foreground">
                  {categoryData.estimatedTime} • {categoryData.participants.toLocaleString()} participants
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Learning Path */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Learning Path
              </h2>
              
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <Card key={section.id} className="overflow-hidden">
                    <Collapsible open={section.isOpen} onOpenChange={() => toggleSection(section.id)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                                {index + 1}
                              </div>
                              <div>
                                <CardTitle className="text-lg">{section.title}</CardTitle>
                                <CardDescription>{section.description}</CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getDifficultyColor(section.difficulty)}>
                                {section.difficulty}
                              </Badge>
                              <ChevronRight className={`w-4 h-4 transition-transform ${section.isOpen ? 'rotate-90' : ''}`} />
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Progress: {section.completedLessons}/{section.totalLessons} lessons</span>
                              <span>{section.progress}%</span>
                            </div>
                            <Progress value={section.progress} className="h-2" />
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="grid gap-6">
                            {/* Lessons Section */}
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                  Theory Lessons
                                </h4>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => openLessonReader(section.id)}
                                >
                                  <BookOpen className="w-4 h-4 mr-2" />
                                  Read Lessons
                                </Button>
                              </div>
                              <div className="space-y-2">
                                {section.lessons.map((lesson) => (
                                  <div 
                                    key={lesson.id}
                                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                                  >
                                    <div className="flex items-center gap-3">
                                      {lesson.completed ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                      ) : (
                                        <Circle className="w-4 h-4 text-muted-foreground" />
                                      )}
                                      <div>
                                        <div className="font-medium text-sm">{lesson.title}</div>
                                        <div className="text-xs text-muted-foreground">
                                          {lesson.estimatedTime}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                             {/* Quizzes Section */}
                             <div>
                               <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                                 Practice Quizzes
                               </h4>
                               {section.quizzes.map((quiz) => (
                                 <div 
                                   key={quiz.id}
                                   className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                                 >
                                   <div className="flex items-center gap-3">
                                     {quiz.completed ? (
                                       <CheckCircle className="w-5 h-5 text-green-500" />
                                     ) : (
                                       <Circle className="w-5 h-5 text-muted-foreground" />
                                     )}
                                     <div>
                                       <div className="font-medium">{quiz.title}</div>
                                       <div className="text-sm text-muted-foreground">
                                         {quiz.questions} questions • {quiz.timeEstimate}
                                         {quiz.completed && quiz.score && (
                                           <span className="ml-2 text-green-500">
                                             Score: {quiz.score}%
                                           </span>
                                         )}
                                       </div>
                                     </div>
                                   </div>
                                   <Link to={`/quiz/${quiz.slug}`}>
                                     <Button size="sm" variant={quiz.completed ? "outline" : "default"}>
                                       {quiz.completed ? "Retake" : "Start"} Quiz
                                     </Button>
                                   </Link>
                                 </div>
                               ))}
                             </div>
                           </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-green-500/10 border-green-500/20' 
                          : 'bg-muted/30 border-border'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className={`font-medium ${achievement.earned ? 'text-green-500' : 'text-muted-foreground'}`}>
                          {achievement.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {achievement.description}
                        </div>
                        {!achievement.earned && achievement.progress && achievement.total && (
                          <div className="mt-1">
                            <Progress value={(achievement.progress / achievement.total) * 100} className="h-1" />
                            <div className="text-xs text-muted-foreground mt-1">
                              {achievement.progress}/{achievement.total}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={openQuizSelector}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Take Custom Quiz
                  </Button>
                  <Link to="/leaderboard" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Trophy className="w-4 h-4 mr-2" />
                      View Leaderboard
                    </Button>
                  </Link>
                  <Link to="/resources" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Book className="w-4 h-4 mr-2" />
                      Study Resources
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Practice Mode
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Lesson Reader Modal */}
      {selectedSection && (
        <LessonReader
          sectionId={selectedSection}
          sectionTitle={sections.find(s => s.id === selectedSection)?.title || ''}
          lessons={sections.find(s => s.id === selectedSection)?.lessons || []}
          onLessonComplete={handleLessonComplete}
          onClose={closeLessonReader}
        />
      )}

      {/* Quiz Type Selector Modal */}
      {showQuizSelector && (
        <QuizTypeSelector
          categorySlug={slug || ''}
          onClose={closeQuizSelector}
        />
      )}
    </div>
  );
};

export default CategoryDetail;