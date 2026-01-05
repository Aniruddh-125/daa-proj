<<<<<<< Updated upstream
import React, { useState, useEffect, useRef } from 'react';
import { Network, Activity, GitCommit, ArrowRight, Dna, Info, Play, RotateCcw, Settings, Microscope, FileText, FlaskConical, AlertTriangle, BookOpen, HelpCircle, Sparkles, MessageSquare, Bot, Loader2, Send, Code, Grid, Terminal, X, MessageCircle, Moon, Sun, User, Cpu, Sigma, BrainCircuit, LayoutDashboard, Sliders,  Share2, Zap } from 'lucide-react';
=======
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Network, Activity, GitCommit, ArrowRight, Dna, Info, Play, RotateCcw, Settings, Microscope, FileText, FlaskConical, AlertTriangle, BookOpen, HelpCircle, Sparkles, MessageSquare, Bot, Loader2, Send, Code, Grid, Terminal, X, MessageCircle, Moon, Sun, User, Cpu, Sigma, BrainCircuit, LayoutDashboard, Sliders, Share2, Zap, Hash, Search, ArrowDownUp, Pause, SkipForward, Layers, Book, List, Box, MonitorPlay } from 'lucide-react';
>>>>>>> Stashed changes

// --- Constants & Data ---

const INF = 1e12;

<<<<<<< Updated upstream
=======
// Adjusted Y coordinates for MutB and MutD (id 2 and 4) to 290 to prevent edge overlap
>>>>>>> Stashed changes
const VARIANTS = [
  { id: 0, name: "WildType", short: "WT", x: 100, y: 150 },
  { id: 1, name: "MutA", short: "MA", x: 250, y: 50 },
  { id: 2, name: "MutB", short: "MB", x: 250, y: 290 },
  { id: 3, name: "MutC", short: "MC", x: 400, y: 50 },
  { id: 4, name: "MutD", short: "MD", x: 400, y: 290 },
  { id: 5, name: "DrugResistant", short: "DR", x: 550, y: 150 },
];

const INITIAL_TOPOLOGY = [
  [0,   1.8, 8.0, INF, INF, INF],
  [INF, 0,   2.4, INF, 9.5, INF],
  [INF, INF, 0,   1.1, INF, 6.2],
  [INF, INF, INF, 0,   3.0, INF],
  [INF, INF, INF, INF, 0,   2.0],
  [INF, INF, INF, INF, INF, 0]
];

// --- Helper Functions ---

const callGemini = async (prompt) => {
<<<<<<< Updated upstream
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // API Key provided by the environment
  
=======
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
>>>>>>> Stashed changes
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    if (!response.ok) throw new Error(`API Error`);
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis generated.";
  } catch (error) {
    return "Error connecting to AI Analysis engine.";
  }
};

const FormattedText = ({ text, className = "" }) => {
  if (!text) return null;
  return (
    <div className={`space-y-1 ${className}`}>
      {text.split('\n').map((line, i) => {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <div key={i} className="min-h-[1em]">
            {parts.map((part, j) => 
              (part.startsWith('**') && part.endsWith('**')) 
                ? <strong key={j} className="font-bold text-indigo-900/90 dark:text-indigo-300">{part.slice(2, -2)}</strong> 
                : part
            )}
          </div>
        );
      })}
    </div>
  );
};

<<<<<<< Updated upstream
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

=======
>>>>>>> Stashed changes
const DnaHelix = ({ variants }) => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    let frame;
<<<<<<< Updated upstream
    const animate = () => {
      setPhase(p => p + 0.04);
      frame = requestAnimationFrame(animate);
    };
=======
    const animate = () => { setPhase(p => p + 0.04); frame = requestAnimationFrame(animate); };
>>>>>>> Stashed changes
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

<<<<<<< Updated upstream
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
=======
  return (
    <div className="relative h-40 w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-xl overflow-hidden flex items-center justify-center border border-slate-700/50">
       <div className="absolute top-4 left-6 text-[10px] font-mono text-emerald-400 tracking-widest uppercase flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Sequencing Model
>>>>>>> Stashed changes
       </div>
       {Array.from({ length: 12 }).map((_, i) => {
          const x = (i - 6 + 0.5) * 60; 
          const angle = i * 0.5 + phase;
          const y1 = Math.sin(angle) * 30;
          const y2 = Math.sin(angle + Math.PI) * 30;
          const scale1 = (Math.cos(angle) + 1.8) / 2.8; 
          const scale2 = (Math.cos(angle + Math.PI) + 1.8) / 2.8;
          const variant = variants[i % variants.length];
          return (
             <React.Fragment key={i}>
<<<<<<< Updated upstream
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
=======
                <div className="absolute w-[1px] bg-slate-600/30" style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${Math.min(y1, y2)}px)`, height: Math.abs(y1 - y2), transform: 'translateX(-50%)', zIndex: 5 }} />
                <div className="absolute rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm transition-transform" style={{ width: '32px', height: '32px', background: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, ${scale1 + 0.2}), rgba(29, 78, 216, ${scale1}))`, left: `calc(50% + ${x}px)`, top: `calc(50% + ${y1}px)`, transform: `translate(-50%, -50%) scale(${scale1})`, zIndex: Math.cos(angle) > 0 ? 20 : 10 }}><span className="text-[9px] font-bold text-white/90 font-mono">{variant.short[0]}</span></div>
                <div className="absolute rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm transition-transform" style={{ width: '32px', height: '32px', background: `radial-gradient(circle at 30% 30%, rgba(16, 185, 129, ${scale2 + 0.2}), rgba(5, 150, 105, ${scale2}))`, left: `calc(50% + ${x}px)`, top: `calc(50% + ${y2}px)`, transform: `translate(-50%, -50%) scale(${scale2})`, zIndex: Math.cos(angle + Math.PI) > 0 ? 20 : 10 }}><span className="text-[9px] font-bold text-white/90 font-mono">{variant.short[1] || ''}</span></div>
>>>>>>> Stashed changes
             </React.Fragment>
          );
       })}
    </div>
  );
};

