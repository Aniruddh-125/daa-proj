import React, { useState, useEffect, useRef } from 'react';
import { Network, Activity, GitCommit, ArrowRight, Dna, Info, Play, RotateCcw, Settings, Microscope, FileText, FlaskConical, AlertTriangle, BookOpen, HelpCircle, Sparkles, MessageSquare, Bot, Loader2, Send, Code, Grid, Terminal, X, MessageCircle, Moon, Sun, User } from 'lucide-react';

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
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
 
  
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

// Text Formatter to handle bolding and newlines without full Markdown library
const FormattedText = ({ text, className = "" }) => {
  if (!text) return null;
  
  return (
    <div className={`space-y-1 ${className}`}>
      {text.split('\n').map((line, i) => {
        // Simple parser for **bold** text
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
    <div className="relative h-48 w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl mb-8 shadow-2xl overflow-hidden flex items-center justify-center border border-slate-700/50">
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

// --- Trace View Component ---
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

/*
  Genome Mutation Network Analysis
  --------------------------------
  This module models gene variants as nodes and mutation difficulty
  as weighted edges, then computes optimal mutation pathways
  using Floyd–Warshall (all-pairs shortest path).
*/

int main() {

    // -------------------------------
    // Step 1: Define variants
    // -------------------------------
    int n = 6;

    vector<string> variants = {
        "WildType",
        "MutA",
        "MutB",
        "MutC",
        "MutD",
        "DrugResistant"
    };

    // -------------------------------
    // Step 2: Mutation cost matrix
    // (derived from lab / statistical models)
    // -------------------------------
    vector<vector<double>> dist = {
        {0,   1.8,  8.0, INF, INF, INF},
        {INF, 0,    2.4, INF, 9.5, INF},
        {INF, INF,  0,   1.1, INF, 6.2},
        {INF, INF,  INF, 0,   3.0, INF},
        {INF, INF,  INF, INF, 0,   2.0},
        {INF, INF,  INF, INF, INF, 0}
    };

    // Path reconstruction matrix
    vector<vector<int>> next(n, vector<int>(n, -1));

    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            if (dist[i][j] < INF && i != j)
                next[i][j] = j;

    // -------------------------------
    // Step 3: Floyd–Warshall Algorithm
    // -------------------------------
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    next[i][j] = next[i][k];
                }

    // -------------------------------
    // Step 4: Output distance matrix
    // -------------------------------
    cout << "\\nMinimum Mutation Cost Matrix:\\n\\n";
    cout << setw(15) << "";
    for (auto &v : variants)
        cout << setw(15) << v;
    cout << "\\n";

    for (int i = 0; i < n; i++) {
        cout << setw(15) << variants[i];
        for (int j = 0; j < n; j++) {
            if (dist[i][j] >= INF)
                cout << setw(15) << "INF";
            else
                cout << setw(15) << fixed << setprecision(2) << dist[i][j];
        }
        cout << "\\n";
    }

    // -------------------------------
    // Step 5: Real biomedical query
    // -------------------------------
    int start = 0; // WildType
    int end = 5;   // DrugResistant

    cout << "\\nOptimal mutation pathway:\\n";
    cout << variants[start];

    int u = start;
    while (u != end) {
        u = next[u][end];
        cout << " -> " << variants[u];
    }

    cout << "\\nTotal Evolutionary Cost: "
         << dist[start][end] << "\\n";

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
        {/* Left: Code & Logs */}
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
          
          {/* Terminal Output */}
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

        {/* Right: Matrix Visualization */}
        <div className="flex-1 bg-slate-900 p-6 overflow-auto flex flex-col items-center justify-center relative">
           {/* Grid Background */}
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
                      <div 
                        key={`${i}-${j}`} 
                        className={`
                          w-12 h-10 flex items-center justify-center text-xs font-mono border rounded transition-all duration-500
                          ${bgClass} ${textClass} ${borderClass}
                        `}
                      >
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

export default function DNAAnalysisApp() {
  const [activeTab, setActiveTab] = useState('graph');
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
  const [chatHistory, setChatHistory] = useState([]); // Array for chat history
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); 
  
  const chatScrollRef = useRef(null);

  // --- Dark Mode Effect ---
  // This explicitly sets the 'dark' class on the HTML element based on state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- Chat Auto-Scroll Effect ---
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

    const prompt = `
      You are an expert geneticist (BioGen AI) analyzing a simulation of the gyrA gene (antibiotic resistance).
      
      SIMULATION DATA:
      - Mutation Path: ${pathNames}
      - Total Evolutionary Cost: ${totalCost} (Lower cost = easier mutation/higher risk)
      - Start: ${startVar.name} (${startVar.desc})
      - End: ${endVar.name} (${endVar.desc})
      
      TASK:
      Write a concise, high-level clinical risk assessment for this specific mutation trajectory.
      1. Interpret the 'Cost' in terms of evolutionary probability.
      2. Suggest one clinical intervention or monitoring strategy.
      3. Keep it under 4 sentences. Use professional medical terminology.
      
      IMPORTANT: Do not use Markdown tables. Use simple bullet points or plain text lists only.
    `;

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
    
    const pathContext = path.length > 0 
      ? `Current calculated path: ${path.map(id => VARIANTS[id].name).join(" -> ")} with cost ${cost}.` 
      : "No path currently calculated.";

    const prompt = `
      You are BioGen, a helpful AI assistant in a DNA sequencing app.
      CONTEXT: The user is looking at a mutation graph for the gyrA gene.
      ${pathContext}
      USER QUESTION: "${userMsg}"
      
      Answer concisely and helpfully. Explain biological concepts if asked.
      
      IMPORTANT: Do not use Markdown tables. Use simple bullet points or plain text lists only.
    `;

    const response = await callGemini(prompt);
    setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    setIsChatLoading(false);
  };

  const handleAnalyze = () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    
    setAiAnalysis("");
    setTraceLogs(["[INIT] Loading Graph Topology...", "[INIT] Starting Floyd-Warshall Algorithm..."]);
    setTraceStep(-1);
    setHighlightCells([]);

    // Initialize Algorithm Data
    const n = 6;
    let dist = adjMatrix.map(row => [...row]);
    let next = Array(n).fill(null).map(() => Array(n).fill(-1));
    
    // Initial next matrix - Important for path reconstruction
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (dist[i][j] < INF && i !== j) next[i][j] = j;
        }
    }

    setTraceMatrix(dist.map(r => [...r])); 

    let k = 0;
    
    // Animation Loop
    const interval = setInterval(() => {
        if (k >= n) {
            clearInterval(interval);
            
            // Finalize Results
            const calculatedCost = dist[startNode][endNode];
            setTraceLogs(prev => [...prev, `[COMPLETE] Algorithm finished. Finalizing path.`]);
            
            if (calculatedCost >= INF) {
              setCost("∞");
              setPath([]);
            } else {
              setCost(calculatedCost.toFixed(2));
              // Ensure path is complete at end
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
            setTraceStep(-2); // Signals completion state
            return;
        }

        // Perform one step of outer loop (k) - Floyd-Warshall Relaxation
        let changes = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    const oldVal = dist[i][j];
                    dist[i][j] = dist[i][k] + dist[k][j];
                    next[i][j] = next[i][k]; // Critical update for path routing
                    changes.push({i, j, old: oldVal, new: dist[i][j]});
                }
            }
        }

        // Dynamic Graph Animation: Reconstruct path based on current state of 'next'
        // This ensures the highlighted blue path matches the current algorithmic state
        if (dist[startNode][endNode] < INF) {
           let curr = startNode;
           const currentTempPath = [curr];
           let safety = 0;
           // Robust path reconstruction
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

        // Update Trace UI
        setTraceStep(k);
        setTraceMatrix(dist.map(r => [...r]));
        setHighlightCells(changes);
        
        const variantName = VARIANTS[k].short;
        if (changes.length > 0) {
            setTraceLogs(prev => [...prev, `[UPDATE] k=${k} (${variantName}): optimized ${changes.length} paths.`]);
        } else {
            setTraceLogs(prev => [...prev, `[INFO] k=${k} (${variantName}): No optimizations.`]);
        }

        k++;
    }, 800); // 800ms per step
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

  // Initialize Trace Matrix on load
  useEffect(() => {
    setTraceMatrix(INITIAL_TOPOLOGY);
  }, []);

  return (
    // Note: The 'dark' class is now handled on the <html> tag via useEffect, 
    // but we can keep a wrapper just in case, though the main bg is on min-h-screen
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
      
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <Dna size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">BioGen Analytics <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium border border-slate-200 dark:border-slate-700 ml-2">v2.4.0</span></h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                Mutation Landscape Modeling Engine
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 flex items-center justify-center ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}>
                {darkMode ? <Moon size={10} className="text-slate-800" /> : <Sun size={10} className="text-amber-500" />}
              </div>
            </button>

            <div className="hidden md:flex gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-2"><Activity size={14} className="text-blue-500" /> Network Analysis</span>
              <span className="flex items-center gap-2"><Network size={14} className="text-indigo-500" /> Floyd-Warshall</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 pb-32 transition-colors duration-300">
        
        <DnaHelix variants={VARIANTS} />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Main Visualization Panel (8 cols) */}
          <div className="xl:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 p-1 relative overflow-hidden group transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-900 pointer-events-none"></div>
              
              <div className="relative p-6 z-10">
                <div className="flex justify-between items-center mb-6">
                  {/* Tabbed Header */}
                  <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button 
                      onClick={() => setActiveTab('graph')}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'graph' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                    >
                      <GitCommit size={14} /> Graph Visualizer
                    </button>
                    <button 
                      onClick={() => setActiveTab('trace')}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'trace' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                    >
                      <Code size={14} /> C++ Trace
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded hidden sm:flex">
                    {activeTab === 'graph' && traceStep >= 0 && traceStep < 6 && (
                        <>
                          <Loader2 size={10} className="animate-spin text-blue-500"/>
                          PROCESSING: <span className="text-blue-600 dark:text-blue-400 font-bold">{VARIANTS[traceStep].name}</span>
                        </>
                    )}
                    {activeTab === 'graph' && (traceStep === -1 || traceStep === -2) && 'INTERACTIVE MAP'}
                    {activeTab === 'trace' && 'ALGORITHM DEBUGGER'}
                  </div>
                </div>

                {/* Conditional Rendering based on activeTab */}
                {activeTab === 'graph' ? (
                  <div className="relative h-[600px] w-full bg-slate-50/50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden select-none transition-colors duration-300">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" 
                         style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                    </div>

                    <svg className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-sm">
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill={darkMode ? "#64748b" : "#cbd5e1"} />
                        </marker>
                        <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                        </marker>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      {adjMatrix.map((row, i) => 
                        row.map((weight, j) => {
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
                                  filter={active ? "url(#glow)" : ""}
                                />
                                <rect 
                                  x={(start.x + end.x)/2 - 16} 
                                  y={(start.y + end.y)/2 - 12} 
                                  width="32" height="20" 
                                  fill={active ? "#eff6ff" : (darkMode ? "#1e293b" : "white")} 
                                  stroke={active ? "#bfdbfe" : "transparent"}
                                  rx="6"
                                  className="transition-colors duration-500"
                                />
                                <text 
                                  x={(start.x + end.x)/2} 
                                  y={(start.y + end.y)/2 + 4} 
                                  textAnchor="middle" 
                                  className={`text-[10px] font-bold font-mono ${active ? 'fill-blue-600' : (darkMode ? 'fill-slate-400' : 'fill-slate-400')}`}
                                >
                                  {weight}
                                </text>
                              </g>
                            );
                          }
                          return null;
                        })
                      )}
                    </svg>

                    {VARIANTS.map((node) => {
                      const isStart = node.id === startNode;
                      const isEnd = node.id === endNode;
                      const isInPath = path.includes(node.id);
                      const isProcessing = traceStep === node.id;
                      
                      let ringColor = darkMode ? "border-slate-600" : "border-white";
                      let bgGradient = darkMode ? "from-slate-800 to-slate-900" : "from-slate-100 to-slate-200";
                      let textColor = darkMode ? "text-slate-300" : "text-slate-600";
                      let shadow = darkMode ? "shadow-lg shadow-black/50" : "shadow-lg shadow-slate-200";
                      let scale = "scale-100";

                      if (isInPath) {
                        bgGradient = darkMode ? "from-blue-900/50 to-blue-800/50" : "from-blue-50 to-blue-100";
                        textColor = "text-blue-500 dark:text-blue-300";
                        ringColor = "border-blue-500";
                        shadow = "shadow-lg shadow-blue-200 dark:shadow-blue-900/30";
                      }
                      
                      if (isProcessing) {
                         ringColor = "border-amber-400";
                         bgGradient = "from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30";
                         shadow = "shadow-xl shadow-amber-200 dark:shadow-amber-900/20 ring-4 ring-amber-100 dark:ring-amber-900/20";
                         scale = "scale-110";
                      }

                      if (isStart) {
                        bgGradient = darkMode ? "from-emerald-900/50 to-emerald-800/50" : "from-emerald-50 to-emerald-100";
                        textColor = "text-emerald-600 dark:text-emerald-400";
                        ringColor = "border-emerald-500";
                      }
                      if (isEnd) {
                        bgGradient = darkMode ? "from-rose-900/50 to-rose-800/50" : "from-rose-50 to-rose-100";
                        textColor = "text-rose-600 dark:text-rose-400";
                        ringColor = "border-rose-500";
                      }

                      return (
                        <div 
                          key={node.id}
                          className={`absolute w-24 h-24 -ml-12 -mt-12 rounded-full border-[3px] ${ringColor} bg-gradient-to-br ${bgGradient} flex flex-col justify-center items-center ${shadow} z-10 transition-all duration-500 group/node cursor-pointer hover:scale-105 hover:z-20 ${scale}`}
                          style={{ left: node.x, top: node.y }}
                        >
                          <span className={`font-bold text-base ${textColor} tracking-tight`}>{node.short}</span>
                          <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500 mt-1 max-w-[80px] truncate text-center px-1">{node.name}</span>
                          
                          {/* Interactive Tooltip */}
                          <div className="absolute top-24 w-48 p-3 bg-slate-800/95 dark:bg-slate-700/95 backdrop-blur text-white text-[11px] leading-relaxed rounded-lg opacity-0 group-hover/node:opacity-100 transition-all duration-300 pointer-events-none text-center shadow-xl translate-y-2 group-hover/node:translate-y-0 z-50">
                            <div className="font-semibold text-slate-300 mb-1 border-b border-slate-700 pb-1">{node.name}</div>
                            {node.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // Trace View
                  <TraceView 
                    matrix={traceMatrix} 
                    step={traceStep} 
                    logs={traceLogs}
                    highlightCells={highlightCells}
                  />
                )}
              </div>
            </div>

            {/* Gene Information Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 flex flex-col md:flex-row items-start gap-4 transition-colors duration-300">
               <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg text-indigo-600 dark:text-indigo-400 shrink-0">
                 <Microscope size={24} />
               </div>
               <div className="flex-1">
                 <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide flex items-center gap-2">
                   Simulation Context: <span className="text-indigo-600 dark:text-indigo-400">gyrA Locus Model</span>
                 </h3>
                 <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                   This application simulates evolutionary pathways for the <em className="font-serif">gyrA</em> gene (DNA gyrase subunit A), a common target for fluoroquinolone resistance in bacteria. 
                   <span className="ml-1 inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs font-semibold bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded border border-amber-100 dark:border-amber-800">
                     <AlertTriangle size={10} /> Educational Model
                   </span>
                 </p>
               </div>
            </div>
          </div>

          {/* Right Control Panel (4 cols) */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* Control Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 p-6 transition-colors duration-300">
              <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-5">Configuration</h2>
              
              <div className="space-y-5">
                <div className="relative">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1.5 block">Start Variant</label>
                  <select 
                    value={startNode}
                    onChange={(e) => { setStartNode(Number(e.target.value)); resetAnalysis(); }}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-medium transition-all text-slate-800 dark:text-slate-200"
                  >
                    {VARIANTS.map(v => <option key={v.id} value={v.id}>{v.name} ({v.short})</option>)}
                  </select>
                  <div className="absolute right-3 top-9 pointer-events-none text-slate-400"><FlaskConical size={14} /></div>
                </div>

                <div className="relative">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1.5 block">Target Variant</label>
                  <select 
                    value={endNode}
                    onChange={(e) => { setEndNode(Number(e.target.value)); resetAnalysis(); }}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-medium transition-all text-slate-800 dark:text-slate-200"
                  >
                    {VARIANTS.map(v => <option key={v.id} value={v.id}>{v.name} ({v.short})</option>)}
                  </select>
                  <div className="absolute right-3 top-9 pointer-events-none text-slate-400"><Microscope size={14} /></div>
                </div>

                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm tracking-wide transition-all transform active:scale-95
                    ${isAnalyzing 
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:to-indigo-500'}
                  `}
                >
                  {isAnalyzing ? (
                    <>Processing Graph <span className="animate-pulse">...</span></>
                  ) : (
                    <><Play size={18} fill="currentColor" /> RUN ANALYSIS</>
                  )}
                </button>
              </div>

               {/* Edit Config Toggle */}
               <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => setShowConfig(!showConfig)}
                    className="flex w-full items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
                  >
                    <span className="flex items-center gap-2"><Settings size={14} /> ADJUST PARAMETERS</span>
                    <span>{showConfig ? 'Hide' : 'Edit'}</span>
                  </button>
                  
                  {showConfig && (
                    <div className="mt-4 max-h-48 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                      {adjMatrix.map((row, i) => 
                        row.map((val, j) => {
                          if (INITIAL_TOPOLOGY[i][j] < INF && i !== j) {
                            return (
                              <div key={`input-${i}-${j}`} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                <div className="text-[10px] font-bold text-slate-500 w-20">{VARIANTS[i].short} → {VARIANTS[j].short}</div>
                                <input 
                                  type="number" 
                                  step="0.1" 
                                  value={val}
                                  onChange={(e) => handleWeightChange(i, j, e.target.value)}
                                  className="flex-1 min-w-0 py-1 px-2 text-xs border border-slate-200 dark:border-slate-600 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
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
            </div>

            {/* Results Card */}
            <div className={`transition-all duration-700 transform ${cost !== null ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-50 pointer-events-none'}`}>
               <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
                 <div className="bg-slate-900 dark:bg-slate-950 px-5 py-3 flex justify-between items-center">
                   <h3 className="text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                     <FileText size={14} className="text-emerald-400"/> Report Generated
                   </h3>
                   <button onClick={resetAnalysis} className="text-slate-400 hover:text-white transition-colors">
                      <RotateCcw size={14} />
                   </button>
                 </div>
                 
                 <div className="p-6">
                    {cost !== null ? (
                      <>
                        <div className="flex items-baseline justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                           <div>
                             <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Total Fitness Cost</span>
                             <span className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{cost}</span>
                           </div>
                           <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
                             ${parseFloat(cost) < 5 
                               ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800' 
                               : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'}
                           `}>
                             {parseFloat(cost) < 5 ? 'High Mutation Risk' : 'Evolutionarily Stable'}
                           </div>
                        </div>

                        <div className="mb-6">
                           <span className="text-[10px] font-bold text-slate-400 uppercase block mb-3">Predicted Trajectory</span>
                           <div className="flex flex-wrap gap-2">
                              {path.map((nodeId, idx) => (
                                <div key={idx} className="flex items-center">
                                  <span className={`px-2 py-1 rounded text-xs font-bold border
                                    ${idx === 0 || idx === path.length-1 
                                      ? 'bg-slate-800 dark:bg-slate-700 text-white border-slate-800 dark:border-slate-700' 
                                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}
                                  `}>
                                    {VARIANTS[nodeId].short}
                                  </span>
                                  {idx < path.length - 1 && <div className="w-4 h-[2px] bg-slate-200 dark:bg-slate-700 mx-1"></div>}
                                </div>
                              ))}
                           </div>
                        </div>

                        {/* ✨ Gemini AI Insight Feature */}
                        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 p-4">
                          <div className="flex items-center justify-between mb-3">
                             <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 uppercase flex items-center gap-2">
                               <Sparkles size={16} className="text-indigo-500" /> AI Clinical Insight
                             </h4>
                          </div>
                          
                          {!aiAnalysis ? (
                            <button 
                              onClick={() => generateAIInsight(cost, path)}
                              disabled={isAiLoading}
                              className="w-full py-2 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors flex items-center justify-center gap-2"
                            >
                              {isAiLoading ? <Loader2 size={16} className="animate-spin" /> : <Bot size={16} />}
                              Generate Medical Assessment
                            </button>
                          ) : (
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-indigo-100 dark:border-indigo-700 shadow-sm animate-in fade-in duration-500">
                               <FormattedText text={aiAnalysis} className="text-base text-indigo-900 dark:text-indigo-200 leading-7" />
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="py-8 text-center">
                        <div className="inline-block p-3 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 mb-2">
                           <Activity size={24} />
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Waiting for input...</p>
                      </div>
                    )}
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Documentation Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 dark:border-slate-800 pt-10">
           {/* Concept Guide */}
           <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
                Glossary & Concepts
              </h3>
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-5 space-y-6">
                 <div className="flex gap-4">
                    <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-2 rounded h-fit"><GitCommit size={24}/></div>
                    <div>
                       <h4 className="text-lg font-bold text-slate-700 dark:text-slate-200">Nodes (Variants)</h4>
                       <p className="text-base text-slate-600 dark:text-slate-400 leading-7 mt-1">
                          Nodes represent different genetic states of the DNA sequence. "WT" (Wild Type) is the original healthy sequence, while "MutA", "MutB", etc., are mutated versions.
                       </p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded h-fit"><Activity size={24}/></div>
                    <div>
                       <h4 className="text-lg font-bold text-slate-700 dark:text-slate-200">Edges (Fitness Cost)</h4>
                       <p className="text-base text-slate-600 dark:text-slate-400 leading-7 mt-1">
                          The lines connecting nodes have numbers (e.g., 1.8, 8.0). These represent the "biological difficulty" for the virus/bacteria to mutate from one state to another. Lower numbers mean easier/faster mutation.
                       </p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="mt-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-2 rounded h-fit"><Network size={24}/></div>
                    <div>
                       <h4 className="text-lg font-bold text-slate-700 dark:text-slate-200">Algorithm (Floyd-Warshall)</h4>
                       <p className="text-base text-slate-600 dark:text-slate-400 leading-7 mt-1">
                          This system uses the Floyd-Warshall algorithm to calculate the "All-Pairs Shortest Path". It finds the path with the lowest cumulative cost, predicting the most likely evolutionary trajectory.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* User Guide */}
           <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <HelpCircle className="text-indigo-600 dark:text-indigo-400" size={24} />
                User Guide
              </h3>
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-5">
                 <ol className="space-y-6 relative border-l border-slate-100 dark:border-slate-800 ml-2">
                    <li className="pl-6 relative">
                       <span className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-slate-900">1</span>
                       <h4 className="text-lg font-bold text-slate-700 dark:text-slate-200">Select Variants</h4>
                       <p className="text-base text-slate-600 dark:text-slate-400 mt-1">
                          Use the dropdowns in the right panel to choose a <strong>Start Variant</strong> (e.g., WildType) and a <strong>Target Variant</strong> (e.g., DrugResistant).
                       </p>
                    </li>
                    <li className="pl-6 relative">
                       <span className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-slate-900">2</span>
                       <h4 className="text-lg font-bold text-slate-700 dark:text-slate-200">Run Analysis</h4>
                       <p className="text-base text-slate-600 dark:text-slate-400 mt-1">
                          Click the <strong>RUN ANALYSIS</strong> button. The system will calculate the optimal mutation path in real-time.
                       </p>
                    </li>
                    <li className="pl-6 relative">
                       <span className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-slate-900">3</span>
                       <h4 className="text-lg font-bold text-slate-700 dark:text-slate-200">Interpret Results with AI ✨</h4>
                       <p className="text-base text-slate-600 dark:text-slate-400 mt-1">
                          Once results appear, click <strong>Generate Medical Assessment</strong>. Gemini will analyze the specific mutation path you found and explain its clinical significance.
                       </p>
                    </li>
                    <li className="pl-6 relative">
                       <span className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-slate-900">4</span>
                       <h4 className="text-lg font-bold text-slate-700 dark:text-slate-200">Ask BioGen ✨</h4>
                       <p className="text-base text-slate-600 dark:text-slate-400 mt-1">
                          Click the <strong>Floating Chat Icon</strong> in the bottom right corner to open the BioGen Assistant and ask questions about the graph or gene mutations.
                       </p>
                    </li>
                 </ol>
              </div>
           </div>
        </div>

        {/* --- FLOATING CHAT WIDGET --- */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
           {/* Chat Window */}
           {isChatOpen && (
             <div className="mb-4 w-80 md:w-96 h-[450px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
               {/* Header */}
               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
                 <div className="flex items-center gap-2">
                   <Bot size={20} className="text-blue-100" />
                   <div>
                     <h3 className="font-bold text-sm">BioGen Assistant</h3>
                     <p className="text-[10px] text-blue-200 opacity-80">Powered by Gemini AI</p>
                   </div>
                 </div>
                 <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
                   <X size={18} />
                 </button>
               </div>

               {/* Chat Body */}
               <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-slate-950">
                 {chatHistory.length > 0 ? (
                   <div className="space-y-4">
                     {chatHistory.map((msg, idx) => (
                       <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'}`}>
                           {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                         </div>
                         <div className={`p-3 rounded-2xl shadow-sm max-w-[85%] ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-900 rounded-tl-none border border-slate-200 dark:border-slate-800'}`}>
                           <FormattedText text={msg.text} className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`} />
                         </div>
                       </div>
                     ))}
                     {isChatLoading && (
                       <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-1">
                             <Bot size={18} />
                          </div>
                          <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2">
                             <Loader2 size={14} className="animate-spin text-slate-400" />
                             <span className="text-xs text-slate-400">Thinking...</span>
                          </div>
                       </div>
                     )}
                     <div ref={chatScrollRef} />
                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-center p-6 text-slate-400 dark:text-slate-600">
                     <div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm mb-3">
                        <MessageSquare size={24} className="text-blue-200 dark:text-blue-800" />
                     </div>
                     <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">How can I help?</p>
                     <p className="text-xs">Ask about mutations, pathways, or specific genes.</p>
                   </div>
                 )}
               </div>

               {/* Chat Input */}
               <form onSubmit={handleChatSubmit} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                 <input 
                   type="text" 
                   value={chatInput}
                   onChange={(e) => setChatInput(e.target.value)}
                   placeholder="Ask a question..."
                   className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-slate-200"
                 />
                 <button 
                   type="submit"
                   disabled={isChatLoading || !chatInput.trim()}
                   className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                 >
                   <Send size={16} />
                 </button>
               </form>
             </div>
           )}

           {/* Floating Action Button (FAB) */}
           <button 
             onClick={() => setIsChatOpen(!isChatOpen)}
             className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-blue-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95 z-50
               ${isChatOpen ? 'bg-slate-800 dark:bg-slate-700 rotate-90' : 'bg-blue-600 hover:bg-blue-700'}
             `}
           >
             {isChatOpen ? (
               <X size={24} className="text-white transition-transform duration-300 -rotate-90" />
             ) : (
               <>
                 <MessageCircle size={28} className="text-white" />
                 <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                 </span>
               </>
             )}
           </button>
        </div>

      </main>
    </div>
  );
}