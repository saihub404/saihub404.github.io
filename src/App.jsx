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
  Check,
  FileText,
  Server,
  GitBranch,
  Box,
  Activity,
  Search,
  Split,
  RefreshCw,
  Layers
} from 'lucide-react';

// --- API Configuration ---
// ⚠️ FOR LOCAL DEVELOPMENT: Uncomment the line below to use your .env file
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const apiKey = ""; // Keep this empty for the preview here to avoid errors

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
  github: "https://github.com/saihub404",
  linkedin: "https://linkedin.com/in/saiganesh223468/"
};

// Expanded Skills List from Resume for the Marquee
const SKILLS_ROW_1 = [
  { name: "Python", icon: Code },
  { name: "SQL", icon: Database },
  { name: "R", icon: Terminal },
  { name: "Tableau", icon: BarChart3 },
  { name: "Power BI", icon: BarChart3 },
  { name: "Machine Learning", icon: Brain },
  { name: "AWS", icon: Cloud },
  { name: "GCP", icon: Cloud },
  { name: "Snowflake", icon: Database },
  { name: "Splunk", icon: Activity },
];

const SKILLS_ROW_2 = [
  { name: "Predictive Modeling", icon: Brain },
  { name: "Data Mining", icon: Search },
  { name: "A/B Testing", icon: Split },
  { name: "Looker", icon: BarChart3 },
  { name: "Excel", icon: FileText },
  { name: "MongoDB", icon: Database },
  { name: "PostgreSQL", icon: Server },
  { name: "Docker", icon: Box },
  { name: "Git", icon: GitBranch },
  { name: "CI/CD", icon: RefreshCw },
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
  <div className="relative w-18 h-18 group cursor-pointer">
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-lg group-hover:bg-amber-500/40 transition-all duration-500" />

    {/* Logo Image Container
    <div className="relative w-full h-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
      <img
        src="/logo.png" // Assumes you renamed and moved the uploaded file to the public folder
        alt="SG Logo"
        className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]"
      />
    </div> */}

    {/* Main Container */}
    <div className="relative w-full h-full bg-zinc-900 border border-zinc-700 group-hover:border-amber-500/50 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 shadow-xl">

      {/* Internal Tech Grid Background */}
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '4px 4px' }}
      />

      {/* Geometric Logo Mark */}
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-400 relative z-10" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2" className="fill-amber-400/20 stroke-amber-400" />
      </svg>
    </div>
  </div>
);

// Typing Effect Component
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
    <div className="text-lg md:text-xl font-mono text-zinc-400 flex items-center gap-2 min-h-[2rem]">
      <span>{prefix}</span>
      <span className="text-amber-400 font-bold border-r-2 border-amber-400/50 pr-1 animate-pulse">
        {words[index].substring(0, subIndex)}
      </span>
    </div>
  );
};

