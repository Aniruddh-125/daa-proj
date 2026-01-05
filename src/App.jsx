import React, { useState, useEffect, useRef } from 'react';
import { Network, Activity, GitCommit, ArrowRight, Dna, Info, Play, RotateCcw, Settings, Microscope, FileText, FlaskConical, AlertTriangle, BookOpen, HelpCircle, Sparkles, MessageSquare, Bot, Loader2, Send, Code, Grid, Terminal, X, MessageCircle, Moon, Sun, User, Cpu, Sigma, BrainCircuit, LayoutDashboard, Sliders,  Share2, Zap } from 'lucide-react';

// --- Constants & Data ---

const INF = 1e12;

const VARIANTS = [
  { 
    id: 0, 
    name: "WildType", 
    short: "WT", 
    x: 100, y: 150, 
    desc: "Baseline reference genome found in nature. Fully susceptible to treatment." 
  },
  { 
    id: 1, 
    name: "MutA", 
    short: "MA", 
    x: 250, y: 50, 
    desc: "Single Nucleotide Polymorphism (SNP) at locus 104. Slight structural change." 
  },
  { 
    id: 2, 
    name: "MutB", 
    short: "MB", 
    x: 250, y: 250, 
    desc: "Deletion event in regulatory region. Often a precursor to resistance." 
  },
  { 
    id: 3, 
    name: "MutC", 
    short: "MC", 
    x: 400, y: 50, 
    desc: "Unstable intermediate variant. rare in isolation due to fitness cost." 
  },
  { 
    id: 4, 
    name: "MutD", 
    short: "MD", 
    x: 400, y: 250, 
    desc: "Compensatory mutation that restores replication efficiency." 
  },
  { 
    id: 5, 
    name: "DrugResistant", 
    short: "DR", 
    x: 550, y: 150, 
    desc: "Complex variant exhibiting high-level tolerance to pharmaceutical intervention." 
  },
];

const INITIAL_TOPOLOGY = [
  [0,   1.8, 8.0, INF, INF, INF],
  [INF, 0,   2.4, INF, 9.5, INF],
  [INF, INF, 0,   1.1, INF, 6.2],
  [INF, INF, INF, 0,   3.0, INF],
  [INF, INF, INF, INF, 0,   2.0],
  [INF, INF, INF, INF, INF, 0]
];

// --- Helper Functions for Gemini API ---

const callGemini = async (prompt) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // API Key provided by the environment
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI Analysis engine. Please check your internet connection or API key.";
  }
};

// --- Helper Components ---

const FormattedText = ({ text, className = "" }) => {
  if (!text) return null;
  return (
    <div className={`space-y-1 ${className}`}>
      {text.split('\n').map((line, i) => {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <div key={i} className="min-h-[1em]">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} className="font-bold text-indigo-900/90 dark:text-indigo-300">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </div>
        );
      })}
    </div>
  );
};

