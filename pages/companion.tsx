import { useRouter } from "next/router";
import { useState } from "react";
import {
  Video,
  BookOpen,
  FileText,
  MessageCircle,
  Brain,
  Target,
  User,
  BarChart,
} from "lucide-react";

type Message = {
  sender: string;
  text: string;
  timestamp: string;
  type?: string;
};

type Insight = {
  title: string;
  description: string;
  impact: string;
  icon: React.ElementType;
  color: string;
};

export default function CompanionOnboarding() {
  const router = useRouter();

  // Onboarding state
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    profession: "",
    goals: "",
    tone: "",
  });

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "Nova",
      text: "Hey! I'm Nova, your personal companion. Ready to start?",
      timestamp: "10:00 AM",
      type: "motivational",
    },
    {
      sender: "You",
      text: "Yes, let's go!",
      timestamp: "10:01 AM",
    },
  ]);
  const [input, setInput] = useState("");

  // Study topic state
  const [studyTopicInput, setStudyTopicInput] = useState("");
  const studyTopics = ["AI", "Mathematics", "Philosophy", "Physics"];

  // Insights
  const insights: Insight[] = [
    {
      title: "Consistency Matters",
      description: "You've studied AI for 5 days in a row.",
      impact: "Great habit-building!",
      icon: Brain,
      color: "bg-purple-100",
    },
    {
      title: "Peak Hours",
      description: "You focus best between 9-11 AM.",
      impact: "Optimize your study schedule.",
      icon: Target,
      color: "bg-green-100",
    },
  ];

  // Mock resources
  const resources = [
    { title: "Intro to AI", type: "Video Lecture" },
    { title: "Linear Algebra Basics", type: "PDF Notes" },
    { title: "AI Weekly Newsletter", type: "Article" },
  ];

  // Handlers
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      sender: "You",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  const steps = [
    { label: "Name", key: "name", placeholder: "Enter your name" },
    { label: "Age", key: "age", placeholder: "Enter your age" },
    { label: "Profession", key: "profession", placeholder: "e.g., Student, Engineer" },
    { label: "Goals", key: "goals", placeholder: "What are your main goals?" },
    { label: "Tone", key: "tone", placeholder: "Friendly, Motivational, Professional" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Onboarding Flow */}
      {currentStep < steps.length ? (
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            {steps[currentStep].label}
          </h2>
          <input
            type="text"
            placeholder={steps[currentStep].placeholder}
            value={formData[steps[currentStep].key as keyof typeof formData]}
            onChange={(e) =>
              handleChange(
                steps[currentStep].key as keyof typeof formData,
                e.target.value
              )
            }
            className="w-full p-3 border rounded-xl mb-4"
          />
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl"
          >
            Next
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome, {formData.name}!</h2>
          <p className="mb-6">Your profile is ready. Let’s get started 🚀</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold"
          >
            Set up my profile
          </button>
        </div>
      )}

      {/* Chat Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Chat with Nova</h3>
        <div className="h-64 overflow-y-auto mb-4 border rounded-xl p-3">
          {messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <span className="font-semibold">{msg.sender}: </span>
              <span>{msg.text}</span>
              <div className="text-xs text-gray-500">{msg.timestamp}</div>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 p-2 border rounded-xl"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
          >
            Send
          </button>
        </div>
      </div>

      {/* Study Topics */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Study Topics</h3>
        <div className="flex space-x-2 mb-4">
          {studyTopics.map((topic, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
        <input
          value={studyTopicInput}
          onChange={(e) => setStudyTopicInput(e.target.value)}
          placeholder="Add a new topic"
          className="w-full p-2 border rounded-xl"
        />
      </div>

      {/* Insights */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Your Insights</h3>
        <div className="space-y-3">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className={`flex items-center p-4 rounded-xl ${insight.color}`}
            >
              <insight.icon className="w-6 h-6 text-indigo-600 mr-3" />
              <div>
                <h4 className="font-semibold">{insight.title}</h4>
                <p className="text-sm">{insight.description}</p>
                <span className="text-xs text-gray-600">{insight.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Learning Resources</h3>
        <div className="space-y-3">
          {resources.map((resource, idx) => (
            <div
              key={idx}
              className="flex items-center p-3 border rounded-xl"
            >
              {resource.type === "Video Lecture" ? (
                <Video className="w-5 h-5 text-indigo-600 mr-3" />
              ) : resource.type === "PDF Notes" ? (
                <FileText className="w-5 h-5 text-green-600 mr-3" />
              ) : (
                <BookOpen className="w-5 h-5 text-orange-600 mr-3" />
              )}
              <span>{resource.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
