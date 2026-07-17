import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Settings, 
  Bookmark, 
  CheckCircle, 
  Type, 
  Sliders, 
  Menu, 
  Copy, 
  Share2,
  Trash2,
  BookmarkCheck,
  Award
} from "lucide-react";
import { ReadingPreferences, Highlight } from "../types";

export default function ArticleReader() {
  const [preferences, setPreferences] = useState<ReadingPreferences>({
    fontSize: "md",
    theme: "light",
    lineSpacing: "relaxed"
  });

  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // Initialize bookmarks from local storage
  useEffect(() => {
    const saved = localStorage.getItem("genai_reader_bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleBookmark = (sectionId: string) => {
    let updated;
    if (bookmarks.includes(sectionId)) {
      updated = bookmarks.filter(id => id !== sectionId);
    } else {
      updated = [...bookmarks, sectionId];
    }
    setBookmarks(updated);
    localStorage.setItem("genai_reader_bookmarks", JSON.stringify(updated));
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem("genai_reader_bookmarks");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2000);
  };

  const sections = [
    {
      id: "compreendendo",
      title: "Compreendendo os modelos de IA generativa",
      content: (
        <p>
          Modelos de IA generativa são sistemas de IA projetados para criar novos conteúdos que se assemelham a dados existentes. Enquanto os modelos de IA tradicionais se especializam na classificação e análise de informações, os modelos de IA generativa criam resultados originais com base em padrões aprendidos a partir de dados de treinamento. Esses resultados podem incluir texto, imagens, música e código.
        </p>
      )
    },
    {
      id: "101",
      title: "Modelos generativos 101",
      content: (
        <div className="space-y-4">
          <p>
            Utilizando arquiteturas de aprendizagem profunda chamadas redes neurais, os modelos de IA generativa criam conteúdo realista e coerente. Eles aprendem processando grandes quantidades de dados e reconhecendo padrões, estruturas e relações dentro desses dados.
          </p>
          <p>
            Uma vez treinados, esses modelos geram novo conteúdo prevendo o resultado mais provável com base nos padrões que aprenderam. Por exemplo, um modelo de IA generativa treinado em repositórios de código pode gerar fragmentos de código funcionais, prevendo sequências e estruturas lógicas.
          </p>
        </div>
      )
    },
    {
      id: "caracteristicas",
      title: "Principais características dos modelos de IA generativa",
      content: (
        <div className="space-y-3">
          <p>Os modelos de IA generativa diferem de outros modelos de IA em alguns aspectos importantes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Criatividade:</strong> eles criam novo conteúdo em vez de simplesmente analisar e categorizar dados.</li>
            <li><strong>Reconhecimento de padrões:</strong> eles identificam padrões complexos em grandes conjuntos de dados para produzir resultados coerentes.</li>
            <li><strong>Versatilidade:</strong> eles atuam em diversos domínios, incluindo geração de texto, criação de imagens, síntese de áudio e desenvolvimento de software.</li>
          </ul>
          <p className="mt-4">
            Os modelos de IA generativa são especialmente valiosos para engenheiros de plataforma e DevOps que exploram a integração contínua e a entrega/implantação contínua (CI/CD) automatizadas por IA, o gerenciamento inteligente de infraestrutura e o monitoramento preditivo de sistemas. Esses modelos podem gerar código, otimizar configurações e até mesmo antecipar potenciais problemas do sistema antes que aconteçam.
          </p>
        </div>
      )
    },
    {
      id: "tipos",
      title: "Tipos de modelos de IA generativa",
      content: (
        <div className="space-y-4">
          <p>Modelos de IA generativa têm várias formas, cada uma com arquiteturas e casos de uso exclusivos. Aqui estão alguns dos tipos mais comuns:</p>
          <div className="space-y-4 mt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
              <span className="font-bold text-xs font-mono text-indigo-600 dark:text-indigo-400 block mb-1">GANs</span>
              <h5 className="font-semibold text-sm text-slate-900 dark:text-white mb-1.5">Redes adversárias generativas</h5>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                As GANs usam duas redes neurais, uma geradora e uma discriminadora, para competir uma com a outra. A função da geradora é criar novos dados, enquanto a discriminadora é responsável por avaliar a autenticidade desses dados. Esse processo adversário aprimora a capacidade do gerador de produzir conteúdo realista. Modelos populares incluem StyleGAN e CycleGAN.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
              <span className="font-bold text-xs font-mono text-emerald-600 dark:text-emerald-400 block mb-1">VAEs</span>
              <h5 className="font-semibold text-sm text-slate-900 dark:text-white mb-1.5">Autocodificadores variacionais</h5>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Os VAEs são modelos probabilísticos que codificam dados de entrada em uma representação compactada (espaço latente) e, em seguida, os decodificam para gerar conteúdo novo e similar. Eles são ótimos em produzir distribuições de dados suaves e contínuas, o que os torna eficazes para geração de imagens, áudio e outros dados complexos. Modelos populares incluem Beta-VAE e NVAE.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
              <span className="font-bold text-xs font-mono text-blue-600 dark:text-blue-400 block mb-1">AUTORREGRESSIVOS</span>
              <h5 className="font-semibold text-sm text-slate-900 dark:text-white mb-1.5">Modelos autorregressivos</h5>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Esses modelos criam dados prevendo o próximo elemento em uma sequência com base nos elementos anteriores. Eles são excelentes na geração de sequências coerentes de texto, música e outros dados ordenados. Modelos populares incluem GPT-3, GPT-4 e TransformerXL.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
              <span className="font-bold text-xs font-mono text-amber-600 dark:text-amber-400 block mb-1">DIFUSÃO</span>
              <h5 className="font-semibold text-sm text-slate-900 dark:text-white mb-1.5">Modelos de difusão</h5>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Esses modelos geram dados pela transformação gradual de ruído randômico em saídas coerentes através de uma série de etapas aprendidas. Eles ganharam popularidade pela criação de imagens de alta qualidade. Modelos populares incluem DALL·E 2 e Stable Diffusion.
              </p>
            </div>
          </div>
          <p className="text-xs italic text-slate-500 mt-2">
            A compreensão dos diferentes tipos de modelos de IA generativa ajuda os engenheiros de DevOps e de plataforma a escolher a arquitetura certa para tarefas como geração automatizada de código, monitoramento preditivo de sistemas e gerenciamento inteligente de infraestrutura.
          </p>
        </div>
      )
    },
    {
      id: "aplicacoes",
      title: "Aplicações de modelos de IA generativa no mundo real",
      content: (
        <div className="space-y-4">
          <p>Modelos de IA generativa impulsionam inovação e eficiência em todos os tipos de setores. Veja como diferentes áreas estão colocando esses sistemas para trabalhar:</p>
          <div className="space-y-3.5">
            <div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Serviços de saúde
              </h5>
              <p className="text-xs pl-3.5 text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                Auxilia na descoberta de drogas, ajudando a prever estruturas moleculares e simular interações. Isso acelera o desenvolvimento de novos medicamentos. Além disso, aprimora as imagens médicas para auxiliar no diagnóstico e apoia médicos na documentação de atendimentos com maior eficiência, reduzindo a carga administrativa.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Serviços financeiros
              </h5>
              <p className="text-xs pl-3.5 text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                Detecta atividades fraudulentas analisando padrões de transações e criando cenários simulados para identificar anomalias. Também dá suporte à avaliação e gestão de riscos, simulando diferentes cenários macroeconômicos e de portfólio para aprimorar a tomada de decisões corporativas.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Fabricação
              </h5>
              <p className="text-xs pl-3.5 text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                Otimiza o design de produtos, criando e testando múltiplas variações por meio de algoritmos generativos. Isso resulta em estruturas mais leves e eficientes. Auxilia também na manutenção preditiva, simulando o desempenho de equipamentos industriais para prever e mitigar falhas.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Governo
              </h5>
              <p className="text-xs pl-3.5 text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                Agências governamentais utilizam IA generativa para aprimorar serviços públicos, como a elaboração automatizada de relatórios estatísticos e a análise de grandes volumes de dados para formulação de políticas públicas. Também apoia em cibersegurança, modelando potenciais vetores de ataque.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Desenvolvimento de software
              </h5>
              <p className="text-xs pl-3.5 text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                A IA generativa é um divisor de águas no desenvolvimento de software porque automatiza a geração de código, o que reduz significativamente o esforço de codificação. Ferramentas como o GitHub Copilot sugerem trechos e funções completas, aumentando drasticamente a velocidade e a qualidade do software.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "como-funcionam",
      title: "Como funcionam os modelos de IA generativa",
      content: (
        <div className="space-y-4">
          <p>Como mencionado anteriormente, os modelos de IA generativa dependem de redes neurais complexas para aprender padrões a partir de vastos conjuntos de dados para produzir conteúdo novo e realista. O processo de treinamento é crucial para o seu desempenho.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <h6 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1.5">Processo de treinamento</h6>
              <p className="text-xxs md:text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Envolve alimentar o modelo com grandes conjuntos de dados para ajudá-lo a aprender os padrões estatísticos e estruturas subjacentes. Conjuntos de dados diversificados e de alta qualidade são essenciais. Dependendo da arquitetura, são utilizadas técnicas supervisionadas, não supervisionadas ou autossupervisionadas.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <h6 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1.5">Técnicas comuns</h6>
              <p className="text-xxs md:text-xs leading-relaxed text-slate-600 dark:text-slate-400 text-left">
                <strong>Treinamento adversarial:</strong> Usado em GANs, onde gerador e discriminador competem mutuamente.<br />
                <strong>Retropropagação (Backpropagation):</strong> Técnica central para o ajuste dos pesos e parâmetros neurais visando minimizar os erros de previsão.<br />
                <strong>Aprendizado por Reforço:</strong> Ajusta comportamentos de acordo com feedbacks.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "beneficios",
      title: "Benefícios e desafios dos modelos de IA generativa",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="text-xxs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Benefícios</span>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li><strong>Automação e eficiência:</strong> simplificar processos complexos, como refatoração e testes.</li>
                <li><strong>Criatividade aprimorada:</strong> gerar designs, composições e mídias de formas inovadoras.</li>
                <li><strong>Escalabilidade:</strong> produzir grandes volumes de dados sintéticos de alta qualidade.</li>
                <li><strong>Tomada de decisão:</strong> análises preditivas mais fundamentadas.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <span className="text-xxs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest block">Desafios</span>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li><strong>Questões éticas:</strong> preocupações com vazamento de dados, deepfakes e direitos autorais.</li>
                <li><strong>Custo computacional:</strong> requisitos pesados de hardware que impactam o meio ambiente.</li>
                <li><strong>Viés estatístico:</strong> dados de treino enviesados geram decisões e respostas tendenciosas.</li>
                <li><strong>Controle de qualidade:</strong> a necessidade de supervisão humana rigorosa das saídas geradas por IA.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "desenvolvimento",
      title: "Modelos de IA generativa no desenvolvimento de software",
      content: (
        <div className="space-y-4">
          <p>
            Modelos de IA generativa aceleram drasticamente os fluxos de trabalho de engenharia de software automatizando tarefas repetitivas e auxiliando com a resolução de problemas complexos. Eles são valiosos para engenheiros de DevOps e de plataforma focados em automação de CI/CD, gerenciamento inteligente de infraestrutura e monitoramento preditivo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/20 border border-slate-250/20">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">GitHub Copilot</span>
              <p className="text-xxs text-slate-500 leading-relaxed">
                Baseado no modelo Codex da OpenAI, auxilia os desenvolvedores gerando sugestões de código contextuais, completando funções inteiras em tempo real diretamente na IDE.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/20 border border-slate-250/20">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Azure OpenAI Service</span>
              <p className="text-xxs text-slate-500 leading-relaxed">
                Acesso aos modelos GPT da OpenAI através da infraestrutura de nuvem segura do Azure, oferecendo garantias empresariais de conformidade e isolamento de dados.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "dicas",
      title: "Dicas para a implementação de modelos de IA generativa",
      content: (
        <div className="space-y-3">
          <p>Para melhor incorporar modelos de IA generativa em seus fluxos de trabalho de desenvolvimento de software, considere as seguintes diretrizes:</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
            <div className="p-3 rounded-lg bg-indigo-50/20 dark:bg-indigo-950/10 border border-indigo-100/50 dark:border-indigo-900/10">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono text-xs block mb-1">01</span>
              <span className="font-semibold text-xs block mb-0.5 text-slate-800 dark:text-slate-250">Comece pequeno</span>
              <p className="text-[10px] text-slate-500">Inicie com tarefas focadas, como autocompletar código ou criar casos de teste automatizados.</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50/20 dark:bg-indigo-950/10 border border-indigo-100/50 dark:border-indigo-900/10">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono text-xs block mb-1">02</span>
              <span className="font-semibold text-xs block mb-0.5 text-slate-800 dark:text-slate-250">Modelos pré-treinados</span>
              <p className="text-[10px] text-slate-500">Use modelos existentes e faça ajuste fino (fine-tuning) com dados próprios para focar no seu negócio.</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50/20 dark:bg-indigo-950/10 border border-indigo-100/50 dark:border-indigo-900/10">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono text-xs block mb-1">03</span>
              <span className="font-semibold text-xs block mb-0.5 text-slate-800 dark:text-slate-250">Monitore saídas</span>
              <p className="text-[10px] text-slate-500">Avalie regularmente o desempenho e refine os prompts para melhorar a acurácia.</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50/20 dark:bg-indigo-950/10 border border-indigo-100/50 dark:border-indigo-900/10">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono text-xs block mb-1">04</span>
              <span className="font-semibold text-xs block mb-0.5 text-slate-800 dark:text-slate-250">Priorize a ética</span>
              <p className="text-[10px] text-slate-500">Garanta a auditoria humana e mitigue vieses para respeitar diretrizes de direitos autorais.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const getFontSizeClass = () => {
    switch (preferences.fontSize) {
      case "sm": return "text-xs md:text-sm";
      case "lg": return "text-base md:text-lg";
      case "xl": return "text-lg md:text-xl";
      default: return "text-sm md:text-base";
    }
  };

  const getLineSpacingClass = () => {
    switch (preferences.lineSpacing) {
      case "relaxed": return "leading-relaxed";
      case "loose": return "leading-loose";
      default: return "leading-normal";
    }
  };

  const getThemeClass = () => {
    switch (preferences.theme) {
      case "sepia": return "bg-gradient-to-br from-amber-50/80 to-orange-50/20 text-amber-950 dark:from-amber-950/35 dark:to-orange-950/10 dark:text-amber-100 border-amber-200/60 dark:border-amber-900/30 shadow-md";
      case "dark": return "bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 border-slate-800/80 shadow-lg";
      default: return "bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-950/40 text-slate-850 dark:text-slate-100 border-slate-200/80 dark:border-slate-800/80 shadow-md";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* LEFT COLUMN: Dynamic Table of Contents */}
      <div className="lg:col-span-1 space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/15 border border-slate-200/70 dark:border-slate-800/70 shadow-sm sticky top-24">
          <h3 className="font-sans font-semibold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pulse" />
            Índice de Leitura
          </h3>
          <div className="space-y-1">
            {sections.map((s, idx) => (
              <a
                key={s.id}
                href={`#sec-${s.id}`}
                className="block py-1.5 px-2.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-white transition-all text-left truncate"
              >
                <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 mr-1.5">
                  0{idx + 1}.
                </span>
                {s.title}
              </a>
            ))}
          </div>

          <div className="border-t border-slate-200/60 dark:border-slate-800/60 mt-4 pt-4 flex items-center justify-between">
            <button
              id="btn-toggle-preferences"
              onClick={() => setShowPreferences(!showPreferences)}
              className="flex items-center gap-1.5 text-xxs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              Preferências
            </button>
            <button
              id="btn-reader-share"
              onClick={handleShare}
              className="flex items-center gap-1 text-xxs font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              {shareToast ? "Copiado!" : "Compartilhar"}
            </button>
          </div>
        </div>

        {/* Saved Highlights List */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/35 to-orange-50/15 dark:from-amber-950/10 dark:to-orange-950/5 border border-amber-200/50 dark:border-amber-900/20 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xxs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" />
              Seções Salvas
            </span>
            {bookmarks.length > 0 && (
              <button
                id="btn-clear-bookmarks"
                onClick={clearAllBookmarks}
                className="text-[10px] text-rose-500 hover:text-rose-600 flex items-center gap-0.5 cursor-pointer font-bold"
              >
                <Trash2 className="w-3 h-3" />
                Limpar
              </button>
            )}
          </div>
          
          {bookmarks.length > 0 ? (
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
              {bookmarks.map(id => {
                const matched = sections.find(s => s.id === id);
                return matched ? (
                  <a
                    key={id}
                    href={`#sec-${id}`}
                    className="block p-2 bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/30 rounded-xl text-[11px] text-slate-700 dark:text-slate-300 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 hover:border-amber-300 dark:hover:border-amber-800 transition-all text-left truncate"
                  >
                    🔖 {matched.title}
                  </a>
                ) : null;
              })}
            </div>
          ) : (
            <div className="text-[10px] text-slate-400 dark:text-slate-500 italic py-2 leading-relaxed">
              Você não favoritou nenhuma seção ainda. Clique no marcador ao lado de cada cabeçalho para salvar e ler depois!
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: The Article Canvas */}
      <div className="lg:col-span-3 space-y-6">
        
        {/* Preference drawer if toggled */}
        {showPreferences && (
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Font size selectors */}
            <div className="space-y-1.5">
              <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Type className="w-3.5 h-3.5" />
                Tamanho da Fonte
              </span>
              <div className="flex gap-1">
                {(["sm", "md", "lg", "xl"] as const).map(size => (
                  <button
                    key={size}
                    id={`pref-size-${size}`}
                    onClick={() => setPreferences(prev => ({ ...prev, fontSize: size }))}
                    className={`flex-1 py-1 text-xxs font-mono rounded border uppercase cursor-pointer ${
                      preferences.fontSize === size 
                        ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-transparent" 
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-transparent"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Line spacing selectors */}
            <div className="space-y-1.5">
              <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" />
                Espaçamento
              </span>
              <div className="flex gap-1">
                {(["normal", "relaxed", "loose"] as const).map(spacing => (
                  <button
                    key={spacing}
                    id={`pref-spacing-${spacing}`}
                    onClick={() => setPreferences(prev => ({ ...prev, lineSpacing: spacing }))}
                    className={`flex-1 py-1 text-xxs font-mono rounded border uppercase cursor-pointer ${
                      preferences.lineSpacing === spacing 
                        ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-transparent" 
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-transparent"
                    }`}
                  >
                    {spacing}
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Mode Theme */}
            <div className="space-y-1.5">
              <span className="text-xxs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                Filtro de Tela
              </span>
              <div className="flex gap-1">
                {(["light", "sepia", "dark"] as const).map(mode => (
                  <button
                    key={mode}
                    id={`pref-theme-${mode}`}
                    onClick={() => setPreferences(prev => ({ ...prev, theme: mode }))}
                    className={`flex-1 py-1 text-xxs font-mono rounded border uppercase cursor-pointer ${
                      preferences.theme === mode 
                        ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-transparent" 
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-transparent"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* The Core Editorial Text Viewport */}
        <div className={`p-6 md:p-8 rounded-3xl border shadow-md transition-all ${getThemeClass()} ${getFontSizeClass()} ${getLineSpacingClass()}`}>
          
          {/* Article Editorial Header */}
          <div className="border-b border-slate-200/60 dark:border-slate-800/60 pb-6 mb-6">
            <span className="font-mono text-xxs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-1.5">
              Portal do Conhecimento
            </span>
            <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight leading-tight">
              O que são modelos de IA generativa?
            </h1>
            <div className="flex items-center gap-3 text-xxs text-slate-400 dark:text-slate-500 mt-3 font-medium">
              <span>Publicado em: 2 de junho de 2025</span>
              <span>•</span>
              <span>Tempo de Leitura: 8 minutos</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-3 font-medium">
              "Saiba como os modelos de IA generativa ajudam as empresas a alcançar o sucesso."
            </p>
          </div>

          {/* Render Sections with toggle bookmarks */}
          <div className="space-y-8 text-slate-700 dark:text-slate-300">
            {sections.map((s, idx) => {
              const isBookmarked = bookmarks.includes(s.id);
              return (
                <article key={s.id} id={`sec-${s.id}`} className="space-y-3 pt-4 border-t border-slate-100/50 dark:border-slate-850/20 first:border-t-0 first:pt-0">
                  <div className="flex items-center justify-between gap-4 group">
                    <h3 className="font-sans font-bold text-base md:text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                      <span className="text-xxs font-mono text-slate-400 font-normal">0{idx + 1}.</span>
                      {s.title}
                    </h3>
                    <button
                      id={`bookmark-btn-${s.id}`}
                      onClick={() => toggleBookmark(s.id)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isBookmarked 
                          ? "bg-amber-100 border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400" 
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                      }`}
                      title={isBookmarked ? "Remover dos bookmarks" : "Marcar seção para ler depois"}
                    >
                      <BookmarkCheck className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-600" : ""}`} />
                    </button>
                  </div>
                  <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
                    {s.content}
                  </div>
                </article>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
