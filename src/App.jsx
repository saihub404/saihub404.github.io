import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  BarChart3,
  Brain,
  Terminal,
  ChevronRight,
  Download,
  Sparkles,
  X,
  Send,
  Menu,
  Home,
  User,
  Briefcase,
  Cpu,
  Cloud,
  ArrowUpRight,
  Copy,
  Check
} from 'lucide-react';

// --- API Configuration ---
const apiKey = ""; // The execution environment provides this key

// --- Gemini Helper ---
const callGemini = async (prompt, systemInstruction = "") => {
  if (!apiKey) {
    console.warn("API Key is missing - AI features will be simulated or return error.");
    return "I'm currently operating in offline mode. Please add an API key to enable my full AI capabilities!";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't reach the AI service right now. Please try again later.";
  }
};

// --- Resume Data ---

const PROFILE = {
  name: "Sai Ganesh Voodi",
  title: "Data Analyst | Masters in Advanced Data Analytics",
  bio: "Results-driven Data Analyst with 4 years of experience transforming complex datasets into actionable business insights. Proven expertise in statistical modeling, predictive analytics, and data visualization using Python, SQL, and Tableau.",
  email: "saiganeshvoodi@gmail.com",
  github: "https://github.com/saihub404", // Updated GitHub Link
  linkedin: "https://linkedin.com/in/saiganesh223468/"
};

const SKILLS = [
  { category: "Languages", name: "Python", value: 90, icon: Code },
  { category: "Languages", name: "SQL", value: 95, icon: Database },
  { category: "Languages", name: "R", value: 80, icon: Terminal },
  { category: "Visualization", name: "Tableau", value: 90, icon: BarChart3 },
  { category: "Visualization", name: "Power BI", value: 85, icon: BarChart3 },
  { category: "Cloud", name: "AWS & GCP", value: 75, icon: Cloud },
  { category: "Analysis", name: "Machine Learning", value: 85, icon: Brain },
  { category: "Analysis", name: "Predictive Modeling", value: 88, icon: Brain },
];

const PROJECTS = [
  {
    id: 1,
    title: "Stock Price Prediction (Sentiment Analysis)",
    category: "Machine Learning",
    description: "Developed a comprehensive stock prediction system employing Logistic Regression, XGBoost, RNN, and LSTM. Integrated news sentiment analysis to optimize performance.",
    tech: ["Python", "XGBoost", "LSTM", "NLP"],
    stats: { accuracy: "88%+", optim: "15%", models: "4+" }
  },
  {
    id: 2,
    title: "Crime Forecasting & Response Optimization",
    category: "Predictive Analytics",
    description: "Processed 1.3M+ rows of Dallas crime data to reduce prediction error. Engineered geospatial variables with DBSCAN and Folium to visualize hotspots.",
    tech: ["Python", "SARIMA", "Prophet", "DBSCAN"],
    stats: { error_red: "35%", data: "1.3M+", accuracy: "85%+" }
  },
  {
    id: 3,
    title: "Network Automation Pipeline",
    category: "Automation",
    description: "Built Python automation using Cisco REST APIs to pull configuration data from 60+ devices, transforming raw API responses into structured datasets for warehousing.",
    tech: ["Python", "REST API", "SQL", "ETL"],
    stats: { devices: "60+", downtime: "-20%", type: "ETL" }
  },
  {
    id: 4,
    title: "Real-time System Monitoring",
    category: "Data Engineering",
    description: "Leveraged Splunk dashboards to monitor 50+ enterprise servers. Created automated alert triggers for anomalies, enabling proactive issue detection.",
    tech: ["Splunk", "SPL", "Data Pipelines"],
    stats: { servers: "50+", efficiency: "+30%", alerts: "Auto" }
  }
];

