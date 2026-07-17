export interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export type ActiveTab = "reader" | "simulators" | "quiz" | "tutor";

export type SimulatorType = "autoregressive" | "diffusion" | "gan" | "vae";

export interface Highlight {
  id: string;
  text: string;
  section: string;
  createdAt: string;
}

export interface ReadingPreferences {
  fontSize: "sm" | "md" | "lg" | "xl";
  theme: "light" | "sepia" | "dark";
  lineSpacing: "normal" | "relaxed" | "loose";
}
