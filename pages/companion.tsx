import React, { useState } from 'react';
import { User, Brain, Target, Heart, Sparkles, ArrowRight, Crown } from 'lucide-react';

// Add this interface for navigation props
interface CompanionSetupProps {
  onSetupComplete: () => void;
}

export default function CompanionSetup({ onSetupComplete }: CompanionSetupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    profession: '',
    goals: '',
    tone: 'friendly',
    interests: '',
    aiName: '',
    personality: 'supportive',
    communicationStyle: 'conversational',
    focusAreas: [],
    aiAvatar: 'neural'
  });

  const steps = [
    { icon: User, title: "Personal Info", subtitle: "Tell us about yourself" },
    { icon: Brain, title: "AI Personality", subtitle: "Craft your perfect companion" },
    { icon: Target, title: "Goals & Interests", subtitle: "Define your journey" },
    { icon: Heart, title: "Relationship Style", subtitle: "How should HeinX interact?" }
  ];

  const personalities = [
    { id: 'mentor', name: 'Wise Mentor', desc: 'Guides with wisdom and experience', emoji: '🧙‍♂️' },
    { id: 'friend', name: 'Best Friend', desc: 'Casual, supportive, always there', emoji: '😊' },
    { id: 'coach', name: 'Life Coach', desc: 'Motivational and goal-focused', emoji: '💪' },
    { id: 'analyst', name: 'Strategic Analyst', desc: 'Data-driven and logical', emoji: '🤖' }
  ];

  const avatars = [
    { id: 'neural', name: 'Neural', gradient: 'from-purple-500 to-blue-500' },
    { id: 'cosmic', name: 'Cosmic', gradient: 'from-indigo-500 to-purple-600' },
    { id: 'zen', name: 'Zen', gradient: 'from-green-400 to-blue-500' },
    { id: 'fire', name: 'Fire', gradient: 'from-orange-400 to-red-500' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save data and redirect to dashboard
      const data = { ...formData };
      console.log('Companion created:', data);
      alert('🎉 Your HeinX AI companion is ready! Redirecting to dashboard...');
      // Call the navigation function to redirect to dashboard
      onSetupComplete();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Let's get to know you</h2>
              <p className="text-gray-600">This helps HeinX understand and adapt to you</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
              <input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Profession/Role"
                value={formData.profession}
                onChange={(e) => setFormData({...formData, profession: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Design Your AI Companion</h2>
              <p className="text-gray-600">Choose personality and appearance</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Name</label>
              <input
                type="text"
                placeholder="What should I call your AI?"
                value={formData.aiName}
                onChange={(e) => setFormData({...formData, aiName: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Avatar Style</label>
              <div className="flex space-x-3">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    onClick={() => setFormData({...formData, aiAvatar: avatar.id})}
                    className={`flex-1 h-16 bg-gradient-to-r ${avatar.gradient} rounded-xl cursor-pointer border-4 transition-all ${
                      formData.aiAvatar === avatar.id ? 'border-white shadow-lg' : 'border-transparent'
                    }`}
                  >
                    <div className="h-full flex items-center justify-center text-white font-medium">
                      {avatar.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Goals & Interests</h2>
              <p className="text-gray-600">Help your AI understand what matters to you</p>
            </div>
            
            <textarea
              placeholder="What are your main goals? (e.g., improve fitness, learn coding, grow business)"
              value={formData.goals}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors h-24"
            />
            
            <textarea
              placeholder="What interests you? (hobbies, topics, activities)"
              value={formData.interests}
              onChange={(e) => setFormData({...formData, interests: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors h-24"
            />
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Communication Style</h2>
              <p className="text-gray-600">How should your AI interact with you?</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tone</label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({...formData, tone: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="friendly">Friendly & Warm</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual & Fun</option>
                <option value="motivational">Motivational</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Communication Style</label>
              <select
                value={formData.communicationStyle}
                onChange={(e) => setFormData({...formData, communicationStyle: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="conversational">Conversational</option>
                <option value="structured">Structured & Detailed</option>
                <option value="concise">Short & Concise</option>
                <option value="storytelling">Story-driven</option>
              </select>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-3">
                <Crown className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-semibold text-purple-800">Premium Features Unlocked</span>
              </div>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Advanced personality adaptation</li>
                <li>• Unlimited conversations</li>
                <li>• Goal tracking & analytics</li>
                <li>• Custom AI training</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-purple-600 mr-2" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HeinX AI
              </h1>
            </div>
            <p className="text-gray-600">Create Your Perfect AI Companion</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  index <= currentStep 
                    ? 'bg-blue-500 border-blue-500 text-white' 
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
                Step {currentStep + 1} of {steps.length}
              </div>
              
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all flex items-center"
              >
                {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
