import React, { useState } from 'react';
import { User, Brain, Target, Heart, Sparkles, ArrowRight, Crown, BookOpen, GraduationCap, Award } from 'lucide-react';

interface CompanionSetupProps {
  onSetupComplete: () => void;
}

type SetupMode = 'personal' | 'study';

export default function CompanionSetup({ onSetupComplete }: CompanionSetupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [setupMode, setSetupMode] = useState<SetupMode>('personal');
  const [formData, setFormData] = useState({
    // Personal Mode
    name: '',
    age: '',
    profession: '',
    goals: [''],
    aiName: 'HeinX',
    personality: 'mentor',
    subscription: 'free' as 'free' | 'premium' | 'pro',
    
    // Study Mode
    major: '',
    educationLevel: '',
    preparingFor: '',
    targetExam: '',
    subjects: [''],
    studyPace: 'moderate' as const,
  });

  const steps = {
    personal: [
      { icon: User, title: "Welcome", subtitle: "Choose your journey" },
      { icon: User, title: "Personal Info", subtitle: "Tell us about yourself" },
      { icon: Target, title: "Goals & Vision", subtitle: "What do you want to achieve?" },
      { icon: Brain, title: "AI Personality", subtitle: "Meet your companion" },
      { icon: Crown, title: "Subscription", subtitle: "Choose your plan" }
    ],
    study: [
      { icon: User, title: "Welcome", subtitle: "Choose your journey" },
      { icon: User, title: "Student Profile", subtitle: "Tell us about your studies" },
      { icon: BookOpen, title: "Academic Goals", subtitle: "What are you preparing for?" },
      { icon: GraduationCap, title: "Learning Style", subtitle: "How do you learn best?" },
      { icon: Crown, title: "Study Plan", subtitle: "Choose your access level" }
    ]
  };

  const personalities = [
    { id: 'mentor', name: 'Wise Mentor', desc: 'Guides with wisdom and experience', emoji: '🧙‍♂️' },
    { id: 'friend', name: 'Best Friend', desc: 'Casual, supportive, always there', emoji: '😊' },
    { id: 'coach', name: 'Life Coach', desc: 'Motivational and goal-focused', emoji: '💪' },
    { id: 'analyst', name: 'Strategic Analyst', desc: 'Data-driven and logical', emoji: '🤖' }
  ];

  const subscriptionPlans = {
    personal: [
      {
        id: 'free',
        name: 'Explorer',
        price: 'Free',
        features: ['3 goal tracking', '10 messages/day', 'Basic memory', 'Standard support'],
        goalsLimit: 3,
        messagesPerDay: 10
      },
      {
        id: 'premium',
        name: 'Achiever',
        price: '$9.99/month',
        features: ['5 goal tracking', 'Unlimited messages', 'Advanced memory', 'Priority support', 'Progress analytics'],
        goalsLimit: 5,
        messagesPerDay: Infinity
      },
      {
        id: 'pro',
        name: 'Visionary',
        price: '$19.99/month',
        features: ['7 goal tracking', 'Unlimited messages', 'Photographic memory', '24/7 support', 'Advanced analytics', 'Voice features'],
        goalsLimit: 7,
        messagesPerDay: Infinity
      }
    ],
    study: [
      {
        id: 'free',
        name: 'Learner',
        price: 'Free',
        features: ['Topic explanations', '3 subjects', 'Basic concepts', 'Standard support'],
        subjectsLimit: 3,
        tests: false,
        examSimulation: false
      },
      {
        id: 'premium',
        name: 'Scholar',
        price: '$7.99/month',
        features: ['Detailed explanations', '5 subjects', 'Quiz assessments', 'Progress tracking', 'Priority support'],
        subjectsLimit: 5,
        tests: true,
        examSimulation: false
      },
      {
        id: 'pro',
        name: 'Master',
        price: '$14.99/month',
        features: ['Advanced explanations', 'Unlimited subjects', 'Full test series', 'Exam simulation', 'Personalized study plans', '24/7 support'],
        subjectsLimit: Infinity,
        tests: true,
        examSimulation: true
      }
    ]
  };

  const educationLevels = [
    'High School', 'Undergraduate', 'Graduate', 'Professional', 'Lifelong Learner'
  ];

  const targetExams = [
    'JEE Mains/Advanced', 'NEET', 'UPSC', 'GATE', 'CAT', 'GRE', 'GMAT', 'CBSE Board', 'State Board', 'Other'
  ];

  const handleNext = () => {
    if (currentStep < steps[setupMode].length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Companion created:', formData);
      alert(`🎉 Your HeinX ${setupMode === 'personal' ? 'Companion' : 'Tutor'} is ready!`);
      onSetupComplete();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to HeinX</h2>
            <p className="text-gray-600 text-lg mb-8">Choose how you want to grow with AI</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => setSetupMode('personal')}
                className={`p-8 border-2 rounded-2xl cursor-pointer transition-all ${
                  setupMode === 'personal' 
                    ? 'border-blue-500 bg-blue-50 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Personal Companion</h3>
                <p className="text-gray-600">Achieve goals, build habits, and transform your life with AI guidance</p>
                <div className="mt-4 text-sm text-blue-600 font-medium">
                  {setupMode === 'personal' ? '✓ Selected' : 'Select'}
                </div>
              </div>

              <div
                onClick={() => setSetupMode('study')}
                className={`p-8 border-2 rounded-2xl cursor-pointer transition-all ${
                  setupMode === 'study' 
                    ? 'border-green-500 bg-green-50 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Study Mode</h3>
                <p className="text-gray-600">Master subjects, prepare for exams, and accelerate learning with AI tutoring</p>
                <div className="mt-4 text-sm text-green-600 font-medium">
                  {setupMode === 'study' ? '✓ Selected' : 'Select'}
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return setupMode === 'personal' ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Tell Us About Yourself</h2>
              <p className="text-gray-600">This helps your AI companion understand you better</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Ex: john"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  placeholder="Your age"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profession/Role</label>
                <input
                  type="text"
                  placeholder="What do you do?"
                  value={formData.profession}
                  onChange={(e) => setFormData({...formData, profession: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-800"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Student Profile</h2>
              <p className="text-gray-600">Help your AI tutor understand your academic background</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  placeholder="Your age"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({...formData, educationLevel: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-gray-800"
                >
                  <option value="">Select your level</option>
                  {educationLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return setupMode === 'personal' ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Goals & Vision</h2>
              <p className="text-gray-600">What do you want to achieve with your AI companion?</p>
            </div>
            
            <div className="space-y-4">
              {formData.goals.map((goal, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder={`Goal ${index + 1} (e.g., Learn coding, Get fit, Start business)`}
                    value={goal}
                    onChange={(e) => {
                      const newGoals = [...formData.goals];
                      newGoals[index] = e.target.value;
                      setFormData({...formData, goals: newGoals});
                    }}
                    className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-gray-800"
                  />
                  {index > 0 && (
                    <button
                      onClick={() => {
                        const newGoals = formData.goals.filter((_, i) => i !== index);
                        setFormData({...formData, goals: newGoals});
                      }}
                      className="p-4 text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              
              {formData.goals.length < 7 && (
                <button
                  onClick={() => setFormData({...formData, goals: [...formData.goals, '']})}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  + Add Another Goal
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Academic Goals</h2>
              <p className="text-gray-600">What are you preparing for with HeinX Tutor?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Major/Field of Study</label>
                <input
                  type="text"
                  placeholder="e.g., Computer Science, Medicine, Business"
                  value={formData.major}
                  onChange={(e) => setFormData({...formData, major: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preparing For Exam</label>
                <select
                  value={formData.targetExam}
                  onChange={(e) => setFormData({...formData, targetExam: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-gray-800"
                >
                  <option value="">Select target exam</option>
                  {targetExams.map(exam => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Subjects</label>
                <div className="space-y-2">
                  {formData.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder={`Subject ${index + 1}`}
                        value={subject}
                        onChange={(e) => {
                          const newSubjects = [...formData.subjects];
                          newSubjects[index] = e.target.value;
                          setFormData({...formData, subjects: newSubjects});
                        }}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-gray-800"
                      />
                      {index > 0 && (
                        <button
                          onClick={() => {
                            const newSubjects = formData.subjects.filter((_, i) => i !== index);
                            setFormData({...formData, subjects: newSubjects});
                          }}
                          className="p-3 text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {formData.subjects.length < 5 && (
                    <button
                      onClick={() => setFormData({...formData, subjects: [...formData.subjects, '']})}
                      className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-green-500 hover:text-green-500 transition-colors text-sm"
                    >
                      + Add Another Subject
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return setupMode === 'personal' ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your AI Companion</h2>
              <p className="text-gray-600">Personalize how your AI interacts with you</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name Your AI</label>
              <input
                type="text"
                placeholder="What should I call your AI companion?"
                value={formData.aiName}
                onChange={(e) => setFormData({...formData, aiName: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors mb-6 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Personality Type</label>
              <div className="grid grid-cols-2 gap-3">
                {personalities.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setFormData({...formData, personality: p.id})}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.personality === p.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{p.emoji}</div>
                    <div className="font-medium text-gray-800">{p.name}</div>
                    <div className="text-sm text-gray-600">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Learning Style</h2>
              <p className="text-gray-600">How do you prefer to learn?</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Study Pace</label>
              <select
                value={formData.studyPace}
                onChange={(e) => setFormData({...formData, studyPace: e.target.value as any})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-gray-800"
              >
                <option value="relaxed">Relaxed (1-2 hours/day)</option>
                <option value="moderate">Moderate (3-4 hours/day)</option>
                <option value="intensive">Intensive (5+ hours/day)</option>
                <option value="cramming">Exam Cramming (Full-time)</option>
              </select>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center mb-3">
                <Award className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-800">Smart Tutoring</span>
              </div>
              <p className="text-sm text-green-700">
                Your AI tutor will adapt to your pace, provide spaced repetition, and focus on your weak areas automatically.
              </p>
            </div>
          </div>
        );

      case 4:
        const plans = subscriptionPlans[setupMode];
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {setupMode === 'personal' ? 'Choose Your Plan' : 'Select Study Access'}
              </h2>
              <p className="text-gray-600">
                {setupMode === 'personal' 
                  ? 'Unlock your full potential with the right plan' 
                  : 'Get the perfect level of tutoring support'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setFormData({...formData, subscription: plan.id as 'free' | 'premium' | 'pro'})}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.subscription === plan.id
                      ? setupMode === 'personal' 
                        ? 'border-blue-500 bg-blue-50 shadow-lg' 
                        : 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    formData.subscription === plan.id
                      ? setupMode === 'personal' ? 'bg-blue-500' : 'bg-green-500'
                      : 'bg-gray-200'
                  }`}>
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{plan.name}</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-4">{plan.price}</p>
                  
                  <ul className="space-y-2 text-sm text-gray-600">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-4 h-4 text-green-500 mr-2">✓</div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className={`mt-4 text-center font-medium ${
                    formData.subscription === plan.id
                      ? setupMode === 'personal' ? 'text-blue-600' : 'text-green-600'
                      : 'text-gray-500'
                  }`}>
                    {formData.subscription === plan.id ? 'Selected' : 'Choose Plan'}
                  </div>
                </div>
              ))}
            </div>

            {formData.subscription === 'free' && (
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Start with Free:</strong> You can always upgrade later to unlock more features!
                </p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-purple-600 mr-2" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HeinX AI
              </h1>
            </div>
            <p className="text-gray-600">Create Your Perfect AI {setupMode === 'personal' ? 'Companion' : 'Tutor'}</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {steps[setupMode].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  index <= currentStep 
                    ? setupMode === 'personal'
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="text-xs text-center mt-2">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-gray-500">{step.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Back
              </button>
              
              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps[setupMode].length}
              </div>
              
              <button
                onClick={handleNext}
                className={`px-8 py-3 rounded-xl font-medium transition-all flex items-center ${
                  setupMode === 'personal'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                }`}
              >
                {currentStep === steps[setupMode].length - 1 ? 'Complete Setup' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
