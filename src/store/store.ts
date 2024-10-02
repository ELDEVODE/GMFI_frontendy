import { create } from "zustand";
import axios from "axios";
import { defaultQuestions } from "./questions"; // Import default questions

const apiUrl = import.meta.env.VITE_API_URL;

interface QuizState {
  questions: { question: string; options: string[]; answer: string }[];
  currentQuestionIndex: number;
  score: number;
  lives: number;
  inGame: boolean;
  loading: boolean;
  error: boolean;
  setAnswer: (answer: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  category: string;
  setCategory: (category: string) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  fetchQuestions: (category: string, difficulty: string, number?: number) => Promise<void>;
}

export const useQuizStore = create<QuizState>((set) => ({
  questions: [defaultQuestions],
  currentQuestionIndex: 0,
  score: 0,
  lives: 3,
  inGame: true,
  loading: false,
  error: false,
  setAnswer: (answer) =>
    set((state) => {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (currentQuestion.answer === answer) {
        return { score: state.score + 1 };
      } else {
        return { lives: state.lives - 1 };
      }
    }),
  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),
  resetQuiz: () =>
    set({
      currentQuestionIndex: 0,
      score: 0,
      lives: 3,
      inGame: true,
    }),
  isMusicPlaying: true,
  toggleMusic: () =>
    set((state) => ({ isMusicPlaying: !state.isMusicPlaying })),
  category: "",
  setCategory: (category) => set({ category }),
  difficulty: "",
  setDifficulty: (difficulty) => set({ difficulty }),
  fetchQuestions: async (category, difficulty, number = 10) => {
    set({ loading: true, error: false });
    set({ questions: defaultQuestions, error: false, loading: false })
    // sessionStorage.setItem("questions", JSON.stringify(ques));
    // try {
    //   const response = await axios.post(`${apiUrl}/api/generate-questions`, {
    //     category,
    //     difficulty,
    //     number,
    //   });
    //   const questions = response.data.questions;
    //   if (questions && questions.length > 0) {
    //     set({ questions });
    //     sessionStorage.setItem("questions", JSON.stringify(questions)); // Save questions to session storage
    //   } else {
    //     throw new Error("No questions received from API");
    //   }
    // } catch (error) {
    //   console.error("Failed to fetch questions:", error);
    //   set({ questions: defaultQuestions, error: true }); // Use default questions on error
    // } finally {
    //   set({ loading: false });
    // }
  },
}));