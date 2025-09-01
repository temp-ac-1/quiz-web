import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Edit, Calendar, Trophy, Target, Award, Zap, Shield, Settings } from 'lucide-react';

// UI Components
const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-xl border border-black bg-white text-black ${className}`} {...props}>
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
  <p className={`text-sm text-gray-700 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ variant = "default", className = "", children, ...props }) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variantClasses = {
    default: "border-transparent bg-blue-100 text-blue-800",
    secondary: "border-transparent bg-gray-100 text-gray-800",
    outline: "text-black border-black",
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
      className="h-full bg-black transition-all duration-500 ease-out"
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

// Tabs
const tabs = [
  { id: 'overview', name: 'Overview' },
  { id: 'progress', name: 'Progress' },
  { id: 'badges', name: 'Badges' },
  { id: 'settings', name: 'Settings' },
];

// Demo data
const demoBadges = [
  { id: 1, name: "Network Ninja", description: "Completed 10 Network Security quizzes", icon: Shield, color: "text-blue-600", earned: true },
  { id: 2, name: "Crypto Master", description: "Perfect score in Cryptography", icon: Award, color: "text-purple-600", earned: true },
  { id: 3, name: "Malware Hunter", description: "Identified 50 malware scenarios", icon: Target, color: "text-red-600", earned: true },
  { id: 4, name: "Speed Demon", description: "Complete quiz in under 2 minutes", icon: Zap, color: "text-yellow-600", earned: false },
  { id: 5, name: "Perfectionist", description: "10 perfect scores in a row", icon: Trophy, color: "text-green-600", earned: false },
  { id: 6, name: "Knowledge Seeker", description: "Read all theory sections", icon: Award, color: "text-indigo-600", earned: true }
];

const demoProgress = [
  { name: "Network Security", completed: 8, total: 12, percentage: 67 },
  { name: "Cryptography", completed: 6, total: 10, percentage: 60 },
  { name: "Web Security", completed: 10, total: 15, percentage: 67 },
  { name: "Malware Analysis", completed: 4, total: 8, percentage: 50 },
];

const demoQuizzes = [
  { id: 1, category: "Network Security", score: 95, date: "2 days ago", type: "MCQ", difficulty: "Advanced", totalQuestions: 20 },
  { id: 2, category: "Cryptography", score: 88, date: "1 week ago", type: "Scenarios", difficulty: "Expert", totalQuestions: 15 },
  { id: 3, category: "Web Security", score: 92, date: "1 week ago", type: "True/False", difficulty: "Intermediate", totalQuestions: 25 },
  { id: 4, category: "Malware Analysis", score: 78, date: "2 weeks ago", type: "Fill Blanks", difficulty: "Advanced", totalQuestions: 18 },
  { id: 5, category: "Digital Forensics", score: 100, date: "3 weeks ago", type: "MCQ", difficulty: "Beginner", totalQuestions: 20 }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
    provider: '',
    username: 'CyberNinja007',
    joinDate: 'January 2024',
    totalScore: 8750,
    quizzesCompleted: 42,
    averageScore: 87.5,
    rank: '#15',
    level: 'Advanced Hacker'
  });

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo);
      setUser(prev => ({
        ...prev,
        ...parsedInfo,
        username: parsedInfo.name || 'CyberNinja007',
      }));
    }
  }, []);

  const isLoggedIn = !!user.name;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    window.location.href = '/auth';
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-black overflow-hidden">
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.username)}&background=fff&color=000`}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-black">
                    {user.name || user.username}
                  </h1>
                  <p className="text-black text-sm md:text-base">{user.email}</p>
                  <p className="text-xs md:text-sm text-black">
                    Member since {user.joinDate} • {user.provider ? `Logged in with ${user.provider}` : 'Local Account'}
                  </p>
                  <Badge className="mt-2 bg-gray-100 text-black border-black">
                    {user.level}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="px-4 py-2 bg-black text-white font-bold rounded-lg transition-all duration-200 hover:bg-white hover:text-black border border-black flex items-center gap-2"
                  onClick={() => window.location.href = isLoggedIn ? '/profile/edit' : '/auth'}
                >
                  <Edit className="h-4 w-4" />
                  {isLoggedIn ? 'Edit Profile' : 'Login'}
                </button>
                {isLoggedIn && (
                  <button
                    className="px-4 py-2 bg-white text-black font-bold rounded-lg transition-all duration-200 hover:bg-black hover:text-white border border-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-white border border-black">
                <div className="text-xl md:text-2xl font-bold text-black">{user.totalScore.toLocaleString()}</div>
                <div className="text-xs md:text-sm text-black">Total Score</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white border border-black">
                <div className="text-xl md:text-2xl font-bold text-black">{user.quizzesCompleted}</div>
                <div className="text-xs md:text-sm text-black">Quizzes Completed</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white border border-black">
                <div className="text-xl md:text-2xl font-bold text-black">{user.averageScore}%</div>
                <div className="text-xs md:text-sm text-black">Average Score</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white border border-black">
                <div className="text-xl md:text-2xl font-bold text-black">{user.rank}</div>
                <div className="text-xs md:text-sm text-black">Global Rank</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-bold rounded transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black border border-black hover:bg-black hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white border border-black rounded-lg p-6 min-h-[400px]">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-black">Profile Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Quizzes */}
                <div>
                  <h4 className="font-bold text-black mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Recent Quiz Results
                  </h4>
                  <div className="space-y-3">
                    {demoQuizzes.map(q => (
                      <div key={q.id} className="border border-black rounded-lg p-3 flex flex-col bg-white">
                        <div className="flex justify-between">
                          <span className="font-bold text-black">{q.category}</span>
                          <span className="text-xs text-gray-700">{q.date}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-700 mt-1">
                          <span>{q.type} • {q.difficulty}</span>
                          <span>Score: <span className="font-bold text-black">{q.score}%</span></span>
                        </div>
                        <div className="text-xs text-gray-700">Questions: {q.totalQuestions}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Achievements */}
                <div>
                  <h4 className="font-bold text-black mb-3 flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Achievements
                  </h4>
                  <div className="space-y-3">
                    <div className="border border-black rounded-lg p-3 bg-white flex flex-col">
                      <span className="font-bold text-black">Badges Earned</span>
                      <span className="text-xs text-gray-700">{demoBadges.filter(b => b.earned).length} / {demoBadges.length}</span>
                    </div>
                    <div className="border border-black rounded-lg p-3 bg-white flex flex-col">
                      <span className="font-bold text-black">Perfect Scores</span>
                      <span className="text-xs text-gray-700">7</span>
                    </div>
                    <div className="border border-black rounded-lg p-3 bg-white flex flex-col">
                      <span className="font-bold text-black">Current Streak</span>
                      <span className="text-xs text-gray-700">12 days</span>
                    </div>
                    <div className="border border-black rounded-lg p-3 bg-white flex flex-col">
                      <span className="font-bold text-black">Fastest Quiz Time</span>
                      <span className="text-xs text-gray-700">1:23</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'progress' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-black">Category Progress</h3>
              <div className="space-y-4">
                {demoProgress.map((cat, idx) => (
                  <div key={idx} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-black">{cat.name}</span>
                      <span className="text-xs text-gray-700">{cat.completed}/{cat.total} completed</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-black rounded-full" style={{ width: `${cat.percentage}%` }}></div>
                    </div>
                    <div className="text-right text-xs text-gray-700">{cat.percentage}% complete</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'badges' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-black">Badges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {demoBadges.map(badge => {
                  const IconComponent = badge.icon;
                  return (
                    <div 
                      key={badge.id} 
                      className={`border border-black rounded-lg p-4 flex flex-col items-center ${
                        badge.earned ? 'bg-white' : 'bg-gray-100 opacity-70'
                      }`}
                    >
                      <div className={`mb-2 p-2 rounded-full ${badge.earned ? 'bg-gray-200' : 'bg-gray-300'}`}>
                        <IconComponent className={`h-6 w-6 ${badge.earned ? badge.color : 'text-gray-500'}`} />
                      </div>
                      <span className="font-bold mb-1 text-center">{badge.name}</span>
                      <span className="text-xs mb-2 text-center">{badge.description}</span>
                      <span className={`px-2 py-1 rounded text-xs ${badge.earned ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'}`}>
                        {badge.earned ? 'Earned' : 'Locked'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-black flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Account Settings
              </h3>
              <p className="text-black mb-6">Update your account information and preferences here.</p>
              
              <div className="border border-black rounded-lg p-4 bg-white mb-6">
                <span className="font-bold text-black">Account Info</span>
                <div className="text-sm text-gray-700 mt-2">Email: {user.email}</div>
                <div className="text-sm text-gray-700">Provider: {user.provider ? user.provider : 'Local'}</div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <button className="px-4 py-2 bg-white text-black font-bold rounded-lg border border-black transition-all duration-200 hover:bg-black hover:text-white">
                  Change Password
                </button>
                <button className="px-4 py-2 bg-white text-black font-bold rounded-lg border border-black transition-all duration-200 hover:bg-black hover:text-white">
                  Update Email
                </button>
                <button className="px-4 py-2 bg-white text-black font-bold rounded-lg border border-black transition-all duration-200 hover:bg-black hover:text-white">
                  Privacy Settings
                </button>
                <button className="px-4 py-2 bg-white text-black font-bold rounded-lg border border-black transition-all duration-200 hover:bg-black hover:text-white">
                  Notification Preferences
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-300">
                <h4 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="px-4 py-2 bg-white text-red-600 font-bold rounded-lg border border-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white">
                    Reset All Progress
                  </button>
                  <button className="px-4 py-2 bg-white text-red-600 font-bold rounded-lg border border-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;