// --- New Multi-Row Infinite Scrolling Skills ---
const MarqueeRow = ({ items, direction = "left", speed = "normal" }) => {
  // Duplicate items enough times to fill screen and ensure smooth loop
  const duplicatedItems = [...items, ...items, ...items, ...items];

  const animationClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";
  const durationClass = speed === "slow" ? "duration-[60s]" : "duration-[40s]";

  return (
    <div className="flex w-full overflow-hidden py-3 group">
      <div
        className={`flex gap-6 ${animationClass} group-hover:[animation-play-state:paused] w-max`}
        style={{ animationDuration: speed === "slow" ? "60s" : "40s" }}
      >
        {duplicatedItems.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900/80 border border-zinc-800/60 rounded-full shadow-sm hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all cursor-default backdrop-blur-md whitespace-nowrap"
          >
            <skill.icon className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-zinc-300 tracking-wide">{skill.name}</span>
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
      Skills: ${SKILLS_ROW_1.map(s => s.name).join(', ')} ${SKILLS_ROW_2.map(s => s.name).join(', ')}
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

  // Star with live twinkle animation (shinning and dimming with varying duration)
  const Star = ({ style }) => (
    <div
      className="absolute bg-white rounded-full animate-live-twinkle shadow-[0_0_5px_rgba(255,255,255,0.9)]"
      style={{
        width: `${Math.random() * 2 + 1}px`, // Slightly larger for visibility
        height: `${Math.random() * 2 + 1}px`,
        ...style
      }}
    />
  );

  const numStars = 150;
  const stars = useMemo(() => {
    const s = [];
    for (let i = 0; i < numStars; i++) {
      s.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 4 + 2}s`, // Slower, more organic duration
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

      {/* Vertical Sidebar Navigation (Desktop) - FIXED SLIM WIDTH */}
      <aside className="hidden md:flex flex-col w-16 h-screen fixed left-0 top-0 bg-zinc-950 border-r border-zinc-800 z-50 items-center py-8">
        {/* Logo */}
        <div className="mb-4">
          <BrandLogo />
        </div>

        {/* Vertical Menu Items - REDUCED SPACING */}
        {/* Use justify-center with gap-8 to bring items closer together while centered */}
        <nav className="flex-1 w-full flex flex-col items-center justify-center gap-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              // Use writing-mode: vertical-lr to handle text layout correctly without messy transforms
              className="group relative flex items-center justify-center w-full transition-all"
            >
              {/* Text - Vertical Writing Mode + 180 rotation to read bottom-up */}
              <span
                className={`text-sm font-medium tracking-widest uppercase [writing-mode:vertical-lr] rotate-180 whitespace-nowrap transition-colors duration-300 ${activeSection === item.id
                  ? 'text-amber-400 font-bold'
                  : 'text-zinc-500 group-hover:text-white'
                  }`}
              >
                {item.label}
              </span>

              {/* Active Indicator Dot */}
              {activeSection === item.id && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-400 rounded-l-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
              )}
            </button>
          ))}
        </nav>

        {/* Social Links Bottom - Stacked */}
        <div className="mt-auto flex flex-col gap-6 items-center pb-4 pt-4">
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

      {/* Main Content Area - Adjusted Margin for Slim Sidebar */}
      <main className="flex-1 md:ml-16 relative">

        {/* Hero Section - REDESIGNED AESTHETICS */}
        <section id="about" className="relative min-h-screen flex flex-col justify-center items-center pt-20 md:pt-0 overflow-hidden bg-black">
          {/* Starry Sky Background */}
          <div className="absolute inset-0 z-0">
            {stars.map((style, i) => (
              <Star key={i} style={style} />
            ))}
          </div>

          <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">

            {/* Creative Center Animation - Reduced size slightly to give more prominence to text */}
            <div className="relative w-64 h-64 md:w-96 md:h-96 mb-12 flex items-center justify-center">
              {/* Outer Expanding Rings */}
              <div className="absolute inset-0 border border-zinc-800/50 rounded-full animate-[ping_3s_linear_infinite]" />
              <div className="absolute inset-8 border border-zinc-800/50 rounded-full animate-[ping_3s_linear_infinite_1.5s]" />

              {/* Rotating Tech Ring */}
              <div className="absolute inset-0 border-2 border-zinc-800 rounded-full border-t-amber-500 border-r-transparent rotate-45 animate-[spin_6s_linear_infinite]" />
              <div className="absolute inset-12 border-2 border-zinc-800 rounded-full border-b-amber-500 border-l-transparent -rotate-12 animate-[spin_8s_linear_infinite_reverse]" />

              {/* Inner Dashed Ring */}
              <div className="absolute inset-24 border border-dashed border-zinc-600 rounded-full animate-[spin_20s_linear_infinite]" />

              {/* Center Core: Morphing Neural Shape */}
              <div className="relative w-32 h-32 bg-black rounded-xl border border-amber-500/30 flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.3)] animate-[float_5s_ease-in-out_infinite]">
                <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-md" />
                {/* Sacred Geometry / Tech Core */}
                <div className="w-20 h-20 border border-amber-400 rotate-45 absolute animate-[spin_10s_linear_infinite]" />
                <div className="w-20 h-20 border border-amber-400 rotate-12 absolute animate-[spin_10s_linear_infinite_reverse]" />
                {/* Center Dot */}
                <div className="w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_20px_rgba(245,158,11,1)] animate-pulse" />
              </div>
            </div>

            {/* Introduction & Typing Effect - New Aesthetic Layout */}
            <div className="space-y-8 max-w-4xl mx-auto">

              <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="text-lg md:text-xl text-zinc-400 tracking-widest uppercase font-medium">Hi, I'm {PROFILE.name}</h2>
                <TypewriterEffect
                  prefix="I am a"
                  words={["Data Analyst.", "Visual Storyteller.", "Problem Solver.", "Masters Student."]}
                />
              </div>

              {/* Impactful Main Headline */}
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
                Turning Data into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 drop-shadow-[0_0_25px_rgba(251,191,36,0.4)]">
                  Strategic Decisions.
                </span>
              </h1>

              {/* Call to Action & Resume Button - CHANGED TO <a> TAG */}
              <div className="flex justify-center gap-6 pt-8">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group relative px-8 py-3 bg-amber-400 text-black font-bold text-lg rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10">View Projects</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12" />
                </button>

                <a
                  href="/resume.pdf" // User needs to place 'resume.pdf' in the 'public' folder
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-3 bg-zinc-900 text-white font-bold text-lg rounded-full border border-zinc-700 hover:border-amber-400/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-amber-400 transition-colors">Resume</span>
                  <FileText className="w-5 h-5 relative z-10 text-zinc-400 group-hover:text-amber-400 transition-colors" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-6xl mx-auto px-6">

            {/* New Multi-Row Marquee Skills - Imitating Reference Style */}
            <div className="flex flex-col gap-6 relative">

              {/* Side Fade Gradients */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

              {/* Row 1 - Scroll Left */}
              <MarqueeRow items={SKILLS_ROW_1} direction="left" speed="normal" />

              {/* Row 2 - Scroll Right */}
              <MarqueeRow items={SKILLS_ROW_2} direction="right" speed="slow" />

            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 relative bg-black">
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
        <section id="experience" className="py-12 bg-zinc-950 border-y border-zinc-900">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Work History</h2>
            <div className="relative border-l border-zinc-800 ml-3 sm:ml-0 sm:border-none">
              {EXPERIENCES.map((exp, index) => (
                <TimelineItem key={index} exp={exp} isLast={index === EXPERIENCES.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* Redesigned Creative Contact Section */}
        <section id="contact" className="relative py-20 overflow-hidden bg-zinc-950">
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
                    {/* Use LinkedIn icon */}
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
        /* SMOOTH INFINITE SCROLL ANIMATIONS */
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Moves exactly half, assuming list is doubled */
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }

        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        /* NEW LIVE TWINKLE ANIMATION */
        @keyframes live-twinkle {
          0% { opacity: 0.1; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 8px rgba(255, 255, 255, 0.8); }
          100% { opacity: 0.1; transform: scale(0.5); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}