import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Cpu, 
  Award, 
  Bot, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  HelpCircle,
  FolderLock,
  Globe,
  Database
} from "lucide-react";
import { ActiveTab } from "./types";
import ArticleReader from "./components/ArticleReader";
import ArchitectureSimulators from "./components/ArchitectureSimulators";
import InteractiveQuiz from "./components/InteractiveQuiz";
import AiTutor from "./components/AiTutor";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("reader");

  const tabs = [
    { id: "reader" as ActiveTab, name: "Artigo Completo", icon: BookOpen, count: "10 Seções" },
    { id: "simulators" as ActiveTab, name: "Lab de Simuladores", icon: Cpu, count: "4 Interativos" },
    { id: "quiz" as ActiveTab, name: "Quiz & Certificado", icon: Award, count: "5 Desafios" },
    { id: "tutor" as ActiveTab, name: "Tutor Especialista", icon: Bot, count: "Gemini AI" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans antialiased text-slate-800 dark:text-slate-200">
      
      {/* GLOBAL BANNER/NAVIGATION RAIL */}
      <nav className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-md">
              <Sparkles className="w-4 h-4 animate-spin [animation-duration:8s]" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-sm text-slate-900 dark:text-white tracking-tight block">
                Portal de IA Generativa
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-wider uppercase font-bold">
                Módulo Educacional v1.1
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-mono text-[10px] font-semibold">
              <Layers className="w-3 h-3" />
              Deep Learning
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-100/50 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 font-mono text-[10px] font-semibold">
              <Award className="w-3 h-3" />
              Certificado Disponível
            </span>
          </div>
        </div>
      </nav>

      {/* HERO BENTO GRID SECTION */}
      <header className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-5">
          {/* Main Info Bento Card */}
          <div className="col-span-12 lg:col-span-8 bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/15 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl p-6 md:p-8 text-left shadow-sm flex flex-col justify-between relative overflow-hidden">
            {/* Ambient blur background */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="relative space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 text-xxs font-bold uppercase tracking-wider">
                  <Globe className="w-3 h-3 text-indigo-500" />
                  Capacitação Tecnológica
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold uppercase">
                  v1.1
                </span>
              </div>

              <h1 className="font-sans font-extrabold text-2xl md:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight">
                Guia Completo de <br className="hidden sm:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500">
                  Modelos de IA Generativa
                </span>
              </h1>

              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                Explore de forma imersiva e prática o funcionamento interno de GANs, VAEs, Difusão e Modelos Autorregressivos. Teste seu conhecimento em tempo real, use o tutor especialista e receba seu certificado de conclusão.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-slate-150 dark:border-slate-800/60 pt-4 mt-6 text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-mono font-medium">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Leitura: 8 minutos
              </span>
              <span>•</span>
              <span>Emitido em: 2 de junho de 2025</span>
              <span>•</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase">Acesso Gratuito</span>
            </div>
          </div>

          {/* Metric Status Bento Card */}
          <div className="col-span-12 lg:col-span-4 bg-indigo-600 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
            {/* Glowing pattern ornament */}
            <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-white/10 rounded-full filter blur-xl pointer-events-none" />
            <div className="absolute -top-16 -left-16 w-36 h-36 bg-indigo-400/20 rounded-full filter blur-lg pointer-events-none" />

            <div className="relative">
              <div className="text-indigo-100 font-bold tracking-wider text-xxs uppercase mb-2 flex items-center gap-1.5">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Adoção Global Corporativa
              </div>
              <div className="text-5xl md:text-6xl font-black italic tracking-tighter text-white">
                +85%
              </div>
            </div>

            <div className="relative mt-6 space-y-3">
              <p className="text-[11px] md:text-xs text-indigo-100 leading-relaxed font-sans font-medium">
                Das principais organizações de engenharia planejam incorporar IA Generativa e LLMs em seus fluxos de trabalho de DevOps e CI/CD até o final de 2026.
              </p>
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-emerald-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TAB NAVIGATION AREA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-slate-200/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-2 rounded-2xl flex flex-wrap gap-1.5 md:flex-row max-w-3xl mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive 
                    ? "bg-white dark:bg-slate-800 shadow-md text-slate-950 dark:text-white scale-[1.02]" 
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-350 hover:bg-white/20 dark:hover:bg-slate-800/30"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                <span className="block truncate">{tab.name}</span>
                <span className="hidden md:inline-block text-[10px] opacity-50 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* CORE WORKSPACE SCREEN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === "reader" && <ArticleReader />}
            {activeTab === "simulators" && <ArchitectureSimulators />}
            {activeTab === "quiz" && <InteractiveQuiz />}
            {activeTab === "tutor" && <AiTutor />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* RELATED RESOURCES GRID FOOTER ( faithful to article bottom section ) */}
      <footer className="border-t border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/60 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 mb-8 border-b border-slate-150 dark:border-slate-800">
            <div className="space-y-1">
              <span className="text-xxs font-bold text-slate-400 uppercase tracking-widest block">
                Expandindo Fronteiras
              </span>
              <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">
                Explore outros recursos sugeridos
              </h3>
            </div>
            <span className="text-xs text-slate-400 italic mt-2 md:mt-0">
              Aprofunde seu conhecimento em Inteligência Artificial
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Resource A */}
            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 bg-white/50 dark:bg-transparent flex flex-col justify-between space-y-4 transition-all group">
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 w-10 h-10 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Compreender o Aprendizado de Máquina
                </h4>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Veja como o aprendizado de máquina (Machine Learning) é utilizado de forma prática na otimização de fluxos de DevOps e desenvolvimento.
                </p>
              </div>
              <button 
                onClick={() => { setActiveTab("simulators"); }}
                className="text-xxs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 cursor-pointer"
              >
                Abrir Simuladores
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Resource B */}
            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 bg-white/50 dark:bg-transparent flex flex-col justify-between space-y-4 transition-all group">
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 w-10 h-10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Processamento de Linguagem Natural
                </h4>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Saiba o que é processamento de linguagem natural (PLN) e por que ele está se tornando uma tecnologia essencial para criar assistentes de alto nível.
                </p>
              </div>
              <button 
                onClick={() => { setActiveTab("tutor"); }}
                className="text-xxs font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
              >
                Conversar com o Tutor
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Resource C */}
            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 bg-white/50 dark:bg-transparent flex flex-col justify-between space-y-4 transition-all group">
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 w-10 h-10 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Geração Aumentada por Recuperação (RAG)
                </h4>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Aprimore o desenvolvimento de software e entregue respostas corporativas contextuais acoplando bancos de dados de vetores com LLMs.
                </p>
              </div>
              <button 
                onClick={() => { setActiveTab("reader"); }}
                className="text-xxs font-bold text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 cursor-pointer"
              >
                Voltar para Leitura
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

          <div className="mt-14 pt-6 border-t border-slate-150 dark:border-slate-850 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono">
            <span>© 2026 Guia de Modelos de IA Generativa • Capacitação e Tecnologia</span>
            <span>Local Time: {new Date().toLocaleDateString("pt-BR")}</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
