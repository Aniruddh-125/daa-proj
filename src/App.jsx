import React, { useState, useEffect, useRef } from 'react';
import { Network, Activity, GitCommit, ArrowRight, Dna, Info, Play, RotateCcw, Settings, Microscope, FileText, FlaskConical, AlertTriangle, BookOpen, HelpCircle, Sparkles, MessageSquare, Bot, Loader2, Send } from 'lucide-react';

// --- Constants & Data ---

const INF = 1e12;

// The variants with added biological descriptions
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

// The initial cost matrix (Topology structure)
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
  // For local development, replace "" with your actual API key or use import.meta.env.VITE_GEMINI_API_KEY
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

// 3D Revolving DNA Helix Component
const DnaHelix = ({ variants }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let frame;
    const animate = () => {
      setPhase(p => p + 0.04); // Speed of rotation
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const numPairs = 12; // Number of visible pairs to fit width
  
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
                
                {/* Nucleotide 1 */}
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

                {/* Nucleotide 2 */}
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

// --- Main Application Component ---

export default function DNAAnalysisApp() {
  const [startNode, setStartNode] = useState(0);
  const [endNode, setEndNode] = useState(5);
  const [adjMatrix, setAdjMatrix] = useState(() => INITIAL_TOPOLOGY.map(row => [...row]));
  const [path, setPath] = useState([]);
  const [cost, setCost] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  // AI States
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

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
    `;

    const result = await callGemini(prompt);
    setAiAnalysis(result);
    setIsAiLoading(false);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setIsChatLoading(true);
    const userQ = chatInput;
    setChatInput(""); // Clear input early
    
    // Construct context-aware prompt
    const pathContext = path.length > 0 
      ? `Current calculated path: ${path.map(id => VARIANTS[id].name).join(" -> ")} with cost ${cost}.` 
      : "No path currently calculated.";

    const prompt = `
      You are BioGen, a helpful AI assistant in a DNA sequencing app.
      CONTEXT: The user is looking at a mutation graph for the gyrA gene.
      ${pathContext}
      USER QUESTION: "${userQ}"
      
      Answer concisely and helpfully. Explain biological concepts if asked.
    `;

    const response = await callGemini(prompt);
    setChatResponse(response);
    setIsChatLoading(false);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAiAnalysis(""); // Reset AI analysis on new run
    setChatResponse(""); // Reset chat

    setTimeout(() => {
      const n = 6;
      let dist = adjMatrix.map(row => [...row]);
      let next = Array(n).fill(null).map(() => Array(n).fill(-1));

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][j] < INF && i !== j) next[i][j] = j;
        }
      }

      for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            if (dist[i][k] + dist[k][j] < dist[i][j]) {
              dist[i][j] = dist[i][k] + dist[k][j];
              next[i][j] = next[i][k];
            }
          }
        }
      }

      const calculatedCost = dist[startNode][endNode];
      if (calculatedCost >= INF) {
        setCost("∞");
        setPath([]);
      } else {
        const costVal = calculatedCost;
        setCost(costVal.toFixed(2));
        
        let curr = startNode;
        const newPath = [curr];
        while (curr !== endNode) {
          curr = next[curr][endNode];
          if (curr === -1 || curr === undefined) break;
          newPath.push(curr);
        }
        setPath(newPath);
      }
      setIsAnalyzing(false);
    }, 800);
  };

  const resetAnalysis = () => {
    setPath([]);
    setCost(null);
    setAiAnalysis("");
    setChatResponse("");
  };

  const isEdgeInPath = (u, v) => {
    for (let i = 0; i < path.length - 1; i++) {
      if (path[i] === u && path[i + 1] === v) return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30">
              <Dna size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">BioGen Analytics <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium border border-slate-200 ml-2">v2.4.0</span></h1>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                Mutation Landscape Modeling Engine
              </p>
            </div>
          </div>
          <div className="flex gap-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-2"><Activity size={14} className="text-blue-500" /> Network Analysis</span>
            <span className="flex items-center gap-2"><Network size={14} className="text-indigo-500" /> Floyd-Warshall</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        <DnaHelix variants={VARIANTS} />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Main Visualization Panel (8 cols) */}
          <div className="xl:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-white p-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white pointer-events-none"></div>
              
              <div className="relative p-6 z-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <GitCommit className="text-blue-500" />
                    Evolutionary Graph Topology
                  </h2>
                  <div className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded">
                    INTERACTIVE MAP
                  </div>
                </div>

                <div className="relative h-[480px] w-full bg-slate-50/50 rounded-xl border border-slate-100 overflow-hidden select-none">
                  {/* Grid Background */}
                  <div className="absolute inset-0 opacity-[0.03]" 
                       style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                  </div>

                  <svg className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-sm">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
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
                                stroke={active ? "#3b82f6" : "#cbd5e1"} 
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
                                fill={active ? "#eff6ff" : "white"} 
                                stroke={active ? "#bfdbfe" : "transparent"}
                                rx="6"
                                className="transition-colors duration-500"
                              />
                              <text 
                                x={(start.x + end.x)/2} 
                                y={(start.y + end.y)/2 + 4} 
                                textAnchor="middle" 
                                className={`text-[10px] font-bold font-mono ${active ? 'fill-blue-600' : 'fill-slate-400'}`}
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
                    
                    let ringColor = "border-white";
                    let bgGradient = "from-slate-100 to-slate-200";
                    let textColor = "text-slate-600";
                    let shadow = "shadow-lg shadow-slate-200";

                    if (isInPath) {
                      bgGradient = "from-blue-50 to-blue-100";
                      textColor = "text-blue-700";
                      ringColor = "border-blue-500";
                      shadow = "shadow-lg shadow-blue-200";
                    }
                    if (isStart) {
                      bgGradient = "from-emerald-50 to-emerald-100";
                      textColor = "text-emerald-700";
                      ringColor = "border-emerald-500";
                    }
                    if (isEnd) {
                      bgGradient = "from-rose-50 to-rose-100";
                      textColor = "text-rose-700";
                      ringColor = "border-rose-500";
                    }

                    return (
                      <div 
                        key={node.id}
                        className={`absolute w-24 h-24 -ml-12 -mt-12 rounded-full border-[3px] ${ringColor} bg-gradient-to-br ${bgGradient} flex flex-col justify-center items-center ${shadow} z-10 transition-all duration-500 group/node cursor-pointer hover:scale-105 hover:z-20`}
                        style={{ left: node.x, top: node.y }}
                      >
                        <span className={`font-bold text-base ${textColor} tracking-tight`}>{node.short}</span>
                        <span className="text-[9px] font-medium text-slate-400 mt-1 max-w-[80px] truncate text-center px-1">{node.name}</span>
                        
                        {/* Interactive Tooltip */}
                        <div className="absolute top-24 w-48 p-3 bg-slate-800/95 backdrop-blur text-white text-[11px] leading-relaxed rounded-lg opacity-0 group-hover/node:opacity-100 transition-all duration-300 pointer-events-none text-center shadow-xl translate-y-2 group-hover/node:translate-y-0 z-50">
                          <div className="font-semibold text-slate-300 mb-1 border-b border-slate-700 pb-1">{node.name}</div>
                          {node.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Gene Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row items-start gap-4">
               <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600 shrink-0">
                 <Microscope size={24} />
               </div>
               <div className="flex-1">
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                   Simulation Context: <span className="text-indigo-600">gyrA Locus Model</span>
                 </h3>
                 <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                   This application simulates evolutionary pathways for the <em className="font-serif">gyrA</em> gene (DNA gyrase subunit A), a common target for fluoroquinolone resistance in bacteria. 
                   <span className="ml-1 inline-flex items-center gap-1 text-amber-600 text-xs font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                     <AlertTriangle size={10} /> Educational Model
                   </span>
                 </p>
               </div>
            </div>
          </div>

          {/* Right Control Panel (4 cols) */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* Control Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-white p-6">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5">Configuration</h2>
              
              <div className="space-y-5">
                <div className="relative">
                  <label className="text-xs font-semibold text-slate-600 uppercase mb-1.5 block">Start Variant</label>
                  <select 
                    value={startNode}
                    onChange={(e) => { setStartNode(Number(e.target.value)); resetAnalysis(); }}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-medium transition-all"
                  >
                    {VARIANTS.map(v => <option key={v.id} value={v.id}>{v.name} ({v.short})</option>)}
                  </select>
                  <div className="absolute right-3 top-9 pointer-events-none text-slate-400"><FlaskConical size={14} /></div>
                </div>

                <div className="relative">
                  <label className="text-xs font-semibold text-slate-600 uppercase mb-1.5 block">Target Variant</label>
                  <select 
                    value={endNode}
                    onChange={(e) => { setEndNode(Number(e.target.value)); resetAnalysis(); }}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm font-medium transition-all"
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
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
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
               <div className="mt-6 pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => setShowConfig(!showConfig)}
                    className="flex w-full items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
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
                              <div key={`input-${i}-${j}`} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <div className="text-[10px] font-bold text-slate-500 w-20">{VARIANTS[i].short} → {VARIANTS[j].short}</div>
                                <input 
                                  type="number" 
                                  step="0.1" 
                                  value={val}
                                  onChange={(e) => handleWeightChange(i, j, e.target.value)}
                                  className="flex-1 min-w-0 py-1 px-2 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white"
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
               <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                 <div className="bg-slate-900 px-5 py-3 flex justify-between items-center">
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
                        <div className="flex items-baseline justify-between mb-6 border-b border-slate-100 pb-4">
                           <div>
                             <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Total Fitness Cost</span>
                             <span className="text-4xl font-black text-slate-800 tracking-tight">{cost}</span>
                           </div>
                           <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
                             ${parseFloat(cost) < 5 
                               ? 'bg-rose-50 text-rose-600 border-rose-200' 
                               : 'bg-emerald-50 text-emerald-600 border-emerald-200'}
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
                                      ? 'bg-slate-800 text-white border-slate-800' 
                                      : 'bg-white text-slate-600 border-slate-200'}
                                  `}>
                                    {VARIANTS[nodeId].short}
                                  </span>
                                  {idx < path.length - 1 && <div className="w-4 h-[2px] bg-slate-200 mx-1"></div>}
                                </div>
                              ))}
                           </div>
                        </div>

                        {/* ✨ Gemini AI Insight Feature */}
                        <div className="bg-indigo-50/50 rounded-xl border border-indigo-100 p-4">
                          <div className="flex items-center justify-between mb-3">
                             <h4 className="text-xs font-bold text-indigo-900 uppercase flex items-center gap-2">
                               <Sparkles size={14} className="text-indigo-500" /> AI Clinical Insight
                             </h4>
                          </div>
                          
                          {!aiAnalysis ? (
                            <button 
                              onClick={() => generateAIInsight(cost, path)}
                              disabled={isAiLoading}
                              className="w-full py-2 bg-white border border-indigo-200 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
                            >
                              {isAiLoading ? <Loader2 size={14} className="animate-spin" /> : <Bot size={14} />}
                              Generate Medical Assessment
                            </button>
                          ) : (
                            <div className="prose prose-sm text-xs text-indigo-900 leading-relaxed bg-white p-3 rounded-lg border border-indigo-100 shadow-sm animate-in fade-in duration-500">
                               {aiAnalysis.split('\n').map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="py-8 text-center">
                        <div className="inline-block p-3 rounded-full bg-slate-50 text-slate-300 mb-2">
                           <Activity size={24} />
                        </div>
                        <p className="text-xs text-slate-400">Waiting for input...</p>
                      </div>
                    )}
                 </div>
               </div>
            </div>

            {/* ✨ New "Ask BioGen" Chat Feature */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-white overflow-hidden flex flex-col h-[280px]">
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center gap-2">
                <Bot size={16} className="text-blue-500" />
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ask BioGen Assistant</h3>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-slate-50/50">
                 {chatResponse ? (
                   <div className="flex gap-3">
                     <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                       <Bot size={14} />
                     </div>
                     <div className="bg-white p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-sm text-xs text-slate-600 leading-relaxed">
                       {chatResponse}
                     </div>
                   </div>
                 ) : (
                   <div className="text-center mt-12 text-slate-400 text-xs">
                     <MessageSquare size={24} className="mx-auto mb-2 opacity-50" />
                     Ask questions about the graph,<br/>genes, or mutation risks.
                   </div>
                 )}
                 {isChatLoading && (
                   <div className="flex gap-2 mt-3 items-center text-xs text-slate-400 ml-9">
                     <Loader2 size={12} className="animate-spin" /> BioGen is thinking...
                   </div>
                 )}
              </div>

              <form onSubmit={handleChatSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="E.g., Why is MutB -> MutC low cost?"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button 
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Documentation Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-10">
           {/* Concept Guide */}
           <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="text-blue-600" size={20} />
                Glossary & Concepts
              </h3>
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 space-y-4">
                 <div className="flex gap-3">
                    <div className="mt-1 bg-emerald-100 text-emerald-600 p-1.5 rounded h-fit"><GitCommit size={16}/></div>
                    <div>
                       <h4 className="text-sm font-bold text-slate-700">Nodes (Variants)</h4>
                       <p className="text-xs text-slate-500 leading-relaxed mt-1">
                          Nodes represent different genetic states of the DNA sequence. "WT" (Wild Type) is the original healthy sequence, while "MutA", "MutB", etc., are mutated versions.
                       </p>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <div className="mt-1 bg-blue-100 text-blue-600 p-1.5 rounded h-fit"><Activity size={16}/></div>
                    <div>
                       <h4 className="text-sm font-bold text-slate-700">Edges (Fitness Cost)</h4>
                       <p className="text-xs text-slate-500 leading-relaxed mt-1">
                          The lines connecting nodes have numbers (e.g., 1.8, 8.0). These represent the "biological difficulty" for the virus/bacteria to mutate from one state to another. Lower numbers mean easier/faster mutation.
                       </p>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <div className="mt-1 bg-indigo-100 text-indigo-600 p-1.5 rounded h-fit"><Network size={16}/></div>
                    <div>
                       <h4 className="text-sm font-bold text-slate-700">Algorithm (Floyd-Warshall)</h4>
                       <p className="text-xs text-slate-500 leading-relaxed mt-1">
                          This system uses the Floyd-Warshall algorithm to calculate the "All-Pairs Shortest Path". It finds the path with the lowest cumulative cost, predicting the most likely evolutionary trajectory.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* User Guide */}
           <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <HelpCircle className="text-indigo-600" size={20} />
                User Guide
              </h3>
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                 <ol className="space-y-4 relative border-l border-slate-100 ml-2">
                    <li className="pl-6 relative">
                       <span className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold ring-4 ring-white">1</span>
                       <h4 className="text-sm font-bold text-slate-700">Select Variants</h4>
                       <p className="text-xs text-slate-500 mt-0.5">
                          Use the dropdowns in the right panel to choose a <strong>Start Variant</strong> (e.g., WildType) and a <strong>Target Variant</strong> (e.g., DrugResistant).
                       </p>
                    </li>
                    <li className="pl-6 relative">
                       <span className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold ring-4 ring-white">2</span>
                       <h4 className="text-sm font-bold text-slate-700">Run Analysis</h4>
                       <p className="text-xs text-slate-500 mt-0.5">
                          Click the <strong>RUN ANALYSIS</strong> button. The system will calculate the optimal mutation path in real-time.
                       </p>
                    </li>
                    <li className="pl-6 relative">
                       <span className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold ring-4 ring-white">3</span>
                       <h4 className="text-sm font-bold text-slate-700">Interpret Results with AI ✨</h4>
                       <p className="text-xs text-slate-500 mt-0.5">
                          Once results appear, click <strong>Generate Medical Assessment</strong>. Gemini will analyze the specific mutation path you found and explain its clinical significance.
                       </p>
                    </li>
                    <li className="pl-6 relative">
                       <span className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold ring-4 ring-white">4</span>
                       <h4 className="text-sm font-bold text-slate-700">Ask BioGen ✨</h4>
                       <p className="text-xs text-slate-500 mt-0.5">
                          Use the chat box to ask questions like "What drugs target MutB?" or "Explain this graph". The AI is aware of the current simulation context!
                       </p>
                    </li>
                 </ol>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}