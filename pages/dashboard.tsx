import React, { useState, useEffect } from 'react';
import {
  MessageCircle, Brain, Target, TrendingUp, Calendar, Star,
  Zap, Crown, Heart, BarChart3, BookOpen, Users, Settings,
  Sparkles, Award, Clock, ArrowUp, Phone, Video, Mic, Send,
  ChevronRight, PlayCircle, PauseCircle, Volume2, Lightbulb,
  Book, GraduationCap, Search, CheckCircle, XCircle, HelpCircle,
  Menu, X
} from 'lucide-react';

export default function HeinXDashboard() {
  const [currentMode, setCurrentMode] = useState<'personal' | 'study'>('personal');
  const [user, setUser] = useState({
    name: "Alex",
    aiName: "HeinX",
    streak: 12,
    level: 4,
    xp: 2840,
    isPremium: true,
    avatar: 'neural'
  });
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    { sender: "Nova", text: "Good morning, Alex! I've analyzed your recent activity. Ready to optimize your day?", timestamp: "9:23 AM", type: "motivational" },
    { sender: "You", text: "Yes, let's review my priorities.", timestamp: "9:24 AM" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [studyTopic, setStudyTopic] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true); // New state for sidebar toggle
  const goals = [
    { text: "Launch MVP by Q1", progress: 78, category: "Business", priority: "high" },
    { text: "Master AI fundamentals", progress: 45, category: "Learning", priority: "medium" },
    { text: "Expand professional network", progress: 32, category: "Networking", priority: "high" }
  ];
  const insights = [
    {
      title: "Productivity Analysis",
      description: "Optimal focus window: 2-4 PM. Schedule high-priority tasks accordingly.",
      impact: "High",
      icon: TrendingUp,
      color: "indigo"
    },
    {
      title: "Goal Synchronization",
      description: "Networking efforts require alignment with MVP timeline.",
      impact: "Critical",
      icon: Target,
      color: "red"
    },
    {
      title: "Learning Optimization",
      description: "25-minute Pomodoro sessions yield 65% better retention.",
      impact: "Medium",
      icon: Brain,
      color: "blue"
    }
  ];
  const aiMemories = [
    "Preferences: Morning status updates",
    "Routine: Afternoon break at 3 PM",
    "Technical: Favors Python for prototypes",
    "Objectives: Maintains work-life integration"
  ];
  // Study mode data
  const studySubjects = [
    { name: "Physics", progress: 65, topics: 12, mastered: 8 },
    { name: "Mathematics", progress: 42, topics: 15, mastered: 6 },
    { name: "Computer Science", progress: 88, topics: 10, mastered: 9 }
  ];
  const studyTopics = [
    { name: "Quantum Mechanics", subject: "Physics", difficulty: "Advanced", status: "in-progress" },
    { name: "Calculus", subject: "Mathematics", difficulty: "Intermediate", status: "not-started" },
    { name: "Algorithms", subject: "Computer Science", difficulty: "Intermediate", status: "completed" },
    { name: "Optics", subject: "Physics", difficulty: "Intermediate", status: "not-started" },
    { name: "Data Structures", subject: "Computer Science", difficulty: "Advanced", status: "in-progress" }
  ];
  const studyResources = [
    { title: "Quantum Physics Fundamentals", type: "Video Lecture", duration: "15 min", subject: "Physics" },
    { title: "Calculus Exercises", type: "Practice Set", duration: "30 min", subject: "Mathematics" },
    { title: "Algorithm Analysis", type: "Interactive Module", duration: "20 min", subject: "Computer Science" }
  ];
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { sender: "You", text: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);
    // Simulate AI response with more professional tones
    setTimeout(() => {
      const responses = currentMode === 'personal' ? [
        "Excellent observation. Let's break this into strategic steps.",
        "Based on your data, here's an optimized approach.",
        "Drawing from similar patterns, I recommend this framework.",
        "Connecting to your objectives, this aligns well."
      ] : [
        "Clear explanation follows. Step-by-step breakdown:",
        "Alternative perspective to enhance understanding.",
        "This builds on prior concepts. Let's connect them.",
        "Simplified components with practical examples."
      ];
      const aiResponse = {
        sender: "Nova",
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: currentMode === 'personal' ? "analytical" : "educational"
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  const handleStudySearch = () => {
    if (!studyTopic.trim()) return;
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: "Nova",
        text: `Analyzing "${studyTopic}". Generating tailored learning path:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "educational"
      }]);
      setStudyTopic("");
      setIsTyping(false);
    }, 1000);
  };
  const personalTabs = [
    { id: 'chat', label: 'AI Conversation', icon: MessageCircle },
    { id: 'goals', label: 'Objectives', icon: Target },
    { id: 'insights', label: 'Analytics', icon: Brain },
    { id: 'growth', label: 'Progress', icon: TrendingUp }
  ];
  const studyTabs = [
    { id: 'learn', label: 'Learning', icon: BookOpen },
    { id: 'progress', label: 'Analytics', icon: BarChart3 },
    { id: 'resources', label: 'Materials', icon: Book },
    { id: 'tests', label: 'Assessments', icon: GraduationCap }
  ];
  const tabs = currentMode === 'personal' ? personalTabs : studyTabs;
  const renderPersonalTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="space-y-6">
            {/* AI Status - Professional card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Assistant: {user.aiName}</h3>
                  <p className="text-sm text-gray-500">Level {user.level} • {user.streak}-day streak</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => setVoiceMode(!voiceMode)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                    voiceMode ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>Voice Mode</span>
                </button>
                <button className="px-4 py-2 bg-gray-100 rounded-lg flex items-center space-x-2 text-gray-700 hover:bg-gray-200 transition-colors">
                  <Video className="w-4 h-4" />
                  <span>Video Call</span>
                </button>
              </div>
            </div>
            {/* Chat Area - Clean, minimal chat interface */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md px-4 py-3 rounded-lg ${
                      msg.sender === 'You'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={`Message ${user.aiName}...`}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'goals':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {goals.map((goal, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      goal.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {goal.category}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">{goal.progress}%</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{goal.text}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
                      Update Progress
                    </button>
                    <button className="px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                      <Award className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* AI Goal Coaching - Subdued gradient */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">AI Objective Guidance</h3>
              </div>
              <p className="text-gray-700 mb-4">
                {user.aiName} has reviewed your objectives and prepared action plans.
              </p>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Initiate Session
              </button>
            </div>
          </div>
        );
      case 'insights':
        return (
          <div className="space-y-6">
            {insights.map((insight, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100`}>
                    <insight.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        insight.impact === 'Critical' ? 'bg-red-100 text-red-700' :
                        insight.impact === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {insight.impact} Impact
                      </span>
                    </div>
                    <p className="text-gray-700 mt-2">{insight.description}</p>
                    <button className="mt-3 text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                      Implement Insight <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* AI Memory - Clean list */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-indigo-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">AI Knowledge Base</h3>
              </div>
              <div className="space-y-3">
                {aiMemories.map((memory, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{memory}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'growth':
        return (
          <div className="space-y-6">
            {/* Growth Stats - Professional cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">XP Accumulated</p>
                    <p className="text-3xl font-bold text-gray-900">{user.xp.toLocaleString()}</p>
                  </div>
                  <Star className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">+240 this week</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Streak</p>
                    <p className="text-3xl font-bold text-gray-900">{user.streak}</p>
                  </div>
                  <Zap className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Record high</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">AI Proficiency Level</p>
                    <p className="text-3xl font-bold text-gray-900">{user.level}</p>
                  </div>
                  <Crown className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Advanced</p>
              </div>
            </div>
            {/* Growth Chart - Simple bar chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Metrics</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[40, 65, 30, 80, 45, 90, 75].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-indigo-600 rounded-t-lg transition-all duration-1000 hover:bg-indigo-700"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Achievement - Neutral tone */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Milestone Achieved</h3>
                  <p className="text-gray-700">"Objective Master" - 3 completions this month</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };
  const renderStudyTabContent = () => {
    switch (activeTab) {
      case 'learn':
        return (
          <div className="space-y-6">
            {/* Topic Search - Clean search bar */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Tutor: {user.aiName}</h3>
                  <p className="text-sm text-gray-500">Adaptive learning system</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-teal-600" />
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={studyTopic}
                  onChange={(e) => setStudyTopic(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStudySearch()}
                  placeholder="Search for a topic..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-gray-900"
                />
                <button
                  onClick={handleStudySearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Recommended Topics - Grid cards */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Topics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studyTopics.slice(0, 4).map((topic, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{topic.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        topic.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {topic.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{topic.subject}</p>
                    <button className="w-full bg-teal-50 text-teal-700 py-2 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors">
                      Begin Session
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Recent Learning - List view */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Learning</h3>
              <div className="space-y-4">
                {studyResources.map((resource, index) => (
                  <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-all">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100`}>
                      {resource.type === 'Video Lecture' ? <PlayCircle className="w-6 h-6 text-teal-600" /> :
                       resource.type === 'Practice Set' ? <BookOpen className="w-6 h-6 text-teal-600" /> :
                       <BarChart3 className="w-6 h-6 text-teal-600" />}
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                      <p className="text-sm text-gray-600">{resource.subject} • {resource.duration}</p>
                    </div>
                    <button className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition-colors">
                      <PlayCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'progress':
        return (
          <div className="space-y-6">
            {/* Overall Progress - Simple progress bar */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Overall Mastery</p>
                  <p className="text-3xl font-bold text-gray-900">64%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Topics Mastered</p>
                  <p className="text-3xl font-bold text-gray-900">23/36</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `64%` }}
                ></div>
              </div>
            </div>
            {/* Subject Progress - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studySubjects.map((subject, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                    <span className="text-2xl font-bold text-gray-900">{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{subject.mastered} / {subject.topics} mastered</span>
                    <span>{subject.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Weekly Study Time - Bar chart */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
              <div className="h-48 flex items-end justify-between space-x-2">
                {[3, 5, 2, 4, 6, 2, 4].map((hours, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-teal-600 rounded-t-lg transition-all duration-1000 hover:bg-teal-700"
                      style={{ height: `${hours * 10}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                    <span className="text-xs font-medium text-gray-700 mt-1">{hours}h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'resources':
        return (
          <div className="space-y-6">
            {/* Resource Library - Header card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Learning Resources</h3>
                  <p className="text-sm text-gray-500">Curated materials</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Book className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </div>
            {/* Resource Categories - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Lectures', 'Exercises', 'Guides'].map((category, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {category === 'Lectures' ? <Video className="w-8 h-8 text-teal-600" /> :
                     category === 'Exercises' ? <HelpCircle className="w-8 h-8 text-teal-600" /> :
                     <BookOpen className="w-8 h-8 text-teal-600" />}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category === 'Lectures' ? '32 sessions' :
                     category === 'Exercises' ? '45 sets' : '18 documents'}
                  </p>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
                    View
                  </button>
                </div>
              ))}
            </div>
            {/* Recent Resources - List */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Additions</h3>
              <div className="space-y-4">
                {studyResources.map((resource, index) => (
                  <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {resource.type === 'Video Lecture' ? <Video className="w-6 h-6 text-teal-600" /> :
                       resource.type === 'Practice Set' ? <BookOpen className="w-6 h-6 text-teal-600" /> :
                       <BarChart3 className="w-6 h-6 text-teal-600" />}
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>{resource.subject}</span>
                        <span className="mx-2">•</span>
                        <span>{resource.type}</span>
                        <span className="mx-2">•</span>
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                    <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'tests':
        return (
          <div className="space-y-6">
            {/* Test Preparation - Header */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Assessment Center</h3>
                  <p className="text-sm text-gray-500">Build proficiency</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </div>
            {/* Upcoming Tests - List */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Assessments</h3>
              <div className="space-y-4">
                {[
                  { name: "Physics: Quantum Mechanics", date: "Sep 25, 2025", questions: 20, duration: "30 min" },
                  { name: "Mathematics: Calculus", date: "Sep 28, 2025", questions: 15, duration: "25 min" },
                  { name: "Computer Science: Algorithms", date: "Oct 2, 2025", questions: 25, duration: "45 min" }
                ].map((test, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{test.name}</h4>
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                        {test.date}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <span>{test.questions} questions</span>
                      <span className="mx-2">•</span>
                      <span>{test.duration}</span>
                    </div>
                    <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                      Begin Assessment
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Performance Analytics - Grid */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Accuracy Rate</h4>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div className="h-4 bg-teal-600 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>78%</span>
                    <span>Previous: 85%</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Completion Speed</h4>
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div className="h-4 bg-teal-600 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>65%</span>
                    <span>Previous: 58%</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Recent Test Results - List */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Outcomes</h3>
              <div className="space-y-4">
                {[
                  { subject: "Physics", topic: "Optics", score: 85, total: 100, date: "Sep 20, 2025" },
                  { subject: "Mathematics", topic: "Trigonometry", score: 92, total: 100, date: "Sep 18, 2025" },
                  { subject: "Computer Science", topic: "Data Structures", score: 78, total: 100, date: "Sep 15, 2025" }
                ].map((test, index) => (
                  <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100`}>
                      {test.score >= 90 ? <CheckCircle className="w-6 h-6 text-green-600" /> :
                       test.score >= 70 ? <HelpCircle className="w-6 h-6 text-yellow-600" /> : <XCircle className="w-6 h-6 text-red-600" />}
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-semibold text-gray-900">{test.subject}: {test.topic}</h4>
                      <p className="text-sm text-gray-600">{test.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        test.score >= 90 ? 'text-green-600' :
                        test.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {test.score}%
                      </p>
                      <p className="text-sm text-gray-600">{test.score}/{test.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };
  const renderTabContent = () => {
    return currentMode === 'personal' ? renderPersonalTabContent() : renderStudyTabContent();
  };

  return (
    <div className={`min-h-screen bg-gray-50`}>
      {/* Header - Clean, professional navbar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">HeinX AI</h1>
                <p className="text-sm text-gray-500">Intelligent Assistant Platform</p>
              </div>
            </div>
            {/* Mode Toggle - Subtle switch */}
            <div className="flex items-center space-x-4">
              <span className={`text-sm font-medium ${currentMode === 'personal' ? 'text-indigo-600' : 'text-gray-500'}`}>
                Personal
              </span>
              <button
                onClick={() => setCurrentMode(currentMode === 'personal' ? 'study' : 'personal')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  currentMode === 'personal' ? 'bg-indigo-600' : 'bg-teal-600'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  currentMode === 'personal' ? 'translate-x-1' : 'translate-x-6'
                }`} />
              </button>
              <span className={`text-sm font-medium ${currentMode === 'study' ? 'text-teal-600' : 'text-gray-500'}`}>
                Study
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {user.isPremium && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-indigo-100 rounded-full">
                  <Crown className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-800">Premium</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="font-medium text-gray-900">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex">
          {/* Sidebar - Navigation and stats */}
          <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block lg:w-1/4 lg:pr-8 mb-8 lg:mb-0`}>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
              <nav className="space-y-2 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? currentMode === 'personal'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-teal-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
              {/* Quick Stats - Compact */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Overview</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Today's {currentMode === 'personal' ? 'XP' : 'Hours'}</span>
                    <span className={`font-medium ${
                      currentMode === 'personal' ? 'text-indigo-600' : 'text-teal-600'
                    }`}>
                      {currentMode === 'personal' ? '+125' : '2.5h'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{currentMode === 'personal' ? 'Objective Progress' : 'Mastery Level'}</span>
                    <span className="font-medium text-green-600">
                      {currentMode === 'personal' ? '67%' : '64%'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sessions</span>
                    <span className="font-medium text-indigo-600">23</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content - Dynamic tabs */}
          <div className="lg:w-3/4 w-full">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
