import React, { useState, useEffect } from 'react';
import { Users, Plus, TrendingUp, Calendar, Clock, Star, Briefcase, Target, Zap, Award, MessageSquare, BarChart3 } from 'lucide-react';

// Types
interface AIEmployee {
  id: string;
  roleId: string;
  title: string;
  avatar: string;
  personality: string;
  specialties: string[];
  experience: 'Junior' | 'Mid' | 'Senior' | 'Expert';
  performanceScore: number;
  hiredAt: string;
  status: 'available' | 'working' | 'offline';
  completedTasks: number;
  monthlyCost: number;
  inbox: Task[];
}

interface Task {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: string;
  estimatedTime: string;
}

interface Role {
  id: string;
  title: string;
  department: 'Marketing' | 'Development' | 'Research' | 'Design' | 'Operations' | 'Sales';
  description: string;
  monthlyCost: number;
  skills: string[];
  experience: 'Junior' | 'Mid' | 'Senior' | 'Expert';
  example: string;
  avatar: string;
  personality: string;
  estimatedTaskTime: string;
}

const ROLE_CATALOG: Role[] = [
  {
    id: 'content_strategist',
    title: 'Content Strategist',
    department: 'Marketing',
    description: 'Creates comprehensive content strategies, editorial calendars, and SEO-optimized content across all platforms.',
    monthlyCost: 19,
    skills: ['SEO Strategy', 'Content Planning', 'Brand Voice', 'Analytics'],
    experience: 'Senior',
    example: 'Develop a 3-month content strategy for our SaaS product launch',
    avatar: '📝',
    personality: 'Strategic and creative, with deep understanding of content marketing trends',
    estimatedTaskTime: '2-4 hours'
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    department: 'Research',
    description: 'Analyzes complex datasets, builds predictive models, and provides actionable business insights.',
    monthlyCost: 49,
    skills: ['Machine Learning', 'Statistical Analysis', 'Data Visualization', 'Python'],
    experience: 'Expert',
    example: 'Analyze user behavior data to identify churn patterns and retention opportunities',
    avatar: '📊',
    personality: 'Analytical and methodical, excels at finding patterns in complex data',
    estimatedTaskTime: '4-8 hours'
  },
  {
    id: 'ux_designer',
    title: 'UX Designer',
    department: 'Design',
    description: 'Designs intuitive user experiences, creates wireframes, and conducts user research.',
    monthlyCost: 29,
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    experience: 'Senior',
    example: 'Redesign our onboarding flow to improve user activation rates',
    avatar: '🎨',
    personality: 'Empathetic and user-focused, passionate about solving user problems',
    estimatedTaskTime: '3-6 hours'
  },
  {
    id: 'growth_hacker',
    title: 'Growth Hacker',
    department: 'Marketing',
    description: 'Develops and executes growth experiments, optimizes conversion funnels, and drives user acquisition.',
    monthlyCost: 39,
    skills: ['A/B Testing', 'Conversion Optimization', 'Viral Marketing', 'Analytics'],
    experience: 'Senior',
    example: 'Design and implement a referral program to increase user acquisition by 40%',
    avatar: '🚀',
    personality: 'Experimental and results-driven, always testing new growth channels',
    estimatedTaskTime: '2-5 hours'
  },
  {
    id: 'ai_coder',
    title: 'AI Code Writer',
    department: 'Development',
    description: 'Builds and deploys AI models, integrates machine learning solutions, and optimizes AI workflows.',
    monthlyCost: 59,
    skills: ['Deep Learning', 'MLOps', 'Model Deployment', 'AI Ethics'],
    experience: 'Expert',
    example: 'Build a recommendation system to personalize user experience',
    avatar: '🤖',
    personality: 'Technical and innovative, stays on cutting edge of AI technology',
    estimatedTaskTime: '6-12 hours'
  },
  {
    id: 'market_researcher',
    title: 'Market Researcher',
    department: 'Research',
    description: 'Conducts comprehensive market analysis, competitive research, and consumer behavior studies.',
    monthlyCost: 19,
    skills: ['Market Analysis', 'Competitive Intelligence', 'Survey Design', 'Trend Analysis'],
    experience: 'Mid',
    example: 'Research the competitive landscape for our new product vertical',
    avatar: '🔍',
    personality: 'Curious and thorough, excellent at uncovering market insights',
    estimatedTaskTime: '3-5 hours'
  }
];

