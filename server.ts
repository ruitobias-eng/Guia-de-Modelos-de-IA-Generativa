import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { SYSTEM_INSTRUCTION } from "./src/data/articleContext";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Endpoint to handle Gemini Chat questions
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, history } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(400).json({ 
          error: "A chave GEMINI_API_KEY não foi configurada. Por favor, adicione sua chave nas Configurações > Secrets do AI Studio para habilitar o Tutor de IA." 
        });
      }

      // Initialize GoogleGenAI SDK with user-agent
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const formattedHistory = (history || []).map((msg: any) => ({
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

      const response = await activeChat.sendMessage({ message: prompt });
      
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Erro na API Gemini:", error);
      res.status(500).json({ 
        error: `Ocorreu um erro ao processar sua pergunta: ${error.message || error}` 
      });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor full-stack rodando em http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Falha ao iniciar o servidor:", err);
});