<<<<<<< Updated upstream
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
  
=======
// --- ALGORITHM VISUALIZATION MODULES ---
const AlgorithmControls = ({ isRunning, onPlay, onPause, onStep, onReset, isComplete }) => (
  <div className="flex gap-2">
    {!isRunning ? (
      <button onClick={onPlay} disabled={isComplete} className="p-1.5 bg-blue-600 hover:bg-blue-500 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><Play size={14}/></button>
    ) : (
      <button onClick={onPause} className="p-1.5 bg-amber-600 hover:bg-amber-500 rounded text-white transition-colors"><Pause size={14}/></button>
    )}
    <button onClick={onStep} disabled={isRunning || isComplete} className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded text-white disabled:opacity-50 transition-colors"><SkipForward size={14}/></button>
    <button onClick={onReset} className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded text-white transition-colors"><RotateCcw size={14}/></button>
  </div>
);

const FloydWarshallModule = ({ matrix, step, logs, highlightCells }) => {
  const scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [logs]);

  const cppCode = `// Floyd-Warshall Algorithm
for (int k = 0; k < n; k++) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (dist[i][k] + dist[k][j] < dist[i][j]) {
                dist[i][j] = dist[i][k] + dist[k][j];
                next[i][j] = next[i][k];
            }
        }
    }
}`;

  return (
    <div className="h-[600px] w-full flex flex-col bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
      <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sigma size={16} className="text-blue-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">All-Pairs Shortest Path</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">O(V³) Time</span>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-5/12 bg-slate-950 flex flex-col border-r border-slate-800">
          <div className="p-4 border-b border-slate-800 flex-1 overflow-auto">
             <pre className="text-xs font-mono text-slate-400 leading-relaxed whitespace-pre-wrap">{cppCode}</pre>
          </div>
          <div className="h-48 bg-black p-4 font-mono flex flex-col">
             <div className="flex items-center gap-2 text-slate-500 mb-2 border-b border-slate-800 pb-1">
               <Terminal size={14} /> <span className="text-xs font-bold uppercase">System Output</span>
             </div>
             <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                {logs.length === 0 && <span className="text-xs text-slate-600">Idle...</span>}
                {logs.map((log, i) => <div key={i} className="text-xs text-slate-300"><span className="text-blue-500 mr-2">➜</span>{log}</div>)}
             </div>
          </div>
        </div>
        <div className="flex-1 bg-slate-900 p-6 overflow-auto flex flex-col items-center justify-center relative">
           <div className="relative z-10 grid grid-cols-7 gap-2">
              <div className="w-12 h-10"></div>
              {VARIANTS.map(v => <div key={v.id} className={`w-12 h-10 flex items-center justify-center text-xs font-bold ${step === v.id ? 'text-emerald-400' : 'text-slate-500'}`}>{v.short}</div>)}
              {matrix.map((row, i) => (
                <React.Fragment key={i}>
                  <div className={`w-12 h-10 flex items-center justify-center text-xs font-bold ${step === i ? 'text-emerald-400' : 'text-slate-500'}`}>{VARIANTS[i].short}</div>
                  {row.map((val, j) => {
                    const isPivot = step !== -1 && (i === step || j === step);
                    const isDiagonal = i === j;
                    const isHighlighted = highlightCells.some(cell => cell.i === i && cell.j === j);
                    let bg = isHighlighted ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50" : isDiagonal ? "bg-slate-950 text-slate-600 border-slate-800" : isPivot ? "bg-blue-900/10 text-blue-300 border-blue-800/30" : "bg-transparent text-slate-400 border-slate-800";
                    return <div key={`${i}-${j}`} className={`w-12 h-10 flex items-center justify-center text-xs font-mono border rounded transition-all duration-500 ${bg}`}>{val >= INF ? '∞' : parseFloat(val).toFixed(1)}</div>;
                  })}
                </React.Fragment>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const KruskalModule = ({ matrix }) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const newSteps = [];
    const edges = [];
    matrix.forEach((row, u) => row.forEach((w, v) => {
      if (u < v && w < INF) edges.push({ u, v, w });
    }));
    edges.sort((a, b) => a.w - b.w);

    const parent = Array.from({ length: 6 }, (_, i) => i);
    const find = (i) => {
      let root = i;
      while (root !== parent[root]) root = parent[root];
      return root;
    };
    const union = (i, j) => {
      const rootI = find(i);
      const rootJ = find(j);
      if (rootI !== rootJ) {
        parent.forEach((p, idx) => { if (find(idx) === rootJ) parent[idx] = rootI; });
        parent[rootJ] = rootI;
        return true;
      }
      return false;
    };

    newSteps.push({ mst: [], parent: [...parent], currentEdge: null, log: "Sorted edges by weight. Initialized Disjoint Sets." });

    edges.forEach(edge => {
      const pBefore = [...parent];
      const rootU = find(edge.u);
      const rootV = find(edge.v);
       
      newSteps.push({ 
        mst: newSteps[newSteps.length-1].mst, 
        parent: pBefore, 
        currentEdge: { ...edge, status: 'inspecting' },
        log: `Inspecting edge ${VARIANTS[edge.u].short}-${VARIANTS[edge.v].short} (w: ${edge.w})`
      });

      if (rootU !== rootV) {
        const pAfter = [...pBefore];
        for(let i=0; i<6; i++) {
           let r = i; while(r !== pAfter[r]) r = pAfter[r];
           if(r === rootV) pAfter[i] = pAfter[i] === rootV ? rootU : pAfter[i]; 
           if(pAfter[i] === rootV) pAfter[i] = rootU; 
        }
        union(edge.u, edge.v);
        
        newSteps.push({
          mst: [...newSteps[newSteps.length-1].mst, edge],
          parent: [...parent], 
          currentEdge: { ...edge, status: 'accepted' },
          log: `Nodes in different sets. Union(${VARIANTS[edge.u].short}, ${VARIANTS[edge.v].short}). Added to MST.`
        });
      } else {
        newSteps.push({
          mst: newSteps[newSteps.length-1].mst,
          parent: pBefore,
          currentEdge: { ...edge, status: 'rejected' },
          log: `Cycle detected (Same Set). Dropping edge ${VARIANTS[edge.u].short}-${VARIANTS[edge.v].short}.`
        });
      }
    });
    
    newSteps.push({ ...newSteps[newSteps.length-1], currentEdge: null, log: "MST Construction Complete." });
    setSteps(newSteps);
    setCurrentStep(0);
  }, [matrix]);

  useEffect(() => {
    let interval;
    if (isRunning && currentStep < steps.length - 1) {
      interval = setInterval(() => setCurrentStep(c => c + 1), 1000);
    } else {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentStep, steps.length]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [currentStep]);

  const state = steps[currentStep] || { parent: [0,1,2,3,4,5], mst: [], currentEdge: null, log: "Initializing..." };
  const setColors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6"]; 

  return (
    <div className="h-[600px] w-full flex flex-col bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
      <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-purple-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Kruskal's Algorithm (MST)</span>
        </div>
        <AlgorithmControls 
          isRunning={isRunning} 
          isComplete={currentStep === steps.length - 1}
          onPlay={() => setIsRunning(true)} 
          onPause={() => setIsRunning(false)} 
          onStep={() => setCurrentStep(c => Math.min(c + 1, steps.length - 1))} 
          onReset={() => { setIsRunning(false); setCurrentStep(0); }} 
        />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-4/12 bg-slate-950 flex flex-col border-r border-slate-800">
          <div className="p-4 border-b border-slate-800 flex-1 overflow-auto">
             <pre className="text-xs font-mono text-slate-400 leading-relaxed">
{`sort(edges)
for (edge : edges) {
  if (find(u) != find(v)) {
    union(u, v)
    mst.add(edge)
  }
}`}
             </pre>
             <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Time Complexity</span><span className="text-slate-300">O(E log E)</span></div>
                <div className="flex justify-between text-xs text-slate-500"><span>Space Complexity</span><span className="text-slate-300">O(V)</span></div>
             </div>
          </div>
          <div className="h-40 bg-black p-4 font-mono flex flex-col">
             <div className="flex items-center gap-2 text-slate-500 mb-2 border-b border-slate-800 pb-1"><Terminal size={12} /> <span className="text-[10px] font-bold uppercase">Trace</span></div>
             <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                {steps.slice(0, currentStep + 1).map((s, i) => (
                  <div key={i} className={`text-xs ${i === currentStep ? 'text-white font-bold' : 'text-slate-500'}`}>
                    <span className="text-purple-500 mr-2">➜</span>{s.log}
                  </div>
                ))}
             </div>
          </div>
        </div>
        <div className="flex-1 bg-slate-900 relative">
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           <svg className="absolute inset-0 w-full h-full pointer-events-none">
             {matrix.map((row, i) => row.map((w, j) => {
                if (i < j && w < INF) {
                   const isMST = state.mst.find(e => (e.u===i && e.v===j) || (e.u===j && e.v===i));
                   const isCurrent = state.currentEdge && ((state.currentEdge.u===i && state.currentEdge.v===j) || (state.currentEdge.u===j && state.currentEdge.v===i));
                   let stroke = "#334155";
                   let strokeWidth = 1;
                   if (isMST) { stroke = "#22c55e"; strokeWidth = 3; }
                   else if (isCurrent) { stroke = state.currentEdge.status === 'rejected' ? "#ef4444" : "#fbbf24"; strokeWidth = 3; }
                   return (
                      <g key={`${i}-${j}`}>
                          <line x1={VARIANTS[i].x + 100} y1={VARIANTS[i].y + 100} x2={VARIANTS[j].x + 100} y2={VARIANTS[j].y + 100} stroke={stroke} strokeWidth={strokeWidth} />
                          <text x={(VARIANTS[i].x + VARIANTS[j].x)/2 + 100} y={(VARIANTS[i].y + VARIANTS[j].y)/2 + 100} className="text-[9px] fill-slate-500" textAnchor="middle">{w}</text>
                      </g>
                   );
                }
                return null;
             }))}
           </svg>

           {VARIANTS.map((node) => {
              let root = node.id; 
              if (state.parent) {
                 let curr = root;
                 let depth = 0;
                 while(curr !== state.parent[curr] && depth < 10) { curr = state.parent[curr]; depth++; }
                 root = curr;
              }
              const color = setColors[root % setColors.length];
              return (
                 <div key={node.id} 
                       className="absolute w-16 h-16 -ml-8 -mt-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 bg-slate-900 z-10" 
                       style={{ left: node.x + 100, top: node.y + 100, borderColor: color, boxShadow: `0 0 10px ${color}40` }}>
                    <span className="text-xs font-bold text-slate-300">{node.short}</span>
                 </div>
              );
           })}
        </div>
      </div>
    </div>
  );
};

const TraversalModule = ({ type, startNode, setStartNode, matrix }) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const newSteps = [];
    const structureName = type === 'bfs' ? 'Queue' : 'Stack';
    newSteps.push({ visited: new Set(), active: null, log: `Initialize ${structureName} with ${VARIANTS[startNode].short}` });

    const simVisited = new Set();
    const simQ = [startNode];
    let loopLimit = 0;
    while(simQ.length > 0 && loopLimit < 100) {
       loopLimit++;
       const curr = type === 'bfs' ? simQ.shift() : simQ.pop();
       if (!simVisited.has(curr)) {
          simVisited.add(curr);
          newSteps.push({ visited: new Set(simVisited), active: curr, log: `Visit ${VARIANTS[curr].short}` });
          const neighbors = [];
          matrix[curr].forEach((w, idx) => {
             if (w < INF && curr !== idx && !simVisited.has(idx)) neighbors.push(idx);
          });
          if (type === 'dfs') neighbors.reverse();
          neighbors.forEach(n => { if (!simQ.includes(n)) simQ.push(n); });
          if (neighbors.length > 0) {
             newSteps.push({ visited: new Set(simVisited), active: curr, log: `Add neighbors of ${VARIANTS[curr].short}: ${neighbors.map(n=>VARIANTS[n].short).join(', ')}` });
          }
       }
    }
    newSteps.push({ visited: new Set(simVisited), active: null, log: "Traversal Complete" });
    setSteps(newSteps);
    setCurrentStep(0);
  }, [type, startNode, matrix]);

  useEffect(() => {
    let interval;
    if (isRunning && currentStep < steps.length - 1) {
      interval = setInterval(() => setCurrentStep(c => c + 1), 800);
    } else {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentStep, steps.length]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [currentStep]);

  const state = steps[currentStep] || { visited: new Set(), active: null, log: '' };

  return (
    <div className="h-[600px] w-full flex flex-col bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
       <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <Network size={16} className={type === 'bfs' ? "text-emerald-400" : "text-amber-400"} />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">{type === 'bfs' ? 'Breadth-First Search' : 'Depth-First Search'}</span>
             </div>
             <div className="h-4 w-[1px] bg-slate-700"></div>
             <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Start:</span>
                <select value={startNode} onChange={e => { setStartNode(Number(e.target.value)); setIsRunning(false); setCurrentStep(0); }} disabled={isRunning} className="bg-slate-800 text-slate-200 text-xs rounded border border-slate-700 px-2 py-1 outline-none">
                   {VARIANTS.map(v => <option key={v.id} value={v.id}>{v.short}</option>)}
                </select>
             </div>
          </div>
          <AlgorithmControls 
            isRunning={isRunning} isComplete={currentStep === steps.length - 1}
            onPlay={() => setIsRunning(true)} onPause={() => setIsRunning(false)} 
            onStep={() => setCurrentStep(c => Math.min(c + 1, steps.length - 1))} 
            onReset={() => { setIsRunning(false); setCurrentStep(0); }} 
          />
       </div>

       <div className="flex-1 flex overflow-hidden">
          <div className="w-4/12 bg-slate-950 flex flex-col border-r border-slate-800">
             <div className="p-4 border-b border-slate-800 flex-1 overflow-auto">
               <pre className="text-xs font-mono text-slate-400 leading-relaxed">
{type === 'bfs' ? `// BFS - Queue
Q.enqueue(start);
while (!Q.empty()) {
  u = Q.dequeue();
  if (!visited[u]) {
    visited[u] = true;
    for (v : adj[u]) Q.enqueue(v);
  }
}` : `// DFS - Stack
S.push(start);
while (!S.empty()) {
  u = S.pop();
  if (!visited[u]) {
    visited[u] = true;
    for (v : adj[u]) S.push(v);
  }
}`}
               </pre>
               <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Time Complexity</span><span className="text-slate-300">O(V + E)</span></div>
                  <div className="flex justify-between text-xs text-slate-500"><span>Space Complexity</span><span className="text-slate-300">O(V)</span></div>
               </div>
             </div>
             <div className="h-40 bg-black p-4 font-mono flex flex-col">
                <div className="flex items-center gap-2 text-slate-500 mb-2 border-b border-slate-800 pb-1"><Terminal size={12} /> <span className="text-[10px] font-bold uppercase">Trace</span></div>
                <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                   {steps.slice(0, currentStep + 1).map((s, i) => (
                     <div key={i} className={`text-xs ${i === currentStep ? 'text-white font-bold' : 'text-slate-500'}`}>
                       <span className={type==='bfs'?'text-emerald-500 mr-2':'text-amber-500 mr-2'}>➜</span> {s.log}
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="flex-1 bg-slate-900 relative">
             <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             {VARIANTS.map((node) => {
                const isActive = state.active === node.id;
                const isVisited = state.visited.has(node.id);
                let color = "bg-slate-800 border-slate-600 text-slate-500";
                if (isActive) color = type === 'bfs' ? "bg-emerald-900/80 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "bg-amber-900/80 border-amber-500 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.5)]";
                else if (isVisited) color = "bg-blue-900/30 border-blue-500/50 text-blue-200";

                return (
                   <div key={node.id} className={`absolute w-16 h-16 -ml-8 -mt-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${color}`} style={{ left: node.x + 100, top: node.y + 100 }}>
                      <span className="text-xs font-bold">{node.short}</span>
                   </div>
                );
             })}
             <svg className="absolute inset-0 w-full h-full pointer-events-none">
               <defs>
                 <marker id="arrow-plain" markerWidth="10" markerHeight="7" refX="22" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#475569" /></marker>
               </defs>
               {matrix.map((row, i) => row.map((w, j) => {
                  if (w < INF && i !== j) {
                     return <line key={`${i}-${j}`} x1={VARIANTS[i].x + 100} y1={VARIANTS[i].y + 100} x2={VARIANTS[j].x + 100} y2={VARIANTS[j].y + 100} stroke="#334155" strokeWidth="1" markerEnd="url(#arrow-plain)" />;
                  }
                  return null;
               }))}
             </svg>
          </div>
       </div>
    </div>
  );
};

const DijkstraModule = ({ startNode, setStartNode, matrix }) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const newSteps = [];
    const n = 6;
    let dist = Array(n).fill(INF);
    let visited = new Set();
     
    dist[startNode] = 0;
    newSteps.push({ dist: [...dist], visited: new Set(), active: null, log: `Init: Dist to ${VARIANTS[startNode].short} = 0` });

    for (let count = 0; count < n; count++) {
       let u = -1;
       let minVal = INF;
       for (let i = 0; i < n; i++) {
          if (!visited.has(i) && dist[i] < minVal) {
             minVal = dist[i];
             u = i;
          }
       }

       if (u === -1) break; 

       const vSet = new Set(visited);
       vSet.add(u);
       visited = vSet; 
       
       newSteps.push({ dist: [...dist], visited: vSet, active: u, log: `Select Min Dist Node: ${VARIANTS[u].short} (${minVal})` });

       let madeChanges = false;
       matrix[u].forEach((w, v) => {
          if (w < INF && !visited.has(v)) {
             if (dist[u] + w < dist[v]) {
                dist[v] = parseFloat((dist[u] + w).toFixed(2));
                madeChanges = true;
             }
          }
       });
       if(madeChanges) {
          newSteps.push({ dist: [...dist], visited: vSet, active: u, log: `Relax neighbors of ${VARIANTS[u].short}. Updated distances.` });
       }
    }
    newSteps.push({ dist: [...dist], visited: visited, active: null, log: "Algorithm Complete" });
    setSteps(newSteps);
    setCurrentStep(0);
  }, [startNode, matrix]);

  useEffect(() => {
    let interval;
    if (isRunning && currentStep < steps.length - 1) {
      interval = setInterval(() => setCurrentStep(c => c + 1), 1000);
    } else {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentStep, steps.length]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [currentStep]);

  const state = steps[currentStep] || { dist: Array(6).fill(INF), visited: new Set(), active: null, log: '' };

  return (
    <div className="h-[600px] w-full flex flex-col bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
       <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <Zap size={16} className="text-yellow-400" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Dijkstra's Algorithm</span>
             </div>
             <div className="h-4 w-[1px] bg-slate-700"></div>
             <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Source:</span>
                <select value={startNode} onChange={e => { setStartNode(Number(e.target.value)); setIsRunning(false); setCurrentStep(0); }} disabled={isRunning} className="bg-slate-800 text-slate-200 text-xs rounded border border-slate-700 px-2 py-1 outline-none">
                   {VARIANTS.map(v => <option key={v.id} value={v.id}>{v.short}</option>)}
                </select>
             </div>
          </div>
          <AlgorithmControls 
            isRunning={isRunning} isComplete={currentStep === steps.length - 1}
            onPlay={() => setIsRunning(true)} onPause={() => setIsRunning(false)} 
            onStep={() => setCurrentStep(c => Math.min(c + 1, steps.length - 1))} 
            onReset={() => { setIsRunning(false); setCurrentStep(0); }} 
          />
       </div>

       <div className="flex-1 flex overflow-hidden">
          <div className="w-4/12 bg-slate-950 flex flex-col border-r border-slate-800">
             <div className="p-4 border-b border-slate-800 flex-1 overflow-auto">
               <pre className="text-xs font-mono text-slate-400 leading-relaxed">
{`// Dijkstra
dist[src] = 0; PQ.push(0, src);
while (!Q.empty()) {
  u = PQ.pop();
  if (visited[u]) continue;
  visited[u] = true;
  for (v : adj[u]) {
    if (dist[u] + w < dist[v]) {
      dist[v] = dist[u] + w;
      PQ.push(dist[v], v);
    }
  }
}`}
               </pre>
               <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Time Complexity</span><span className="text-slate-300">O(E log V)</span></div>
                  <div className="flex justify-between text-xs text-slate-500"><span>Space Complexity</span><span className="text-slate-300">O(V)</span></div>
               </div>
             </div>
             <div className="h-40 bg-black p-4 font-mono flex flex-col">
                <div className="flex items-center gap-2 text-slate-500 mb-2 border-b border-slate-800 pb-1"><Terminal size={12} /> <span className="text-[10px] font-bold uppercase">Trace</span></div>
                <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                   {steps.slice(0, currentStep + 1).map((s, i) => (
                     <div key={i} className={`text-xs ${i === currentStep ? 'text-white font-bold' : 'text-slate-500'}`}>
                        <span className="text-yellow-500 mr-2">➜</span> {s.log}
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="flex-1 bg-slate-900 relative">
             <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             {VARIANTS.map((node) => {
                const isActive = state.active === node.id;
                const isVisited = state.visited.has(node.id);
                const d = state.dist[node.id];
                let color = "bg-slate-800 border-slate-600 text-slate-500";
                if (isActive) color = "bg-yellow-900/80 border-yellow-500 text-yellow-100 scale-110 shadow-[0_0_20px_rgba(234,179,8,0.4)]";
                else if (isVisited) color = "bg-indigo-900/40 border-indigo-500/50 text-indigo-200";

                return (
                   <div key={node.id} className={`absolute w-20 h-20 -ml-10 -mt-10 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-500 ${color}`} style={{ left: node.x + 100, top: node.y + 100 }}>
                      <span className="text-xs font-bold">{node.short}</span>
                      <span className="text-[10px] font-mono mt-1 px-1 bg-black/40 rounded">{d >= INF ? '∞' : d}</span>
                   </div>
                );
             })}
             <svg className="absolute inset-0 w-full h-full pointer-events-none">
               <defs>
                 <marker id="arrow-dijkstra" markerWidth="10" markerHeight="7" refX="22" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#64748b" /></marker>
               </defs>
               {matrix.map((row, i) => row.map((w, j) => {
                  if (w < INF && i !== j) {
                     return (
                        <g key={`${i}-${j}`}>
                           <line x1={VARIANTS[i].x + 100} y1={VARIANTS[i].y + 100} x2={VARIANTS[j].x + 100} y2={VARIANTS[j].y + 100} stroke="#475569" strokeWidth="1" markerEnd="url(#arrow-dijkstra)" />
                           <text x={(VARIANTS[i].x + VARIANTS[j].x)/2 + 100} y={(VARIANTS[i].y + VARIANTS[j].y)/2 + 100} className="text-[9px] fill-slate-500" textAnchor="middle">{w}</text>
                        </g>
                     );
                  }
                  return null;
               }))}
             </svg>
          </div>
       </div>
    </div>
  );
};

const HashingModule = () => {
  const [table, setTable] = useState(Array(10).fill(null));
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([]);
  const [activeIdx, setActiveIdx] = useState(null);
  const TABLE_SIZE = 10;

  const hash = (key) => {
    let sum = 0;
    for(let i=0; i<key.length; i++) sum += key.charCodeAt(i);
    return sum % TABLE_SIZE;
  };

  const insert = async () => {
    if(!input) return;
    const key = input.toUpperCase();
    setInput("");
    const idx = hash(key);
    setActiveIdx(idx);
    setLogs(prev => [...prev, `Hashing "${key}": sum(chars) % 10 = ${idx}`]);
     
    let curr = idx;
    let attempts = 0;
    while(table[curr] !== null && attempts < TABLE_SIZE) {
       setLogs(prev => [...prev, `Collision at index ${curr}. Probing next...`]);
       await new Promise(r => setTimeout(r, 500));
       curr = (curr + 1) % TABLE_SIZE;
       setActiveIdx(curr);
       attempts++;
    }

    if(attempts < TABLE_SIZE) {
       const newTable = [...table];
       newTable[curr] = key;
       setTable(newTable);
       setLogs(prev => [...prev, `Inserted "${key}" at index ${curr}`]);
    } else {
       setLogs(prev => [...prev, `Table full. Cannot insert "${key}"`]);
    }
    setTimeout(() => setActiveIdx(null), 1000);
  };

  return (
    <div className="h-[600px] w-full flex flex-col bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
       <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Hash size={16} className="text-pink-400" />
             <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Hash Table (Linear Probing)</span>
          </div>
          <div className="flex gap-2 items-center">
             <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Gene (e.g. ATCG)" className="bg-slate-800 text-white text-xs px-2 py-1 rounded border border-slate-700 outline-none w-40 uppercase" maxLength={5} />
             <button onClick={insert} className="px-3 py-1 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded">Insert</button>
             <button onClick={() => { setTable(Array(10).fill(null)); setLogs([]); }} className="p-1 bg-slate-700 rounded text-white"><RotateCcw size={14}/></button>
          </div>
       </div>

       <div className="flex-1 flex flex-col p-8 items-center justify-center bg-slate-900 relative">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div className="flex gap-2 relative z-10">
             {table.map((val, i) => (
                <div key={i} className={`flex flex-col items-center gap-2 transition-all duration-300 ${activeIdx === i ? 'scale-110' : ''}`}>
                   <div className="text-xs text-slate-500 font-mono">{i}</div>
                   <div className={`w-16 h-24 border-2 rounded-lg flex items-center justify-center text-sm font-bold shadow-lg transition-colors ${activeIdx === i ? 'border-pink-500 bg-pink-900/20 text-pink-200' : val ? 'border-slate-600 bg-slate-800 text-white' : 'border-slate-700 bg-slate-900/50 text-transparent'}`}>{val || '-'}</div>
                </div>
             ))}
          </div>
          <div className="mt-12 w-full max-w-2xl bg-black rounded-lg p-4 font-mono text-xs text-slate-400 border border-slate-800 h-32 overflow-y-auto custom-scrollbar">
             {logs.length === 0 && <span>Waiting for input...</span>}
             {logs.map((l, i) => <div key={i} className="text-pink-200/80">{'>>'} {l}</div>)}
          </div>
       </div>
    </div>
  );
};

const ReferenceView = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
       {/* Algorithms Section Header */}
       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-2">Core Algorithmic Modules</h2>
          <p className="text-blue-100 opacity-90 max-w-2xl">This platform visualizes complex graph theory and data structure algorithms applied to biological sequence modeling. Below is a complete reference of the computational methods used.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400"><Network size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Breadth-First Search (BFS)</h3><p className="text-xs text-slate-500">O(V + E) Time • O(V) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">A graph traversal algorithm that explores nodes level by level using a queue. It ensures all neighbors at the current depth are processed before moving deeper.</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Identifies immediate genetic associations (1st-degree connections) within the mutation network.</p></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400"><Network size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Depth-First Search (DFS)</h3><p className="text-xs text-slate-500">O(V + E) Time • O(V) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">A traversal algorithm that explores as far as possible along each branch before backtracking, using a stack-based or recursive approach.</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Traces deep influence chains and discovers all reachable variant entities from a starting node.</p></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400"><Zap size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Dijkstra’s Algorithm</h3><p className="text-xs text-slate-500">O(E + V log V) Time • O(V) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">A shortest-path algorithm for weighted graphs that incrementally relaxes edges using a priority-based selection process.</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Computes minimum-cost mutation or transition paths between genetic variants.</p></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400"><Layers size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Kruskal’s Algorithm</h3><p className="text-xs text-slate-500">O(E log E) Time • O(V) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">A minimum spanning tree algorithm that sorts edges by weight and uses cycle detection (Union-Find) to connect components efficiently.</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Constructs optimal connection graphs with minimum total evolutionary cost.</p></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400"><Hash size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Hashing (Hash Map)</h3><p className="text-xs text-slate-500">O(1) Avg Time • O(N) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">A data structure that maps keys to values using a hash function for near-constant-time access.</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Used for fast lookups, indexing gene sequences, and state tracking across modules.</p></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400"><Sigma size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Floyd-Warshall Algorithm</h3><p className="text-xs text-slate-500">O(V³) Time • O(V²) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">A dynamic programming algorithm for finding shortest paths in a weighted graph with positive or negative edge weights (but no negative cycles).</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Core engine for All-Pairs Shortest Path analysis in the main dashboard.</p></div>
          </div>
       </div>

       {/* Data Structures Section Header */}
       <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl mt-12">
          <h2 className="text-3xl font-bold mb-2">Internal Data Structures</h2>
          <p className="text-emerald-100 opacity-90 max-w-2xl">Foundational structures that enable efficient data storage, retrieval, and manipulation within the system.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"><Grid size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Arrays</h3><p className="text-xs text-slate-500">O(1) Access • O(n) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">A contiguous memory structure used to store indexed collections of data efficiently. Arrays provide constant-time access and form the foundation for matrix-based representations.</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Used for adjacency matrices, algorithm state snapshots, execution logs, and global state management.</p></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"><List size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Dynamic Lists</h3><p className="text-xs text-slate-500">O(1) Amortized Insertion • O(n) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">Resizable collections implemented using JavaScript arrays, allowing flexible growth and dynamic updates during execution.</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Used to store nodes, edges, traversal paths, queues, and intermediate algorithm results.</p></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"><Box size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Objects / Structures</h3><p className="text-xs text-slate-500">O(1) Avg Lookup • O(n) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">Key–value data structures used to group related attributes into a single logical unit.</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Used to model graph nodes, variant metadata, configuration parameters, and runtime states.</p></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"><Layers size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Stack</h3><p className="text-xs text-slate-500">O(1) Push/Pop • O(n) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">A Last-In-First-Out (LIFO) data structure used to manage nested or recursive operations.</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Explicitly used in the DFS module to track traversal order and support backtracking behavior.</p></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"><ArrowRight size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Queue</h3><p className="text-xs text-slate-500">O(1) Enqueue/Dequeue • O(n) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">A First-In-First-Out (FIFO) data structure used for sequential processing of elements.</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Used in the BFS module to ensure level-by-level graph traversal.</p></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"><GitCommit size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Union-Find (Disjoint Set)</h3><p className="text-xs text-slate-500">Nearly O(1) • O(n) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">A specialized data structure that keeps track of disjoint sets and supports efficient merging and cycle detection.</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Implemented explicitly in the Kruskal module to detect cycles and merge components while constructing the Minimum Spanning Tree.</p></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300"><Search size={20} /></div>
                <div><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Lookup Table (Adjacency Matrix)</h3><p className="text-xs text-slate-500">O(1) Lookup • O(V²) Space</p></div>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">A matrix-based representation where each cell indicates connectivity or edge weight between nodes.</p>
             <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800"><span className="text-xs font-bold text-slate-500 uppercase tracking-wide">System Application</span><p className="text-xs text-slate-600 dark:text-slate-400 mt-1">The INITIAL_TOPOLOGY matrix acts as a lookup table for edge weights, reachability checks, and shortest-path computations.</p></div>
          </div>
       </div>

       <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-xs text-slate-400 flex items-start gap-3">
          <Info className="shrink-0 text-blue-400 mt-0.5" size={16} />
          <p>Note: Merge Sort and Quick Sort are utilized implicitly by the system via the JavaScript engine's native <code>Array.sort()</code> implementation (typically Timsort or QuickSort) for preprocessing steps such as edge sorting in Kruskal's Algorithm.</p>
       </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [algoSubTab, setAlgoSubTab] = useState('fw');
>>>>>>> Stashed changes
  const [startNode, setStartNode] = useState(0);
  const [endNode, setEndNode] = useState(5);
  const [adjMatrix, setAdjMatrix] = useState(() => INITIAL_TOPOLOGY.map(row => [...row]));
  const [path, setPath] = useState([]);
  const [cost, setCost] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
<<<<<<< Updated upstream
  // Theme State
  const [darkMode, setDarkMode] = useState(false);
  
  // Trace State
=======
  const [darkMode, setDarkMode] = useState(false);
  
>>>>>>> Stashed changes
  const [traceStep, setTraceStep] = useState(-1);
  const [traceLogs, setTraceLogs] = useState([]);
  const [traceMatrix, setTraceMatrix] = useState([]);
  const [highlightCells, setHighlightCells] = useState([]);

<<<<<<< Updated upstream
  // AI States
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Chat Bot State
=======
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  
>>>>>>> Stashed changes
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]); 
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); 
  
  const chatScrollRef = useRef(null);

  useEffect(() => {
<<<<<<< Updated upstream
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
=======
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [chatHistory, isChatLoading, isChatOpen]);

  // Sync traceMatrix with adjMatrix whenever adjMatrix changes, unless currently analyzing
  useEffect(() => {
    if (!isAnalyzing) {
      setTraceMatrix(adjMatrix.map(row => [...row]));
    }
  }, [adjMatrix, isAnalyzing]);
>>>>>>> Stashed changes

  const handleWeightChange = (from, to, value) => {
    // Allows clearing the input to type a new number
    if (value === "") {
        const newMatrix = adjMatrix.map(row => [...row]);
        newMatrix[from][to] = 0; // Default to 0 if cleared, allowing user to type fresh
        setAdjMatrix(newMatrix);
        if (cost !== null) resetAnalysis();
        return;
    }

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
<<<<<<< Updated upstream
    const pathContext = path.length > 0 ? `Current path: ${path.map(id => VARIANTS[id].name).join(" -> ")} cost ${cost}.` : "No path.";
    const prompt = `You are BioGen AI. Context: ${pathContext}. User: "${userMsg}". Answer concisely.`;
=======
    
    // Constructing a detailed context prompt for the AI
    const pathContext = `Current System State:
    - Active Tab: ${activeTab}
    - Selected Algorithm: ${activeTab === 'algorithms' ? algoSubTab : 'None (Dashboard)'}
    - Matrix Topology (Adjacency Matrix with Weights): ${JSON.stringify(adjMatrix)}
    - Current Optimal Path (if calculated): ${path.length > 0 ? path.map(id => VARIANTS[id].name).join(" -> ") : "None"}
    - Total Path Cost: ${cost}
    - User Question: "${userMsg}"`;

    const systemInstruction = `You are BioGen Assistant, an advanced genetic analysis AI.
    Your goal is to explain the biological simulation and algorithmic logic to the user.
    CRITICAL: Provide your response in PLAIN TEXT only. Do NOT use Markdown (no bold **, no headers ##, no code blocks).
    If the user asks about the current state, use the provided Context.
    If the user asks about an algorithm (like DFS, Dijkstra), explain how it processes the current mutation graph.
    Keep answers helpful, accurate, and professional.
    Disclaimer: This is a simulation tool for educational/research purposes.`;

    const prompt = `${systemInstruction}\n\n${pathContext}`;
    
>>>>>>> Stashed changes
    const response = await callGemini(prompt);
    setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    setIsChatLoading(false);
  };

  const handleAnalyze = () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
<<<<<<< Updated upstream
    // Switch to algorithms tab to see trace, or analysis tab? 
    // Let's keep it in background or switch user to Analysis tab to see result.
    // For now, let's reset artifacts.
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            // Optionally switch tab to Analysis when done
            // setActiveTab('analysis'); 
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      
      {/* Inline Styles */}
=======
>>>>>>> Stashed changes
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
      `}</style>

<<<<<<< Updated upstream
      {/* --- HEADER --- */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-30">
=======
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-30 sticky top-0">
>>>>>>> Stashed changes
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
          
<<<<<<< Updated upstream
          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'config', label: 'Configuration', icon: Sliders },
              { id: 'analysis', label: 'Analysis', icon: Activity },
              { id: 'algorithms', label: 'Algorithms', icon: Cpu },
=======
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'algorithms', label: 'Algorithms', icon: Cpu },
              { id: 'reference', label: 'Reference', icon: Book },
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 pb-32">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* ROW 1: LIVE ANIMATION */}
            <DnaHelix variants={VARIANTS} />
            
            {/* ROW 2: GRAPH AND REPORT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">
               {/* Main Graph Panel */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-1 shadow-sm overflow-hidden h-[500px] relative flex flex-col">
                 {/* Graph Header/Status Bar */}
                 <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="px-2 py-1 rounded-md bg-white/80 dark:bg-slate-800/80 backdrop-blur text-[10px] font-bold text-slate-500 border border-slate-200 dark:border-slate-700 shadow-sm">
                       Network Topology
                    </span>
                    {path.length > 0 && (
                       <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20 shadow-sm animate-in fade-in">
                          Optimal Path Visualized
                       </span>
                    )}
                 </div>

                 {/* Background Decoration */}
                 <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50 z-0">
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                 </div>

                 {/* Graph Centering Wrapper */}
                 <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                   <div className="relative w-[650px] h-[300px] pointer-events-auto">
                      <svg className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-sm overflow-visible">
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
>>>>>>> Stashed changes
                 </div>
              </div>

              {/* Results Side Panel */}
<<<<<<< Updated upstream
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
=======
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-[500px] flex flex-col relative overflow-hidden">
                <div className="flex-shrink-0 mb-4 flex items-center justify-between">
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <FileText size={14} /> Analysis Report
                   </h3>
                   {isAnalyzing && <Loader2 size={16} className="text-blue-500 animate-spin" />}
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                   {cost !== null ? (
                     <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                       <div className="flex items-baseline justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                          <div>
                            <span className="text-xs text-slate-500 block mb-1">Total Fitness Cost</span>
                            <span className="text-4xl font-black text-slate-800 dark:text-slate-100">{cost}</span>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${parseFloat(cost) < 5 ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                            {parseFloat(cost) < 5 ? 'High Risk' : 'Stable'}
                          </div>
                       </div>

                       <div>
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
                            <button onClick={() => generateAIInsight(cost, path)} disabled={isAiLoading} className="w-full py-2 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
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
                        <p className="text-sm">Run a simulation below to view results</p>
                     </div>
                   )}
                </div>
              </div>
            </div>

            {/* ROW 3: INPUTS AND PARAMETERS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Parameters Panel */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
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
                      onClick={() => { handleAnalyze(); }}
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
                        <><MonitorPlay size={20} fill="currentColor" /> Run Simulation & View Analysis</>
                      )}
                    </button>
                  </div>
              </div>

              {/* Context Panel */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <Microscope className="text-blue-500" /> Simulation Context
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  This application simulates evolutionary pathways for the <strong className="text-slate-800 dark:text-slate-200">gyrA gene</strong> (DNA gyrase subunit A), a primary target for fluoroquinolone resistance in bacteria. The model utilizes a weighted directed graph to represent fitness costs associated with specific nucleotide polymorphisms.
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                    <Activity size={14} className="text-emerald-500" /> Live Model Active
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                    <Network size={14} className="text-blue-500" /> 6 Variants Loaded
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                    <BrainCircuit size={14} className="text-purple-500" /> AI Engine Ready
                  </div>
                </div>
              </div>
>>>>>>> Stashed changes
            </div>
          </div>
        )}

<<<<<<< Updated upstream
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
=======
        {/* Removed Analysis View as it is now merged into Dashboard */}

        {activeTab === 'algorithms' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-1 overflow-x-auto">
               {[
                 { id: 'fw', label: 'Floyd-Warshall' },
                 { id: 'bfs', label: 'BFS' },
                 { id: 'dfs', label: 'DFS' },
                 { id: 'dijkstra', label: 'Dijkstra' },
                 { id: 'kruskal', label: 'Kruskal MST' },
                 { id: 'hashing', label: 'Hashing' },
               ].map(tab => (
                 <button 
                   key={tab.id}
                   onClick={() => setAlgoSubTab(tab.id)}
                   className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${algoSubTab === tab.id ? 'text-blue-600 border-blue-600 bg-blue-50/50 dark:bg-slate-800 dark:text-blue-400' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
                 >
                   {tab.label}
>>>>>>> Stashed changes
                 </button>
               ))}
            </div>

<<<<<<< Updated upstream
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
=======
            {algoSubTab === 'fw' && <FloydWarshallModule matrix={traceMatrix} step={traceStep} logs={traceLogs} highlightCells={highlightCells} />}
            {algoSubTab === 'bfs' && <TraversalModule type="bfs" startNode={startNode} setStartNode={setStartNode} matrix={adjMatrix} />}
            {algoSubTab === 'dfs' && <TraversalModule type="dfs" startNode={startNode} setStartNode={setStartNode} matrix={adjMatrix} />}
            {algoSubTab === 'dijkstra' && <DijkstraModule startNode={startNode} setStartNode={setStartNode} matrix={adjMatrix} />}
            {algoSubTab === 'kruskal' && <KruskalModule matrix={adjMatrix} />}
            {algoSubTab === 'hashing' && <HashingModule />}
          </div>
        )}

        {activeTab === 'reference' && <ReferenceView />}

      </main>

      {/* Chat Bot Interface (Kept as is) */}
>>>>>>> Stashed changes
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