const EXPERIENCES = [
  {
    role: "Graduate Teaching Assistant",
    company: "University of North Texas",
    period: "June 2024 – May 2025",
    description: "Mentored 250+ students on machine learning model evaluation and GCP. Improved student cloud readiness by 15% through hands-on lab sessions."
  },
  {
    role: "Consulting Engineer - II",
    company: "Cisco Systems India Pvt. Ltd.",
    period: "Aug 2020 – June 2023",
    description: "Conducted data-driven root cause analysis reducing downtime by 20%. Automated log data extraction using Python and Splunk API, normalizing unstructured data."
  },
  {
    role: "Consulting Engineer Intern",
    company: "Cisco Systems India Pvt. Ltd.",
    period: "Jan 2020 – June 2020",
    description: "Built Splunk data pipelines for 150+ devices. Analyzed Wireshark packet captures to identify root causes of network incidents, improving efficiency by 25%."
  }
];

// --- Components ---

// Brand Logo Component
const BrandLogo = () => (
  <div className="relative w-12 h-12 group cursor-pointer">
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-lg group-hover:bg-amber-500/40 transition-all duration-500" />

    {/* Main Container */}
    <div className="relative w-full h-full bg-zinc-900 border border-zinc-700 group-hover:border-amber-500/50 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 shadow-xl">

      {/* Internal Tech Grid Background */}
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '4px 4px' }}
      />

      {/* Geometric Logo Mark */}
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-amber-400 relative z-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Stylized Hexagon/Node Structure */}
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2" className="fill-amber-400/20 stroke-amber-400" />
      </svg>
    </div>
  </div>
);

// Typing Effect Component (Optimized Speed)
const TypewriterEffect = ({ words, prefix }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // Faster typing speeds
    const typingSpeed = reverse ? 30 : subIndex === words[index].length ? 1500 : 50;

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <div className="text-lg md:text-2xl font-mono text-zinc-400 flex items-center gap-2 min-h-[3rem]">
      <span>{prefix}</span>
      <span className="text-amber-400 font-bold border-r-2 border-amber-400/50 pr-1 animate-pulse">
        {words[index].substring(0, subIndex)}
      </span>
    </div>
  );
};

