import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  Cpu, 
  Zap, 
  Image as ImageIcon, 
  Sparkles, 
  Eye, 
  RefreshCw, 
  Binary, 
  Info,
  Network,
  GitBranch
} from "lucide-react";
import { SimulatorType } from "../types";

export default function ArchitectureSimulators() {
  const [activeSim, setActiveSim] = useState<SimulatorType>("autoregressive");

  const simulators = [
    {
      id: "autoregressive" as SimulatorType,
      name: "Autorregressivo",
      description: "Visualização do modelo GPT prevendo as próximas palavras.",
      icon: Cpu,
      color: "from-blue-600 to-indigo-600"
    },
    {
      id: "diffusion" as SimulatorType,
      name: "Difusão",
      description: "Redução de ruído aleatório em imagens coerentes.",
      icon: ImageIcon,
      color: "from-emerald-600 to-teal-600"
    },
    {
      id: "gan" as SimulatorType,
      name: "GANs (Adversárias)",
      description: "O duelo competitivo entre o Gerador e o Discriminador.",
      icon: Network,
      color: "from-purple-600 to-pink-600"
    },
    {
      id: "vae" as SimulatorType,
      name: "VAEs (Espaço Latente)",
      description: "Compressão e reconstrução de dados em um mapa contínuo.",
      icon: GitBranch,
      color: "from-amber-600 to-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Selector */}
      <div className="lg:col-span-1 space-y-3">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/15 border border-slate-200/70 dark:border-slate-800/70 shadow-sm">
          <h3 className="font-sans font-semibold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pulse" />
            Escolha um Simulador
          </h3>
          <div className="space-y-1">
            {simulators.map((sim) => {
              const Icon = sim.icon;
              const isActive = activeSim === sim.id;
              return (
                <button
                  key={sim.id}
                  id={`sim-tab-${sim.id}`}
                  onClick={() => setActiveSim(sim.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
                    isActive 
                      ? "bg-white dark:bg-slate-850 shadow-md border-l-4 border-indigo-600 dark:border-indigo-400 text-slate-900 dark:text-white" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${isActive ? "bg-indigo-600 text-white" : "bg-slate-200/50 dark:bg-slate-800 text-slate-500"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm block">{sim.name}</span>
                    <span className="text-xxs text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">{sim.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Context Helper */}
        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30">
          <div className="flex gap-2.5 text-indigo-700 dark:text-indigo-300">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <div className="text-xs space-y-1.5">
              <span className="font-semibold block">Didática Visual</span>
              <p className="leading-relaxed">
                Estes laboratórios interativos demonstram de forma prática a matemática e a teoria explicadas no artigo. Brinque com os parâmetros para ver os efeitos em tempo real!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Workspace */}
      <div className="lg:col-span-3 min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSim}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full"
          >
            {activeSim === "autoregressive" && <AutoregressiveSimulator />}
            {activeSim === "diffusion" && <DiffusionSimulator />}
            {activeSim === "gan" && <GanSimulator />}
            {activeSim === "vae" && <VaeSimulator />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// 1. AUTOREGRESSIVE SIMULATOR
function AutoregressiveSimulator() {
  const [prompt, setPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);
  const [currentToken, setCurrentToken] = useState("");
  const [candidates, setCandidates] = useState<{ word: string; prob: number }[]>([]);
  const [tokenStep, setTokenStep] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const prompts = [
    {
      title: "Modelos Generativos",
      text: "Os modelos de IA generativa são redes neurais que aprendem a criar"
    },
    {
      title: "Automação DevOps",
      text: "Engenheiros de DevOps usam ferramentas de IA para otimizar fluxos de"
    },
    {
      title: "Código Seguro",
      text: "O desenvolvimento de software moderno integra IA generativa para sugerir"
    }
  ];

  const candidateDictionary: Record<string, { word: string; prob: number }[][]> = {
    "Os modelos de IA generativa são redes neurais que aprendem a criar": [
      [
        { word: "conteúdos", prob: 0.65 },
        { word: "sistemas", prob: 0.20 },
        { word: "imagens", prob: 0.15 }
      ],
      [
        { word: "originais", prob: 0.55 },
        { word: "realistas", prob: 0.30 },
        { word: "automatizados", prob: 0.15 }
      ],
      [
        { word: "baseados", prob: 0.70 },
        { word: "produzidos", prob: 0.20 },
        { word: "extraídos", prob: 0.10 }
      ],
      [
        { word: "em", prob: 0.90 },
        { word: "por", prob: 0.08 },
        { word: "sobre", prob: 0.02 }
      ],
      [
        { word: "padrões", prob: 0.60 },
        { word: "dados", prob: 0.30 },
        { word: "exemplos", prob: 0.10 }
      ],
      [
        { word: "aprendidos.", prob: 0.85 },
        { word: "reais.", prob: 0.10 },
        { word: "estatísticos.", prob: 0.05 }
      ]
    ],
    "Engenheiros de DevOps usam ferramentas de IA para otimizar fluxos de": [
      [
        { word: "trabalho", prob: 0.50 },
        { word: "desenvolvimento", prob: 0.35 },
        { word: "integração", prob: 0.15 }
      ],
      [
        { word: "contínua", prob: 0.80 },
        { word: "automatizados", prob: 0.15 },
        { word: "de DevOps", prob: 0.05 }
      ],
      [
        { word: "e", prob: 0.95 },
        { word: "com", prob: 0.04 },
        { word: "para", prob: 0.01 }
      ],
      [
        { word: "entrega", prob: 0.75 },
        { word: "implantação", prob: 0.20 },
        { word: "liberação", prob: 0.05 }
      ],
      [
        { word: "automatizada.", prob: 0.60 },
        { word: "veloz.", prob: 0.25 },
        { word: "segura.", prob: 0.15 }
      ]
    ],
    "O desenvolvimento de software moderno integra IA generativa para sugerir": [
      [
        { word: "trechos", prob: 0.45 },
        { word: "funções", prob: 0.35 },
        { word: "soluções", prob: 0.20 }
      ],
      [
        { word: "de", prob: 0.90 },
        { word: "completas", prob: 0.07 },
        { word: "complexas", prob: 0.03 }
      ],
      [
        { word: "código", prob: 0.85 },
        { word: "configuração", prob: 0.10 },
        { word: "automação", prob: 0.05 }
      ],
      [
        { word: "funcionais", prob: 0.50 },
        { word: "seguros", prob: 0.30 },
        { word: "otimizados", prob: 0.20 }
      ],
      [
        { word: "e", prob: 0.88 },
        { word: "que", prob: 0.10 },
        { word: "rapidamente.", prob: 0.02 }
      ],
      [
        { word: "corrigir", prob: 0.60 },
        { word: "testar", prob: 0.25 },
        { word: "otimizar", prob: 0.15 }
      ],
      [
        { word: "erros.", prob: 0.75 },
        { word: "sistemas.", prob: 0.15 },
        { word: "falhas.", prob: 0.10 }
      ]
    ]
  };

  const handleSelectPrompt = (text: string) => {
    setPrompt(text);
    setGeneratedTokens([]);
    setCandidates([]);
    setTokenStep(0);
    setIsGenerating(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const startGeneration = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGeneratedTokens([]);
    setTokenStep(0);
    generateNextTokenStep(0, prompt);
  };

  const generateNextTokenStep = (step: number, initialText: string) => {
    const sequence = candidateDictionary[initialText];
    if (!sequence || step >= sequence.length) {
      setIsGenerating(false);
      return;
    }

    // Get candidate words for current step
    const rawCandidates = sequence[step];

    // Apply temperature adjustment to probabilities:
    // Low temperature concentrates probability, high temperature spreads it.
    let adjustedCandidates = rawCandidates.map(c => {
      // Simple temperature math: exponentiate by 1/temp
      const tempFactor = temperature === 0 ? 100 : 1 / temperature;
      const adjustedProb = Math.pow(c.prob, tempFactor);
      return { ...c, prob: adjustedProb };
    });

    // Re-normalize probabilities
    const sum = adjustedCandidates.reduce((acc, curr) => acc + curr.prob, 0);
    adjustedCandidates = adjustedCandidates.map(c => ({
      ...c,
      prob: Math.round((c.prob / sum) * 100) / 100
    })).sort((a, b) => b.prob - a.prob);

    setCandidates(adjustedCandidates);
    setTokenStep(step);

    // Show candidates first, then "choose" one based on probabilities after a short pause
    timeoutRef.current = setTimeout(() => {
      // Simple probabilistic selection
      const rand = Math.random();
      let cumulative = 0;
      let chosen = adjustedCandidates[0]; // fallback
      
      for (const cand of adjustedCandidates) {
        cumulative += cand.prob;
        if (rand <= cumulative) {
          chosen = cand;
          break;
        }
      }

      setCurrentToken(chosen.word);
      setGeneratedTokens(prev => [...prev, chosen.word]);

      // Move to next step
      timeoutRef.current = setTimeout(() => {
        setCurrentToken("");
        generateNextTokenStep(step + 1, initialText);
      }, 900);
    }, 1200);
  };

  const stopGeneration = () => {
    setIsGenerating(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const resetGeneration = () => {
    stopGeneration();
    setGeneratedTokens([]);
    setCandidates([]);
    setTokenStep(0);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/10 dark:from-slate-900 dark:to-indigo-950/5 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl shadow-md p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="font-sans font-bold text-lg text-slate-900 dark:text-white">
              Modelo Autorregressivo
            </h2>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-mono text-xxs font-bold uppercase tracking-wider">
            Ex: GPT / LLM
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
          Modelos autorregressivos geram conteúdo prevendo o <strong>próximo elemento (token)</strong> de uma sequência com base nas palavras anteriores. Ajuste a Temperatura para ver como o modelo escolhe entre os candidatos.
        </p>

        {/* Temperature slider */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl mb-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Sliders className="w-4 h-4" />
              <span className="text-xs font-semibold">Temperatura</span>
            </div>
            <span className="font-mono text-xs font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
              {temperature.toFixed(1)}
            </span>
          </div>
          <input
            id="temp-slider"
            type="range"
            min="0.1"
            max="1.5"
            step="0.1"
            value={temperature}
            disabled={isGenerating}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer disabled:opacity-50"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>Baixa (Previsível/Determinística)</span>
            <span>Alta (Criativa/Aleatória)</span>
          </div>
        </div>

        {/* Presets */}
        <div className="mb-5">
          <span className="text-xxs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">
            Selecione uma Frase Inicial (Prompt)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                id={`preset-prompt-${idx}`}
                disabled={isGenerating}
                onClick={() => handleSelectPrompt(p.text)}
                className={`p-3 text-left rounded-xl border transition-all text-xs cursor-pointer disabled:opacity-60 ${
                  prompt === p.text 
                    ? "border-blue-600 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/20 text-slate-900 dark:text-white font-medium" 
                    : "border-slate-200 dark:border-slate-800 bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">{p.title}</span>
                <span className="line-clamp-2 text-slate-500 dark:text-slate-400 leading-snug">{p.text}...</span>
              </button>
            ))}
          </div>
        </div>

        {/* Workspace Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          {/* Main output box */}
          <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 min-h-[160px] flex flex-col justify-between">
            <div className="text-xs md:text-sm font-sans leading-relaxed">
              <span className="text-slate-400 dark:text-slate-500 italic">Prompt: </span>
              <span className="text-slate-900 dark:text-slate-100 font-medium">{prompt || "Escolha um prompt acima..."}</span>
              {" "}
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {generatedTokens.map((w, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block mr-1.5"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
              {currentToken && (
                <motion.span
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="inline-block w-2.5 h-4 bg-blue-600 dark:bg-blue-400 ml-1 mt-0.5 align-middle"
                />
              )}
            </div>
            
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80 pt-3 mt-4 text-[10px] text-slate-400 font-mono">
              <span>Tokens: {prompt ? prompt.split(" ").length + generatedTokens.length : 0}</span>
              <span>Status: {isGenerating ? "Processando..." : generatedTokens.length > 0 ? "Concluído" : "Aguardando"}</span>
            </div>
          </div>

          {/* Probabilities Box */}
          <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex flex-col justify-between">
            <div>
              <span className="text-xxs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-3">
                Distribuição de Probabilidades do Token
              </span>
              
              <div className="space-y-2.5 min-h-[100px]">
                {candidates.length > 0 ? (
                  candidates.map((c, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={`font-medium ${i === 0 ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-600 dark:text-slate-400"}`}>
                          "{c.word}"
                        </span>
                        <span className="text-slate-500">{(c.prob * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${c.prob * 100}%` }}
                          transition={{ duration: 0.4 }}
                          className={`h-full rounded-full ${i === 0 ? "bg-blue-500" : "bg-slate-400"}`}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-center text-xs text-slate-400 dark:text-slate-500 py-6 italic">
                    Inicie a geração para visualizar o cálculo estatístico das palavras.
                  </div>
                )}
              </div>
            </div>

            <div className="text-[9px] text-slate-400 text-right font-mono mt-2">
              Equação: P(w_t | w_1, ..., w_{`{t-1}`})
            </div>
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-autoregressive-reset"
          onClick={resetGeneration}
          className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reiniciar
        </button>

        {isGenerating ? (
          <button
            id="btn-autoregressive-stop"
            onClick={stopGeneration}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Pause className="w-3.5 h-3.5" />
            Parar
          </button>
        ) : (
          <button
            id="btn-autoregressive-start"
            disabled={!prompt}
            onClick={startGeneration}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            <Play className="w-3.5 h-3.5" />
            Começar Previsão
          </button>
        )}
      </div>
    </div>
  );
}

// 2. DIFFUSION SIMULATOR
function DiffusionSimulator() {
  const [selectedTarget, setSelectedTarget] = useState<"server" | "robot" | "dna">("server");
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const targets = {
    server: {
      name: "Servidor DevOps",
      description: "Visualização de infraestrutura de nuvem, IA e pipelines de entrega contínua.",
      code: "CloudInfrastructureConfig"
    },
    robot: {
      name: "Tutor Assistente",
      description: "Um simpático androide projetado para suporte automatizado.",
      code: "AndroidInteractiveSystem"
    },
    dna: {
      name: "Molécula Médica",
      description: "Modelagem molecular tridimensional para acelerar a descoberta de fármacos.",
      code: "MolecularCompoundAnalysis"
    }
  };

  const startDiffusion = () => {
    setIsPlaying(true);
    runStepLoop(step >= 20 ? 0 : step);
  };

  const runStepLoop = (currentStep: number) => {
    setStep(currentStep);
    if (currentStep >= 20) {
      setIsPlaying(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      runStepLoop(currentStep + 1);
    }, 200);
  };

  const stopDiffusion = () => {
    setIsPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const resetDiffusion = () => {
    stopDiffusion();
    setStep(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-emerald-50/10 dark:from-slate-900 dark:to-emerald-950/5 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl shadow-md p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-sans font-bold text-lg text-slate-900 dark:text-white">
              Modelo de Difusão
            </h2>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-mono text-xxs font-bold uppercase tracking-wider">
            Ex: DALL-E / Midjourney
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
          Modelos de difusão geram conteúdo removendo gradualmente o <strong>ruído gaussiano aleatório</strong> ao longo de múltiplas etapas, revelando formas e detalhes consistentes guiados por um texto.
        </p>

        {/* Target selection */}
        <div className="mb-6">
          <span className="text-xxs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2.5">
            Selecione o Conceito da Imagem
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {(Object.keys(targets) as Array<keyof typeof targets>).map((t) => (
              <button
                key={t}
                id={`target-diff-${t}`}
                disabled={isPlaying}
                onClick={() => { setSelectedTarget(t); setStep(0); }}
                className={`p-3 text-left rounded-xl border transition-all text-xs cursor-pointer disabled:opacity-60 ${
                  selectedTarget === t 
                    ? "border-emerald-600 dark:border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-900 dark:text-white font-medium" 
                    : "border-slate-200 dark:border-slate-800 bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span className="font-bold block mb-0.5">{targets[t].name}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{targets[t].description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Slider control */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl mb-6 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Etapa de Remoção de Ruído</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
              Etapa {step} / 20
            </span>
          </div>
          <input
            id="diff-slider"
            type="range"
            min="0"
            max="20"
            step="1"
            value={step}
            disabled={isPlaying}
            onChange={(e) => setStep(parseInt(e.target.value))}
            className="w-full accent-emerald-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer disabled:opacity-50"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>Etapa 0 (100% Ruído)</span>
            <span>Etapa 20 (Coerência Limpa)</span>
          </div>
        </div>

        {/* Dynamic Image / Noise Canvas */}
        <div className="w-full flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
          
          {/* Noise Screen container */}
          <div className="relative w-44 h-44 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner">
            
            {/* The Target Vector Graphic - Opacity increases with Step */}
            <div 
              style={{ opacity: step / 20 }}
              className="absolute inset-0 flex items-center justify-center p-6 text-emerald-400 transition-opacity duration-200"
            >
              {selectedTarget === "server" && (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
                  <Cpu className="w-16 h-16 text-emerald-500 animate-pulse" />
                  <div className="font-mono text-[9px] text-emerald-400 tracking-wider font-bold bg-emerald-950/80 px-2 py-0.5 border border-emerald-800/50 rounded uppercase">
                    DEPLOY: ONLINE
                  </div>
                </div>
              )}
              {selectedTarget === "robot" && (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
                  <Sparkles className="w-16 h-16 text-emerald-400 animate-bounce" />
                  <div className="font-mono text-[9px] text-emerald-400 tracking-wider font-bold bg-emerald-950/80 px-2 py-0.5 border border-emerald-800/50 rounded uppercase">
                    TUTOR_ACTIVE
                  </div>
                </div>
              )}
              {selectedTarget === "dna" && (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
                  <Zap className="w-16 h-16 text-emerald-500" />
                  <div className="font-mono text-[9px] text-emerald-400 tracking-wider font-bold bg-emerald-950/80 px-2 py-0.5 border border-emerald-800/50 rounded uppercase">
                    DRUG_DESIGN_OK
                  </div>
                </div>
              )}
            </div>

            {/* The Noise Layer - Opacity decreases as Step increases */}
            <div 
              style={{ opacity: 1 - (step / 20) }}
              className="absolute inset-0 bg-slate-950 pointer-events-none transition-opacity duration-200"
            >
              {/* Simple dynamic noise grid */}
              <div className="w-full h-full grid grid-cols-12 grid-rows-12">
                {Array.from({ length: 144 }).map((_, i) => {
                  // Random colors or shades of gray depending on step
                  const randomGray = Math.floor(Math.random() * 255);
                  const noiseStyle = {
                    backgroundColor: `rgb(${randomGray}, ${randomGray + (step * 5)}, ${randomGray + (step * 8)})`
                  };
                  return <div key={i} style={noiseStyle} className="w-full h-full opacity-60" />;
                })}
              </div>
            </div>

            {/* Scanning border */}
            {isPlaying && (
              <div className="absolute w-full h-0.5 bg-emerald-400 shadow-md top-0 left-0 animate-bounce" />
            )}
          </div>

          {/* Denoising Progress logs */}
          <div className="flex-1 space-y-3 font-mono text-xxs w-full">
            <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-200 dark:border-slate-800">
              <span>Métrica</span>
              <span>Valor Atual</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Ruído residual:</span>
              <span className="text-slate-700 dark:text-slate-300 font-bold">{(100 - (step * 5))}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Coerência estrutural:</span>
              <span className="text-slate-700 dark:text-slate-300 font-bold">{(step * 5)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Parâmetro de variância:</span>
              <span className="text-slate-700 dark:text-slate-300 font-bold">{(1 / (step || 1)).toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status do Denoising:</span>
              <span className={`font-bold ${step === 20 ? "text-emerald-500" : "text-amber-500 animate-pulse"}`}>
                {step === 0 ? "TOTAL_NOISE" : step === 20 ? "CLEAN_IMAGE_OK" : "DENOISING_IN_PROGRESS"}
              </span>
            </div>

            <div className="p-2.5 bg-slate-900/5 text-[10px] border border-slate-200/50 dark:border-slate-800 text-slate-500 rounded-lg leading-relaxed font-sans">
              <strong>Matemática da Difusão:</strong> Em cada etapa, o modelo calcula o vetor de erro de ruído ε e o subtrai da imagem para revelar a distribuição final limpa.
            </div>
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-diffusion-reset"
          onClick={resetDiffusion}
          className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reiniciar
        </button>

        {isPlaying ? (
          <button
            id="btn-diffusion-stop"
            onClick={stopDiffusion}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Pause className="w-3.5 h-3.5" />
            Pausar
          </button>
        ) : (
          <button
            id="btn-diffusion-start"
            onClick={startDiffusion}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            Remover Ruído Automático
          </button>
        )}
      </div>
    </div>
  );
}

// 3. GAN SIMULATOR
function GanSimulator() {
  const [epoch, setEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [generatorQuality, setGeneratorQuality] = useState(10); // Starts low (noisy)
  const [discriminatorAcc, setDiscriminatorAcc] = useState(95); // Starts high (easy to tell fake)
  const [duelLog, setDuelLog] = useState<string[]>(["Redes neurais instanciadas. Pronto para duelarem."]);
  const [activeTab, setActiveTab] = useState<"code" | "image">("code");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Training steps simulation
  const startTraining = () => {
    setIsTraining(true);
    trainStepLoop(epoch >= 100 ? 0 : epoch);
  };

  const trainStepLoop = (currentEpoch: number) => {
    setEpoch(currentEpoch);

    if (currentEpoch >= 100) {
      setIsTraining(false);
      setDuelLog(prev => ["Duelo Estabilizado (Equilíbrio de Nash alcançado). O Gerador cria dados perfeitos; o Discriminator apenas chuta (50% de acerto).", ...prev]);
      return;
    }

    // Generator improves quality over epochs
    const nextQuality = Math.min(10 + currentEpoch * 0.9, 98);
    // Discriminator gets confused as generator gets better, drops to 50% equilibrium
    const nextAcc = Math.max(95 - currentEpoch * 0.45, 50);

    setGeneratorQuality(Math.round(nextQuality));
    setDiscriminatorAcc(Math.round(nextAcc));

    // Append beautiful, educational logs at specific intervals
    if (currentEpoch % 15 === 0 && currentEpoch > 0) {
      const logs = [
        `[Época ${currentEpoch}] Gerador aprendeu novas estruturas de código.`,
        `[Época ${currentEpoch}] Discriminador atualizou seus gradientes de verificação.`,
        `[Época ${currentEpoch}] Qualidade sintética subiu para ${Math.round(nextQuality)}%!`,
        `[Época ${currentEpoch}] Precisão do classificador caiu devido à alta fidelidade.`
      ];
      const selectedLog = logs[Math.floor(Math.random() * logs.length)];
      setDuelLog(prev => [selectedLog, ...prev.slice(0, 15)]);
    }

    timerRef.current = setTimeout(() => {
      trainStepLoop(currentEpoch + 1);
    }, 100);
  };

  const stopTraining = () => {
    setIsTraining(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const resetTraining = () => {
    stopTraining();
    setEpoch(0);
    setGeneratorQuality(10);
    setDiscriminatorAcc(95);
    setDuelLog(["Redes redefinidas. Aguardando comando de treinamento adversarial."]);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Helper code visualization depending on epoch
  const getSyntheticData = () => {
    if (generatorQuality < 30) {
      return "const x = #$@!*&;\nsystem.deploy_error()\n<<<<<<< HEADING\n// [ruído aleatório]";
    }
    if (generatorQuality < 60) {
      return "const deployConfig = {\n  port: 3000,\n  env: 'procude_error',\n  cluster: null\n};";
    }
    if (generatorQuality < 85) {
      return "import { deploy } from 'production';\nconst config = {\n  port: 3000,\n  host: '0.0.0.0',\n  ssl: true\n};\ndeploy(config);";
    }
    return "import express from 'express';\nconst app = express();\nconst PORT = 3000;\napp.listen(PORT, '0.0.0.0', () => {\n  console.log('Server live');\n});";
  };

  const getRealData = () => {
    return "import express from 'express';\nconst app = express();\nconst PORT = 3000;\napp.listen(PORT, '0.0.0.0', () => {\n  console.log('Server live');\n});";
  };

  return (
    <div className="bg-gradient-to-br from-white to-purple-50/10 dark:from-slate-900 dark:to-purple-950/5 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl shadow-md p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h2 className="font-sans font-bold text-lg text-slate-900 dark:text-white">
              Redes Adversárias Generativas (GANs)
            </h2>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-mono text-xxs font-bold uppercase tracking-wider">
            Ex: StyleGAN / CycleGAN
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
          GANs colocam <strong>duas redes neurais para competir</strong>: o Gerador cria arquivos sintéticos para imitar os reais, enquanto o Discriminador os avalia. O treino aprimora ambos até um equilíbrio mútuo de Nash.
        </p>

        {/* Real-time statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-850/30">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Época Competitiva</span>
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white block mt-0.5">
              {epoch} / 100
            </span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-850/30">
            <span className="text-[10px] text-purple-500 font-bold uppercase">Qualidade do Gerador</span>
            <span className="font-mono text-lg font-bold text-purple-600 dark:text-purple-400 block mt-0.5">
              {generatorQuality}%
            </span>
          </div>
          <div className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-850/30">
            <span className="text-[10px] text-rose-500 font-bold uppercase">Precisão do Discriminador</span>
            <span className="font-mono text-lg font-bold text-rose-600 dark:text-rose-400 block mt-0.5">
              {discriminatorAcc}%
            </span>
          </div>
        </div>

        {/* The Duel Arena */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          
          {/* Box Generator Side */}
          <div className="p-4 rounded-2xl border border-purple-100 dark:border-purple-950/40 bg-purple-50/10 dark:bg-purple-950/5 flex flex-col justify-between min-h-[150px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Gerador (Generator)
                </span>
                <span className="text-xxs font-mono text-slate-400">Criando Dados Falsos</span>
              </div>
              <pre className="p-3 bg-slate-950 text-emerald-400 font-mono text-[10px] rounded-lg overflow-x-auto h-24 whitespace-pre border border-slate-800">
                <code>{getSyntheticData()}</code>
              </pre>
            </div>
            <div className="text-[10px] text-slate-400 mt-2">
              Meta: Gerar código que passe pelo Discriminador como Real.
            </div>
          </div>

          {/* Box Discriminator Side */}
          <div className="p-4 rounded-2xl border border-rose-100 dark:border-rose-950/40 bg-rose-50/10 dark:bg-rose-950/5 flex flex-col justify-between min-h-[150px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  Discriminador (Discriminator)
                </span>
                <span className="text-xxs font-mono text-slate-400">Classificando Realidade</span>
              </div>
              <div className="space-y-2 p-3 bg-slate-950 rounded-lg border border-slate-800 h-24 flex flex-col justify-center font-mono text-[10px]">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Chance de ser Código Real:</span>
                  <span className={`${discriminatorAcc > 70 ? "text-rose-400" : "text-emerald-400"} font-bold`}>
                    {discriminatorAcc}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Chance de ser Cópia Falsa:</span>
                  <span className="text-purple-400 font-bold">{(100 - discriminatorAcc)}%</span>
                </div>
                <div className="text-center pt-1.5 border-t border-slate-800 text-[9px] text-slate-500">
                  Veredito: {discriminatorAcc > 60 ? "REJEITADO_FALSO" : "APROVADO_PARCIAL_REAL"}
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 mt-2">
              Meta: Aprender a discernir entre dados reais e sintéticos.
            </div>
          </div>

        </div>

        {/* Real-time training logs */}
        <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 max-h-[85px] overflow-y-auto font-mono text-[10px] text-slate-500">
          {duelLog.map((log, i) => (
            <div key={i} className={`${i === 0 ? "text-purple-600 dark:text-purple-400 font-bold" : ""} border-b border-slate-100 dark:border-slate-900 py-1 last:border-0`}>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-gan-reset"
          onClick={resetTraining}
          className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reiniciar Duelo
        </button>

        {isTraining ? (
          <button
            id="btn-gan-stop"
            onClick={stopTraining}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Pause className="w-3.5 h-3.5" />
            Pausar Treino
          </button>
        ) : (
          <button
            id="btn-gan-start"
            onClick={startTraining}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            Treinar Adversarial
          </button>
        )}
      </div>
    </div>
  );
}

// 4. VAE SIMULATOR
function VaeSimulator() {
  const [compressRatio, setCompressRatio] = useState(50); // Sliders represent coordinates in latent space
  const [coordX, setCoordX] = useState(0); // Complexity slider
  const [coordY, setCoordY] = useState(0); // Structure slider

  // Reconstruction formulas
  const getReconstruction = () => {
    // Dynamically outputs mock text based on latents
    const structureVal = coordY > 0 ? "Express/Fastify API Gateway" : "CI/CD Deployment Script";
    const complexityVal = coordX > 0 ? "with SSL + TLS clustering, auto-scaling rules, and CloudSQL monitoring metrics." : "using custom lightweight static deployment steps.";
    return `// Reconstruído do Espaço Latente (z)\nimport { system } from 'cloud';\n\nexport const gateway = "${structureVal}";\n// Características: ${complexityVal}`;
  };

  return (
    <div className="bg-gradient-to-br from-white to-amber-50/10 dark:from-slate-900 dark:to-amber-950/5 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl shadow-md p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h2 className="font-sans font-bold text-lg text-slate-900 dark:text-white">
              Autocodificadores Variacionais (VAEs)
            </h2>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-mono text-xxs font-bold uppercase tracking-wider">
            Ex: Beta-VAE / NVAE
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
          VAEs comprimem dados de alta dimensão em um <strong>espaço latente contínuo e probabilístico (z)</strong>, e depois decodificam de volta. Mova os sliders para explorar diferentes regiões deste mapa suave!
        </p>

        {/* Latent Space 2D Playground */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          
          {/* Coordinate Sliders */}
          <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-4">
            <span className="text-xxs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Coordenadas de Compressão do Espaço Latente (z)
            </span>

            {/* Slider X */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Dimensão Latente X (Complexidade)</span>
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                  {coordX > 0 ? `+${coordX}` : coordX}
                </span>
              </div>
              <input
                id="vae-slider-x"
                type="range"
                min="-10"
                max="10"
                step="1"
                value={coordX}
                onChange={(e) => setCoordX(parseInt(e.target.value))}
                className="w-full accent-amber-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>Leve (Estático)</span>
                <span>Pesado (Complexo)</span>
              </div>
            </div>

            {/* Slider Y */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Dimensão Latente Y (Função)</span>
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                  {coordY > 0 ? `+${coordY}` : coordY}
                </span>
              </div>
              <input
                id="vae-slider-y"
                type="range"
                min="-10"
                max="10"
                step="1"
                value={coordY}
                onChange={(e) => setCoordY(parseInt(e.target.value))}
                className="w-full accent-amber-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>Pipeline CI/CD</span>
                <span>API Gateway</span>
              </div>
            </div>

            {/* 2D Grid Visualizer */}
            <div className="h-28 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute w-full h-0.5 bg-slate-300 dark:bg-slate-800" />
              <div className="absolute h-full w-0.5 bg-slate-300 dark:bg-slate-800" />
              
              {/* Floating crosshair representing (X, Y) coordinate */}
              <div 
                style={{ 
                  left: `${50 + (coordX * 4.5)}%`, 
                  top: `${50 - (coordY * 4.5)}%` 
                }}
                className="absolute w-4 h-4 bg-amber-500 rounded-full border-2 border-white dark:border-slate-950 -translate-x-1/2 -translate-y-1/2 shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>

              <span className="absolute bottom-1 right-2 text-[8px] font-mono text-slate-400 uppercase">
                Espaço Contínuo z
              </span>
            </div>
          </div>

          {/* Reconstruction output block */}
          <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex flex-col justify-between min-h-[200px]">
            <div>
              <span className="text-xxs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2.5">
                Saída Reconstruída do Decodificador (Decoder)
              </span>
              <pre className="p-3 bg-slate-950 text-amber-400 font-mono text-[10px] rounded-lg overflow-x-auto h-32 whitespace-pre border border-slate-800 leading-normal">
                <code>{getReconstruction()}</code>
              </pre>
            </div>

            <div className="space-y-1 mt-2.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Margem de perda (Loss):</span>
                <span>{(0.05 + Math.abs(coordX * 0.01)).toFixed(4)}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${Math.min(100, 100 - (0.05 + Math.abs(coordX * 0.01)) * 100)}%` }}
                  className="h-full bg-amber-500" 
                />
              </div>
            </div>
          </div>

        </div>

        <div className="p-3 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-900/20 text-[11px] text-amber-800 dark:text-amber-300 rounded-xl leading-relaxed">
          <strong>Por que VAEs são contínuos?</strong> Diferente dos autocodificadores simples que criam pontos discretos, o VAE força o espaço latente a seguir uma distribuição Gaussiana padrão. Isso permite blends suaves e sem falhas!
        </div>
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          id="btn-vae-reset"
          onClick={() => { setCoordX(0); setCoordY(0); }}
          className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Centralizar Coordenadas
        </button>
      </div>
    </div>
  );
}