const DnaHelix = ({ variants }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let frame;
    const animate = () => {
      setPhase(p => p + 0.04);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const numPairs = 12; 
  
  return (
    <div className="relative h-48 w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-xl overflow-hidden flex items-center justify-center border border-slate-700/50">
       <div className="absolute top-4 left-6">
          <div className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Sequencing Model
          </div>
       </div>
       
       {Array.from({ length: numPairs }).map((_, i) => {
          const x = (i - numPairs/2 + 0.5) * 60; 
          const angle = i * 0.5 + phase;
          const y1 = Math.sin(angle) * 40;
          const y2 = Math.sin(angle + Math.PI) * 40;
          const scale1 = (Math.cos(angle) + 1.8) / 2.8; 
          const scale2 = (Math.cos(angle + Math.PI) + 1.8) / 2.8;
          const z1 = Math.cos(angle) > 0 ? 20 : 10;
          const z2 = Math.cos(angle + Math.PI) > 0 ? 20 : 10;
          const variant = variants[i % variants.length];

          return (
             <React.Fragment key={i}>
                <div 
                  className="absolute w-[1px] bg-slate-600/30"
                  style={{
                     left: `calc(50% + ${x}px)`,
                     top: `calc(50% + ${Math.min(y1, y2)}px)`,
                     height: Math.abs(y1 - y2),
                     transform: 'translateX(-50%)',
                     zIndex: 5
                  }}
                />
                <div 
                  className="absolute rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm transition-transform will-change-transform"
                  style={{
                    width: '36px',
                    height: '36px',
                    background: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, ${scale1 + 0.2}), rgba(29, 78, 216, ${scale1}))`,
                    boxShadow: `0 0 ${15 * scale1}px rgba(37, 99, 235, 0.4)`,
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y1}px)`,
                    transform: `translate(-50%, -50%) scale(${scale1})`,
                    zIndex: z1,
                  }}
                >
                   <span className="text-[10px] font-bold text-white/90 font-mono">{variant.short[0]}</span>
                </div>
                <div 
                  className="absolute rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm transition-transform will-change-transform"
                  style={{
                    width: '36px',
                    height: '36px',
                    background: `radial-gradient(circle at 30% 30%, rgba(16, 185, 129, ${scale2 + 0.2}), rgba(5, 150, 105, ${scale2}))`,
                    boxShadow: `0 0 ${15 * scale2}px rgba(16, 185, 129, 0.4)`,
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y2}px)`,
                    transform: `translate(-50%, -50%) scale(${scale2})`,
                    zIndex: z2,
                  }}
                >
                   <span className="text-[10px] font-bold text-white/90 font-mono">{variant.short[1] || ''}</span>
                </div>
                <div 
                   className="absolute text-[9px] text-slate-500 font-mono tracking-wider font-semibold"
                   style={{
                      left: `calc(50% + ${x}px)`,
                      bottom: '10px',
                      transform: 'translateX(-50%)',
                      opacity: 0.5
                   }}
                >
                  {variant.short}
                </div>
             </React.Fragment>
          );
       })}
    </div>
  );
};

const TraceView = ({ matrix, step, logs, highlightCells }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const cppCode = `#include <iostream>
#include <vector>
#include <iomanip>
#include <limits>

using namespace std;

const double INF = 1e12;

// Genome Mutation Network Analysis
// Floyd-Warshall Implementation

int main() {
    int n = 6;
    vector<string> variants = {"WildType", "MutA", "MutB", "MutC", "MutD", "DrugResistant"};
    
    // Step 3: Floyd–Warshall Algorithm
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    next[i][j] = next[i][k];
                }
    return 0;
}`.trim();

  return (
    <div className="h-[600px] w-full flex flex-col bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
      <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code size={16} className="text-blue-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Algorithm Runtime Trace</span>
        </div>
        <div className="flex items-center gap-2">
           <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${step >= 0 ? 'bg-emerald-900/30 text-emerald-400 animate-pulse' : 'text-slate-500'}`}>
              {step >= 0 && step < 6 ? `PROCESSING NODE k=${step} (${VARIANTS[step].short})` : 'READY'}
           </span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-5/12 bg-slate-950 flex flex-col border-r border-slate-800">
          <div className="p-4 border-b border-slate-800 flex-1 overflow-auto">
             <pre className="text-sm font-mono text-slate-400 leading-relaxed whitespace-pre-wrap">
              {cppCode.split('\n').map((line, idx) => {
                const isHighlight = step >= 0 && line.includes(`for (int k = 0; k < n; k++)`);
                return (
                  <div key={idx} className={`${isHighlight ? 'bg-blue-900/30 text-blue-300 border-l-2 border-blue-500 pl-2 transition-colors duration-300' : 'pl-2.5'}`}>
                    {line}
                  </div>
                );
              })}
            </pre>
          </div>
          <div className="h-48 bg-black p-4 font-mono flex flex-col">
             <div className="flex items-center gap-2 text-slate-500 mb-2 border-b border-slate-800 pb-1">
               <Terminal size={14} /> <span className="text-xs font-bold uppercase">System Output</span>
             </div>
             <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                {logs.length === 0 && <span className="text-xs text-slate-600">Waiting for analysis...</span>}
                {logs.map((log, i) => (
                  <div key={i} className="text-sm text-slate-300 animate-in fade-in slide-in-from-left-2 duration-300 leading-snug">
                    <span className="text-blue-500 mr-2">➜</span>{log}
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="flex-1 bg-slate-900 p-6 overflow-auto flex flex-col items-center justify-center relative">
           <div className="absolute inset-0 opacity-[0.05]" 
               style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
           </div>
           <div className="relative z-10 grid grid-cols-7 gap-2">
              <div className="w-12 h-10"></div>
              {VARIANTS.map(v => (
                <div key={v.id} className={`w-12 h-10 flex items-center justify-center text-xs font-bold transition-colors duration-500 ${step === v.id ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {v.short}
                </div>
              ))}
              {matrix.map((row, i) => (
                <React.Fragment key={i}>
                  <div className={`w-12 h-10 flex items-center justify-center text-xs font-bold transition-colors duration-500 ${step === i ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {VARIANTS[i].short}
                  </div>
                  {row.map((val, j) => {
                    const isPivot = step !== -1 && (i === step || j === step);
                    const isDiagonal = i === j;
                    const isHighlighted = highlightCells.some(cell => cell.i === i && cell.j === j);
                    let bgClass = "bg-transparent";
                    let textClass = "text-slate-400";
                    let borderClass = "border-slate-800";
                    if (isHighlighted) {
                      bgClass = "bg-emerald-500/20";
                      textClass = "text-emerald-300 font-bold";
                      borderClass = "border-emerald-500/50";
                    } else if (isDiagonal) {
                      bgClass = "bg-slate-950";
                      textClass = "text-slate-600";
                    } else if (isPivot) {
                       bgClass = "bg-blue-900/10";
                       textClass = "text-blue-300";
                       borderClass = "border-blue-800/30";
                    }
                    return (
                      <div key={`${i}-${j}`} className={`w-12 h-10 flex items-center justify-center text-xs font-mono border rounded transition-all duration-500 ${bgClass} ${textClass} ${borderClass}`}>
                        {val >= INF ? '∞' : parseFloat(val).toFixed(1)}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Application Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'config' | 'analysis' | 'algorithms'
  const [algoSubTab, setAlgoSubTab] = useState('fw');
  
  const [startNode, setStartNode] = useState(0);
  const [endNode, setEndNode] = useState(5);
  const [adjMatrix, setAdjMatrix] = useState(() => INITIAL_TOPOLOGY.map(row => [...row]));
  const [path, setPath] = useState([]);
  const [cost, setCost] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  // Theme State
  const [darkMode, setDarkMode] = useState(false);
  
  // Trace State
  const [traceStep, setTraceStep] = useState(-1);
  const [traceLogs, setTraceLogs] = useState([]);
  const [traceMatrix, setTraceMatrix] = useState([]);
  const [highlightCells, setHighlightCells] = useState([]);

  // AI States
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Chat Bot State
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]); 
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); 
  
  const chatScrollRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory, isChatLoading, isChatOpen]);

  const handleWeightChange = (from, to, value) => {
    const newVal = parseFloat(value);
    if (isNaN(newVal) || newVal < 0) return;
    const newMatrix = adjMatrix.map(row => [...row]);
    newMatrix[from][to] = newVal;
    setAdjMatrix(newMatrix);
    if (cost !== null) resetAnalysis();
  };

  const generateAIInsight = async (totalCost, pathNodes) => {
    setIsAiLoading(true);
    setAiAnalysis("");
    const pathNames = pathNodes.map(id => VARIANTS[id].name).join(" -> ");
    const startVar = VARIANTS[pathNodes[0]];
    const endVar = VARIANTS[pathNodes[pathNodes.length-1]];
    const prompt = `You are an expert geneticist (BioGen AI). SIMULATION: Path: ${pathNames}, Cost: ${totalCost}. Start: ${startVar.name}, End: ${endVar.name}. Write a clinical risk assessment. Keep it under 4 sentences.`;
    const result = await callGemini(prompt);
    setAiAnalysis(result);
    setIsAiLoading(false);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput(""); 
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);
    const pathContext = path.length > 0 ? `Current path: ${path.map(id => VARIANTS[id].name).join(" -> ")} cost ${cost}.` : "No path.";
    const prompt = `You are BioGen AI. Context: ${pathContext}. User: "${userMsg}". Answer concisely.`;
    const response = await callGemini(prompt);
    setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    setIsChatLoading(false);
  };

  const handleAnalyze = () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    // Switch to algorithms tab to see trace, or analysis tab? 
    // Let's keep it in background or switch user to Analysis tab to see result.
    // For now, let's reset artifacts.
    setAiAnalysis("");
    setTraceLogs(["[INIT] Loading Graph Topology...", "[INIT] Starting Floyd-Warshall Algorithm..."]);
    setTraceStep(-1);
    setHighlightCells([]);

    const n = 6;
    let dist = adjMatrix.map(row => [...row]);
    let next = Array(n).fill(null).map(() => Array(n).fill(-1));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (dist[i][j] < INF && i !== j) next[i][j] = j;
        }
    }
    setTraceMatrix(dist.map(r => [...r])); 

    let k = 0;
    const interval = setInterval(() => {
        if (k >= n) {
            clearInterval(interval);
            const calculatedCost = dist[startNode][endNode];
            setTraceLogs(prev => [...prev, `[COMPLETE] Algorithm finished. Finalizing path.`]);
            if (calculatedCost >= INF) {
              setCost("∞");
              setPath([]);
            } else {
              setCost(calculatedCost.toFixed(2));
              let curr = startNode;
              const finalPath = [curr];
              let safety = 0;
              while (curr !== endNode && safety < n+2) {
                curr = next[curr][endNode];
                if (curr === -1 || curr === undefined) break;
                finalPath.push(curr);
                safety++;
              }
              setPath(finalPath);
            }
            setIsAnalyzing(false);
            setTraceStep(-2);
            // Optionally switch tab to Analysis when done
            // setActiveTab('analysis'); 
            return;
        }
        let changes = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    const oldVal = dist[i][j];
                    dist[i][j] = dist[i][k] + dist[k][j];
                    next[i][j] = next[i][k];
                    changes.push({i, j, old: oldVal, new: dist[i][j]});
                }
            }
        }
        if (dist[startNode][endNode] < INF) {
           let curr = startNode;
           const currentTempPath = [curr];
           let safety = 0;
           while (curr !== endNode && safety < n + 2) {
             const nextNode = next[curr][endNode];
             if (nextNode === -1 || nextNode === undefined) break;
             curr = nextNode;
             currentTempPath.push(curr);
             safety++;
           }
           if (curr === endNode) {
             setPath(currentTempPath);
             setCost(dist[startNode][endNode].toFixed(2));
           }
        }
        setTraceStep(k);
        setTraceMatrix(dist.map(r => [...r]));
        setHighlightCells(changes);
        const variantName = VARIANTS[k].short;
        if (changes.length > 0) setTraceLogs(prev => [...prev, `[UPDATE] k=${k} (${variantName}): optimized ${changes.length} paths.`]);
        else setTraceLogs(prev => [...prev, `[INFO] k=${k} (${variantName}): No optimizations.`]);
        k++;
    }, 500); 
  };

  const resetAnalysis = () => {
    setPath([]);
    setCost(null);
    setAiAnalysis("");
    setTraceLogs([]);
    setTraceStep(-1);
  };

  const isEdgeInPath = (u, v) => {
    for (let i = 0; i < path.length - 1; i++) {
      if (path[i] === u && path[i + 1] === v) return true;
    }
    return false;
  };

  useEffect(() => {
    setTraceMatrix(INITIAL_TOPOLOGY);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300 flex flex-col">
      
      {/* Inline Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
      `}</style>

      {/* --- HEADER --- */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/20">
              <Dna size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-none">BioGen Analytics</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-0.5">MUTATION LANDSCAPE ENGINE</p>
            </div>
          </div>
          
          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'config', label: 'Configuration', icon: Sliders },
              { id: 'analysis', label: 'Analysis', icon: Activity },
              { id: 'algorithms', label: 'Algorithms', icon: Cpu },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200
                  ${activeTab === tab.id 
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'}
                `}
              >
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {darkMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 pb-32">
        
        {/* VIEW: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Visualization */}
            <DnaHelix variants={VARIANTS} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Context Card */}
              <div className="md:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <Microscope className="text-blue-500" /> Simulation Context
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  This application simulates evolutionary pathways for the <strong className="text-slate-800 dark:text-slate-200">gyrA gene</strong> (DNA gyrase subunit A), a primary target for fluoroquinolone resistance in bacteria. The model utilizes a weighted directed graph to represent fitness costs associated with specific nucleotide polymorphisms.
                </p>
                <div className="flex gap-4 mt-6">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                    <Activity size={14} className="text-emerald-500" /> Live Model Active
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                    <Network size={14} className="text-blue-500" /> 6 Variants Loaded
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <button onClick={() => setActiveTab('config')} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 transition-all text-left">
                 <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                   <Settings size={20} />
                 </div>
                 <h3 className="font-bold text-slate-800 dark:text-slate-100">Configure Parameters</h3>
                 <p className="text-sm text-slate-500 mt-1">Adjust mutation costs and select variant targets.</p>
               </button>
               
               <button onClick={() => setActiveTab('analysis')} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all text-left">
                 <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                   <Activity size={20} />
                 </div>
                 <h3 className="font-bold text-slate-800 dark:text-slate-100">View Network Analysis</h3>
                 <p className="text-sm text-slate-500 mt-1">Explore the mutation graph and optimal paths.</p>
               </button>
            </div>
          </div>
        )}

        {/* VIEW: CONFIGURATION */}
        {activeTab === 'config' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-3">
                <Sliders className="text-blue-600" /> Simulation Parameters
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Start Variant</label>
                    <div className="relative">
                      <select 
                        value={startNode}
                        onChange={(e) => { setStartNode(Number(e.target.value)); resetAnalysis(); }}
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold transition-all text-slate-800 dark:text-slate-200 appearance-none"
                      >
                        {VARIANTS.map(v => <option key={v.id} value={v.id}>{v.name} ({v.short})</option>)}
                      </select>
                      <FlaskConical className="absolute right-4 top-4 text-slate-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Target Variant</label>
                    <div className="relative">
                      <select 
                        value={endNode}
                        onChange={(e) => { setEndNode(Number(e.target.value)); resetAnalysis(); }}
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold transition-all text-slate-800 dark:text-slate-200 appearance-none"
                      >
                        {VARIANTS.map(v => <option key={v.id} value={v.id}>{v.name} ({v.short})</option>)}
                      </select>
                      <Microscope className="absolute right-4 top-4 text-slate-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Edge Weights (Fitness Cost)</label>
                    <button onClick={() => setShowConfig(!showConfig)} className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors">
                      {showConfig ? 'Hide Matrix' : 'Edit Matrix'}
                    </button>
                  </div>
                  
                  {showConfig && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto custom-scrollbar p-1">
                      {adjMatrix.map((row, i) => 
                        row.map((val, j) => {
                          if (INITIAL_TOPOLOGY[i][j] < INF && i !== j) {
                            return (
                              <div key={`input-${i}-${j}`} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{VARIANTS[i].short} → {VARIANTS[j].short}</span>
                                <input 
                                  type="number" 
                                  step="0.1" 
                                  value={val}
                                  onChange={(e) => handleWeightChange(i, j, e.target.value)}
                                  className="w-20 py-1 px-2 text-right text-sm font-mono border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                              </div>
                            );
                          }
                          return null;
                        })
                      )}
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => { handleAnalyze(); setActiveTab('analysis'); }}
                  disabled={isAnalyzing}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-base tracking-wide transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl shadow-blue-500/20
                    ${isAnalyzing 
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white'}
                  `}
                >
                  {isAnalyzing ? (
                    <>Processing <span className="animate-pulse">...</span></>
                  ) : (
                    <><Play size={20} fill="currentColor" /> Run Simulation & View Analysis</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: ANALYSIS */}
        {activeTab === 'analysis' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Graph Panel */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-1 shadow-sm overflow-hidden h-[600px] relative">
                 <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50">
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    
                    <svg className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-sm">
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill={darkMode ? "#64748b" : "#cbd5e1"} />
                        </marker>
                        <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                        </marker>
                      </defs>
                      {adjMatrix.map((row, i) => row.map((weight, j) => {
                          if (weight < INF && i !== j) {
                            const start = VARIANTS[i];
                            const end = VARIANTS[j];
                            const active = isEdgeInPath(i, j);
                            return (
                              <g key={`${i}-${j}`}>
                                <line 
                                  x1={start.x} y1={start.y} 
                                  x2={end.x} y2={end.y} 
                                  stroke={active ? "#3b82f6" : (darkMode ? "#475569" : "#cbd5e1")} 
                                  strokeWidth={active ? 4 : 2}
                                  strokeOpacity={active ? 1 : 0.6}
                                  markerEnd={active ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                                  className="transition-all duration-700 ease-out"
                                />
                                <rect x={(start.x + end.x)/2 - 16} y={(start.y + end.y)/2 - 12} width="32" height="20" fill={active ? "#eff6ff" : (darkMode ? "#1e293b" : "white")} rx="6" />
                                <text x={(start.x + end.x)/2} y={(start.y + end.y)/2 + 4} textAnchor="middle" className={`text-[10px] font-bold font-mono ${active ? 'fill-blue-600' : 'fill-slate-400'}`}>{weight}</text>
                              </g>
                            );
                          }
                          return null;
                      }))}
                    </svg>

                    {VARIANTS.map((node) => {
                      const isStart = node.id === startNode;
                      const isEnd = node.id === endNode;
                      const isInPath = path.includes(node.id);
                      let ringColor = isInPath ? "border-blue-500" : (darkMode ? "border-slate-600" : "border-white");
                      let bgGradient = isInPath ? (darkMode ? "from-blue-900/80 to-blue-800/80" : "from-blue-50 to-blue-100") : (darkMode ? "from-slate-800 to-slate-900" : "from-slate-100 to-slate-200");
                      let textColor = isInPath ? "text-blue-600 dark:text-blue-300" : (darkMode ? "text-slate-300" : "text-slate-600");
                      
                      if (isStart) { ringColor = "border-emerald-500"; textColor="text-emerald-600 dark:text-emerald-400"; }
                      if (isEnd) { ringColor = "border-rose-500"; textColor="text-rose-600 dark:text-rose-400"; }

                      return (
                        <div key={node.id} className={`absolute w-24 h-24 -ml-12 -mt-12 rounded-full border-[3px] ${ringColor} bg-gradient-to-br ${bgGradient} flex flex-col justify-center items-center shadow-lg z-10 transition-all duration-500 hover:scale-105 cursor-pointer`} style={{ left: node.x, top: node.y }}>
                          <span className={`font-bold text-base ${textColor} tracking-tight`}>{node.short}</span>
                          <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500 mt-1 max-w-[80px] truncate">{node.name}</span>
                        </div>
                      );
                    })}
                 </div>
              </div>

              {/* Results Side Panel */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm min-h-[300px]">
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <FileText size={14} /> Analysis Report
                   </h3>
                   
                   {cost !== null ? (
                     <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                           <div>
                             <span className="text-xs text-slate-500 block mb-1">Total Fitness Cost</span>
                             <span className="text-4xl font-black text-slate-800 dark:text-slate-100">{cost}</span>
                           </div>
                           <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${parseFloat(cost) < 5 ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                             {parseFloat(cost) < 5 ? 'High Risk' : 'Stable'}
                           </div>
                        </div>

                        <div className="mb-6">
                           <span className="text-xs font-bold text-slate-500 block mb-3">Optimal Pathway</span>
                           <div className="flex flex-wrap gap-2">
                             {path.map((nodeId, idx) => (
                               <div key={idx} className="flex items-center">
                                 <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                   {VARIANTS[nodeId].short}
                                 </span>
                                 {idx < path.length - 1 && <ArrowRight size={12} className="mx-1 text-slate-400"/>}
                               </div>
                             ))}
                           </div>
                        </div>

                        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 p-4">
                           <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase mb-3 flex items-center gap-2">
                             <Sparkles size={12} /> AI Interpretation
                           </h4>
                           {!aiAnalysis ? (
                             <button onClick={() => generateAIInsight(cost, path)} disabled={isAiLoading} className="w-full py-2 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                               {isAiLoading ? <Loader2 size={12} className="animate-spin" /> : <Bot size={12} />} Generate Insight
                             </button>
                           ) : (
                             <FormattedText text={aiAnalysis} className="text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed" />
                           )}
                        </div>
                     </div>
                   ) : (
                     <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                        <Activity size={32} className="mb-3 opacity-20" />
                        <p className="text-sm">Run a simulation to view results</p>
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: ALGORITHMS */}
        {activeTab === 'algorithms' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-1">
               {['fw', 'dijkstra', 'bfs'].map(id => (
                 <button 
                   key={id}
                   onClick={() => setAlgoSubTab(id)}
                   className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors border-b-2 ${algoSubTab === id ? 'text-blue-600 border-blue-600 bg-blue-50/50 dark:bg-slate-800 dark:text-blue-400' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
                 >
                   {id === 'fw' ? 'Floyd-Warshall' : id === 'dijkstra' ? 'Dijkstra (Future)' : 'BFS/DFS (Future)'}
                 </button>
               ))}
            </div>

            {algoSubTab === 'fw' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <TraceView matrix={traceMatrix} step={traceStep} logs={traceLogs} highlightCells={highlightCells} />
                 
                 <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400"><Sigma size={20} /></div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Floyd-Warshall Algorithm</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">Graph Theory • Shortest Path</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded uppercase tracking-wider">O(V³) Time</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Computes shortest paths between <strong>all pairs of nodes</strong>. In this biological context, it determines the minimum evolutionary cost to transition between any two genetic variants by exploring all possible intermediate mutations.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400"><GitCommit size={20} /></div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Path Reconstruction</h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">Traversal • Backtracking</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          Maintains a predecessor matrix during execution. Once the cost matrix is optimized, the system recursively backtracks from Target to Start to reconstruct the precise sequence of mutations.
                        </p>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50">
                 <Cpu size={32} className="mb-3 opacity-30" />
                 <p className="text-sm font-medium">Algorithm module not yet loaded.</p>
              </div>
            )}
          </div>
        )}

      </main>

      {/* --- FLOATING CHAT --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
           {isChatOpen && (
             <div className="mb-4 w-80 md:w-96 h-[450px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
                 <div className="flex items-center gap-2">
                   <Bot size={20} className="text-blue-100" />
                   <div><h3 className="font-bold text-sm">BioGen Assistant</h3><p className="text-[10px] text-blue-200 opacity-80">Powered by Gemini AI</p></div>
                 </div>
                 <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"><X size={18} /></button>
               </div>
               <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-slate-950">
                 {chatHistory.length > 0 ? (
                   <div className="space-y-4">
                     {chatHistory.map((msg, idx) => (
                       <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'}`}>{msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}</div>
                         <div className={`p-3 rounded-2xl shadow-sm max-w-[85%] ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-900 rounded-tl-none border border-slate-200 dark:border-slate-800'}`}><FormattedText text={msg.text} className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`} /></div>
                       </div>
                     ))}
                     {isChatLoading && <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-1"><Bot size={18} /></div><div className="bg-white dark:bg-slate-900 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2"><Loader2 size={14} className="animate-spin text-slate-400" /><span className="text-xs text-slate-400">Thinking...</span></div></div>}
                     <div ref={chatScrollRef} />
                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-center p-6 text-slate-400 dark:text-slate-600">
                     <div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm mb-3"><MessageSquare size={24} className="text-blue-200 dark:text-blue-800" /></div>
                     <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">How can I help?</p>
                     <p className="text-xs">Ask about mutations, pathways, or specific genes.</p>
                   </div>
                 )}
               </div>
               <form onSubmit={handleChatSubmit} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                 <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask a question..." className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-slate-200" />
                 <button type="submit" disabled={isChatLoading || !chatInput.trim()} className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"><Send size={16} /></button>
               </form>
             </div>
           )}
           <button onClick={() => setIsChatOpen(!isChatOpen)} className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-blue-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95 z-50 ${isChatOpen ? 'bg-slate-800 dark:bg-slate-700 rotate-90' : 'bg-blue-600 hover:bg-blue-700'}`}>
             {isChatOpen ? <X size={24} className="text-white transition-transform duration-300 -rotate-90" /> : <><MessageCircle size={28} className="text-white" /><span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span></>}
           </button>
      </div>
    </div>
  );
}
