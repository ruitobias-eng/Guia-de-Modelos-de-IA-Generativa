import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Trash2, 
  Sparkles, 
  Bot, 
  User, 
  AlertCircle, 
  Clock, 
  ArrowDownCircle,
  HelpCircle,
  Zap
} from "lucide-react";
import { Message } from "../types";
import Markdown from "./Markdown";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../data/articleContext";

export default function AiTutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    "Qual a diferença fundamental entre GANs e VAEs?",
    "Como funcionam as etapas dos Modelos de Difusão?",
    "Me explique de forma simples o conceito de Espaço Latente.",
    "Quais os principais benefícios da IA generativa para DevOps?",
    "O que o artigo fala sobre o GitHub Copilot?"
  ];

  // Load chat history or a friendly welcoming message on first load
  useEffect(() => {
    const saved = localStorage.getItem("genai_tutor_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch (e) {
        console.error(e);
      }
    } else {
      setMessages([
        {
          id: "welcome",
          role: "model",
          content: "Olá! Sou seu **Tutor de Inteligência Artificial** especialista em Modelos Generativos. 🧠🤖\n\nEstou aqui para esclarecer qualquer dúvida sobre o artigo 'O que são modelos de IA generativa?' ou sobre como funcionam redes neurais generativas, treinamento adversarial, modelos autorregressivos (como GPT), difusão de ruído ou VAEs.\n\nEscolha uma das sugestões abaixo ou digite sua pergunta para começarmos!",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  const saveHistory = (msgs: Message[]) => {
    localStorage.setItem("genai_tutor_history", JSON.stringify(msgs));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    saveHistory(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      let replyText = "";

      try {
        // Map history correctly for the server API call
        // We send the current prompt + historical list
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: textToSend,
            history: messages.slice(1).map(m => ({ role: m.role, content: m.content }))
          })
        });

        const data = await response.json();

        if (response.ok) {
          replyText = data.text;
        } else {
          throw new Error(data.error || "Erro no servidor de chat");
        }
      } catch (serverErr: any) {
        console.warn("Falha no servidor de chat, tentando fallback client-side:", serverErr);

        // Fallback: check if VITE_GEMINI_API_KEY is available client-side
        const clientApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
        if (!clientApiKey) {
          throw new Error(
            "O servidor do Tutor não pôde ser contatado. Se você estiver usando o GitHub Pages (ambiente estático), configure a variável de ambiente VITE_GEMINI_API_KEY em seu repositório ou build do GitHub Actions para que o tutor funcione diretamente em seu navegador."
          );
        }

        const ai = new GoogleGenAI({
          apiKey: clientApiKey
        });

        const formattedHistory = messages.slice(1).map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));

        const activeChat = ai.chats.create({
          model: "gemini-3.5-flash",
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
          history: formattedHistory
        });

        const clientResponse = await activeChat.sendMessage({ message: textToSend });
        replyText = clientResponse.text;
      }

      const modelMsg: Message = {
        id: `model-${Date.now()}`,
        role: "model",
        content: replyText,
        timestamp: new Date()
      };

      const updatedMsgs = [...newMessages, modelMsg];
      setMessages(updatedMsgs);
      saveHistory(updatedMsgs);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Não foi possível contactar o servidor do Tutor.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    const welcome: Message = {
      id: "welcome",
      role: "model",
      content: "Chat reiniciado! Qual conceito de Inteligência Artificial Generativa você gostaria de desvendar hoje? 🧠",
      timestamp: new Date()
    };
    setMessages([welcome]);
    localStorage.removeItem("genai_tutor_history");
    setError(null);
  };

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50/15 dark:from-slate-900 dark:to-indigo-950/5 border border-slate-200/70 dark:border-slate-800/70 rounded-2xl shadow-md p-4 md:p-6 h-[600px] flex flex-col justify-between">
      
      {/* Header Panel */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-white">
              Tutor Virtual Inteligente
            </h3>
            <span className="text-[10px] font-mono text-emerald-500 font-bold flex items-center gap-1 mt-0.5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Powered by Gemini 3.5 Flash
            </span>
          </div>
        </div>

        <button
          id="btn-tutor-clear"
          onClick={clearChat}
          className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-rose-50/10 hover:border-rose-200 hover:text-rose-600 dark:hover:text-rose-400 text-slate-400 rounded-xl transition-all cursor-pointer"
          title="Limpar histórico da conversa"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Canvas */}
      <div className="flex-1 overflow-y-auto py-4 px-1 space-y-4">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div 
              key={m.id} 
              className={`flex gap-3.5 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {/* Bot Avatar */}
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm ${
                isUser 
                  ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md" 
                  : "bg-slate-50 dark:bg-slate-850/30 border border-slate-200/50 dark:border-slate-800 text-slate-800 dark:text-slate-200 leading-relaxed"
              }`}>
                {isUser ? (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                ) : (
                  <Markdown content={m.content} />
                )}
                
                <div className={`flex items-center gap-1 text-[9px] mt-2.5 ${isUser ? "text-slate-400 justify-end" : "text-slate-400 justify-start"}`}>
                  <Clock className="w-3 h-3" />
                  <span>{m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading / Typing indicator */}
        {isLoading && (
          <div className="flex gap-3.5 justify-start">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 dark:bg-slate-850/30 border border-slate-200/50 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-2 text-xs text-slate-400">
              <span className="animate-pulse">Tutor está pensando...</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
              </div>
            </div>
          </div>
        )}

        {/* Error notification bubble */}
        {error && (
          <div className="p-4 rounded-xl border border-rose-200/50 bg-rose-50/15 dark:bg-rose-950/5 text-xs text-rose-700 dark:text-rose-400 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-wider text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Erro na API do Tutor
            </div>
            <p>{error}</p>
            <div className="p-2 bg-rose-500/5 rounded-lg text-xxs border border-rose-200/30">
              <strong>Como resolver:</strong> Vá nas Configurações (ícone de engrenagem) &gt; Secrets, crie a chave <code>GEMINI_API_KEY</code> com sua chave do Google AI Studio e recarregue a página!
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick prompts - Shown only when chat is clean/short and not loading */}
      {messages.length <= 2 && !isLoading && (
        <div className="py-2">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Sugestões de Perguntas
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                id={`quick-prompt-btn-${idx}`}
                onClick={() => handleSend(p)}
                className="text-xxs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/10 hover:border-indigo-200 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-left cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form Panel */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
        className="flex items-center gap-2.5 pt-3.5 border-t border-slate-150 dark:border-slate-800"
      >
        <input
          id="tutor-chat-input"
          type="text"
          disabled={isLoading}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tire suas dúvidas (Ex: 'Me explique o que é o modelo GAN')"
          className="flex-1 bg-slate-50 dark:bg-slate-950 px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-sans text-xs md:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1.5 focus:ring-indigo-600 focus:border-transparent disabled:opacity-50"
        />
        <button
          id="btn-tutor-send"
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 bg-indigo-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white rounded-xl shadow-md transition-all hover:bg-indigo-700 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
