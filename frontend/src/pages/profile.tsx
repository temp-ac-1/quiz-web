import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Trophy, Target, Calendar, Edit, Settings, Award, Zap, Shield } from "lucide-react";
import Navbar from '../components/Navbar';

// UI Components
const Button = ({ variant = "default", className = "", children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow hover:shadow-md",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "hover:bg-gray-100 text-gray-900",
  };
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm transition-all duration-300 ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className = "", children, ...props }) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ variant = "default", className = "", children, ...props }) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  const variantClasses = {
    default: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
    secondary: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "text-gray-900 border-gray-300",
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

const Progress = ({ value = 0, className = "", ...props }) => (
  <div className={`relative w-full h-2 overflow-hidden rounded-full bg-gray-200 ${className}`} {...props}>
    <div
      className="h-full bg-blue-600 transition-all duration-500 ease-out"
      style={{ width: `${value}%` }}
    />
  </div>
);

const Avatar = ({ className = "", children, ...props }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
    {children}
  </div>
);

const AvatarFallback = ({ className = "", children, ...props }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 ${className}`} {...props}>
    {children}
  </div>
);

// Profile Page Component
const Profile = () => {
  const [user] = useState({
    username: "CyberNinja007",
    email: "ninja@cyberquest.com",
    joinDate: "January 2024",
    totalScore: 8750,
    quizzesCompleted: 42,
    averageScore: 87.5,
    rank: "#15",
    level: "Advanced Hacker"
  });

  const badges = [
    { id: 1, name: "Network Ninja", description: "Completed 10 Network Security quizzes", icon: Shield, color: "text-blue-600", earned: true },
    { id: 2, name: "Crypto Master", description: "Perfect score in Cryptography", icon: Award, color: "text-purple-600", earned: true },
    { id: 3, name: "Malware Hunter", description: "Identified 50 malware scenarios", icon: Target, color: "text-red-600", earned: true },
    { id: 4, name: "Speed Demon", description: "Complete quiz in under 2 minutes", icon: Zap, color: "text-yellow-600", earned: false },
    { id: 5, name: "Perfectionist", description: "10 perfect scores in a row", icon: Trophy, color: "text-green-600", earned: false },
    { id: 6, name: "Knowledge Seeker", description: "Read all theory sections", icon: User, color: "text-indigo-600", earned: true }
  ];

  const recentQuizzes = [
    { id: 1, category: "Network Security", type: "MCQ", difficulty: "Advanced", score: 95, date: "2 days ago", totalQuestions: 20 },
    { id: 2, category: "Cryptography", type: "Scenarios", difficulty: "Expert", score: 88, date: "1 week ago", totalQuestions: 15 },
    { id: 3, category: "Web Security", type: "True/False", difficulty: "Intermediate", score: 92, date: "1 week ago", totalQuestions: 25 },
    { id: 4, category: "Malware Analysis", type: "Fill Blanks", difficulty: "Advanced", score: 78, date: "2 weeks ago", totalQuestions: 18 },
    { id: 5, category: "Digital Forensics", type: "MCQ", difficulty: "Beginner", score: 100, date: "3 weeks ago", totalQuestions: 20 }
  ];

  const categoryProgress = [
    { name: "Network Security", completed: 8, total: 12, percentage: 67 },
    { name: "Cryptography", completed: 6, total: 10, percentage: 60 },
    { name: "Web Security", completed: 10, total: 15, percentage: 67 },
    { name: "Malware Analysis", completed: 4, total: 8, percentage: 50 },
    { name: "Wireless Security", completed: 3, total: 6, percentage: 50 },
    { name: "Digital Forensics", completed: 5, total: 9, percentage: 56 },
    { name: "Database Security", completed: 2, total: 7, percentage: 29 },
    { name: "Penetration Testing", completed: 4, total: 11, percentage: 36 }
  ];

  const [activeTab, setActiveTab] = useState("overview");

  // Function to handle smooth tab transitions
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // or use `navigate()`
  };
  

  return (
    <div className="min-h-screen w-full bg-white text-black p-0" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />
  <div className="mt-20 mx-6 md:mx-20 lg:mx-48">
        {/* Profile Header */}
        <Card className="bg-white border border-black rounded-xl mt-0 mb-4 font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-black">
                  <AvatarFallback className="bg-gray-100 text-black text-xl md:text-2xl font-bold">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 900 }}>{user.username}</h1>
                    <p className="text-black text-sm md:text-base" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{user.email}</p>
                    <p className="text-xs md:text-sm text-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Member since {user.joinDate}</p>
                  <Badge className="mt-2 bg-gray-100 text-black border-black">
                    {user.level}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center md:justify-end w-full md:w-auto">
                  <Button className="border border-black bg-black text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-all duration-200 hover:bg-gray-900 hover:text-white flex items-center gap-2">
                    <Edit className="h-5 w-5 text-white" />
                    Edit Profile
                  </Button>
                  <Button className="border border-black bg-black text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-all duration-200 hover:bg-gray-900 hover:text-white flex items-center gap-2" onClick={handleLogout}>
                    Logout
                  </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg bg-white border border-black">
                <div className="text-xl md:text-2xl font-bold text-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{user.totalScore.toLocaleString()}</div>
                  <div className="text-xs md:text-sm text-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Total Score</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white border border-black">
                <div className="text-xl md:text-2xl font-bold text-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{user.quizzesCompleted}</div>
                  <div className="text-xs md:text-sm text-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Quizzes Completed</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white border border-black">
                <div className="text-xl md:text-2xl font-bold text-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{user.averageScore}%</div>
                  <div className="text-xs md:text-sm text-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Average Score</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white border border-black">
                <div className="text-xl md:text-2xl font-bold text-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{user.rank}</div>
                  <div className="text-xs md:text-sm text-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Global Rank</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto mb-6 md:mb-8 scrollbar-hide">
          <div className="flex space-x-1 min-w-max w-full bg-gray-100 p-1 rounded-lg">
            {[
              { id: "overview", label: "Overview" },
              { id: "progress", label: "Progress" },
              { id: "badges", label: "Badges" },
              { id: "settings", label: "Settings" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? "bg-white text-black shadow-sm" 
                    : "text-black hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Recent Quizzes */}
              <Card className="bg-white border border-gray-200 shadow-sm rounded-xl transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-blue-600 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Recent Quiz Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentQuizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{quiz.category}</h4>
                          <p className="text-sm text-gray-600 truncate">
                            {quiz.type} • {quiz.difficulty}
                          </p>
                          <p className="text-xs text-gray-500">{quiz.date}</p>
                        </div>
                        <div className="text-right ml-2">
                          <div className={`text-lg font-bold ${quiz.score >= 90 ? 'text-green-600' : quiz.score >= 75 ? 'text-blue-600' : 'text-yellow-600'}`}>
                            {quiz.score}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {Math.round(quiz.score * quiz.totalQuestions / 100)}/{quiz.totalQuestions}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white border border-gray-200 shadow-sm rounded-xl transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-blue-600 flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <span className="text-gray-900">Badges Earned</span>
                      <span className="text-blue-600 font-bold">{badges.filter(b => b.earned).length}/{badges.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <span className="text-gray-900">Perfect Scores</span>
                      <span className="text-purple-600 font-bold">7</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <span className="text-gray-900">Fastest Quiz Time</span>
                      <span className="text-yellow-600 font-bold">1:23</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <span className="text-gray-900">Current Streak</span>
                      <span className="text-red-600 font-bold">12 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "progress" && (
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-blue-600">Category Progress</CardTitle>
                <CardDescription className="text-gray-600">
                  Track your progress across different cybersecurity domains
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 md:space-y-6">
                  {categoryProgress.map((category, index) => (
                    <div key={index} className="space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base">{category.name}</h4>
                        <span className="text-xs md:text-sm text-gray-600">
                          {category.completed}/{category.total} completed
                        </span>
                      </div>
                      <Progress value={category.percentage} className="h-2 bg-gray-200" />
                      <div className="text-right text-xs md:text-sm text-gray-600">
                        {category.percentage}% complete
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "badges" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {badges.map((badge) => {
                const IconComponent = badge.icon;
                return (
                  <Card 
                    key={badge.id} 
                    className={`bg-white border border-gray-200 shadow-sm rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${
                      badge.earned ? '' : 'opacity-60'
                    }`}
                  >
                    <CardHeader className="text-center pb-3">
                      <div className={`mx-auto mb-4 p-3 rounded-full ${badge.earned ? 'bg-blue-100' : 'bg-gray-200'} transition-all duration-300`}>
                        <IconComponent className={`h-6 w-6 md:h-8 md:w-8 ${badge.earned ? badge.color : 'text-gray-500'}`} />
                      </div>
                      <CardTitle className={`text-base md:text-lg ${badge.earned ? 'text-blue-600' : 'text-gray-500'}`}>
                        {badge.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-xs md:text-sm">
                        {badge.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Badge variant={badge.earned ? "default" : "secondary"} className={badge.earned ? "bg-blue-100 text-blue-700 border-blue-300" : "bg-gray-200 text-gray-700 border-gray-300"}>
                        {badge.earned ? "Earned" : "Locked"}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {activeTab === "settings" && (
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-300 py-3">
                      Change Password
                    </Button>
                    <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-300 py-3">
                      Update Email
                    </Button>
                    <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-300 py-3">
                      Privacy Settings
                    </Button>
                    <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-300 py-3">
                      Notification Preferences
                    </Button>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 transition-all duration-300 py-3">
                        Reset All Progress
                      </Button>
                      <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 transition-all duration-300 py-3">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;