export default function HeinXProfessionalDashboard() {
  const [team, setTeam] = useState<AIEmployee[]>([]);
  const [activeTab, setActiveTab] = useState<'hire' | 'dashboard' | 'team'>('dashboard');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  // Generate AI employee details
  const generateEmployeeDetails = (role: Role) => {
    return {
      avatar: role.avatar,
      personality: role.personality
    };
  };

  // Hire a new AI employee
  const hireEmployee = (role: Role) => {
    const details = generateEmployeeDetails(role);
    const newEmployee: AIEmployee = {
      id: `emp_${Date.now()}`,
      roleId: role.id,
      title: role.title,
      avatar: details.avatar,
      personality: details.personality,
      specialties: role.skills,
      experience: role.experience,
      performanceScore: 85 + Math.random() * 15,
      hiredAt: new Date().toISOString(),
      status: 'available',
      completedTasks: 0,
      monthlyCost: role.monthlyCost,
      inbox: []
    };
    
    setTeam(prev => [...prev, newEmployee]);
    setActiveTab('team');
    setSelectedEmployeeId(newEmployee.id);
  };

  // Assign task to employee
  const assignTask = (employeeId: string) => {
    if (!taskTitle.trim() || !taskDescription.trim()) return;
    
    const employee = team.find(emp => emp.id === employeeId);
    if (!employee) return;

    const role = ROLE_CATALOG.find(r => r.id === employee.roleId);
    if (!role) return;

    const task: Task = {
      id: `task_${Date.now()}`,
      employeeId,
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      estimatedTime: role.estimatedTaskTime
    };

    setTasks(prev => [task, ...prev]);
    setTeam(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, status: 'working', inbox: [task, ...emp.inbox] }
        : emp
    ));

    setTaskTitle('');
    setTaskDescription('');

    // Simulate task completion
    setTimeout(() => {
      const results = [
        `Completed analysis shows 3 key opportunities for improvement. Detailed report with actionable recommendations attached.`,
        `Strategy implemented with A/B testing framework. Initial results show 23% improvement in target metrics.`,
        `Research conducted across 500+ data points. Key insights include market size validation and competitive positioning.`,
        `Design prototypes created with user testing feedback incorporated. Ready for development handoff.`,
        `Implementation complete with comprehensive documentation and performance optimization included.`
      ];
      
      const randomResult = results[Math.floor(Math.random() * results.length)];
      
      setTasks(prev => prev.map(t => 
        t.id === task.id 
          ? { ...t, status: 'completed', result: randomResult }
          : t
      ));
      
      setTeam(prev => prev.map(emp => 
        emp.id === employeeId
          ? { 
              ...emp, 
              status: 'available', 
              completedTasks: emp.completedTasks + 1,
              performanceScore: Math.min(100, emp.performanceScore + 0.5),
              inbox: emp.inbox.map(inboxTask => 
                inboxTask.id === task.id 
                  ? { ...inboxTask, status: 'completed', result: randomResult }
                  : inboxTask
              )
            }
          : emp
      ));
    }, 3000 + Math.random() * 5000);
  };

  // Fire employee
  const fireEmployee = (employeeId: string) => {
    setTeam(prev => prev.filter(emp => emp.id !== employeeId));
    if (selectedEmployeeId === employeeId) {
      setSelectedEmployeeId(null);
    }
  };

  // Calculate company stats
  const companyStats = {
    totalEmployees: team.length,
    activeTasks: tasks.filter(t => t.status === 'in_progress').length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    avgPerformance: team.length > 0 ? team.reduce((sum, emp) => sum + emp.performanceScore, 0) / team.length : 0,
    monthlyBurn: team.reduce((sum, emp) => sum + emp.monthlyCost, 0)
  };

  // Dashboard View
  const DashboardView = () => (
    <div className="space-y-6">
      {/* Company Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-6 rounded-2xl border border-blue-500/30">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold">{companyStats.totalEmployees}</p>
              <p className="text-sm text-white/70">AI Employees</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-6 rounded-2xl border border-green-500/30">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold">{companyStats.completedTasks}</p>
              <p className="text-sm text-white/70">Tasks Completed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-6 rounded-2xl border border-purple-500/30">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold">{companyStats.avgPerformance.toFixed(1)}%</p>
              <p className="text-sm text-white/70">Avg Performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {tasks.slice(0, 5).map(task => {
              const employee = team.find(emp => emp.id === task.employeeId);
              return (
                <div key={task.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{employee?.avatar}</div>
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-white/70">{employee?.title} • {task.status}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    task.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setActiveTab('hire')}
              className="w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium flex items-center gap-2 justify-center"
            >
              <Plus className="w-4 h-4" />
              Hire New Employee
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className="w-full p-3 bg-white/10 rounded-xl font-medium flex items-center gap-2 justify-center border border-white/20"
            >
              <Users className="w-4 h-4" />
              Manage Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Role Card Component
  const RoleCard = ({ role }: { role: Role }) => (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <div className="text-3xl">{role.avatar}</div>
          <div>
            <h3 className="text-lg font-semibold">{role.title}</h3>
            <p className="text-sm text-white/70">{role.department}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-white/60">{role.experience}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-400">${role.monthlyCost}/mo</p>
        </div>
      </div>

      <p className="text-sm text-white/80 mb-4">{role.description}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {role.skills.slice(0, 3).map(skill => (
          <span key={skill} className="px-2 py-1 bg-white/10 rounded-full text-xs">
            {skill}
          </span>
        ))}
        {role.skills.length > 3 && (
          <span className="px-2 py-1 text-xs text-white/60">+{role.skills.length - 3} more</span>
        )}
      </div>

      <div className="bg-white/5 p-3 rounded-lg mb-4">
        <p className="text-xs text-white/70 mb-1">Example Task:</p>
        <p className="text-sm">{role.example}</p>
      </div>

      <button
        onClick={() => hireEmployee(role)}
        className="w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium group-hover:shadow-lg transition-all"
      >
        Hire Now
      </button>
    </div>
  );

  // Employee Card Component
  const EmployeeCard = ({ employee }: { employee: AIEmployee }) => (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <div className="text-3xl">{employee.avatar}</div>
          <div>
            <h3 className="font-semibold">{employee.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${
                employee.status === 'available' ? 'bg-green-400' :
                employee.status === 'working' ? 'bg-blue-400' : 'bg-gray-400'
              }`} />
              <span className="text-xs capitalize">{employee.status}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{employee.performanceScore.toFixed(1)}</span>
          </div>
          <p className="text-xs text-white/60">{employee.completedTasks} tasks done</p>
        </div>
      </div>

      <p className="text-sm text-white/80 mb-4">{employee.personality}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {employee.specialties.slice(0, 2).map(specialty => (
          <span key={specialty} className="px-2 py-1 bg-white/10 rounded-full text-xs">
            {specialty}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setSelectedEmployeeId(employee.id)}
          className="flex-1 p-2 bg-indigo-500/20 text-indigo-300 rounded-lg text-sm font-medium border border-indigo-500/30"
        >
          Assign Task
        </button>
        <button
          onClick={() => fireEmployee(employee.id)}
          className="p-2 bg-red-500/20 text-red-300 rounded-lg text-sm border border-red-500/30"
        >
          Release
        </button>
      </div>
    </div>
  );

  // Hire View
  const HireView = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Hire AI Employees</h2>
        <p className="text-white/70">Build your dream team with specialized AI professionals</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ROLE_CATALOG.map(role => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </div>
  );

  // Team Management View
  const TeamView = () => {
    const selectedEmployee = team.find(emp => emp.id === selectedEmployeeId);
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-semibold">Your Team ({team.length})</h3>
          {team.length === 0 ? (
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
              <Users className="w-12 h-12 text-white/40 mx-auto mb-3" />
              <p className="text-white/60">No employees hired yet</p>
              <button
                onClick={() => setActiveTab('hire')}
                className="mt-3 px-4 py-2 bg-indigo-500 rounded-lg text-sm"
              >
                Hire Your First Employee
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {team.map(employee => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedEmployee ? (
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">{selectedEmployee.avatar}</div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedEmployee.title}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{selectedEmployee.performanceScore.toFixed(1)}% Performance</span>
                    </div>
                    <div className="text-sm text-white/60">
                      {selectedEmployee.completedTasks} tasks completed
                    </div>
                  </div>
                </div>
              </div>

              {/* Task Assignment Form */}
              <div className="bg-white/5 p-4 rounded-xl mb-6">
                <h3 className="font-semibold mb-4">Assign New Task</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Task Title</label>
                    <input
                      type="text"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl"
                      placeholder="Enter task title..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl h-24 resize-none"
                      placeholder="Describe the task in detail..."
                    />
                  </div>

                  <button
                    onClick={() => assignTask(selectedEmployee.id)}
                    disabled={!taskTitle.trim() || !taskDescription.trim()}
                    className="w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium disabled:opacity-50"
                  >
                    Assign Task
                  </button>
                </div>
              </div>

              {/* Task History */}
              <div>
                <h3 className="font-semibold mb-4">Task History</h3>
                <div className="space-y-3">
                  {selectedEmployee.inbox.length === 0 ? (
                    <p className="text-white/60 text-center py-8">No tasks assigned yet</p>
                  ) : (
                    selectedEmployee.inbox.map(task => (
                      <div key={task.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{task.title}</h4>
                          <div className={`px-2 py-1 rounded-full text-xs ${
                            task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            task.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {task.status.replace('_', ' ')}
                          </div>
                        </div>
                        <p className="text-sm text-white/70 mb-2">{task.description}</p>
                        {task.result && (
                          <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <p className="text-sm text-green-300">{task.result}</p>
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-2 text-xs text-white/60">
                          <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 p-12 rounded-2xl border border-white/10 text-center">
              <Briefcase className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Select an Employee</h3>
              <p className="text-white/60">Choose an employee from your team to assign tasks and view their performance</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              HeinX Professional
            </h1>
            <p className="text-white/70 mt-1">Your AI-Powered Virtual Workforce Platform</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                CEO
              </div>
              <span className="font-medium">You</span>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex gap-2 mb-8 bg-white/5 p-1 rounded-2xl border border-white/10 w-fit">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'hire', label: 'Hire', icon: Plus },
            { id: 'team', label: 'Team', icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Main Content */}
        <main>
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'hire' && <HireView />}
          {activeTab === 'team' && <TeamView />}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-white/40 text-sm">
          <p>HeinX Professional • Powered by Advanced AI • Build your virtual company today</p>
        </footer>
      </div>
    </div>
  );
}