// Custom Interactive Chart Component
const SkillChart = ({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-zinc-900/80 rounded-xl border border-amber-500/20 backdrop-blur-sm shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-amber-400" />
        Technical Proficiency
      </h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="relative group"
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div className="flex justify-between text-sm mb-1 text-zinc-300">
              <span className="font-medium flex items-center gap-2">
                <skill.icon className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                {skill.name}
              </span>
              <span className="text-amber-400 font-mono font-bold">{skill.value}%</span>
            </div>
            <div className="h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
              <div
                className={`h-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-200 transition-all duration-1000 ease-out relative shadow-[0_0_15px_rgba(251,191,36,0.4)]`}
                style={{ width: `${skill.value}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>
            </div>

            {/* Tooltip / Detail on hover */}
            <div className={`absolute left-0 -top-8 bg-black text-xs text-amber-400 px-3 py-1 rounded border border-amber-500/30 transition-opacity duration-200 pointer-events-none ${hoveredSkill === index ? 'opacity-100' : 'opacity-0'}`}>
              {skill.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const [aiInsight, setAiInsight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateInsight = async () => {
    if (aiInsight) return;

    setIsLoading(true);
    const prompt = `
      Analyze this data project:
      Title: ${project.title}
      Description: ${project.description}
      Tech Stack: ${project.tech.join(', ')}
      Stats: ${JSON.stringify(project.stats)}
      
      Provide a brief, impressive "Technical Deep Dive" (max 50 words). 
      Focus on the specific problem solving or technical complexity involved. 
      Start with an action verb. Do not include markdown or greeting.
    `;

    const result = await callGemini(prompt);
    setAiInsight(result);
    setIsLoading(false);
  };

  return (
    <div className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-amber-500/10 flex flex-col h-full">
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 text-xs font-bold text-amber-300 bg-amber-400/10 rounded-full border border-amber-400/20 tracking-wide">
            {project.category.toUpperCase()}
          </span>
          <div className="flex gap-2">
            <a href="#" className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-6 bg-black/50 p-3 rounded-lg border border-zinc-800">
          {Object.entries(project.stats).map(([key, val]) => (
            <div key={key} className="text-center">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-semibold">{key}</div>
              <div className="text-sm font-bold text-amber-300">{val}</div>
            </div>
          ))}
        </div>

        {aiInsight ? (
          <div className="mb-6 p-3 bg-amber-900/10 border border-amber-500/30 rounded-lg animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2 mb-2 text-amber-400 text-xs font-bold uppercase tracking-wide">
              <Sparkles className="w-3 h-3" />
              AI Technical Insight
            </div>
            <p className="text-zinc-300 text-xs italic leading-relaxed border-l-2 border-amber-500 pl-2">"{aiInsight}"</p>
          </div>
        ) : (
          <button
            onClick={handleGenerateInsight}
            disabled={isLoading}
            className="mb-6 w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-all hover:shadow-[0_0_10px_rgba(245,158,11,0.2)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
          >
            {isLoading ? (
              <>Generating Analysis...</>
            ) : (
              <>
                <Sparkles className="w-3 h-3" />
                Generate Deep Dive
              </>
            )}
          </button>
        )}

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-zinc-800">
          {project.tech.map((t) => (
            <span key={t} className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors cursor-default">
              #{t}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
};

const TimelineItem = ({ exp, isLast }) => (
  <div className="relative pl-8 pb-8 sm:pl-10">
    {!isLast && (
      <div className="absolute left-[11px] sm:left-[19px] top-2 h-full w-px bg-zinc-800" />
    )}
    <div className="absolute left-0 sm:left-2 top-2 w-6 h-6 rounded-full border-4 border-black bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
      <h4 className="text-lg font-bold text-white tracking-tight">{exp.role}</h4>
      <span className="text-sm font-mono text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 w-fit mt-1 sm:mt-0">
        {exp.period}
      </span>
    </div>
    <div className="text-base font-medium text-zinc-400 mb-2">{exp.company}</div>
    <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl">
      {exp.description}
    </p>
  </div>
);

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hi! I'm ${PROFILE.name.split(' ')[0]}'s AI assistant. Ask me anything about his experience, skills, or projects.` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const systemContext = `
      You are an AI assistant for ${PROFILE.name}, a ${PROFILE.title}.
      Your goal is to answer questions about Sai's professional background professionally and concisely.
      Here is Sai's data:
      Bio: ${PROFILE.bio}
      Skills: ${SKILLS.map(s => s.name).join(', ')}
      Projects: ${JSON.stringify(PROJECTS)}
      Experience: ${JSON.stringify(EXPERIENCES)}
      Tone: Professional, confident, helpful, and slightly enthusiastic.
      Constraint: Keep answers under 80 words.
      If asked about contact, provide: ${PROFILE.email}.
    `;

    const aiResponse = await callGemini(userMsg, systemContext);

    setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-black border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 max-h-[500px]">
          <div className="bg-zinc-900 p-4 border-b border-zinc-800 flex justify-between items-center">
            <div className="flex items-center gap-2 text-white font-bold">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
              Sai's AI Assistant
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/95 min-h-[300px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed border ${msg.role === 'user' ? 'bg-amber-500 text-black font-medium border-amber-400 rounded-br-none' : 'bg-zinc-900 text-zinc-300 border-zinc-800 rounded-bl-none'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 p-3 rounded-2xl rounded-bl-none border border-zinc-800 flex gap-1 items-center">
                  <span className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about my projects..."
              className="flex-1 bg-black text-white text-sm rounded-lg px-4 py-2 border border-zinc-800 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-600"
            />
            <button type="submit" disabled={!inputValue.trim() || isTyping} className="bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:hover:bg-amber-400 text-black p-2 rounded-lg transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-4 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all active:scale-95 ${isOpen ? 'rotate-0' : ''}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <><Sparkles className="w-6 h-6" /><span className="hidden sm:inline pr-2">Ask Sai's AI</span></>}
      </button>
    </div>
  );
};

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];

  const filteredProjects = useMemo(() => {
    return activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Star with twinkle animation
  const Star = ({ style }) => (
    <div
      className="absolute bg-amber-100 rounded-full animate-twinkle shadow-[0_0_3px_rgba(255,255,255,0.8)]"
      style={{
        width: `${Math.random() * 2 + 0.5}px`,
        height: `${Math.random() * 2 + 0.5}px`,
        ...style
      }}
    />
  );

  const numStars = 120;
  const stars = useMemo(() => {
    const s = [];
    for (let i = 0; i < numStars; i++) {
      s.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
      });
    }
    return s;
  }, []);

  const menuItems = [
    { id: 'about', label: 'Home', icon: Home },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-200 font-sans selection:bg-amber-500/30 selection:text-amber-100 flex flex-col md:flex-row">

      {/* Vertical Sidebar Navigation (Desktop) - REDUCED WIDTH */}
      <aside className="hidden md:flex flex-col w-20 lg:w-56 h-screen fixed left-0 top-0 bg-zinc-950 border-r border-zinc-800 z-50 items-center lg:items-start py-8 transition-all duration-300">
        {/* New Creative Logo */}
        <div className="mb-12 px-0 lg:px-8 flex justify-center lg:justify-start w-full">
          <BrandLogo />
        </div>

        {/* Menu Items */}
        <nav className="flex-1 w-full space-y-2 px-2 lg:px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center justify-center lg:justify-start gap-4 p-3 rounded-xl transition-all duration-200 group ${activeSection === item.id
                  ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'text-zinc-500 hover:bg-zinc-900 hover:text-amber-400'
                }`}
            >
              <item.icon className={`w-6 h-6 ${activeSection === item.id ? 'text-black' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="hidden lg:block text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Social Links Bottom */}
        <div className="mt-auto flex flex-col lg:flex-row gap-4 items-center px-0 lg:px-8 pb-4">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-zinc-800 z-50 px-6 py-4 flex justify-between items-center">
        <div className="scale-75">
          <BrandLogo />
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-zinc-300">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black z-40 pt-24 px-6">
          <div className="flex flex-col gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl font-bold text-zinc-400 hover:text-amber-400 text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-20 lg:ml-56 relative">

        {/* Hero Section */}
        <section id="about" className="relative min-h-screen flex flex-col justify-center items-center pt-20 md:pt-0 overflow-hidden bg-black">
          {/* Starry Sky Background */}
          <div className="absolute inset-0 z-0">
            {stars.map((style, i) => (
              <Star key={i} style={style} />
            ))}
          </div>

          <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">

            {/* Creative Center Animation */}
            <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
              {/* Outer Expanding Rings */}
              <div className="absolute inset-0 border border-zinc-800/50 rounded-full animate-[ping_3s_linear_infinite]" />
              <div className="absolute inset-4 border border-zinc-800/50 rounded-full animate-[ping_3s_linear_infinite_1s]" />

              {/* Rotating Tech Ring */}
              <div className="absolute inset-0 border-2 border-zinc-800 rounded-full border-t-amber-500 border-r-transparent rotate-45 animate-[spin_4s_linear_infinite]" />
              <div className="absolute inset-8 border-2 border-zinc-800 rounded-full border-b-amber-500 border-l-transparent -rotate-12 animate-[spin_5s_linear_infinite_reverse]" />

              {/* Center Core: Morphing Neural Shape */}
              <div className="relative w-24 h-24 bg-black rounded-xl border border-amber-500/30 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.2)] animate-[float_6s_ease-in-out_infinite]">
                <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-md" />
                {/* Sacred Geometry / Tech Core */}
                <div className="w-12 h-12 border border-amber-400 rotate-45 absolute animate-[spin_10s_linear_infinite]" />
                <div className="w-12 h-12 border border-amber-400 rotate-12 absolute animate-[spin_10s_linear_infinite_reverse]" />
                <div className="w-4 h-4 bg-amber-400 rounded-sm shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-pulse" />
              </div>
            </div>

            {/* Introduction & Typing Effect */}
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white">Hi, I'm {PROFILE.name}.</h2>
                <TypewriterEffect
                  prefix="I am a"
                  words={["Data Analyst.", "Visual Storyteller.", "Problem Solver.", "Masters Student."]}
                />
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight mt-4">
                Turning Data into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                  Strategic Decisions.
                </span>
              </h1>

              <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                {PROFILE.bio}
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-8">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-amber-50 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                >
                  View Projects <ChevronRight className="w-4 h-4" />
                </button>
                <button className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border border-zinc-700 hover:border-amber-500 transition-all flex items-center gap-2 group hover:bg-zinc-900">
                  <Download className="w-4 h-4 group-hover:text-amber-400 transition-colors" />
                  Download Resume
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">My Tech Stack</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                A comprehensive overview of the tools and languages I use to extract insights from chaos.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">The Analyst's Toolkit</h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  I believe in choosing the right tool for the job. Whether it's rigorous statistical modeling in Python, quick ad-hoc queries in SQL, or executive-level dashboards in Tableau.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Data Cleaning", val: "Python/SQL" },
                    { label: "Visualization", val: "Tableau/BI" },
                    { label: "Database", val: "PostgreSQL" },
                    { label: "ML Models", val: "Sklearn" },
                  ].map((item) => (
                    <div key={item.label} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 hover:border-amber-500/30 transition-colors">
                      <div className="text-[10px] text-zinc-500 uppercase mb-1 tracking-widest">{item.label}</div>
                      <div className="font-bold text-amber-400 text-lg">{item.val}</div>
                    </div>
                  ))}
                </div>
              </div>
              <SkillChart skills={SKILLS} />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 relative bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Featured Projects</h2>
                <p className="text-zinc-400">Real-world problems solved with data.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === cat
                        ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center tracking-tight">Work History</h2>
            <div className="relative border-l border-zinc-800 ml-3 sm:ml-0 sm:border-none">
              {EXPERIENCES.map((exp, index) => (
                <TimelineItem key={index} exp={exp} isLast={index === EXPERIENCES.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* Redesigned Creative Contact Section */}
        <section id="contact" className="relative py-32 overflow-hidden bg-zinc-950">
          {/* Background Grid Effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                Let's Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-600">
                  Something Incredible.
                </span>
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Have a project in mind or want to discuss data strategy? I'm always open to new challenges and opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Email Card */}
              <div onClick={handleCopyEmail} className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                    {copied ? <Check className="w-8 h-8" /> : <Mail className="w-8 h-8 text-zinc-300 group-hover:text-black" />}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Email Me</h3>
                  <p className="text-zinc-400 mb-6">{PROFILE.email}</p>
                  <span className="text-sm font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                    {copied ? "Copied to Clipboard" : "Click to Copy"} <Copy className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* LinkedIn Card */}
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden block">
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                    <Linkedin className="w-8 h-8 text-zinc-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">LinkedIn</h3>
                  <p className="text-zinc-400 mb-6">Connect professionally</p>
                  <span className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    Visit Profile <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            </div>

            {/* Footer Links */}
            <div className="mt-24 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
              <p>&copy; 2025 {PROFILE.name}. All rights reserved.</p>
              <div className="flex gap-6">
                <span className="hover:text-amber-400 transition-colors cursor-pointer">Privacy Policy</span>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">Terms of Service</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <AIChatWidget />

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px rgba(255, 255, 255, 0.8); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}