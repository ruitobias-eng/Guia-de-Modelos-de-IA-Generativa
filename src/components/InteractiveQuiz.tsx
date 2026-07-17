import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Share2, 
  Calendar, 
  User, 
  Check, 
  Sliders,
  ChevronRight,
  Printer
} from "lucide-react";
import { QuizQuestion } from "../types";

export default function InteractiveQuiz() {
  const [userName, setUserName] = useState("");
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Qual é a principal diferença entre os modelos de IA generativa e os modelos de IA tradicionais?",
      options: [
        "Os modelos tradicionais criam novos dados do zero, enquanto os generativos apenas classificam e catalogam informações existentes.",
        "Os modelos generativos criam resultados originais (como texto, imagens e código) com base em padrões aprendidos, enquanto os tradicionais se especializam em classificar e analisar informações.",
        "Modelos generativos funcionam sem redes neurais artificiais, dependendo apenas de árvores de decisão simples.",
        "A IA tradicional cria dados probabilísticos, enquanto a IA generativa é 100% determinística e nunca comete erros estatísticos."
      ],
      correctAnswerIndex: 1,
      explanation: "Conforme detalhado no artigo, a IA tradicional foca em classificar, prever ou categorizar informações existentes. Já os modelos generativos identificam os padrões dos dados de treinamento para sintetizar conteúdos totalmente novos e coerentes."
    },
    {
      id: 2,
      question: "Como funciona a arquitetura das Redes Adversárias Generativas (GANs)?",
      options: [
        "Através de uma representação de dados compactada que é descompactada gradualmente para fins de análise estrutural.",
        "Prevendo sequencialmente a próxima palavra mais provável com base nos termos inseridos anteriormente na frase.",
        "Utilizando duas redes neurais (Geradora e Discriminadora) que competem entre si: uma cria dados sintéticos e a outra avalia a autenticidade deles.",
        "Revertendo gradualmente um processo de ruído estatístico puro em dados geométricos estáveis."
      ],
      correctAnswerIndex: 2,
      explanation: "As GANs operam em um cenário competitivo de teoria dos jogos (Duelo Adversarial). O Gerador se esforça para enganar o Discriminador criando cópias sintéticas idênticas ao conjunto real, elevando gradualmente a qualidade de ambos."
    },
    {
      id: 3,
      question: "Qual classe de modelo generativo é famosa por transformar progressivamente ruído aleatório em imagens altamente realistas?",
      options: [
        "Autocodificadores Variacionais (VAEs)",
        "Modelos de Difusão",
        "Modelos Autorregressivos",
        "Redes Neurais Convolucionais Simples"
      ],
      correctAnswerIndex: 1,
      explanation: "Os Modelos de Difusão (como Stable Diffusion e DALL-E) operam injetando ruído gaussiano sistemático nos dados de treinamento e aprendendo a reverter esse processo passo a passo, extraindo imagens limpas e detalhadas a partir de estática pura."
    },
    {
      id: 4,
      question: "No campo de DevOps e engenharia de plataforma, como os modelos de IA generativa podem ser aplicados de forma prática?",
      options: [
        "Apenas atuando como ferramentas de conversa informal para as equipes durante reuniões presenciais.",
        "Substituindo completamente todos os servidores físicos e eliminando a necessidade de roteamento IP.",
        "Automatizando pipelines de CI/CD, auxiliando no gerenciamento inteligente de infraestrutura e realizando monitoramento preditivo para antecipar falhas de sistemas.",
        "Bloqueando acessos de rede e compilando binários legados sem suporte a empacotamento contêiner."
      ],
      correctAnswerIndex: 2,
      explanation: "A IA generativa no DevOps ajuda a criar templates de infraestrutura como código (IaC), configurar pipelines, simular cargas extremas e antecipar incidentes de indisponibilidade com base em telemetrias de sistemas."
    },
    {
      id: 5,
      question: "Qual é a recomendação ética e operacional fundamental ao implementar modelos de IA generativa?",
      options: [
        "Substituir totalmente a revisão humana, pois os modelos de IA generativa são imparciais e infalíveis por definição.",
        "Utilizar apenas dados sensíveis e não criptografados dos clientes para maximizar a precisão do modelo.",
        "Manter supervisão humana, revisando e validando as saídas para garantir que sejam precisas, imparciais e alinhadas aos objetivos e princípios éticos.",
        "Utilizar as saídas das ferramentas criativas imediatamente em produção, sem testes prévios de conformidade ou segurança."
      ],
      correctAnswerIndex: 2,
      explanation: "O artigo ressalta que o controle de qualidade e a supervisão humana são indispensáveis. Profissionais especializados devem auditar o código e as decisões recomendadas pela IA para mitigar vieses, alucinações e quebras de conformidade."
    }
  ];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswerIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIdx === null || isAnswered) return;
    setIsAnswered(true);
    if (selectedAnswerIdx === quizQuestions[currentQuestionIdx].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIdx(null);
    setIsAnswered(false);
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  // If name is not yet submitted, ask for their name to personalize the certificate
  if (!isNameSubmitted) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-white to-indigo-50/20 dark:from-slate-900 dark:to-indigo-950/10 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl shadow-md p-8 text-center my-6">
        <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
          <Award className="w-8 h-8" />
        </div>
        
        <h2 className="font-sans font-bold text-xl text-slate-900 dark:text-white mb-2">
          Avalie seu Conhecimento
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Teste sua compreensão sobre o artigo e ganhe um <strong>Certificado de Aproveitamento</strong> exclusivo ao concluir o quiz! Insira seu nome completo abaixo.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); if (userName.trim()) setIsNameSubmitted(true); }} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="quiz-user-name"
              type="text"
              required
              placeholder="Seu nome completo"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-sans text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent transition-all"
            />
          </div>

          <button
            id="btn-submit-name"
            type="submit"
            disabled={!userName.trim()}
            className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-3 rounded-xl font-semibold text-sm hover:bg-slate-850 dark:hover:bg-white transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Começar o Quiz
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    );
  }

  // Certificate Render upon finishing
  if (quizFinished) {
    const today = new Date().toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    
    const percentage = Math.round((score / quizQuestions.length) * 100);

    return (
      <div className="space-y-6 my-6">
        {/* Certificate Display Screen */}
        <div className="bg-gradient-to-br from-white to-indigo-50/15 dark:from-slate-900 dark:to-indigo-950/5 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl shadow-md p-8 max-w-2xl mx-auto overflow-hidden">
          
          <div className="text-center pb-6 border-b border-slate-100 dark:border-slate-800/60">
            <h3 className="text-emerald-500 font-bold text-lg flex items-center justify-center gap-1.5 mb-2">
              <CheckCircle className="w-5 h-5" />
              Quiz Concluído!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Você acertou <strong>{score} de {quizQuestions.length}</strong> questões ({percentage}% de acertos).
            </p>
          </div>

          {/* Golden Certificate Frame */}
          <div id="certificate-print-area" className="my-8 p-6 md:p-10 rounded-2xl border-4 border-double border-amber-400/80 bg-amber-50/15 dark:bg-amber-950/5 relative text-center shadow-md">
            
            {/* Watermark badge inside */}
            <div className="absolute right-6 top-6 opacity-10 dark:opacity-5 text-amber-500">
              <Award className="w-24 h-24 stroke-[1]" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
                  Certificado de Conclusão e Aproveitamento
                </span>
                <div className="h-0.5 w-16 bg-amber-400 mx-auto" />
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                Certificamos que para todos os fins de capacitação tecnológica,
              </p>

              <h4 className="font-sans font-extrabold text-xl md:text-2xl text-slate-900 dark:text-white tracking-tight border-b border-slate-200 dark:border-slate-800 pb-2 max-w-md mx-auto">
                {userName}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                concluiu com êxito a avaliação teórica e prática sobre <strong>Modelos de Inteligência Artificial Generativa</strong>, abrangendo arquiteturas de redes neurais generativas, treinamento adversário, codificação latente de VAEs, modelos autorregressivos e processos de redução de ruído por difusão.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-800 max-w-md mx-auto text-left">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Emitido em</span>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {today}
                  </span>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Assinatura Digital</span>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-serif italic block pt-0.5">
                    Tutor de IA Generativa
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              id="btn-print-certificate"
              onClick={handlePrintCertificate}
              className="flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm rounded-xl transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Imprimir Certificado
            </button>
            <button
              id="btn-restart-quiz"
              onClick={handleResetQuiz}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm rounded-xl hover:bg-slate-800 dark:hover:bg-white transition-all shadow-md cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Refazer o Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIdx];

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-white to-indigo-50/15 dark:from-slate-900 dark:to-indigo-950/5 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl shadow-md p-6 md:p-8 my-6">
      
      {/* Quiz Header Info */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60 mb-6">
        <div className="space-y-1">
          <span className="text-xxs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Aprenda Jogando
          </span>
          <h3 className="font-sans font-bold text-base text-slate-950 dark:text-white">
            Avaliação de Conceitos
          </h3>
        </div>
        <div className="text-right font-mono text-xs font-bold text-slate-500">
          Questão {currentQuestionIdx + 1} de {quizQuestions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
        <div 
          style={{ width: `${((currentQuestionIdx) / quizQuestions.length) * 100}%` }}
          className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-350"
        />
      </div>

      {/* Question Text */}
      <h4 className="font-sans font-bold text-lg text-slate-900 dark:text-white mb-6 leading-relaxed">
        {currentQuestion.question}
      </h4>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((opt, idx) => {
          const isSelected = selectedAnswerIdx === idx;
          const isCorrectAnswer = idx === currentQuestion.correctAnswerIndex;
          
          let optionStyle = "border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-850 bg-transparent text-slate-700 dark:text-slate-300";
          let badge = null;

          if (isAnswered) {
            if (isCorrectAnswer) {
              optionStyle = "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-700 dark:text-emerald-400 font-medium";
              badge = <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />;
            } else if (isSelected) {
              optionStyle = "border-rose-500 bg-rose-50/20 dark:bg-rose-950/10 text-rose-700 dark:text-rose-400 font-medium";
              badge = <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
            } else {
              optionStyle = "border-slate-100 dark:border-slate-900 opacity-40 bg-transparent text-slate-400";
            }
          } else if (isSelected) {
            optionStyle = "border-indigo-600 dark:border-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/10 text-indigo-700 dark:text-indigo-300 font-semibold ring-1 ring-indigo-600/50";
          }

          return (
            <button
              key={idx}
              id={`quiz-option-${idx}`}
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`w-full flex items-center justify-between gap-4 p-4 rounded-xl border text-left text-xs md:text-sm transition-all cursor-pointer ${optionStyle}`}
            >
              <div className="flex gap-3 items-center">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed">{opt}</span>
              </div>
              {badge}
            </button>
          );
        })}
      </div>

      {/* Explanation Reveal */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-2xl text-xs leading-relaxed mb-6 border ${
              selectedAnswerIdx === currentQuestion.correctAnswerIndex 
                ? "bg-emerald-50/30 dark:bg-emerald-950/5 border-emerald-200/50 dark:border-emerald-900/20 text-emerald-800 dark:text-emerald-300" 
                : "bg-rose-50/30 dark:bg-rose-950/5 border-rose-200/50 dark:border-rose-900/20 text-rose-800 dark:text-rose-300"
            }`}
          >
            <div className="flex gap-2 items-start">
              <span className="font-bold text-xs uppercase tracking-wider block mt-0.5 shrink-0">
                {selectedAnswerIdx === currentQuestion.correctAnswerIndex ? "Acertou! 🎉" : "Incorreto 💡"}
              </span>
              <p className="flex-1">{currentQuestion.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit / Next button */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-5 mt-4">
        <span className="text-[10px] font-mono text-slate-400">
          Acertos: {score} de {quizQuestions.length}
        </span>

        {!isAnswered ? (
          <button
            id="btn-submit-answer"
            disabled={selectedAnswerIdx === null}
            onClick={handleSubmitAnswer}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-slate-900 dark:bg-slate-100 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white dark:text-slate-900 font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            Responder
          </button>
        ) : (
          <button
            id="btn-next-question"
            onClick={handleNextQuestion}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            {currentQuestionIdx < quizQuestions.length - 1 ? "Próxima Questão" : "Ver Resultado"}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
}
